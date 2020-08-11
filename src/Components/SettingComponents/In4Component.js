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

  return (
    <View style={SettingStyle.sectionIn4}>
      <LinearTextGradient
        locations={[0, 1]}
        colors={['#091048', '#754ea6']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={[Style.text20]}> Hồ sơ của bạn</Text>
      </LinearTextGradient>

      <View>
        <View style={Style.coverCenter}>
          <TouchableOpacity onPress={() => selectImage()}>
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
              colors={['#687ae4', '#754ea6']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={[{fontSize: 16, fontWeight: 'bold'}]}>
                THAY ẢNH ĐẠI DIỆN
              </Text>
            </LinearTextGradient>
          </TouchableOpacity>
        </View>

        <View>
          <LinearTextGradient
            locations={[0, 1]}
            colors={['#754ea6', '#687ae4']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={[Style.text18, Style.textColor754ea6]}>Tên</Text>
          </LinearTextGradient>
          <TextInput
            style={Style.input}
            value={name}
            onChangeText={(text) => setName(text)}
            onBlur={() => updateName()}
          />
        </View>

        <View>
          <LinearTextGradient
            locations={[0, 1]}
            colors={['#754ea6', '#687ae4']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={[Style.text18, Style.textColor754ea6]}>
              Tên đăng nhập
            </Text>
          </LinearTextGradient>
          <TextInput
            style={[Style.input, {color: '#000'}]}
            value={userData.Username}
            editable={false}
          />
        </View>

        <View>
          <LinearTextGradient
            locations={[0, 1]}
            colors={['#754ea6', '#687ae4']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={[Style.text18, Style.textColor754ea6]}>Mật khẩu</Text>
          </LinearTextGradient>
          <TouchableOpacity
            style={[Style.input, {justifyContent: 'center'}]}
            onPress={() => navigation.navigate(desNav)}>
            <Text>********</Text>
          </TouchableOpacity>
        </View>

        <View>
          <LinearTextGradient
            locations={[0, 1]}
            colors={['#754ea6', '#687ae4']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={[Style.text18, Style.textColor754ea6]}>Email</Text>
          </LinearTextGradient>
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
