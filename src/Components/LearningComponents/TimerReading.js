import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
const TimerReading = ({delayM, delayS, onEnd, checkTime}) => {
  const [delayEndM, setDelayEndM] = React.useState(-1);
  const [delayEndS, setDelayEndS] = React.useState(-1);

  var h = null;
  var m = null;
  var s = null;
  var timeout = null;
  const end = () => {
    if (!checkTime) return false;
    if (h === null) {
      h = 0;
      m = delayM;
      s = delayS;
    }
    if (s === -1) {
      m -= 1;
      s = 59;
    }
    if (m === -1) {
      h -= 1;
      m = 59;
    }
    if (h == -1) {
      clearTimeout(timeout);
      setDelayEndM(-1);
      setDelayEndS(-1);
      Alert.alert('Alert Title', 'Het gio', [{text: 'OK', onPress: onEnd}], {
        cancelable: false,
      });

      return false;
    }
    console.log(m + ' ' + s);
    setDelayEndM(m);
    setDelayEndS(s);
    timeout = setTimeout(function () {
      s--;
      end();
    }, 1000);
  };

  return (
    <View>
      <Text style={{fontSize: 16, color: '#8f3311'}}>
        {delayEndS !== -1
          ? `Chuyển màn hình sau ${delayEndM}:${
              delayEndS < 10 ? '0' + delayEndS : delayEndS
            } giây...`
          : ''}
      </Text>
    </View>
  );
};
export default TimerReading;
