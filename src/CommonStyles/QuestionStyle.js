import {StyleSheet} from 'react-native';
import {DIMENSION} from '../CommonStyles';
const QuestionStyle = StyleSheet.create({
  headerQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  progressHeader: {
    width: '80%',
    alignItems: 'center',
  },
  iconHeader: {
    alignItems: 'flex-start',
    width: '10%',
  },
  textHeader: {
    marginLeft: 3,
    fontSize: 15,
  },
  sectionAnswer: {
    flex: 6,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  tchAnswer: {
    borderColor: '#ebebeb',
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    width: 80,
    height: 40,
    marginBottom: 10,
  },
  tchAnswer2: {
    // borderColor: '#ebebeb',
    // borderWidth: 2,
    borderRadius: 50,
    paddingLeft: 15,
    // paddingRight: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    alignSelf: 'center',
    // paddingTop: 4,
    width: '100%',
    height: 52,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  tchAnswer3: {
    backgroundColor: '#25aff7',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: DIMENSION.width / 3,
    height: DIMENSION.width / 3,
  },
  tchAnswer4: {
    backgroundColor: '#25aff7',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: DIMENSION.width / 5,
    height: DIMENSION.width / 5,
  },
  btnSubmit: {
    // paddingTop: 10,
    // paddingBottom: 10,
    // width: DIMENSION.width - 30,
    // alignItems: 'center',
    borderRadius: 30,
    height: '100%',
    width: '100%',
  },
});
export {QuestionStyle};
