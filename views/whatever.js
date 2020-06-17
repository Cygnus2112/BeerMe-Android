import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { gradientColors } from '../utils';

const Whatever = (props) => {
  const sendEmail = () => {
    Linking.openURL(
      'mailto:beerme216@gmail.com?subject=I forgot my password :(',
    );
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.main}>
      <View style={styles.container}>
        <View style={styles.bottom}>
          <Text style={styles.center}>
            Seriously? This is a freaking beer app.
          </Text>
          <Text style={styles.center}>
            It's not like you've got nuclear launch
          </Text>
          <Text style={styles.center}>codes saved on here.</Text>
        </View>
        <View style={styles.sigh}>
          <Text style={styles.center}>*sigh*</Text>
        </View>
        <View style={styles.top}>
          <Text style={styles.center}>Fine. Whatever.</Text>
          <TouchableOpacity onPress={sendEmail}>
            <View>
              <Text style={styles.send}>Send me an email</Text>
              <Text style={styles.center}>and I'll figure it out.</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    fontSize: 18,
    textAlign: 'center',
  },
  sigh: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  send: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Whatever;
