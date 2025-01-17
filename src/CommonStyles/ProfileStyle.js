import {StyleSheet} from 'react-native';
const ProfileStyle = StyleSheet.create({
  // section avatar
  sectionAvatar: {
    flex: 2,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1.5,
    backgroundColor: '#fff',
    borderColor: '#9a9a9a',
    borderRadius: 15,
    margin: 10,
  },
  sectionAvtLeft: {
    width: '60%',
  },
  SectionAvtRight: {
    width: '40%',
    alignItems: 'flex-end',
  },
  flexRowIcon: {
    flex: 1,
    flexDirection: 'row',
  },
  widthIcon: {
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPadding15: {
    // padding: 15,
    // paddingBottom: 0,
    // paddingTop: 0,
    flex: 6,
  },

  // tab thanh tich
  sectionThanhTich: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    // borderRadius: 10,
    // marginBottom: 10,
  },
  sectionLeft: {
    // height: 100,
    // padding: 5,
    justifyContent: 'center',
  },
  sectionLeftImg: {
    height: 90,
    width: 90,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
  sectionLeftImgRank: {
    height: 64,
    width: 64,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
  // tab ban be
  sectionBanBeImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
export {ProfileStyle};
