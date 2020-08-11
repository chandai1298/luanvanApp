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
        thumbColor={isEnabled ? '#754ea6' : '#f4f3f4'}
        trackColor={{false: '#9a9a9a', true: '#9a9a9a'}}
      />
    </View>
  );
};
export default SwitchComponent;
