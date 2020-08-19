import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {LinearTextGradient} from 'react-native-text-gradient';

const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}
      colors={['#c1c8fe', '#5579f1', '#fab3c6']}>
      <StatusBar
        backgroundColor="#54ce04"
        barStyle="light-content"
        hidden={true}
      />
      <View style={styles.header}>
        <Animatable.Image
          animation="fadeInUpBig"
          duraton="1500"
          source={{
            uri:
              'https://i.pinimg.com/originals/f5/17/29/f51729d9d65234c018d950923566a45e.gif',
          }}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <LinearTextGradient
          locations={[0, 1]}
          colors={['#5579f1', '#5579f1']}
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}>
          <Text
            style={[
              styles.title,
              {
                color: '#fe8a87',
                letterSpacing: 3,
              },
            ]}>
            Learning everyday with everyone!...
          </Text>
        </LinearTextGradient>

        <Animatable.View
          animation="bounce"
          iterationCount="infinite"
          direction="alternate"
          style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#c1c8fe', '#5579f1']}
              style={styles.signIn}>
              <Text style={styles.textSign}>GET STARTED</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 50,
    paddingHorizontal: 30,
    // borderColor: '#755140',
    // borderWidth: 1,
    borderBottomWidth: 0,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',

    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  textSign: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
