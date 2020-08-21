import {StyleSheet} from 'react-native';
import {DIMENSION} from '../CommonStyles';
const Style = StyleSheet.create({
  backgroundColorMain: {
    backgroundColor: '#e7eefe',
  },
  coverCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCenter: {
    alignItems: 'center',
  },
  textBold30: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  text25: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  text20: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#464646',
  },

  text18: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text16: {
    fontSize: 16,
    color: '#464646',
  },
  text30: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 160,
    paddingLeft: 15,
    paddingTop: 10,
    backgroundColor: '#dee2ff',
    transform: [{translate: [0, 0, 1]}],
  },
  line: {
    width: DIMENSION.width,
    borderWidth: 1,
    borderColor: '#c1c8fe',
  },
  input: {
    paddingLeft: 15,
    height: 50,
    fontSize: 18,
    borderColor: '#c1c8fe',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    width: DIMENSION.width - 30,
    color: '#848484',
    marginTop: 5,
    backgroundColor: '#f1f1f1',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 5,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },

  textColor754ea6: {
    // color: '#754ea6',
    letterSpacing: 1,
  },
  textColore6e6f6: {
    color: '#fff',
  },
  textColor687ae4: {
    color: '#687ae4',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  btnActive: {
    borderBottomWidth: 3,
    borderColor: '#5579f1',
    color: '#5579f1',
  },
  txtActive: {
    color: '#5579f1',
  },
  textAnswer: {
    color: '#848484',
    fontSize: 20,
  },
  //header 3 component chiều ngang dãn đều
  headerContainer: {
    // borderBottomWidth: 2,
    // borderBottomColor: '#5579f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 27,
    height: 60,
    // paddingBottom: 8,
  },

  //header icon va icon gia
  headerIcon: {
    width: 50,
  },

  images: {
    height: 150,
    width: 150,
    borderRadius: 250,
    borderColor: '#c1c8fe',
    borderWidth: 3,
  },
  images2: {
    // height: '100%',
    // width: '100%',
    width: 180,
    height: 100,
    // backgroundColor: 'red',
  },
  boxShadow: {
    // backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
});
export {Style};
