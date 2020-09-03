import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import {
  PowerTranslator,
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory,
} from 'react-native-power-translator';
import {IN4_APP} from '../../../ConnectServer/In4App';
import {QuestionStyle, Style, DIMENSION} from '../../../CommonStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import Player from '../../SoundComponents/Player';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from '@react-navigation/native';
import Tts from 'react-native-tts';
import Tooltip from 'react-native-walkthrough-tooltip';
import {Button} from 'react-native-elements';

const EvaluationB1TestDetail = ({route, navigation}) => {
  const {
    count,
    crown,
    score,
    totalLength,
    id_category,
    id_lession,
    id_part,
    idUser,
    currentPosition,
  } = route.params;
  const [loading, setLoading] = React.useState(true);
  const [lengthQuestion, setLengthQuestion] = React.useState(0);
  const [hideDescription, setHideDescription] = React.useState(false);
  const [sequence, setSequence] = React.useState(0);
  const [help, setHelp] = React.useState(false);
  const [answer, setAnswer] = React.useState('');
  const [answer2, setAnswer2] = React.useState('');
  const [answer3, setAnswer3] = React.useState('');
  const [answer4, setAnswer4] = React.useState('');
  const [answer5, setAnswer5] = React.useState('');
  const [outputText, onChangeOutputText] = React.useState('');
  const [outPartRead, setOutPartRead] = React.useState('');
  const c = parseInt(JSON.stringify(count));

  //doc van ban
  const speechText = (text) => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('en-us');
      Tts.speak(text);
    });
  };

  //header
  const [visible, setVisible] = React.useState(false);

  const [current_hint, setCurrentHint] = React.useState('');

  const updateHint = (hints) => {
    const count = hints - 1;
    setCurrentHint(count);
    setHelp(true);
    const UpdateHint = IN4_APP.UpdateHint;
    axios
      .put(UpdateHint, {
        hint: count,
        id_user: idUser,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setVisible(false);
  };

  const [data, setData] = React.useState([
    {
      id: '',
      id_lession: '',
      id_part: '',
      question: '',
      dapanA: '',
      dapanB: '',
      dapanC: '',
      dapanD: '',
      answer: '',
      image: '',
      isActive: '',
      sound: '',
      description: '',
    },
  ]);
  const [ranks, setRank] = React.useState([
    {
      id: '',
      id_user: '',
      total_score: '',
      current_score: '',
      crown: '',
      streak: '',
      bestStreak: '',
      hint: '',
    },
  ]);
  const [dataConfig, setDataConfig] = React.useState([
    {id: '', id_user: '', title: '', status: '', isActive: ''},
  ]);
  const getData = () => {
    const getQuestionPart = IN4_APP.getQuestionPart;
    const RankOfUser = IN4_APP.RankOfUser;
    const getConfig = IN4_APP.getConfig;
    axios
      .all([
        axios.post(RankOfUser, {
          id: idUser,
        }),
        axios.post(getQuestionPart, {
          id: id_category,
          id_part: id_part,
          id_lession: id_lession,
        }),
        axios.post(getConfig, {
          id_user: idUser,
          type: 1,
        }),
      ])
      .then(
        axios.spread((...allData) => {
          setRank(allData[0].data);
          setData(allData[1].data);
          setLengthQuestion(allData[1].data.length);
          setDataConfig(allData[2].data);
          setLoading(false);
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const rank = ranks[0];
  const tmp = '' !== current_hint ? current_hint : rank.hint;

  useEffect(() => {
    TranslatorConfiguration.setConfig(
      ProviderTypes.Google,
      'AIzaSyDw8zJOc3u3rRPi5prSI8u4qmoA5vhlPAs',
      'vi',
      'en',
    );
    getData();
  }, []);

  const translate = (text) => {
    try {
      const translator = TranslatorFactory.createTranslator();
      translator.translate(text).then((translated) => {
        onChangeOutputText(text + '\n=> ' + translated);
        setHideDescription(true);
      });
    } catch (error) {}
  };
  const translateQuestion = (text) => {
    try {
      const translator = TranslatorFactory.createTranslator();
      translator.translate(text).then((translated) => {
        setOutPartRead(text + '\n=> ' + translated);
      });
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Thông báo',
          'Bạn chắc chắn muốn quay lại?',
          [
            {
              text: 'Hủy',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.navigate('part')},
          ],
          {cancelable: false},
        );

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const empty = {
    id: '',
    id_lession: '',
    id_part: '',
    question: '',
    dapanA: '',
    dapanB: '',
    dapanC: '',
    dapanD: '',
    answer: '',
    image: '',
    isActive: '',
    sound: '',
    description: '',
  };
  const question = data[totalLength] !== undefined ? data[totalLength] : empty;
  const question2 =
    data[totalLength + 1] !== undefined ? data[totalLength + 1] : empty;
  const question3 =
    data[totalLength + 2] !== undefined ? data[totalLength + 2] : empty;
  const question4 =
    data[totalLength + 3] !== undefined ? data[totalLength + 3] : empty;
  const question5 =
    data[totalLength + 4] !== undefined ? data[totalLength + 4] : empty;

  const AnswerABCD = ({item}) => {
    var promise = null;
    const arr = [
      {dapan: item.dapanA, id: 1},
      {dapan: item.dapanB, id: 2},
      {dapan: item.dapanC, id: 3},
      {dapan: item.dapanD, id: 4},
    ];
    const arr2 = [
      {dapan: 'A', dapan2: item.dapanA, id: 1},
      {dapan: 'B', dapan2: item.dapanB, id: 2},
      {dapan: 'C', dapan2: item.dapanC, id: 3},
      {dapan: 'D', dapan2: item.dapanD, id: 4},
    ];
    switch (item.id_part) {
      case 1:
        promise = (
          <View>
            {help
              ? arr.map((e) => (
                  <TouchableOpacity
                    onLongPress={() => {
                      translate(e.dapan);
                      speechText(e.dapan);
                    }}
                    key={e.id}
                    style={[
                      QuestionStyle.tchAnswer2,
                      answer === e.dapan && Style.btnActive,
                      Style.boxShadow,
                    ]}
                    onPress={() => setAnswer(e.dapan)}>
                    <Text
                      style={[
                        Style.textAnswer,
                        answer === e.dapan && Style.txtActive,
                      ]}>
                      {e.dapan}
                    </Text>
                  </TouchableOpacity>
                ))
              : arr2.map((e) => (
                  <TouchableOpacity
                    key={e.id}
                    style={[
                      QuestionStyle.tchAnswer2,
                      answer === e.dapan2 && Style.btnActive,
                      Style.boxShadow,
                    ]}
                    onPress={() => setAnswer(e.dapan2)}>
                    <Text
                      style={[
                        Style.textAnswer,
                        answer === e.dapan2 && Style.txtActive,
                      ]}>
                      Options {e.dapan}
                    </Text>
                  </TouchableOpacity>
                ))}
          </View>
        );
        break;
      default:
        promise = (
          <View>
            {arr.map((e) => (
              <TouchableOpacity
                onLongPress={() => {
                  translate(e.dapan);
                  speechText(e.dapan);
                }}
                key={e.id}
                style={[
                  QuestionStyle.tchAnswer2,
                  answer === e.dapan && Style.btnActive,
                  Style.boxShadow,
                ]}
                onPress={() => setAnswer(e.dapan)}>
                <Text
                  style={[
                    Style.textAnswer,
                    answer === e.dapan && Style.txtActive,
                  ]}>
                  {e.dapan}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
        break;
    }
    return promise;
  };
  const AnswerABCD2 = ({item2}) => {
    const arr = [
      {dapan: item2.dapanA, id: 1},
      {dapan: item2.dapanB, id: 2},
      {dapan: item2.dapanC, id: 3},
      {dapan: item2.dapanD, id: 4},
    ];
    return (
      <View>
        {arr.map((e) => (
          <TouchableOpacity
            onLongPress={() => {
              translate(e.dapan);
              speechText(e.dapan);
            }}
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer2 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer2(e.dapan)}>
            <Text
              style={[
                Style.textAnswer,
                answer2 === e.dapan && Style.txtActive,
              ]}>
              {e.dapan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const AnswerABCD3 = ({item3}) => {
    const arr = [
      {dapan: item3.dapanA, id: 1},
      {dapan: item3.dapanB, id: 2},
      {dapan: item3.dapanC, id: 3},
      {dapan: item3.dapanD, id: 4},
    ];
    return (
      <View>
        {arr.map((e) => (
          <TouchableOpacity
            onLongPress={() => {
              translate(e.dapan);
              speechText(e.dapan);
            }}
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer3 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer3(e.dapan)}>
            <Text
              style={[
                Style.textAnswer,
                answer3 === e.dapan && Style.txtActive,
              ]}>
              {e.dapan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const AnswerABCD4 = ({item4}) => {
    const arr = [
      {dapan: item4.dapanA, id: 1},
      {dapan: item4.dapanB, id: 2},
      {dapan: item4.dapanC, id: 3},
      {dapan: item4.dapanD, id: 4},
    ];
    return (
      <View>
        {arr.map((e) => (
          <TouchableOpacity
            onLongPress={() => {
              translate(e.dapan);
              speechText(e.dapan);
            }}
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer4 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer4(e.dapan)}>
            <Text
              style={[
                Style.textAnswer,
                answer4 === e.dapan && Style.txtActive,
              ]}>
              {e.dapan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const AnswerABCD5 = ({item5}) => {
    const arr = [
      {dapan: item5.dapanA, id: 1},
      {dapan: item5.dapanB, id: 2},
      {dapan: item5.dapanC, id: 3},
      {dapan: item5.dapanD, id: 4},
    ];
    return (
      <View>
        {arr.map((e) => (
          <TouchableOpacity
            onLongPress={() => {
              translate(e.dapan);
              speechText(e.dapan);
            }}
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer5 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer5(e.dapan)}>
            <Text
              style={[
                Style.textAnswer,
                answer5 === e.dapan && Style.txtActive,
              ]}>
              {e.dapan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const AnswerABC = ({question}) => {
    const arr = [
      {dapan: question.dapanA, id: 1},
      {dapan: question.dapanB, id: 2},
      {dapan: question.dapanC, id: 3},
    ];
    const arr2 = [
      {dapan: 'A', dapan2: question.dapanA, id: 1},
      {dapan: 'B', dapan2: question.dapanB, id: 2},
      {dapan: 'C', dapan2: question.dapanC, id: 3},
    ];
    return (
      <View>
        {help
          ? arr.map((e) => (
              <TouchableOpacity
                onLongPress={() => {
                  translate(e.dapan);
                  speechText(e.dapan);
                }}
                key={e.id}
                style={[
                  QuestionStyle.tchAnswer2,
                  answer === e.dapan && Style.btnActive,
                  Style.boxShadow,
                ]}
                onPress={() => {
                  setAnswer(e.dapan);
                }}>
                <Text
                  style={[
                    Style.textAnswer,
                    answer === e.dapan && Style.txtActive,
                  ]}>
                  {e.dapan}
                </Text>
              </TouchableOpacity>
            ))
          : arr2.map((e) => (
              <TouchableOpacity
                key={e.id}
                style={[
                  QuestionStyle.tchAnswer2,
                  answer === e.dapan2 && Style.btnActive,
                  Style.boxShadow,
                ]}
                onPress={() => setAnswer(e.dapan2)}>
                <Text
                  style={[
                    Style.textAnswer,
                    answer === e.dapan2 && Style.txtActive,
                  ]}>
                  Options {e.dapan}
                </Text>
              </TouchableOpacity>
            ))}
      </View>
    );
  };
  const countQuestionPart7 = () => {
    var count = 0;
    data.some((item) => {
      if (item.sound === question.sound && item.sound === question5.sound) {
        count = 5;
      } else if (
        item.sound === question.sound &&
        item.sound === question4.sound
      ) {
        count = 4;
      } else if (
        item.sound === question.sound &&
        item.sound === question3.sound
      ) {
        count = 3;
      } else if (
        item.sound === question.sound &&
        item.sound === question2.sound
      ) {
        count = 2;
      }
    });
    return count;
  };
  const MultiQuestion = ({item, item2, item3, item4, item5}) => {
    var promise = null;
    switch (item.id_part) {
      case 7:
        switch (countQuestionPart7()) {
          case 5:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item.description}
                      </Text>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>1/5</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item2.description}
                      </Text>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>2/5</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item3.description}
                      </Text>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>3/5</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item4.description}
                      </Text>
                      <Text style={Style.text20}>{item4.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item4.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD4 item4={question4} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>4/5</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item5.description}
                      </Text>
                      <Text style={Style.text20}>{item5.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item5.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD5 item5={question5} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text style={{marginBottom: 10}}>5/5</Text>
              </View>
            );
            break;
          case 4:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item.description}
                      </Text>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>1/4</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item2.description}
                      </Text>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>2/4</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item3.description}
                      </Text>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>3/4</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item4.description}
                      </Text>
                      <Text style={Style.text20}>{item4.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item4.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD4 item4={question4} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text style={{marginBottom: 10}}>4/4</Text>
              </View>
            );
            break;
          case 3:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item.description}
                      </Text>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>1/3</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item2.description}
                      </Text>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>2/3</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item3.description}
                      </Text>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text style={{marginBottom: 10}}>3/3</Text>
              </View>
            );
            break;
          case 2:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item.description}
                      </Text>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line}></View>
                <Text>1/2</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item2.description}
                      </Text>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text style={{marginBottom: 10}}>2/2</Text>
              </View>
            );
            break;
          default:
            break;
        }
        break;
      default:
        promise = (
          <View style={{paddingLeft: 5, paddingRight: 5}}>
            <View style={{marginBottom: 15, marginTop: 15}}>
              <View style={{marginBottom: 10}}>
                <Text style={[Style.text20]}>{item.question}</Text>
              </View>
              <View>
                <AnswerABCD item={question} />
              </View>
            </View>
            <View style={Style.line}></View>
            <Text>1/3</Text>
            <View style={{marginBottom: 15, marginTop: 15}}>
              <View style={{marginBottom: 10}}>
                <Text style={[Style.text20]}>{item2.question}</Text>
              </View>
              <View>
                <AnswerABCD2 item2={question2} />
              </View>
            </View>
            <View style={Style.line} />
            <Text>2/3</Text>
            <View>
              <View style={{marginBottom: 10, marginTop: 15}}>
                <Text style={[Style.text20]}>{item3.question}</Text>
              </View>
              <View>
                <AnswerABCD3 item3={question3} />
              </View>
            </View>
            <View style={Style.line} />
            <Text style={{marginBottom: 10}}>3/3</Text>
          </View>
        );
        break;
    }
    return promise;
  };
  const sectionAnswer = () => {
    var promise = null;
    var space = ` `;
    switch (question.id_part) {
      case 1:
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
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
            <View style={{flex: 5, padding: 15}}>
              <AnswerABCD item={question} />
            </View>
          </View>
        );
        break;
      case 2:
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
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
            <View style={{flex: 5, padding: 15}}>
              <AnswerABC question={question} />
            </View>
          </View>
        );
        break;
      case 3:
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View style={{flex: 2, paddingLeft: 15, paddingRight: 15}}>
              <Text style={Style.text20}>
                Question {currentPosition}-{currentPosition + 2}/
                {lengthQuestion}:{space}
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
                        style={[
                          {fontStyle: 'italic', fontSize: 20, color: '#091048'},
                        ]}>
                        {question.question}
                      </Text>
                    </ScrollView>
                  </Animatable.View>
                ) : (
                  <Player tracks={question.sound} />
                )}
              </View>
            </View>
            <View style={{flex: 8, alignSelf: 'center'}}>
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 15,
                  paddingTop: 5,
                  marginBottom: 10,
                }}>
                <MultiQuestion
                  item={question}
                  item2={question2}
                  item3={question3}
                />
              </ScrollView>
            </View>
          </View>
        );
        break;
      case 4:
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View style={{flex: 2, paddingLeft: 15, paddingRight: 15}}>
              <Text style={Style.text20}>
                Question {currentPosition}-{currentPosition + 2}/
                {lengthQuestion}:{space}
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
                        width: '100%',
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
                        style={[
                          {fontStyle: 'italic', fontSize: 20, color: '#091048'},
                        ]}>
                        {question.question}
                      </Text>
                    </ScrollView>
                  </Animatable.View>
                ) : (
                  <Player tracks={question.sound} />
                )}
              </View>
            </View>
            <View style={{flex: 8, alignSelf: 'center'}}>
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 15,
                  paddingTop: 5,
                  marginBottom: 10,
                }}>
                <MultiQuestion
                  item={question}
                  item2={question2}
                  item3={question3}
                />
              </ScrollView>
            </View>
          </View>
        );
        break;
      case 5:
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
              <Text style={Style.text20}>
                Question {currentPosition}/{lengthQuestion}:{space}
                {question.title_question}
              </Text>
            </View>

            <View
              style={{
                flex: 3,
                paddingLeft: 15,
                paddingRight: 15,
              }}>
              {help ? (
                <Animatable.View
                  animation="bounceIn"
                  duraton="1500"
                  style={[
                    {
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      width: '100%',
                    },
                  ]}>
                  <View>
                    <TouchableOpacity onPress={() => setHelp(false)}>
                      <FontAwesome5
                        name="times"
                        size={DIMENSION.sizeIcon2}
                        color="#ababab"
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
                      style={[
                        {fontStyle: 'italic', fontSize: 20, color: '#091048'},
                      ]}>
                      {/* {translateQuestion(question.question)}
                      {outPartRead} */}
                      {question.description}
                    </Text>
                  </ScrollView>
                </Animatable.View>
              ) : (
                <Text style={[Style.text20]}>{question.question}</Text>
              )}
            </View>
            <View style={{flex: 7, padding: 15}}>
              <AnswerABCD item={question} />
            </View>
          </View>
        );
        break;
      case 6:
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View style={{flex: 2}}>
              <Text style={Style.text20}>
                Question {currentPosition}/{lengthQuestion}:{space}
                {question.title_question}
              </Text>

              <View style={Style.coverCenter}>
                <Player tracks={question.sound} />
              </View>
            </View>
            <View style={{flex: 8}}>
              <Text>{question.image}</Text>
            </View>
          </View>
        );
        break;
      case 7:
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
              <Text style={Style.text20}>
                Question {currentPosition}-
                {currentPosition + countQuestionPart7() - 1}/{lengthQuestion}:
                {space}
                {question.title_question}
              </Text>
            </View>
            <View style={{flex: 9, alignSelf: 'center'}}>
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 5,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#ebebeb',
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontSize: 20}}>{question.sound}</Text>
                </View>
              </ScrollView>
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 15,
                  paddingTop: 5,
                  marginBottom: 10,
                }}>
                <MultiQuestion
                  item={question}
                  item2={question2}
                  item3={question3}
                  item4={question4}
                  item5={question5}
                />
              </ScrollView>
            </View>
          </View>
        );
        break;
      default:
        break;
    }
    return promise;
  };
  const encourage = (tmp_sequence, bonus, nextElement, position) => {
    if (tmp_sequence % 2 == 0 && dataConfig[1].status === 'true') {
      navigation.navigate('correct', {
        totalLength: nextElement,
        count: count + 1,
        score: score + bonus,
        crown: crown,
        sequence: tmp_sequence,
        currentPosition: currentPosition + position,
      });
    } else {
      navigation.navigate('partDetail', {
        totalLength: nextElement,
        count: count + 1,
        score: score + bonus,
        crown: crown,
        currentPosition: currentPosition + position,
      });
    }
  };
  const updateScore = (bonus) => {
    const cur_sc = score + bonus;
    navigation.navigate('finishPart', {
      crown: crown,
      score: cur_sc,
    });
    const getDefinition = IN4_APP.UpdateScore;
    axios
      .put(getDefinition, {
        crown: crown + rank.crown,
        current_score: cur_sc + rank.current_score,
        total_score: cur_sc + rank.total_score,
        id_user: idUser,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const check = () => {
    setHideDescription(false);
    if (data.length == 0) {
      navigation.navigate('part');
    } else {
      setHelp(false);
      switch (question.id_part) {
        case 3:
          if (
            answer === question.answer &&
            answer2 === question2.answer &&
            answer3 === question3.answer
          ) {
            const tmp_sequence = sequence + 1;
            setSequence(tmp_sequence);
            data.some((item) => {
              if (item.sound === question.sound) {
                if (data.length > 3) {
                  data.splice(data.indexOf(item), 3);
                  const nextElement =
                    Math.round(
                      Math.floor(Math.random() * (data.length - 1)) / 3,
                    ) * 3;
                  encourage(tmp_sequence, 30, nextElement, 3);
                } else {
                  if (data.length == 3) {
                    updateScore(30);
                  }
                }
              }
            });
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
          } else {
            setSequence(0);
            navigation.navigate('partDetail', {
              totalLength:
                Math.round(Math.floor(Math.random() * (data.length - 1)) / 3) *
                3,
              score: score - 9,
              crown: crown > 0 ? crown - 1 : crown,
            });
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
          }
          break;
        case 4:
          if (
            answer === question.answer &&
            answer2 === question2.answer &&
            answer3 === question3.answer
          ) {
            const tmp_sequence = sequence + 1;
            setSequence(tmp_sequence);
            data.some((item) => {
              if (item.sound === question.sound) {
                if (data.length > 3) {
                  data.splice(data.indexOf(item), 3);
                  const nextElement =
                    Math.round(
                      Math.floor(Math.random() * (data.length - 1)) / 3,
                    ) * 3;
                  encourage(tmp_sequence, 30, nextElement, 3);
                } else {
                  if (data.length == 3) {
                    updateScore(30);
                  }
                }
              }
            });
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
          } else {
            setSequence(0);
            navigation.navigate('partDetail', {
              totalLength:
                Math.round(Math.floor(Math.random() * (data.length - 1)) / 3) *
                3,
              score: score - 9,
              crown: crown > 0 ? crown - 1 : crown,
            });
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
          }
          break;
        case 7:
          console.log(data.length);
          switch (countQuestionPart7()) {
            case 5:
              if (
                answer === question.answer &&
                answer2 === question2.answer &&
                answer3 === question3.answer &&
                answer4 === question4.answer &&
                answer5 === question5.answer
              ) {
                const tmp_sequence = sequence + 1;
                setSequence(tmp_sequence);
                data.some((item) => {
                  if (item.sound === question.sound) {
                    if (data.length > 5) {
                      data.splice(data.indexOf(item), 5);
                      encourage(tmp_sequence, 50, 0, 5);
                    } else {
                      if (data.length == 5) {
                        updateScore(50);
                      }
                    }
                  }
                });
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
                setAnswer5('');
              } else {
                data.push(question);
                data.push(question2);
                data.push(question3);
                data.push(question4);
                data.push(question5);
                data.splice(0, 5);
                setSequence(0);
                navigation.navigate('partDetail', {
                  totalLength: 0,
                  score: score - 15,
                  crown: crown > 0 ? crown - 1 : crown,
                });
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
                setAnswer5('');
              }
              break;
            case 4:
              if (
                answer === question.answer &&
                answer2 === question2.answer &&
                answer3 === question3.answer &&
                answer4 === question4.answer
              ) {
                const tmp_sequence = sequence + 1;
                setSequence(tmp_sequence);
                data.some((item) => {
                  if (item.sound === question.sound) {
                    if (data.length > 4) {
                      data.splice(data.indexOf(item), 4);
                      encourage(tmp_sequence, 40, 0, 4);
                    } else {
                      if (data.length == 4) {
                        updateScore(40);
                      }
                    }
                  }
                });
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
              } else {
                data.push(question);
                data.push(question2);
                data.push(question3);
                data.push(question4);
                data.splice(0, 4);
                setSequence(0);
                navigation.navigate('partDetail', {
                  totalLength: 0,
                  score: score - 12,
                  crown: crown > 0 ? crown - 1 : crown,
                });
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
              }
              break;
            case 3:
              if (
                answer === question.answer &&
                answer2 === question2.answer &&
                answer3 === question3.answer
              ) {
                const tmp_sequence = sequence + 1;
                setSequence(tmp_sequence);
                data.some((item) => {
                  if (item.sound === question.sound) {
                    if (data.length > 3) {
                      data.splice(data.indexOf(item), 3);
                      encourage(tmp_sequence, 30, 0, 3);
                    } else {
                      if (data.length == 3) {
                        updateScore(30);
                      }
                    }
                  }
                });
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
              } else {
                data.push(question);
                data.push(question2);
                data.push(question3);
                data.splice(0, 3);
                setSequence(0);
                navigation.navigate('partDetail', {
                  totalLength: 0,
                  score: score - 9,
                  crown: crown > 0 ? crown - 1 : crown,
                });
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
              }
              break;
            case 2:
              if (answer === question.answer && answer2 === question2.answer) {
                const tmp_sequence = sequence + 1;
                setSequence(tmp_sequence);
                data.some((item) => {
                  if (item.sound === question.sound) {
                    if (data.length > 2) {
                      data.splice(data.indexOf(item), 2);
                      encourage(tmp_sequence, 20, 0, 2);
                    } else {
                      if (data.length == 2) {
                        updateScore(20);
                      }
                    }
                  }
                });
                setAnswer('');
                setAnswer2('');
              } else {
                data.push(question);
                data.push(question2);
                data.splice(0, 2);
                setSequence(0);
                navigation.navigate('partDetail', {
                  totalLength: 0,
                  score: score - 6,
                  crown: crown > 0 ? crown - 1 : crown,
                });
                setAnswer('');
                setAnswer2('');
              }
              break;
            default:
              break;
          }
          break;
        default:
          if (answer === question.answer) {
            const tmp_sequence = sequence + 1;
            setSequence(tmp_sequence);
            data.some((item) => {
              if (item.id === question.id) {
                if (data.length > 1) {
                  data.splice(data.indexOf(item), 1);
                  const nextElement = Math.floor(Math.random() * data.length);
                  encourage(tmp_sequence, 10, nextElement, 1);
                } else {
                  if (data.length == 1) {
                    updateScore(10);
                  }
                }
              }
            });
            setAnswer('');
          } else {
            setSequence(0);
            navigation.navigate('partDetail', {
              totalLength: Math.floor(Math.random() * data.length),
              score: score - 3,
              crown: crown > 0 ? crown - 1 : crown,
            });
            setAnswer('');
          }
          break;
      }
    }
  };
  const validCheckStyle = () => {
    let promise = [];
    switch (question.id_part) {
      case 3:
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? ['#5579f1', '#5579f1']
            : ['#c1c8fe', '#c1c8fe'];
        break;
      case 4:
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? ['#5579f1', '#5579f1']
            : ['#c1c8fe', '#c1c8fe'];
        break;
      case 7:
        switch (countQuestionPart7()) {
          case 5:
            promise =
              answer !== '' &&
              answer2 !== '' &&
              answer3 !== '' &&
              answer4 !== '' &&
              answer5 !== ''
                ? ['#5579f1', '#5579f1']
                : ['#c1c8fe', '#c1c8fe'];
            break;
          case 4:
            promise =
              answer !== '' &&
              answer2 !== '' &&
              answer3 !== '' &&
              answer4 !== ''
                ? ['#5579f1', '#5579f1']
                : ['#c1c8fe', '#c1c8fe'];
            break;
          case 3:
            promise =
              answer !== '' && answer2 !== '' && answer3 !== ''
                ? ['#5579f1', '#5579f1']
                : ['#c1c8fe', '#c1c8fe'];
            break;
          case 2:
            promise =
              answer !== '' && answer2 !== ''
                ? ['#5579f1', '#5579f1']
                : ['#c1c8fe', '#c1c8fe'];
            break;

          default:
            break;
        }

        break;
      default:
        promise =
          answer !== '' ? ['#5579f1', '#5579f1'] : ['#c1c8fe', '#c1c8fe'];
        break;
    }
    return promise;
  };
  const validCheck = () => {
    switch (question.id_part) {
      case 3:
        if (answer !== '' && answer2 !== '' && answer3 !== '') check();
        break;
      case 4:
        if (answer !== '' && answer2 !== '' && answer3 !== '') check();
        break;
      case 7:
        switch (countQuestionPart7()) {
          case 5:
            if (
              answer !== '' &&
              answer2 !== '' &&
              answer3 !== '' &&
              answer4 !== '' &&
              answer5 !== ''
            )
              check();
            break;
          case 4:
            if (
              answer !== '' &&
              answer2 !== '' &&
              answer3 !== '' &&
              answer4 !== ''
            )
              check();
            break;
          case 3:
            if (answer !== '' && answer2 !== '' && answer3 !== '') check();
            break;
          case 2:
            if (answer !== '' && answer2 !== '') check();
            break;
          default:
            break;
        }
        break;
      default:
        if (answer !== '') check();
        break;
    }
  };

  return data.length > 0 ? (
    loading ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fcfefc',
        }}>
        <Animatable.Image
          duration={1000}
          source={{
            uri:
              'https://i.pinimg.com/originals/45/bd/54/45bd545f9c6cb36a0875a6ea39fb4f61.gif',
          }}
          style={{width: '50%', height: '50%'}}
          resizeMode="contain"
        />
      </View>
    ) : (
      <View style={{flex: 1}}>
        <View
          style={{
            position: 'absolute',
            top: 8,
            width: '100%',
            height: 15,
          }}>
          <Text
            style={{
              paddingLeft: 40,
              color: '#5579f1',
              fontStyle: 'italic',
              letterSpacing: 1,
              fontSize: 14,
            }}>
            {sequence > 1 ? `${sequence}LẦN LIÊN TỤC...` : ''}
          </Text>
        </View>
        <View
          style={[
            QuestionStyle.headerQuestion,
            {
              position: 'absolute',
              top: 10,
              width: '100%',
              height: 50,
              paddingLeft: 10,
              paddingRight: 10,
            },
          ]}>
          <View style={[QuestionStyle.iconHeader, Style.coverCenter]}>
            <TouchableOpacity onPress={() => navigation.navigate('part')}>
              <FontAwesome5
                name="times"
                size={DIMENSION.sizeIcon2}
                color="#ababab"
              />
            </TouchableOpacity>
          </View>

          <View style={QuestionStyle.progressHeader}>
            <Progress.Bar
              animationType="timing"
              progress={c * 0.2}
              width={280}
              color="#5579f1"
            />
          </View>
          <View
            style={[
              QuestionStyle.iconHeader,
              {flexDirection: 'row', justifyContent: 'center'},
            ]}>
            <Tooltip
              contentStyle={{width: 200, height: 120}}
              isVisible={visible}
              content={
                tmp > 0 ? (
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <Text
                      style={[
                        {
                          marginLeft: 3,
                          fontSize: 20,
                          color: '#464646',
                        },
                      ]}>
                      Mất 1 tim để nhân trợ giúp?
                    </Text>
                    <Button
                      containerStyle={{
                        width: '75%',
                        alignSelf: 'center',
                        borderRadius: 25,
                      }}
                      buttonStyle={{backgroundColor: '#5579f1'}}
                      titleStyle={{
                        letterSpacing: 3,
                      }}
                      title="Ok"
                      onPress={() => {
                        updateHint(tmp);
                      }}
                    />
                  </View>
                ) : (
                  <Text> Bạn đã hết trợ giúp!</Text>
                )
              }
              placement="left"
              onClose={() => setVisible(false)}>
              <FontAwesome5
                onPress={() => setVisible(true)}
                name="heartbeat"
                size={DIMENSION.sizeIcon}
                color="#f44336"
              />
            </Tooltip>

            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignContent: 'center',
              }}>
              <Text style={[Style.text20, {marginLeft: 3, color: '#f44336'}]}>
                {tmp}
              </Text>
            </View>
          </View>
        </View>

        {sectionAnswer()}

        {hideDescription ? (
          <Animatable.View
            animation="bounceInUp"
            duraton="1500"
            style={[
              Style.description,
              {flexDirection: 'row-reverse', justifyContent: 'space-between'},
            ]}>
            <View>
              <TouchableOpacity onPress={() => setHideDescription(false)}>
                <FontAwesome5
                  name="times"
                  size={DIMENSION.sizeIcon2}
                  color="#091048"
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingLeft: 15}}>
              <Text
                style={[{fontStyle: 'italic', fontSize: 20, color: '#091048'}]}>
                {outputText}
              </Text>
            </View>
          </Animatable.View>
        ) : (
          <></>
        )}
        <View
          style={{
            height: 50,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 15,
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          <TouchableOpacity
            style={[Style.boxShadow, {height: 50, borderRadius: 30}]}
            onPress={() => validCheck()}
            activeOpacity={0.5}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={validCheckStyle()}
              style={[Style.coverCenter, QuestionStyle.btnSubmit]}>
              <Text style={[Style.text18, {letterSpacing: 3, color: '#fff'}]}>
                KIỂM TRA
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    )
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffdcd8c4',
      }}>
      <Animatable.Text
        style={{
          fontSize: 30,
          fontStyle: 'italic',
          marginBottom: -100,
          letterSpacing: 3,
        }}
        animation="pulse"
        iterationCount="infinite"
        direction="alternate">
        Updating...
      </Animatable.Text>

      <Animatable.Image
        // animation="bounceIn"
        duraton="1500"
        source={{
          uri:
            'https://pic.funnygifsbox.com/uploads/2019/02/funnygifsbox.com-2019-02-13-04-28-19-22.gif',
        }}
        style={{width: '50%', height: '50%'}}
        resizeMode="contain"
      />
      <Animatable.View
        style={{fontSize: 30, fontStyle: 'italic', marginBottom: -100}}
        animation="jello"
        iterationCount="infinite"
        direction="alternate">
        <TouchableOpacity
          style={[Style.boxShadow, {height: 50, borderRadius: 30}]}
          onPress={() => navigation.navigate('testb1')}
          activeOpacity={0.5}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#ffc600', '#ffc600']}
            style={[Style.coverCenter, QuestionStyle.btnSubmit]}>
            <Text
              style={[
                Style.text20,
                {
                  letterSpacing: 3,
                  color: '#fff',
                  marginLeft: 15,
                  marginRight: 15,
                },
              ]}>
              Quay lại bài học nào...
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};
export default EvaluationB1TestDetail;
