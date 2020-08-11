import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Style, SettingStyle} from '../../CommonStyles';
import SwitchComponent from './SwitchComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LinearTextGradient} from 'react-native-text-gradient';

const SettingComponent = ({title, style, dataConfig, id}) => {
  const [collapse, setCollapse] = React.useState(true);

  const listConfig = () => {
    return dataConfig.map((data) => (
      <View style={SettingStyle.flexDirectionRow} key={data.id}>
        <Text style={{fontSize: 18}}>{data.title}</Text>
        <SwitchComponent switchValue={data.status} title={data.title} id={id} />
      </View>
    ));
  };

  return (
    <View style={style}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <LinearTextGradient
          locations={[0, 1]}
          colors={['#091048', '#754ea6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={[Style.text20]}>{title}</Text>
        </LinearTextGradient>
        {!collapse ? (
          <View>
            <FontAwesome5
              name="chevron-circle-up"
              size={20}
              color="#754ea6"
              style={Style.headerIcon}
              onPress={() => {
                setCollapse(true);
              }}
            />
          </View>
        ) : (
          <View>
            <FontAwesome5
              name="chevron-circle-down"
              size={20}
              color="#754ea6"
              style={Style.headerIcon}
              onPress={() => {
                setCollapse(false);
              }}
            />
          </View>
        )}
      </View>

      {collapse && listConfig()}
    </View>
  );
};
export default SettingComponent;
