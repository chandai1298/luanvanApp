import React, {useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';

import {QuestionStyle, Style, DIMENSION} from '../../../CommonStyles';
import Player from '../../SoundComponents/Player';

const Part2 = ({currentPosition, lengthQuestion, space, question, help}) => {
  return (
    <View style={{flex: 5}}>
      <View style={{flex: 2, paddingLeft: 15, paddingRight: 15}}>
        <Text style={Style.text20}>
          Question {currentPosition}/{lengthQuestion}:{space}
          {question.title_question}
        </Text>
      </View>
      <View style={{flex: 3, paddingLeft: 15, paddingRight: 15}}>
        <Player tracks={question.sound} />
        <View style={{padding: 10}}>
          {help ? (
            <LinearTextGradient
              locations={[0, 1]}
              colors={['#091048', '#091048']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <Text style={Style.text20}>{question.question}</Text>
            </LinearTextGradient>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};
export default Part2;
