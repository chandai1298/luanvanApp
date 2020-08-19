import React, {Component, useEffect} from 'react';
import {
  PowerTranslator,
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory,
} from 'react-native-power-translator';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Text,
  Image,
} from 'react-native';
import Tts from 'react-native-tts';
import Languages from '../../Assets/txt/languages.json';
import SpeechAndroid from 'react-native-android-voice';
import {Picker} from '@react-native-community/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Style, DIMENSION} from '../../CommonStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ButtonGroup} from 'react-native-elements';

const Translator = () => {
  const [languageTo, setLanguageTo] = React.useState('en');
  const [languageCode, setLanguageCode] = React.useState('en');
  const [micOn, setMicOn] = React.useState(false);
  const [inputText, onChangeInputText] = React.useState('');
  const [outputText, onChangeOutputText] = React.useState('');
  const [index, UpdateIndex] = React.useState(1);
  const buttons = ['Anh-Việt', 'Việt-Anh'];
  useEffect(() => {
    TranslatorConfiguration.setConfig(
      ProviderTypes.Google,
      'AIzaSyBTXr7MqVz0OXJadyLXaKPkLIf2ik3hukk',
      languageCode,
    );
  });

  const translate = () => {
    try {
      const translator = TranslatorFactory.createTranslator();
      translator.translate(inputText).then((translated) => {
        onChangeOutputText(translated);
      });
    } catch (error) {}
  };

  const _OnMic = async () => {
    await setMicOn(true);
    try {
      var spokenText = await SpeechAndroid.startSpeech(
        '',
        SpeechAndroid.DEFAULT,
      );
      await onChangeInputText(spokenText);
      await ToastAndroid.show(spokenText, ToastAndroid.LONG);
    } catch (error) {
      switch (error) {
        case SpeechAndroid.E_VOICE_CANCELLED:
          ToastAndroid.show('Voice Recognizer cancelled', ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_NO_MATCH:
          ToastAndroid.show('No match for what you said', ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_SERVER_ERROR:
          ToastAndroid.show('Google Server Error', ToastAndroid.LONG);
          break;
      }
    }
    setMicOn(false);
  };
  const update = (index) => {
    console.log(index);
    switch (index) {
      case 0:
        UpdateIndex(index);
        setLanguageTo('vi');
        setLanguageCode('vi');
        break;
      case 1:
        UpdateIndex(index);
        setLanguageTo('en');
        setLanguageCode('en');
        break;

      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <View style={{flexDirection: 'row-reverse'}}>
          <FontAwesome5
            name="times"
            size={DIMENSION.sizeIcon}
            color="#9a9a9a"
            onPress={() => onChangeInputText('')}
          />
        </View>
        <TextInput
          style={{flex: 1, height: 80, fontSize: 18}}
          placeholder="Hãy nhập gì đó..."
          underlineColorAndroid="transparent"
          onChangeText={(inputText) => onChangeInputText(inputText)}
          value={inputText}
          multiline={true}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => _OnMic()}>
            {micOn ? (
              <MaterialCommunityIcons
                size={30}
                name="microphone-outline"
                style={styles.ImageStyle}
              />
            ) : (
              <MaterialCommunityIcons
                size={30}
                name="microphone-off"
                style={styles.ImageStyle}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => {
              inputText !== ''
                ? Tts.getInitStatus().then(() => {
                    Tts.setDefaultLanguage('en-us');
                    Tts.speak(inputText);
                  })
                : console.log('chua co input');
            }}>
            <MaterialCommunityIcons
              name="volume-high"
              size={30}
              style={styles.ImageStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ButtonGroup
        onPress={(index) => update(index)}
        selectedIndex={index}
        buttons={buttons}
        containerStyle={{height: 50, borderRadius: 30, margin: 5}}
        buttonContainerStyle={{
          borderColor: '#5579f1',
          borderWidth: 1.5,
        }}
        textStyle={{fontWeight: 'bold', color: '#5579f1'}}
        selectedButtonStyle={{
          backgroundColor: '#5579f1',
        }}
      />
      <Picker
        style={{flex: 1}}
        selectedValue={languageTo}
        onValueChange={(lang) => {
          setLanguageTo(lang),
            setLanguageCode(lang),
            console.log(languageTo + ', ' + languageCode);
        }}>
        {Object.keys(Languages).map((key) => (
          <Picker.Item
            key={key}
            label={'Auto Detect - ' + Languages[key]}
            value={key}
          />
        ))}
      </Picker>
      {translate()}
      <View style={[styles.input, {marginBottom: 150}]}>
        <View
          style={{
            flex: 1,
            fontSize: 18,
          }}>
          <TextInput
            style={{
              fontSize: 18,
            }}
            value={outputText}
            multiline={true}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              outputText !== ''
                ? Tts.getInitStatus().then(() => {
                    Tts.setDefaultLanguage('vi-us');
                    Tts.speak(outputText);
                  })
                : console.log('chua co output');
            }}>
            <MaterialCommunityIcons
              name="volume-high"
              size={30}
              style={styles.ImageStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Translator;
const styles = StyleSheet.create({
  container: {
    flex: 13,
    padding: 15,
    backgroundColor: '#fcfefc',
  },
  input: {
    flex: 5,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#9a9a9a',
    borderRadius: 10,
    height: 200,
    shadowRadius: 20,
    shadowOpacity: 0.5,
    elevation: 15,
    marginBottom: 10,
  },

  ImageStyle: {
    marginLeft: 5,
    marginBottom: 5,
    marginRight: 10,
    color: '#000',
  },
});
