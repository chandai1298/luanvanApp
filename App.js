import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

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
import {fcmService} from './src/Notification/FCMService';
import {localNotificationService} from './src/Notification/LocalNotificationService';
import {IN4_APP} from './src/ConnectServer/In4App';
import Setting from './src/Apps/Setting';
import BottomTabMain from './src/Apps/BottomTabMain';
import {AuthContext} from './src/LoginScreen/context';
import SplashScreen from './src/LoginScreen/SplashScreen';
import SignInScreen from './src/LoginScreen/SignInScreen';
import SignUpScreen from './src/LoginScreen/SignUpScreen';
import Dictionary from './src/Apps/LearningScreen/Dictionary';
import Translator from './src/Apps/LearningScreen/Translator';
import Toeic from './src/Apps/LearningScreen/Toeic';
import OnB1 from './src/Apps/LearningScreen/OnB1';
import Evaluation from './src/Apps/LearningScreen/Evaluation';
import Part from './src/Components/LearningComponents/OnB1Components/Part';
import PartDetail from './src/Components/LearningComponents/OnB1Components/PartDetail';
import ToeicTest from './src/Components/LearningComponents/ToeicComponents/ToeicTest';
import ToeicTestDetail from './src/Components/LearningComponents/ToeicComponents/ToeicTestDetail';
import ChangePassword from './src/Components/SettingComponents/ChangePassword';
import FinishPart from './src/Components/Encouragement/FinishPart';
import Corrects from './src/Components/Encouragement/Corrects';
import EvaluationB1Test from './src/Components/LearningComponents/EvaluationComponents/EvaluationB1Test';
import EvaluationB1TestDetail from './src/Components/LearningComponents/EvaluationComponents/EvaluationB1TestDetail';
import AnotherFriend from './src/Components/ProfileComponent/AnotherFriend';
import AnotherAchievement from './src/Components/ProfileComponent/AnotherAchievement';

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
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister: ', token);
      const UpdateTokenNotification = IN4_APP.UpdateTokenNotification;
      axios
        .put(UpdateTokenNotification, {
          token: token,
          id_user: data[0].Id,
        })
        .then(function (response) {
          console.log('token ' + response.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ');
      const options = {
        soundName: 'plucky',
        playSound: true, //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
      alert('Open Notification: ' + notify.body);
    }
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
    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fcfefc',
        }}>
        <Animatable.Image
          animation="slideInRight"
          duration={1000}
          source={{
            uri:
              'https://i.pinimg.com/originals/45/bd/54/45bd545f9c6cb36a0875a6ea39fb4f61.gif',
          }}
          style={{width: '50%', height: '50%'}}
          resizeMode="contain"
        />
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
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
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
                name="toeic"
                component={ToeicTest}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="toeicDetail"
                component={ToeicTestDetail}
                options={{headerShown: false}}
                initialParams={{
                  count: 0,
                  score: 0,
                  crown: 5,
                  totalLength: 0,
                  currentPosition: 1,
                }}
              />

              <Stack.Screen
                name="onB1"
                component={OnB1}
                options={{title: 'Luyện B1 ĐHNL TPHCM'}}
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
                initialParams={{
                  count: 0,
                  score: 0,
                  crown: 5,
                  totalLength: 0,
                  currentPosition: 1,
                }}
              />
              <Stack.Screen
                name="finishPart"
                component={FinishPart}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="correct"
                component={Corrects}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="testEvaluation"
                component={Evaluation}
                options={{title: 'Kiểm tra B1 ĐHNL TPHCM'}}
              />
              <Stack.Screen
                name="anotherFriend"
                component={AnotherFriend}
                options={{title: 'Danh sách bạn bè'}}
              />
              <Stack.Screen
                name="anotherAchievement"
                component={AnotherAchievement}
                options={{title: 'Thành tích'}}
              />
              <Stack.Screen
                name="testb1"
                component={EvaluationB1Test}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="partDetail2"
                component={EvaluationB1TestDetail}
                options={{headerShown: false}}
                initialParams={{
                  count: 0,
                  score: 0,
                  crown: 5,
                  totalLength: 0,
                  currentPosition: 1,
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="finishPart"
//           component={FinishPart}
//           options={{headerShown: false}}
//           initialParams={{score: 10, crown: 3}}
//         />
//         <Stack.Screen
//           name="part"
//           component={Part}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default App;
