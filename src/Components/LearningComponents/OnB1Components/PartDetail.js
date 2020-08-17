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
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import Player from '../../SoundComponents/Player';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from '@react-navigation/native';
import Tts from 'react-native-tts';

const PartDetail = ({route, navigation}) => {
  const [loading, setLoading] = React.useState(true);
  const [hideDescription, setHideDescription] = React.useState(false);
  const [sequence, setSequence] = React.useState(0);
  const [help, setHelp] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  const [answer2, setAnswer2] = React.useState(null);
  const [answer3, setAnswer3] = React.useState(null);
  const [answer4, setAnswer4] = React.useState(null);
  const [answer5, setAnswer5] = React.useState(null);
  const [outputText, onChangeOutputText] = React.useState('');
  const [outPartRead, setOutPartRead] = React.useState('');

  const {
    count,
    crown,
    score,
    totalLength,
    id_category,
    id_lession,
    id_part,
    idUser,
  } = route.params;
  const c = parseInt(JSON.stringify(count));
  const totalLength2 = parseInt(JSON.stringify(totalLength));
  const idCategory = parseInt(JSON.stringify(id_category));
  const idLession = parseInt(JSON.stringify(id_lession));
  const idPart = parseInt(JSON.stringify(id_part));

  //doc van ban
  const speechText = (text) => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('en-us');
      Tts.speak(text);
    });
  };

  //header
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
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
  const getData = () => {
    const getQuestionPart = IN4_APP.getQuestionPart;
    const RankOfUser = IN4_APP.RankOfUser;
    axios
      .all([
        axios.post(RankOfUser, {
          id: idUser,
        }),
        axios.post(getQuestionPart, {
          id: idCategory,
          id_part: idPart,
          id_lession: idLession,
        }),
      ])
      .then(
        axios.spread((...allData) => {
          setRank(allData[0].data);
          setData(allData[1].data);
          setLoading(false);
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };

  //record thu nhat duoc tim thay
  const rank = ranks[0];
  //so hint hien tai
  const tmp = '' !== current_hint ? current_hint : rank.hint;

  useEffect(() => {
    TranslatorConfiguration.setConfig(
      ProviderTypes.Google,
      'AIzaSyBTXr7MqVz0OXJadyLXaKPkLIf2ik3hukk',
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
  const question =
    data[totalLength2] !== undefined ? data[totalLength2] : empty;
  const question2 =
    data[totalLength2 + 1] !== undefined ? data[totalLength2 + 1] : empty;
  const question3 =
    data[totalLength2 + 2] !== undefined ? data[totalLength2 + 2] : empty;
  const question4 =
    data[totalLength2 + 3] !== undefined ? data[totalLength2 + 3] : empty;
  const question5 =
    data[totalLength2 + 4] !== undefined ? data[totalLength2 + 4] : empty;

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
                        {fontSize: 20},
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
                        {fontSize: 20},
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
                    {fontSize: 20},
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
              style={[{fontSize: 20}, answer2 === e.dapan && Style.txtActive]}>
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
              style={[{fontSize: 20}, answer3 === e.dapan && Style.txtActive]}>
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
              style={[{fontSize: 20}, answer4 === e.dapan && Style.txtActive]}>
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
              style={[{fontSize: 20}, answer5 === e.dapan && Style.txtActive]}>
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
                    {fontSize: 20},
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
                    {fontSize: 20},
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
                <Text style={[Style.text20, {color: '#091048'}]}>
                  {item.question}
                </Text>
              </View>
              <View>
                <AnswerABCD item={question} />
              </View>
            </View>
            <View style={Style.line}></View>
            <Text>1/3</Text>
            <View style={{marginBottom: 15, marginTop: 15}}>
              <View style={{marginBottom: 10}}>
                <Text style={[Style.text20, {color: '#091048'}]}>
                  {item2.question}
                </Text>
              </View>
              <View>
                <AnswerABCD2 item2={question2} />
              </View>
            </View>
            <View style={Style.line} />
            <Text>2/3</Text>
            <View>
              <View style={{marginBottom: 10, marginTop: 15}}>
                <Text style={[Style.text20, {color: '#091048'}]}>
                  {item3.question}
                </Text>
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
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#091048']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={Style.text20}>
                  Part 1: Chọn một đáp án mô tả chính xác nhất nội dung có trong
                  hình.
                </Text>
              </LinearTextGradient>

              <View style={Style.coverCenter}>
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
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#091048']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0}}>
                <Text style={Style.text25}>
                  Part 2: Chọn một câu hồi đáp phù hợp nhất cho câu hỏi.
                </Text>
              </LinearTextGradient>
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
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#091048']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={Style.text20}>
                  Part 3: Bạn đọc câu hỏi và chọn câu trả lời phù hợp nhất cho
                  câu hỏi.
                </Text>
              </LinearTextGradient>

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
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#091048']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={Style.text20}>
                  Part 4: Bạn đọc câu hỏi và chọn câu trả lời phù hợp nhất cho
                  câu hỏi.
                </Text>
              </LinearTextGradient>

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
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#091048']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={Style.text20}>
                  Part 5: Chọn một đáp án phù hợp nhất để điền vào chỗ trống.
                </Text>
              </LinearTextGradient>
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
                      {/* {translateQuestion(question.question)}
                      {outPartRead} */}
                      {question.description}
                    </Text>
                  </ScrollView>
                </Animatable.View>
              ) : (
                <Text style={[Style.text20, {color: '#091048'}]}>
                  {question.question}
                </Text>
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
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#754ea6']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={Style.text20}>
                  Part 6: Chọn một đáp án phù hợp nhất để điền vào chỗ trống.
                </Text>
              </LinearTextGradient>

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
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#091048']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={Style.text20}>
                  Part 7: Bạn đọc câu hỏi và chọn câu trả lời phù hợp nhất cho
                  câu hỏi.
                </Text>
              </LinearTextGradient>
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
            data.some((item) => {
              if (item.sound === question.sound) {
                if (data.length > 3) {
                  data.splice(data.indexOf(item), 3);
                  navigation.navigate('partDetail', {
                    totalLength:
                      Math.round(
                        Math.floor(Math.random() * (data.length - 1)) / 3,
                      ) * 3,
                    count: count + 1,
                    score: score + 10,
                    crown: crown,
                  });
                } else {
                  navigation.navigate('part');
                  if (data.length == 3) {
                    const getDefinition = IN4_APP.UpdateScore;
                    axios
                      .put(getDefinition, {
                        crown: crown,
                        current_score: score,
                        total_score: score,
                        id_user: idUser,
                      })
                      .then(function (response) {
                        console.log(response.data);
                      })
                      .catch(function (error) {
                        console.log(error.message);
                      });
                  }
                }
              }
            });
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
          } else {
            navigation.navigate('partDetail', {
              totalLength:
                Math.round(Math.floor(Math.random() * (data.length - 1)) / 3) *
                3,
              score: score > 0 ? score - 3 : score,
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
            data.some((item) => {
              if (item.sound === question.sound) {
                if (data.length > 3) {
                  data.splice(data.indexOf(item), 3);
                  navigation.navigate('partDetail', {
                    totalLength:
                      Math.round(
                        Math.floor(Math.random() * (data.length - 1)) / 3,
                      ) * 3,
                    count: count + 1,
                    score: score + 10,
                    crown: crown,
                  });
                } else {
                  navigation.navigate('part');
                  if (data.length == 3) {
                    const getDefinition = IN4_APP.UpdateScore;
                    axios
                      .put(getDefinition, {
                        crown: crown,
                        current_score: score,
                        total_score: score,
                        id_user: idUser,
                      })
                      .then(function (response) {
                        console.log(response.data);
                      })
                      .catch(function (error) {
                        console.log(error.message);
                      });
                  }
                }
              }
            });
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
          } else {
            navigation.navigate('partDetail', {
              totalLength:
                Math.round(Math.floor(Math.random() * (data.length - 1)) / 3) *
                3,
              score: score > 0 ? score - 3 : score,
              crown: crown > 0 ? crown - 1 : crown,
            });
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
          }
          break;
        case 7:
          switch (countQuestionPart7()) {
            case 5:
              if (
                answer === question.answer &&
                answer2 === question2.answer &&
                answer3 === question3.answer &&
                answer4 === question4.answer &&
                answer5 === question5.answer
              ) {
                data.some((item) => {
                  if (item.sound === question.sound) {
                    if (data.length > 5) {
                      data.splice(data.indexOf(item), 5);
                      console.log(score);
                      navigation.navigate('partDetail', {
                        totalLength: 0,
                        count: count + 1,
                        score: score + 50,
                        crown: crown,
                      });
                    } else {
                      navigation.navigate('part');

                      if (data.length == 5) {
                        const getDefinition = IN4_APP.UpdateScore;
                        axios
                          .put(getDefinition, {
                            crown: crown + rank.crown,
                            current_score: score + 50 + rank.current_score,
                            total_score: score + 50 + rank.total_score,
                            id_user: idUser,
                          })
                          .then(function (response) {
                            console.log(response.data);
                          })
                          .catch(function (error) {
                            console.log(error.message);
                          });
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
                console.log('sai ' + data.length);
                navigation.navigate('partDetail', {
                  totalLength: 0,
                  score: score > 0 ? score - 15 : score,
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
                data.some((item) => {
                  if (item.sound === question.sound) {
                    if (data.length > 4) {
                      data.splice(data.indexOf(item), 4);
                      console.log('dung ' + data.length);
                      navigation.navigate('partDetail', {
                        totalLength: 0,
                        count: count + 1,
                        score: score + 40,
                        crown: crown,
                      });
                    } else {
                      navigation.navigate('part');

                      if (data.length == 4) {
                        const getDefinition = IN4_APP.UpdateScore;
                        axios
                          .put(getDefinition, {
                            crown: crown + rank.crown,
                            current_score: score + 40 + rank.current_score,
                            total_score: score + 40 + rank.total_score,
                            id_user: idUser,
                          })
                          .then(function (response) {
                            console.log(response.data);
                          })
                          .catch(function (error) {
                            console.log(error.message);
                          });
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
                console.log('sai ' + data.length);
                navigation.navigate('partDetail', {
                  totalLength: 0,
                  score: score > 0 ? score - 12 : score,
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
                data.some((item) => {
                  if (item.sound === question.sound) {
                    if (data.length > 3) {
                      data.splice(data.indexOf(item), 3);
                      console.log(data.length);
                      console.log('dung ' + data.length);
                      navigation.navigate('partDetail', {
                        totalLength: 0,
                        count: count + 1,
                        score: score + 30,
                        crown: crown,
                      });
                    } else {
                      navigation.navigate('part');

                      if (data.length == 3) {
                        const getDefinition = IN4_APP.UpdateScore;
                        axios
                          .put(getDefinition, {
                            crown: crown + rank.crown,
                            current_score: score + 30 + rank.current_score,
                            total_score: score + 30 + rank.total_score,
                            id_user: idUser,
                          })
                          .then(function (response) {
                            console.log(response.data);
                          })
                          .catch(function (error) {
                            console.log(error.message);
                          });
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
                console.log('sai ' + data.length);
                navigation.navigate('partDetail', {
                  totalLength: 0,
                  score: score > 0 ? score - 9 : score,
                  crown: crown > 0 ? crown - 1 : crown,
                });
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
              }
              break;
            case 2:
              if (answer === question.answer && answer2 === question2.answer) {
                data.some((item) => {
                  if (item.sound === question.sound) {
                    if (data.length > 2) {
                      data.splice(data.indexOf(item), 2);
                      console.log('dung ' + data.length);
                      navigation.navigate('partDetail', {
                        totalLength: 0,
                        count: count + 1,
                        score: score + 20,
                        crown: crown,
                      });
                    } else {
                      navigation.navigate('part');
                      if (data.length == 2) {
                        const getDefinition = IN4_APP.UpdateScore;
                        axios
                          .put(getDefinition, {
                            crown: crown + rank.crown,
                            current_score: score + 20 + rank.current_score,
                            total_score: score + 20 + rank.total_score,
                            id_user: idUser,
                          })
                          .then(function (response) {
                            console.log(response.data);
                          })
                          .catch(function (error) {
                            console.log(error.message);
                          });
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
                console.log('sai ' + data.length);
                navigation.navigate('partDetail', {
                  totalLength: 0,
                  score: score > 0 ? score - 6 : score,
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
                  console.log('da xoa ' + item);
                  if (tmp_sequence % 2 == 0) {
                    navigation.navigate('correct', {
                      totalLength: Math.floor(Math.random() * data.length),
                      count: count + 1,
                      score: score + 10,
                      crown: crown,
                      sequence: tmp_sequence,
                    });
                  } else {
                    navigation.navigate('partDetail', {
                      totalLength: Math.floor(Math.random() * data.length),
                      count: count + 1,
                      score: score + 10,
                      crown: crown,
                    });
                  }
                } else {
                  if (data.length == 1) {
                    const cur_sc = score + 10;
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

  return data.length > 0 ? (
    loading ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffdcd8c4',
        }}>
        <Animatable.Image
          // animation="bounceIn"
          duraton="1500"
          source={{
            uri:
              'https://pic.funnygifsbox.com/uploads/2019/02/funnygifsbox.com-2019-02-13-04-28-33-85.gif',
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
            top: 10,
            width: '100%',
            height: 15,
          }}>
          <Text
            style={{
              paddingLeft: 40,
              color: '#754ea6',
              fontStyle: 'italic',
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
          {tmp > 0 ? (
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Thông báo!</Dialog.Title>
                <Dialog.Content>
                  <Paragraph style={{fontSize: 18}}>
                    Mất 1 tim để nhân trợ giúp?
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => updateHint(tmp)}>Ok</Button>
                  <Button onPress={() => hideDialog()}>Hủy</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          ) : (
            <Portal>
              <Dialog visible={visible} onDismiss={() => hideDialog()}>
                <Dialog.Title>Thông báo!</Dialog.Title>
                <Dialog.Content>
                  <Paragraph style={{fontSize: 18}}>
                    Bạn đã hết trợ giúp!
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => hideDialog()}>Ok</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          )}
          <View style={QuestionStyle.progressHeader}>
            <Progress.Bar
              animationType="timing"
              progress={c * 0.2}
              width={300}
              color="#754ea6"
            />
          </View>
          <View
            style={[
              QuestionStyle.iconHeader,
              {flexDirection: 'row', justifyContent: 'center'},
            ]}>
            <FontAwesome5
              name="heartbeat"
              size={DIMENSION.sizeIcon}
              color="#f44336"
              onPress={() => showDialog()}
            />

            <Text style={[Style.text20, {marginLeft: 3, color: '#f44336'}]}>
              {tmp}
            </Text>
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
            onPress={() => check()}
            activeOpacity={0.5}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0}}
              colors={['#673ab7', '#673ab7']}
              style={[Style.coverCenter, QuestionStyle.btnSubmit]}>
              <Text style={[Style.text20, {letterSpacing: 3, color: '#fff'}]}>
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
          onPress={() => navigation.navigate('part')}
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
export default PartDetail;
