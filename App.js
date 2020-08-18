// import React, {useEffect} from 'react';
// import {View, Image} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
// import AsyncStorage from '@react-native-community/async-storage';
// import * as Animatable from 'react-native-animatable';
// import axios from 'axios';

// import {
//   NavigationContainer,
//   DefaultTheme as NavigationDefaultTheme,
//   DarkTheme as NavigationDarkTheme,
// } from '@react-navigation/native';
// import {
//   Provider as PaperProvider,
//   DefaultTheme as PaperDefaultTheme,
//   DarkTheme as PaperDarkTheme,
// } from 'react-native-paper';
// import {fcmService} from './src/Notification/FCMService';
// import {localNotificationService} from './src/Notification/LocalNotificationService';
// import {IN4_APP} from './src/ConnectServer/In4App';
// import Setting from './src/Apps/Setting';
// import BottomTabMain from './src/Apps/BottomTabMain';
// import {AuthContext} from './src/LoginScreen/context';
// import SplashScreen from './src/LoginScreen/SplashScreen';
// import SignInScreen from './src/LoginScreen/SignInScreen';
// import SignUpScreen from './src/LoginScreen/SignUpScreen';
// import Dictionary from './src/Apps/LearningScreen/Dictionary';
// import Translator from './src/Apps/LearningScreen/Translator';
// import Toeic from './src/Apps/LearningScreen/Toeic';
// import OnB1 from './src/Apps/LearningScreen/OnB1';
// import Evaluation from './src/Apps/LearningScreen/Evaluation';
// import Part from './src/Components/LearningComponents/OnB1Components/Part';
// import PartDetail from './src/Components/LearningComponents/OnB1Components/PartDetail';
// import Speaking from './src/Components/LearningComponents/ToeicComponents/Speaking';
// import Listening from './src/Components/LearningComponents/ToeicComponents/Listening';
// import Writing from './src/Components/LearningComponents/ToeicComponents/Writing';
// import Reading from './src/Components/LearningComponents/ToeicComponents/Reading';
// import ChangePassword from './src/Components/SettingComponents/ChangePassword';
// import FinishPart from './src/Components/Encouragement/FinishPart';
// import Corrects from './src/Components/Encouragement/Corrects';

// const Stack = createStackNavigator();
// const App = () => {
//   const [isDarkTheme, setIsDarkTheme] = React.useState(false);
//   const initialLoginState = {
//     isLoading: true,
//     userName: null,
//     userToken: null,
//   };

//   const CustomDefaultTheme = {
//     ...NavigationDefaultTheme,
//     ...PaperDefaultTheme,
//     colors: {
//       ...NavigationDefaultTheme.colors,
//       ...PaperDefaultTheme.colors,
//       background: '#ffffff',
//       text: '#333333',
//     },
//   };

//   const CustomDarkTheme = {
//     ...NavigationDarkTheme,
//     ...PaperDarkTheme,
//     colors: {
//       ...NavigationDarkTheme.colors,
//       ...PaperDarkTheme.colors,
//       background: '#333333',
//       text: '#ffffff',
//     },
//   };

//   const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

//   const loginReducer = (prevState, action) => {
//     switch (action.type) {
//       case 'RETRIEVE_TOKEN':
//         return {
//           ...prevState,
//           userToken: action.token,
//           isLoading: false,
//         };
//       case 'LOGIN':
//         return {
//           ...prevState,
//           userName: action.id,
//           userToken: action.token,
//           isLoading: false,
//         };
//       case 'LOGOUT':
//         return {
//           ...prevState,
//           userName: null,
//           userToken: null,
//           isLoading: false,
//         };
//       case 'REGISTER':
//         return {
//           ...prevState,
//           userName: action.id,
//           userToken: action.token,
//           isLoading: false,
//         };
//     }
//   };

//   const [loginState, dispatch] = React.useReducer(
//     loginReducer,
//     initialLoginState,
//   );

//   const authContext = React.useMemo(
//     () => ({
//       signIn: async (foundUser) => {
//         const userToken = String(foundUser[0].userToken);
//         const userName = foundUser[0].Username;

//         try {
//           await AsyncStorage.setItem('userToken', userToken);
//           //session user
//           AsyncStorage.setItem('user', JSON.stringify(foundUser));
//           let user = await AsyncStorage.getItem('user');
//           let parsed = JSON.parse(user);
//           showData(parsed);
//         } catch (e) {
//           console.log(e);
//         }
//         dispatch({type: 'LOGIN', id: userName, token: userToken});
//       },
//       signOut: async () => {
//         try {
//           const keys = await AsyncStorage.getAllKeys();
//           await AsyncStorage.multiRemove(keys);
//         } catch (e) {
//           console.log(e);
//         }
//         dispatch({type: 'LOGOUT'});
//       },
//       signUp: () => {
//         // setUserToken('fgkj');
//         // setIsLoading(false);
//       },
//       toggleTheme: () => {
//         setIsDarkTheme((isDarkTheme) => !isDarkTheme);
//       },
//     }),
//     [],
//   );
//   const [data, setData] = React.useState([
//     {
//       Id: '',
//       Username: '',
//       Name: '',
//       Email: '',
//       Avatar: '1',
//       RoleId: '',
//       IsActive: '',
//     },
//   ]);

//   const showData = (user) => {
//     if (user !== null) {
//       setData(user);
//     }
//   };

//   useEffect(() => {
//     fcmService.registerAppWithFCM();
//     fcmService.register(onRegister, onNotification, onOpenNotification);
//     localNotificationService.configure(onOpenNotification);

//     function onRegister(token) {
//       console.log('[App] onRegister: ', token);
//       const UpdateTokenNotification = IN4_APP.UpdateTokenNotification;
//       axios
//         .put(UpdateTokenNotification, {
//           token: token,
//           id_user: data[0].Id,
//         })
//         .then(function (response) {
//           console.log('token ' + response.data);
//         })
//         .catch(function (error) {
//           console.log(error.message);
//         });
//     }

//     function onNotification(notify) {
//       console.log('[App] onNotification: ');
//       const options = {
//         soundName: 'plucky',
//         playSound: true, //,
//         // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
//         // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
//       };
//       localNotificationService.showNotification(
//         0,
//         notify.title,
//         notify.body,
//         notify,
//         options,
//       );
//     }

//     function onOpenNotification(notify) {
//       console.log('[App] onOpenNotification: ', notify);
//       alert('Open Notification: ' + notify.body);
//     }
//     setTimeout(async () => {
//       let userToken;
//       userToken = null;
//       try {
//         //get user
//         let user = await AsyncStorage.getItem('user');
//         let parsed = JSON.parse(user);
//         showData(parsed);

//         //get token
//         userToken = await AsyncStorage.getItem('userToken');
//       } catch (e) {
//         console.log(e);
//       }
//       dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
//     }, 1000);
//     return () => {
//       console.log('[App] unRegister');
//       fcmService.unRegister();
//       localNotificationService.unregister();
//     };
//   }, []);

//   if (loginState.isLoading) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: '#ffdcd8c4',
//         }}>
//         <Animatable.Image
//           animation="bounceIn"
//           duraton="1500"
//           source={{
//             uri:
//               'https://pic.funnygifsbox.com/uploads/2019/02/funnygifsbox.com-2019-02-13-04-28-33-85.gif',
//           }}
//           style={{width: '50%', height: '50%'}}
//           resizeMode="contain"
//         />
//       </View>
//     );
//   }
//   return (
//     <PaperProvider theme={theme}>
//       <AuthContext.Provider value={authContext}>
//         <NavigationContainer theme={theme}>
//           {loginState.userToken === null ? (
//             <Stack.Navigator>
//               <Stack.Screen
//                 name="SplashScreen"
//                 component={SplashScreen}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="SignInScreen"
//                 component={SignInScreen}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="SignUpScreen"
//                 component={SignUpScreen}
//                 options={{headerShown: false}}
//               />
//             </Stack.Navigator>
//           ) : (
//             <Stack.Navigator>
//               <Stack.Screen
//                 name="Home"
//                 component={BottomTabMain}
//                 options={{headerShown: false}}
//                 initialParams={{user: data[0]}}
//               />
//               <Stack.Screen
//                 name="Setting"
//                 component={Setting}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="changePassword"
//                 component={ChangePassword}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="dictionary"
//                 component={Dictionary}
//                 options={{title: 'Từ điển Anh-Việt'}}
//               />
//               <Stack.Screen
//                 name="translator"
//                 component={Translator}
//                 options={{title: 'Dịch văn bản'}}
//               />
//               <Stack.Screen
//                 name="onTOEIC"
//                 component={Toeic}
//                 options={{title: 'TOEIC-4 kỹ năng'}}
//               />
//               <Stack.Screen
//                 name="toeic_listening"
//                 component={Listening}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="toeic_speaking"
//                 component={Speaking}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="toeic_reading"
//                 component={Reading}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="toeic_writing"
//                 component={Writing}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="onB1"
//                 component={OnB1}
//                 options={{title: 'Ôn B1 ĐHNL TPHCM'}}
//               />
//               <Stack.Screen
//                 name="part"
//                 component={Part}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="partDetail"
//                 component={PartDetail}
//                 options={{headerShown: false}}
//                 initialParams={{count: 0, score: 0, crown: 5, totalLength: 0}}
//               />
//               <Stack.Screen
//                 name="finishPart"
//                 component={FinishPart}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="correct"
//                 component={Corrects}
//                 options={{headerShown: false}}
//               />
//               <Stack.Screen
//                 name="testEvaluation"
//                 component={Evaluation}
//                 options={{headerShown: false}}
//                 initialParams={{count: 0, score: 10, crown: 5, totalLength: 0}}
//               />
//             </Stack.Navigator>
//           )}
//         </NavigationContainer>
//       </AuthContext.Provider>
//     </PaperProvider>
//   );
// };

// // const App = () => {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator>
// //         <Stack.Screen
// //           name="finishPart"
// //           component={FinishPart}
// //           options={{headerShown: false}}
// //           initialParams={{score: 10, crown: 3}}
// //         />
// //         <Stack.Screen
// //           name="part"
// //           component={Part}
// //           options={{headerShown: false}}
// //         />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // };

// export default App;
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animate from 'react-native-animatable';
const listItems = [
  'Writing',
  'Learning',
  'Dharma',
  'Isolation',
  'Productivity',
  'Personal',
  'Meditate',
  'Mindfulness',
  'Buddha',
  'Health',
  'Fitness',
  'Music',
];
export default class App extends React.Component {
  state = {
    searchBarFocused: false,
  };
  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }
  keyboardDidShow = () => {
    this.setState({searchBarFocused: true});
  };
  keyboardWillShow = () => {
    this.setState({searchBarFocused: true});
  };
  keyboardWillHide = () => {
    this.setState({searchBarFocused: false});
  };
  render() {
    return (
      <View style={{flex: 1, paddingTop: 21}}>
        <View
          style={{
            height: 82,
            backgroundColor: '#c5ff59',
            justifyContent: 'center',
            paddingHorizontal: 5,
          }}>
          <Animate.View
            animation="slideInRight"
            duration={1000}
            style={{
              height: 51,
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              padding: 4,
              alignItems: 'center',
            }}>
            <Icon
              name={
                this.state.searchBarFocused ? 'md-arrow-back' : 'ios-search'
              }
              style={{fontSize: 24}}
            />
            <TextInput
              placeholder="Search Here"
              style={{fontSize: 24, paddingLeft: 14}}
            />
          </Animate.View>
        </View>
        <FlatList
          style={{
            backgroundColor: this.state.searchBarFocused
              ? '#6e6363'
              : '#ffffff',
          }}
          data={listItems}
          renderItem={({item}) => (
            <Text style={{padding: 21, fontSize: 19}}>{item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
