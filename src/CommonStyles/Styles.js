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
    color: '#3c3c3c',
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
    backgroundColor: '#c0e4f6',
    transform: [{translate: [0, 0, 1]}],
  },
  line: {
    width: DIMENSION.width,
    borderWidth: 1,
    borderColor: '#58cc02',
  },
  input: {
    paddingLeft: 15,
    height: 50,
    fontSize: 18,
    borderColor: '#e5e5e5',
    borderWidth: 1.5,
    borderRadius: 20,
    marginBottom: 10,
    width: DIMENSION.width - 30,
    color: '#4b4b4b',
    marginTop: 5,
    backgroundColor: '#f7f7f7',
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
    borderColor: '#58cc02',
    color: '#58cc02',
  },
  txtActive: {
    color: '#58cc02',
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
    borderColor: '#78c800',
    padding: 5,
    borderWidth: 2,
  },
  imageRank: {
    height: 110,
    width: 110,
    borderRadius: 250,
    borderWidth: 6,
  },
  marginTop20: {
    marginTop: 20,
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
