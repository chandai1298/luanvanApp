import React, {useState} from 'react';
import {View, Switch} from 'react-native';
import {IN4_APP} from '../../ConnectServer/In4App';
import axios from 'axios';

const SwitchComponent = ({title, switchValue, id}) => {
  const [isEnabled, setIsEnabled] = useState(
    switchValue === 'true' ? true : false,
  );
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    const UpdateOverviewSetting = IN4_APP.UpdateOverviewSetting;
    axios
      .put(UpdateOverviewSetting, {
        status: !isEnabled + '',
        Id: id,
        title: title,
      })
      .then(function (response) {
        console.log(!isEnabled);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <View>
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
        thumbColor={isEnabled ? '#58cc02' : '#9e9e9e'}
        trackColor={{false: '#e5e5e5', true: '#e5e5e5'}}
      />
    </View>
  );
};
export default SwitchComponent;
