/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { gradientColors } from '../utils';
import Toolbar from '../components/Toolbar';

const About = () => {
  return (
    <View style={styles.wrap}>
      <Toolbar iconAction={'back'} />
      <LinearGradient colors={gradientColors} style={styles.wrap}>
        <View style={styles.main}>
          <View style={styles.logo}>
            <Image source={require('../assets/logo_outline.png')} />
          </View>
          <View style={styles.container}>
            <View style={styles.version}>
              <Text style={{ fontSize: 22, textAlign: 'center' }}>
                Version 1.03
              </Text>
            </View>
            <View style={styles.copyright}>
              <Text style={{ fontSize: 16, textAlign: 'center' }}>
                <Image
                  source={require('../assets/ic_copyright_black_24dp.png')}
                  style={styles.copylogo}
                />
                2016, 2020 Thomas Leupp
              </Text>
              <Text></Text>
              <Text style={{ fontSize: 14, textAlign: 'center' }}>
                Beer data courtesy of BreweryDB
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    flex: 4,
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    margin: 10,
    height: 75,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  version: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyright: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copylogo: {
    height: 20,
    width: 20,
  },
  wrap: {
    flex: 1,
  },
});

export default About;
