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
const path = Platform.select({
  ios: 'hello.m4a',
  android: 'sdcard/hello.mp4',
});

const Evaluation = ({route, navigation}) => {
  const [recordSecs, setrecordSecs] = React.useState('');
  const [recordTime, setrecordTime] = React.useState('');
  const [currentPositionSec, setcurrentPositionSec] = React.useState('');
  const [currentDurationSec, setcurrentDurationSec] = React.useState('');
  const [playTime, setplayTime] = React.useState('');
  const [duration, setduration] = React.useState('');
  const [audio, setAudio] = React.useState(
    'https://firebasestorage.googleapis.com/v0/b/fir-rn-785e2.appspot.com/o/img%2Fhello.mp4?alt=media&token=3cf08586-b097-481d-946f-89f1c94cbda9',
  );
  const onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const result = await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setrecordSecs(e.current_position);
      setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setrecordSecs(0);
    console.log(result);
    const uri = 'file:///sdcard/hello.mp4';
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(`img/${filename}`).putFile(uploadUri);

    try {
      await task;
      var ref = storage().ref(`img/${filename}`);
      const a = await ref.getDownloadURL();
      setAudio(a);
    } catch (e) {
      console.error(e);
    }
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer(path);
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer();
      }
      setcurrentPositionSec(e.current_position);
      setcurrentDurationSec(e.duration);
      setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      setduration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };
  useEffect(() => {});
  return (
    <View style={Style.coverCenter}>
      <TouchableOpacity
        style={{
          flex: 1,
          width: 200,
          margin: 10,
          borderColor: 'red',
          borderWidth: 1,
        }}
        onPress={() => onStartRecord()}>
        <Text style={Style.text15}>ghi am</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          width: 200,
          margin: 10,
          borderColor: 'red',
          borderWidth: 1,
        }}
        onPress={() => onStopRecord()}>
        <Text style={Style.text15}>dung</Text>
      </TouchableOpacity>
      {console.log(audio)}
      <Player tracks={audio} />
    </View>
  );
};
export default Evaluation;
