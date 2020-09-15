import React, {useEffect} from 'react';
import {View, Text, Image, TextInput, ToastAndroid} from 'react-native';
import {Style, SettingStyle} from '../../CommonStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LinearTextGradient} from 'react-native-text-gradient';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {IN4_APP} from '../../ConnectServer/In4App';
import axios from 'axios';

const In4Component = ({userData, navigation, desNav}) => {
  const [img, setImg] = React.useState(userData.Avatar);
  const [name, setName] = React.useState(userData.Name);
  const [email, setEmail] = React.useState(userData.Email);
  const id = userData.Id;

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
        setImg(response.uri);
      }
    });
  };
  const uploadImage = async (img, id) => {
    const {uri} = img;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(`img/${filename}`).putFile(uploadUri);
    try {
      await task;
      var ref = storage().ref(`img/${filename}`);
      const a = await ref.getDownloadURL();

      const updateAvatar = IN4_APP.UpdateAvatar;
      console.log(id);
      axios
        .put(updateAvatar, {
          Avatar: `${a}`,
          Id: id,
        })
        .then(function (response) {
          console.log(a);
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
  const updateName = () => {
    const updateAvatar = IN4_APP.UpdateName;
    axios
      .put(updateAvatar, {
        Name: name,
        Id: id,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const updateEmail = () => {
    const updateAvatar = IN4_APP.UpdateEmail;
    axios
      .put(updateAvatar, {
        Email: email.trim(),
        Id: id,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const verifyEmails = () => {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
      alert('Email không hợp lệ! Example@gmail.com');
      return false;
    } else {
      const verifyEmail = IN4_APP.verifyEmail;
      axios
        .put(verifyEmail, {
          Id: id,
        })
        .then(function (response) {
          alert(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

  return (
    <View style={[SettingStyle.sectionIn4, Style.boxShadow]}>
      <Text style={[Style.text20, {letterSpacing: 1, color: '#4b4b4b'}]}>
        Hồ sơ của bạn
      </Text>

      <View>
        <View style={Style.coverCenter}>
          <TouchableOpacity
            onPress={() => selectImage()}
            style={[{borderRadius: 250, alignSelf: 'center'}]}>
            <Image
              source={{
                uri: img,
              }}
              style={[Style.images, {marginBottom: 7}]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectImage()}>
            <LinearTextGradient
              locations={[0, 1]}
              colors={['#58cc02', '#78c800']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text
                style={[{letterSpacing: 2, fontSize: 16, fontWeight: 'bold'}]}>
                THAY ẢNH ĐẠI DIỆN
              </Text>
            </LinearTextGradient>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={[Style.text18, Style.textColor754ea6, {color: '#afafaf'}]}>
            Tên
          </Text>

          <TextInput
            style={Style.input}
            value={name}
            onChangeText={(text) => setName(text)}
            onBlur={() => updateName()}
          />
        </View>

        <View>
          <Text
            style={[Style.text18, Style.textColor754ea6, {color: '#afafaf'}]}>
            Tên đăng nhập
          </Text>
          <TextInput
            style={[Style.input]}
            value={userData.Username}
            editable={false}
          />
        </View>

        <View>
          <Text
            style={[Style.text18, Style.textColor754ea6, {color: '#afafaf'}]}>
            Mật khẩu
          </Text>

          <TouchableOpacity
            style={[Style.input, {justifyContent: 'center'}]}
            onPress={() => navigation.navigate(desNav, {idUser: id})}>
            <Text>********</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={[Style.text18, Style.textColor754ea6, {color: '#afafaf'}]}>
              Email
            </Text>
            <TouchableOpacity
              style={{justifyContent: 'flex-end'}}
              onPress={() => verifyEmails()}>
              <Text
                style={[
                  Style.text18,
                  Style.textColor754ea6,
                  {color: '#58cc02'},
                ]}>
                Xác thực
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={Style.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onBlur={() => updateEmail()}
          />
        </View>
      </View>
    </View>
  );
};
export default In4Component;
