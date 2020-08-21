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
        <Text style={{fontSize: 18, color: '#848484'}}>{data.title}</Text>
        <SwitchComponent switchValue={data.status} title={data.title} id={id} />
      </View>
    ));
  };

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <Text style={[Style.text20, {letterSpacing: 2, color: '#464646'}]}>
          {title}
        </Text>
        {!collapse ? (
          <View>
            <FontAwesome5
              name="chevron-circle-up"
              size={20}
              color="#5579f1"
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
              color="#5579f1"
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
