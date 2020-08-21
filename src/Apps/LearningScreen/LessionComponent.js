import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {LearningStyle, Style, DIMENSION} from '../../CommonStyles';

const LessionComponent = ({data, idUser, rank, navigation}) => {
  return (
    <View style={Style.coverCenter}>
      <ScrollView style={{marginTop: 30}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          {data.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={[
                Style.boxShadow,
                {
                  width: '42%',
                  height: 150,
                  alignContent: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  margin: 15,
                  backgroundColor: '#fff',
                  elevation: 20,
                },
              ]}
              onPress={() =>
                navigation.navigate(item.link, {
                  id_category: item.id_category,
                  id_lession: item.id,
                  nameLession: `${item.name}`,
                  idUser: idUser,
                  rank: rank,
                })
              }>
              <Image
                source={{
                  uri: item.imageCheck,
                }}
                resizeMode="contain"
                style={[Style.images2, {alignSelf: 'center'}]}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  color: '#9a9a9a',
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default LessionComponent;
