import React, {useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Style, DIMENSION} from '../../CommonStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  PowerTranslator,
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory,
} from 'react-native-power-translator';
import Tts from 'react-native-tts';
import axios from 'axios';
import {IN4_APP} from '../../ConnectServer/In4App';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBar, ListItem} from 'react-native-elements';

const Tab = createMaterialTopTabNavigator();

const Dictionary = ({route, navigation}) => {
  const {word} = route.params;
  const [wordFromHome, setWordFromHome] = React.useState(word);
  const [loading, setLoading] = React.useState(true);
  const [input, setInput] = React.useState('');
  const [data, setData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const [definition, setDefinition] = React.useState([
    {
      Word: '',
      Pronounced: '',
      Type1: '',
      Content1: '',
      Type2: '',
      Content2: '',
      Type3: '',
      Content3: '',
      Type4: '',
      Content4: '',
    },
  ]);
  const [synonym, setSynonym] = React.useState([{words: ''}]);

  const getAllWords = () => {
    const getAllWords = IN4_APP.getAllWords;
    axios
      .get(getAllWords)
      .then(function (response) {
        setData(response.data);
        setAllData(response.data);
        setLoading(false);
        console.log(11);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const dic = (word) => {
    const getDefinition = IN4_APP.getWord;
    const getSynonym =
      'https://api.wordnik.com/v4/word.json/' +
      word +
      '/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

    axios
      .all([
        axios.post(getDefinition, {
          word: word,
        }),
        axios.get(getSynonym),
      ])
      .then(
        axios.spread((...allData) => {
          switch (allData[0].status) {
            case 200:
              setDefinition(allData[0].data);
              setSynonym(allData[1].data);
              setInput('');
              setWordFromHome('');
              setLoading(false);
              break;

            default:
              setErr('Not found!');
              break;
          }
        }),
      )
      .catch((err) => {
        // setDefinition([{Word: `Không tìm thấy ${input}!`}]);
        translate(input);
        setSynonym([{words: 'ko'}]);
        console.log(err);
      });
  };
  const translate = (text) => {
    try {
      const translator = TranslatorFactory.createTranslator();
      translator.translate(text).then((translated) => {
        setDefinition([{Word: `${translated}`}]);
      });
    } catch (error) {}
  };
  useEffect(() => {
    wordFromHome !== '' && wordFromHome !== undefined ? dic(word) : null;
    TranslatorConfiguration.setConfig(
      ProviderTypes.Google,
      'AIzaSyBTXr7MqVz0OXJadyLXaKPkLIf2ik3hukk',
      'vi',
      'en',
    );
  });
  const def =
    definition[0] !== undefined
      ? definition[0]
      : setDefinition([
          {
            Word: `Từ điển chưa nhập nhật từ ${input}!\nHãy thử chức năng dịch văn bản...`,
          },
        ]);
  const Definition = () => {
    return def.Word !== '' ? (
      <View>
        <ScrollView style={{padding: 15}}>
          <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            {def.Pronounced !== undefined ? (
              <TouchableOpacity
                style={{justifyContent: 'center'}}
                onPress={() => {
                  input === ''
                    ? Tts.getInitStatus().then(() => {
                        Tts.setDefaultLanguage('en-us');
                        Tts.speak(def.Word);
                      })
                    : console.log('chua nhap');
                }}>
                <MaterialCommunityIcons
                  name="volume-high"
                  size={30}
                  style={{margin: 5}}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
            <View>
              <Text
                style={[
                  {
                    fontSize: 30,
                    fontWeight: 'bold',
                  },
                ]}>
                {def.Word}
              </Text>
            </View>
            <View>
              <Text style={[{fontSize: 20}]}>{def.Pronounced}</Text>
            </View>
          </View>
          <Text style={[Style.text20, {marginLeft: 15}]}>{def.Type1}</Text>
          <Text style={[{fontSize: 20, margin: 5}]}>{def.Content1}</Text>
          <Text style={[Style.text20, {marginLeft: 15}]}>{def.Type2}</Text>
          <Text style={[{fontSize: 20}]}>{def.Content2}</Text>
          <Text style={[Style.text20, {marginLeft: 15}]}>{def.Type3}</Text>
          <Text style={[{fontSize: 20}]}>{def.Content3}</Text>
          <Text style={[Style.text20, {marginLeft: 15}]}>{def.Type4}</Text>
          <Text style={[{fontSize: 20}]}>{def.Content4}</Text>
        </ScrollView>
      </View>
    ) : (
      <View />
    );
  };

  const Synonymous = () => {
    return synonym[0].words !== '' ? (
      <View>
        <ScrollView style={{padding: 15}}>
          <View style={{margin: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
            {synonym[0].words !== 'ko' ? (
              synonym[0].words.map((item, key) => (
                <TouchableOpacity
                  style={{marginRight: 5}}
                  key={key}
                  onPress={() => {
                    setInput(item), dic(item);
                  }}>
                  {synonym[synonym.length - 1].words === item ? (
                    <Text
                      style={{fontSize: 20, textDecorationLine: 'underline'}}>
                      {item}
                    </Text>
                  ) : (
                    <Text
                      style={{fontSize: 20, textDecorationLine: 'underline'}}>
                      {item},
                    </Text>
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
      </View>
    ) : (
      <View />
    );
  };
  return (
    <View style={Style.container}>
      <SearchBar
        containerStyle={{
          borderRadius: 50,
          backgroundColor: '#f1f1f1',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          margin: 15,
        }}
        searchIcon={{size: 25}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: 'none'}}
        inputStyle={{borderRadius: 50}}
        round={true}
        underlineColorAndroid="transparent"
        placeholder="Nhập gì đó..."
        value={input}
        onChangeText={(text) => setInput(text)}
        onEndEditing={() => {
          dic(input.toLowerCase());
        }}
      />

      <View style={{flex: 1}}>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: [Style.text18, {color: '#9a9a9a'}],
            style: {
              // borderTopColor: '#754ea6',
              // borderTopWidth: 3,
            },
          }}>
          <Tab.Screen
            name="a"
            component={Definition}
            options={{tabBarLabel: 'Định nghĩa'}}
          />
          <Tab.Screen
            name="ab"
            component={Synonymous}
            options={{tabBarLabel: 'Đồng nghĩa'}}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};
export default Dictionary;
