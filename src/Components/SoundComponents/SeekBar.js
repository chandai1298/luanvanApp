import React, {Component} from 'react';

import {View, Text} from 'react-native';
import {Style, SettingStyle} from '../../CommonStyles';
import Slider from '@react-native-community/slider';

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
];

const SeekBar = ({trackLength, currentPosition, onSeek, onSlidingStart}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          width: '20%',
          marginRight: 20,
        }}>
        <Text style={Style.text16}>{elapsed[0] + ':' + elapsed[1]}</Text>
        <Text style={Style.text16}>
          {trackLength > 1 && ' / ' + remaining[0] + ':' + remaining[1]}
        </Text>
      </View>
      <View style={{width: '70%'}}>
        <Slider
          maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSeek}
          value={currentPosition}
          style={{width: '100%'}}
          thumbTintColor="#58cc02"
          minimumTrackTintColor="#58cc02"
          maximumTrackTintColor="#58cc02"
        />
      </View>
    </View>
  );
};

export default SeekBar;
