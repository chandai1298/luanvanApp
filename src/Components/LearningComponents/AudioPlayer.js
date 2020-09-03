import React, {Component} from 'react';
import Video from 'react-native-video';
import {View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
const AudioPlayer = ({track, onEnd, delay, pause}) => {
  const [delayEnd, setDelayEnd] = React.useState(-1);
  const [done, setDone] = React.useState(false);
  const [play, setPlay] = React.useState(pause);

  var h = null;
  var m = null;
  var s = null;
  var timeout = null;
  const end = () => {
    if (h === null) {
      h = 0;
      m = 0;
      s = delay;
    }
    if (s === -1) {
      m -= 1;
      s = 59;
    }
    if (m === -1) {
      h -= 1;
      m = 59;
    }
    if (h == -1) {
      clearTimeout(timeout);
      setDone(false);
      setPlay(false);
      setDelayEnd(-1);
      return false;
    }
    console.log(s);
    setDelayEnd(s);
    timeout = setTimeout(function () {
      s--;
      end();
    }, 850);
  };
  const loadStart = () => {};
  return (
    <View>
      <Video
        source={{uri: track}}
        onLoadStart={loadStart()}
        resizeMode="cover"
        paused={false}
        onLoad={(e) => {
          e.duration > 0 ? setPlay(true) : null;
        }}
        onEnd={onEnd} // Callback when playback finishes
        onProgress={(e) => {
          if (
            Math.round(e.currentTime) === Math.round(e.playableDuration - 5) &&
            !done
          ) {
            setDone(true);
            end();
          }
        }}
      />
      {play ? (
        <Text style={{fontSize: 18, color: '#8f3311'}}>
          Âm thanh đang phát...
        </Text>
      ) : (
        <ActivityIndicator size="small" color="#8f3311" />
      )}
      <Text style={{fontSize: 16, color: '#8f3311'}}>
        {done ? `Chuyển màn hình sau ${delayEnd} giây...` : ''}
      </Text>
    </View>
  );
};
export default AudioPlayer;
