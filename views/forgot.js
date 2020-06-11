import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { gradientColors } from '../utils';

const Forgot = (props) => {
  const loadSignup = () => {
    props.navigation.navigate('signup');
  };

  const whatever = () => {
    props.navigation.navigate('whatever');
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.main}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.mainText}>
            Ugh. Coding password resets is a nightmare.
          </Text>
          <TouchableNativeFeedback onPress={loadSignup}>
            <View>
              <Text style={styles.mainText}>
                Can't you just{' '}
                <Text style={styles.bold}>
                  create a new account?
                </Text>
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.bottom}>
          <TouchableNativeFeedback onPress={whatever}>
            <View>
              <Text style={styles.insist}>
                No, I insist.{' '}
                <Text style={styles.bold}>
                  Reset my password
                </Text>.
              </Text>
            </View>
          </TouchableNativeFeedback>
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
  mainText: {
    fontSize: 18,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  insist: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Forgot;
