import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
// import Questions from '../../Components/LearningComponents/Questions';
import {IN4_APP} from '../../ConnectServer/In4App';
import {Style, QuestionStyle, DIMENSION} from '../../CommonStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderQuestion from '../../Components/LearningComponents/HeaderQuestion';
import storage from '@react-native-firebase/storage';

import Player from '../../Components/SoundComponents/Player';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

const Evaluation = ({route, navigation}) => {
  useEffect(() => {});
  return (
    <View style={Style.coverCenter}>
      <Text>kiem tra</Text>
    </View>
  );
};
export default Evaluation;
