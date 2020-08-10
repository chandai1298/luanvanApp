import React, {useEffect} from 'react';
import {View, Text, Image, TextInput, Alert} from 'react-native';
import {Style, SettingStyle} from '../../CommonStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LinearTextGradient} from 'react-native-text-gradient';

const Avatar = ({image}) => (
  <View style={Style.coverCenter}>
    <Image
      source={{
        uri: image,
      }}
      style={Style.images}
    />

    <LinearTextGradient
      locations={[0, 1]}
      colors={['#687ae4', '#754ea6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text style={[{fontSize: 16, fontWeight: 'bold'}]}>
        Thay ảnh đại diện
      </Text>
    </LinearTextGradient>
  </View>
);
function Item({username, name, email, image, navigation, desNav}) {
  return (
    <View>
      <Avatar image={image} />
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
        <TextInput style={Style.input} value={username} />
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
          <Text style={[Style.text18, Style.textColor754ea6]}>Tên</Text>
        </LinearTextGradient>
        <TextInput style={Style.input} value={name} />
      </View>
      <View>
        <LinearTextGradient
          locations={[0, 1]}
          colors={['#754ea6', '#687ae4']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={[Style.text18, Style.textColor754ea6]}>Email</Text>
        </LinearTextGradient>
        <TextInput style={Style.input} value={email} />
      </View>
    </View>
  );
}
const In4Component = ({userData, navigation, desNav}) => {
  return (
    <View style={SettingStyle.sectionIn4}>
      <LinearTextGradient
        locations={[0, 1]}
        colors={['#091048', '#754ea6']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={[Style.text20]}> Hồ sơ của bạn</Text>
      </LinearTextGradient>

      <Item
        image={userData.Avatar}
        username={userData.Username}
        pass={userData.Password}
        name={userData.Name}
        email={userData.Email}
        navigation={navigation}
        desNav={desNav}
      />
    </View>
  );
};
export default In4Component;
