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
        thumbColor={isEnabled ? '#5579f1' : '#f4f3f4'}
        trackColor={{false: '#c1c8fe', true: '#c1c8fe'}}
      />
    </View>
  );
};
export default SwitchComponent;
