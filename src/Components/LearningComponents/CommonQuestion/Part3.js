import React, {useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';

import {QuestionStyle, Style, DIMENSION} from '../../../CommonStyles';
import Player from '../../SoundComponents/Player';

const Part2 = ({currentPosition, lengthQuestion, space, question, help}) => {
  return (
    <View style={{flex: 2, paddingLeft: 15, paddingRight: 15}}>
      <Text style={Style.text20}>
        Question {currentPosition}-{currentPosition + 2}/{lengthQuestion}:
        {space}
        {question.title_question}
      </Text>

      <View style={Style.coverCenter}>
        {help ? (
          <Animatable.View
            animation="bounceIn"
            duraton="1500"
            style={[
              {
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
              },
            ]}>
            <View>
              <TouchableOpacity onPress={() => setHelp(false)}>
                <FontAwesome5
                  name="times"
                  size={DIMENSION.sizeIcon2}
                  color="#091048"
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{
                width: DIMENSION.width,
                padding: 15,
                paddingTop: 5,
              }}>
              <Text
                style={[{fontStyle: 'italic', fontSize: 20, color: '#091048'}]}>
                {question.question}
              </Text>
            </ScrollView>
          </Animatable.View>
        ) : (
          <Player tracks={question.sound} />
        )}
      </View>
    </View>
  );
};
export default Part2;
