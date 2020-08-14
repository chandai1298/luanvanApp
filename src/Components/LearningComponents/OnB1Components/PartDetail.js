import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {IN4_APP} from '../../../ConnectServer/In4App';
import {QuestionStyle, Style, DIMENSION} from '../../../CommonStyles';
import HeaderQuestion from '../../../Components/LearningComponents/HeaderQuestion';
import Player from '../../SoundComponents/Player';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import axios from 'axios';

const PartDetail = ({route, navigation}) => {
  const [loading, setLoading] = React.useState(true);
  const [answer, setAnswer] = React.useState(null);
  const [answer2, setAnswer2] = React.useState(null);
  const [answer3, setAnswer3] = React.useState(null);
  const [answer4, setAnswer4] = React.useState(null);
  const [answer5, setAnswer5] = React.useState(null);
  const {
    count,
    crown,
    score,
    totalLength,
    id_category,
    id_lession,
    id_part,
    idUser,
    rank,
  } = route.params;
  const c = parseInt(JSON.stringify(count));
  const totalLength2 = parseInt(JSON.stringify(totalLength));
  const idCategory = parseInt(JSON.stringify(id_category));
  const idLession = parseInt(JSON.stringify(id_lession));
  const idPart = parseInt(JSON.stringify(id_part));

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
    },
  ]);

  const getData = () => {
    const apiURL = IN4_APP.getQuestionPart;
    axios
      .post(apiURL, {
        id: idCategory,
        id_part: idPart,
        id_lession: idLession,
      })
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getData();
  }, []);
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
  };
  const question = data[totalLength2];
  const question2 =
    data[totalLength2 + 1] !== undefined ? data[totalLength2 + 1] : empty;
  const question3 =
    data[totalLength2 + 2] !== undefined ? data[totalLength2 + 2] : empty;
  const question4 =
    data[totalLength2 + 3] !== undefined ? data[totalLength2 + 3] : empty;
  const question5 =
    data[totalLength2 + 4] !== undefined ? data[totalLength2 + 4] : empty;

  const AnswerABCD = ({item}) => {
    const arr = [
      {dapan: item.dapanA, id: 1},
      {dapan: item.dapanB, id: 2},
      {dapan: item.dapanC, id: 3},
      {dapan: item.dapanD, id: 4},
    ];
    return (
      <View>
        {arr.map((e) => (
          <TouchableOpacity
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer(e.dapan)}>
            <Text style={[Style.text16, answer === e.dapan && Style.txtActive]}>
              {e.dapan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
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
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer2 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer2(e.dapan)}>
            <Text style={[Style.text16, answer === e.dapan && Style.txtActive]}>
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
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer3 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer3(e.dapan)}>
            <Text style={[Style.text16, answer === e.dapan && Style.txtActive]}>
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
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer4 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer4(e.dapan)}>
            <Text style={[Style.text16, answer === e.dapan && Style.txtActive]}>
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
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer5 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer5(e.dapan)}>
            <Text style={[Style.text16, answer === e.dapan && Style.txtActive]}>
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
    return (
      <View>
        {arr.map((e) => (
          <TouchableOpacity
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer(e.dapan)}>
            <Text style={[Style.text16, answer === e.dapan && Style.txtActive]}>
              {e.dapan}
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
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item2.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item3.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item4.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD4 item4={question4} />
                  </View>
                </View>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item5.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD5 item5={question5} />
                  </View>
                </View>
              </View>
            );
            break;
          case 4:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item2.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item3.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item4.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD4 item4={question4} />
                  </View>
                </View>
              </View>
            );
            break;
          case 3:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item2.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item3.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
              </View>
            );
            break;
          case 2:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text18}>{item2.question}</Text>
                  </View>
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
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
            <View>
              <View style={{marginBottom: 10}}>
                <Text style={Style.text18}>{item.question}</Text>
              </View>
              <View>
                <AnswerABCD item={question} />
              </View>
            </View>
            <View style={{marginBottom: 15, marginTop: 15}}>
              <View style={{marginBottom: 10}}>
                <Text style={Style.text18}>{item2.question}</Text>
              </View>
              <View>
                <AnswerABCD2 item2={question2} />
              </View>
            </View>
            <View>
              <View style={{marginBottom: 10}}>
                <Text style={Style.text18}>{item3.question}</Text>
              </View>
              <View>
                <AnswerABCD3 item3={question3} />
              </View>
            </View>
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
          <View style={{flex: 10}}>
            <View style={{flex: 2}}>
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#754ea6']}
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
              <Image
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
          <View style={{flex: 10}}>
            <View style={{flex: 2}}>
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#754ea6']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={Style.text20}>
                  Part 2: Chọn một câu hồi đáp phù hợp nhất cho câu hỏi.
                </Text>
              </LinearTextGradient>
            </View>
            <View style={{flex: 3}}>
              <Player tracks={question.sound} />
            </View>
            <View style={{flex: 5, padding: 15}}>
              <AnswerABC question={question} />
            </View>
          </View>
        );
        break;
      case 3:
        promise = (
          <View style={{flex: 10}}>
            <View style={{flex: 2}}>
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#754ea6']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={Style.text20}>
                  Part 3: Bạn đọc câu hỏi và chọn câu trả lời phù hợp nhất cho
                  câu hỏi.
                </Text>
              </LinearTextGradient>

              <View style={Style.coverCenter}>
                <Player tracks={question.sound} />
              </View>
            </View>
            <View style={{flex: 8, alignSelf: 'center'}}>
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 30,
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
          <View style={{flex: 10}}>
            <View style={{flex: 2}}>
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#754ea6']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={Style.text20}>
                  Part 4: Bạn đọc câu hỏi và chọn câu trả lời phù hợp nhất cho
                  câu hỏi.
                </Text>
              </LinearTextGradient>

              <View style={Style.coverCenter}>
                <Player tracks={question.sound} />
              </View>
            </View>
            <View style={{flex: 8, alignSelf: 'center'}}>
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 30,
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
          <View style={{flex: 10}}>
            <View style={{flex: 2}}>
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#754ea6']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={Style.text20}>
                  Part 5: Chọn một đáp án phù hợp nhất để điền vào chỗ trống.
                </Text>
              </LinearTextGradient>
            </View>
            <View style={{flex: 2}}>
              <Text style={Style.text18}>{question.question}</Text>
            </View>
            <View style={{flex: 7, padding: 15}}>
              <AnswerABCD item={question} />
            </View>
          </View>
        );
        break;
      case 6:
        promise = (
          <View style={{flex: 10}}>
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
          <View style={{flex: 10}}>
            <View style={{flex: 1}}>
              <LinearTextGradient
                locations={[0, 1]}
                colors={['#091048', '#754ea6']}
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
                  padding: 30,
                  paddingTop: 5,
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
                  <Text style={Style.text16}>{question.sound}</Text>
                </View>

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
    if (data.length == 0) {
      navigation.navigate('part');
    } else {
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
            data.some((item) => {
              if (item.id === question.id) {
                if (data.length > 1) {
                  data.splice(data.indexOf(item), 1);
                  console.log('da xoa ' + item);
                  navigation.navigate('partDetail', {
                    totalLength: Math.floor(Math.random() * data.length),
                    count: count + 1,
                    score: score + 10,
                    crown: crown,
                  });
                } else {
                  navigation.navigate('part');
                  if (data.length == 1) {
                    const getDefinition = IN4_APP.UpdateScore;
                    axios
                      .put(getDefinition, {
                        crown: crown + rank.crown,
                        current_score: score + 10 + rank.current_score,
                        total_score: score + 10 + rank.total_score,
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
            navigation.navigate('partDetail', {
              totalLength: Math.floor(Math.random() * data.length),
              score: score > 0 ? score - 3 : score,
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
      <ActivityIndicator
        style={Style.coverCenter}
        color="#9a9a9a"
        size="large"
      />
    ) : (
      <View style={{height: '100%', width: '100%', padding: 15}}>
        <HeaderQuestion navigation={navigation} count={c * 0.2} />
        {sectionAnswer()}
        <TouchableOpacity
          style={[Style.boxShadow, {height: 50, borderRadius: 30}]}
          onPress={() => check()}
          activeOpacity={0.5}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#687ae4', '#754ea6']}
            style={[Style.coverCenter, QuestionStyle.btnSubmit]}>
            <Text style={[Style.text20, Style.textColore6e6f6]}>Kiểm tra</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  ) : (
    <View style={Style.coverCenter}>
      <Text>Cau hoi dang cap nhat</Text>
    </View>
  );
};
export default PartDetail;
