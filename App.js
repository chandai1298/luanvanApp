import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import Setting from './src/Apps/Setting';
import BottomTabMain from './src/Apps/BottomTabMain';
import {AuthContext} from './src/LoginScreen/context';
import SplashScreen from './src/LoginScreen/SplashScreen';
import SignInScreen from './src/LoginScreen/SignInScreen';
import Dictionary from './src/Apps/LearningScreen/Dictionary';
import Translator from './src/Apps/LearningScreen/Translator';
import Toeic from './src/Apps/LearningScreen/Toeic';
import OnB1 from './src/Apps/LearningScreen/OnB1';
import Evaluation from './src/Apps/LearningScreen/Evaluation';
import Part from './src/Components/LearningComponents/OnB1Components/Part';
import PartDetail from './src/Components/LearningComponents/OnB1Components/PartDetail';
import Speaking from './src/Components/LearningComponents/ToeicComponents/Speaking';
import Listening from './src/Components/LearningComponents/ToeicComponents/Listening';
import Writing from './src/Components/LearningComponents/ToeicComponents/Writing';
import Reading from './src/Components/LearningComponents/ToeicComponents/Reading';
import ChangePassword from './src/Components/SettingComponents/ChangePassword';

const Stack = createStackNavigator();
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].Username;

        try {
          await AsyncStorage.setItem('userToken', userToken);
          //session user
          AsyncStorage.setItem('user', JSON.stringify(foundUser));
          let user = await AsyncStorage.getItem('user');
          let parsed = JSON.parse(user);
          showData(parsed);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          await AsyncStorage.multiRemove(keys);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [],
  );
  const [data, setData] = React.useState([
    {
      Id: '',
      Username: '',
      Name: '',
      Email: '',
      Avatar: '1',
      RoleId: '',
      IsActive: '',
    },
  ]);

  const showData = (user) => {
    if (user !== null) {
      setData(user);
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        //get user
        let user = await AsyncStorage.getItem('user');
        let parsed = JSON.parse(user);
        showData(parsed);

        //get token
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#754ea6" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken === null ? (
            <Stack.Navigator>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={BottomTabMain}
                options={{headerShown: false}}
                initialParams={{user: data[0]}}
              />
              <Stack.Screen
                name="Setting"
                component={Setting}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="changePassword"
                component={ChangePassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="dictionary"
                component={Dictionary}
                options={{title: 'Từ điển Anh-Việt'}}
              />
              <Stack.Screen
                name="translator"
                component={Translator}
                options={{title: 'Dịch văn bản'}}
              />
              <Stack.Screen
                name="onTOEIC"
                component={Toeic}
                options={{title: 'TOEIC-4 kỹ năng'}}
              />
              <Stack.Screen
                name="toeic_listening"
                component={Listening}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="toeic_speaking"
                component={Speaking}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="toeic_reading"
                component={Reading}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="toeic_writing"
                component={Writing}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="onB1"
                component={OnB1}
                options={{title: 'Ôn B1 ĐHNL TPHCM'}}
              />
              <Stack.Screen
                name="part"
                component={Part}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="partDetail"
                component={PartDetail}
                options={{headerShown: false}}
                initialParams={{count: 0, score: 0, crown: 5, totalLength: 0}}
              />
              <Stack.Screen
                name="testEvaluation"
                component={Evaluation}
                options={{headerShown: false}}
                initialParams={{count: 0, score: 10, crown: 5, totalLength: 0}}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
// export default App2 = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={PartDetailScreen}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
