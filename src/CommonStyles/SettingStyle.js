import {StyleSheet} from 'react-native';
import {DIMENSION} from '../CommonStyles';
const SettingStyle = StyleSheet.create({
  // section avatar
  sectionAvatar: {
    flex: 2,
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 0,
    paddingTop: 3,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    margin: 10,
  },
  sectionIn4: {
    padding: 15,
    paddingBottom: 0,
  },
  // tab ban be
  sectionBanBeImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#c1c8fe',
    borderWidth: 1,
    padding: 15,
    marginTop: 9,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 5,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  viewChangPassword: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
    // paddingLeft: '15%',
    // paddingRight: '15%',
  },
  btnSettings: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
});
export {SettingStyle};
