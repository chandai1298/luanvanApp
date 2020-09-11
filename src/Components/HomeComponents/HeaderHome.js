import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Style, HomeStyle, DIMENSION} from '../../CommonStyles';
import {Tooltip, Button} from 'react-native-elements';

const HeaderHome = ({icon1, icon2, icon3, icon4, rank}) => {
  // const HeaderHome = ({icon1, num1, icon2, num2, icon3, num3, icon4, num4}) => {
  return (
    <View style={[Style.headerContainer, {paddingLeft: 15, paddingRight: 15}]}>
      <Tooltip
        width={200}
        height={100}
        popover={
          <Text style={{color: '#CDDC39', fontSize: 16}}>
            Điểm xếp loại cá nhân trên bảng xếp hạng
          </Text>
        }>
        <View style={[HomeStyle.headerFlexIcon, {alignItems: 'center'}]}>
          <FontAwesome5
            name={icon1}
            size={DIMENSION.sizeIcon}
            color="#ffc107"
          />
          <Text style={[HomeStyle.headerText, {color: '#ffc107'}]}>
            {rank.total_score}
          </Text>
        </View>
      </Tooltip>
      <Tooltip
        width={200}
        height={100}
        popover={
          <Text style={{color: '#CDDC39', fontSize: 16}}>
            Xếp loại thành tích (hoàn thành bài học để nhận)
          </Text>
        }>
        <View style={[HomeStyle.headerFlexIcon, {alignItems: 'center'}]}>
          <FontAwesome5
            name={icon2}
            size={DIMENSION.sizeIcon}
            color="#ff9800"
          />
          <Text style={[HomeStyle.headerText, {color: '#ff9800'}]}>
            {rank.crown}
          </Text>
        </View>
      </Tooltip>
      <Tooltip
        width={200}
        height={100}
        popover={
          <Text style={{color: '#CDDC39', fontSize: 16}}>
            Chuỗi ngày sử dụng ứng dụng
          </Text>
        }>
        <View style={[HomeStyle.headerFlexIcon, {alignItems: 'center'}]}>
          <FontAwesome5
            name={icon3}
            size={DIMENSION.sizeIcon}
            color="#e91e63"
          />
          <Text style={[HomeStyle.headerText, {color: '#e91e63'}]}>
            {rank.streak}
          </Text>
        </View>
      </Tooltip>
      <Tooltip
        width={200}
        height={100}
        popover={
          <Text style={{color: '#CDDC39', fontSize: 16}}>
           Hãy sử dụng khi gặp câu hỏi khó
          </Text>
        }>
        <View style={[HomeStyle.headerFlexIcon, {alignItems: 'center'}]}>
          <FontAwesome5
            name={icon4}
            size={DIMENSION.sizeIcon}
            color="#f44336"
          />
          <Text style={[HomeStyle.headerText, {color: '#f44336'}]}>
            {rank.hint}
          </Text>
        </View>
      </Tooltip>
    </View>
  );
};
export default HeaderHome;
