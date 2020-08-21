import {StyleSheet} from 'react-native';
import {DIMENSION} from '../CommonStyles';
const LearningStyle = StyleSheet.create({
  container: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
  },
  tchLessionCover: {
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 60,
    borderRadius: 250,
    backgroundColor: '#fff',
  },
});
export {LearningStyle};
