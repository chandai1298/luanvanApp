import React, {useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';

import {IN4_APP} from '../../../ConnectServer/In4App';
import {QuestionStyle, Style, DIMENSION} from '../../../CommonStyles';
import Player from '../../SoundComponents/Player';

import * as Animatable from 'react-native-animatable';

const Part1 = ({currentPosition, lengthQuestion, space, question}) => {
  return (
    <View style={{flex: 5}}>
      <View style={{flex: 2, paddingLeft: 15, paddingRight: 15}}>
        <Text style={Style.text20}>
          Question {currentPosition}/{lengthQuestion}:{space}
          {question.title_question}
        </Text>

        <View style={[Style.coverCenter]}>
          <Player tracks={question.sound} />
        </View>
      </View>
      <View style={{flex: 3}}>
        <Animatable.Image
          animation="bounceInLeft"
          style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
          source={{uri: question.image}}
        />
      </View>
    </View>
  );
};
export default Part1;
