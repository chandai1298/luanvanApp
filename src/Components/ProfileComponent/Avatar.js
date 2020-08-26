import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {Style, ProfileStyle, DIMENSION} from '../../CommonStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LinearTextGradient} from 'react-native-text-gradient';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {IN4_APP} from '../../ConnectServer/In4App';
import axios from 'axios';
const api = axios.create({baseURL: `http://localhost:1300/`});
// import { Avatar, Accessory } from 'react-native-elements';

const AvatarItem = ({num, icon, colorIcon, label}) => {
  return (
    <View style={ProfileStyle.flexRowIcon}>
      <View style={ProfileStyle.widthIcon}>
        <FontAwesome5 name={icon} size={16} color={colorIcon} />
      </View>

      <Text style={{fontSize: 18, color: '#848484'}}>
        {num} {label}
      </Text>
    </View>
  );
};
const AvatarProfile = ({image, name, username, rankData, id}) => {
  const selectImage = () => {
    const options = {
      title: 'Chọn ảnh từ',
      takePhotoButtonTitle: ' Camera...',
      chooseFromLibraryButtonTitle: ' Thư viện...',
      cancelButtonTitle: 'Hủy',
      cameraType: 'front',
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: false,
        path: 'LuanvanApp/images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        uploadImage(source, id);
      }
    });
  };
  const uploadImage = async (img, id) => {
    const {uri} = img;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    console.log(uploadUri);
    const task = storage().ref(`img/${filename}`).putFile(uploadUri);
    // task.on('state_changed', (snapshot) => {
    //   setTransferred(
    //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
    //   );
    // });
    try {
      await task;
      var ref = storage().ref(`img/${filename}`);
      const a = await ref.getDownloadURL();

      const updateAvatar = IN4_APP.UpdateAvatar;
      axios
        .put(updateAvatar, {
          Avatar: `${a}`,
          Id: id,
        })
        .then(function (response) {
          ToastAndroid.showWithGravity(
            response.data,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View
      style={[ProfileStyle.sectionAvatar, Style.boxShadow, {elevation: 15}]}>
      <View style={[ProfileStyle.sectionAvtLeft, {paddingLeft: 5}]}>
        <View
          style={[
            Style.coverCenter,
            {
              flexDirection: 'row',
              justifyContent: 'flex-start',
            },
          ]}>
          <Text style={[Style.text20, {color: '#464646'}]}>{name}</Text>
          <View style={{marginLeft: 5}}>
            <FontAwesome5
              name="seedling"
              size={DIMENSION.sizeIcon}
              color="#79c615"
            />
          </View>
        </View>
        <Text style={{fontSize: 18, color: '#b1b1b1'}}>{username}</Text>
        <AvatarItem
          num={16}
          icon="user-friends"
          colorIcon="#79c615"
          label="bạn bè"
        />
        <AvatarItem
          num={rankData.total_score}
          icon="bolt"
          colorIcon="#ffc107"
          label="tổng điểm"
        />
        <AvatarItem
          num={rankData.crown}
          icon="crown"
          colorIcon="#ff9800"
          label="vương miện"
        />
        <AvatarItem
          num={rankData.streak}
          icon="fire-alt"
          colorIcon="#e91e63"
          label="chuỗi ngày"
        />
      </View>
      <View
        style={[
          ProfileStyle.SectionAvtRight,
          Style.coverCenter,
          Style.boxShadow,
          {elevation: 10, borderRadius: 250},
        ]}>
        {/* <Avatar
          size="xlarge"
          rounded
          source={{
            uri: image,
          }}>
          <Accessory />
        </Avatar> */}
        <TouchableOpacity onPress={() => selectImage()}>
          <Image
            resizeMode="cover"
            source={{uri: image}}
            style={Style.images}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AvatarProfile;
