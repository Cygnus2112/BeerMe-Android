import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ToolbarAndroid
} from 'react-native';

//import { Actions } from 'react-native-router-flux';
let screenHeight = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

import LinearGradient from 'react-native-linear-gradient';
import { gradientColors } from '../utils';
import Toolbar from '../components/Toolbar';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <Toolbar iconAction={'back'} />
      <LinearGradient colors={gradientColors} style={{flex:1}}>
        <View style={styles.main}>
          <View style={{flex: 1, margin: 10, height: 75, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        		<Image source={require('../assets/logo_outline.png')} />
          </View>
          <View style={styles.container}>
              <View style={{flex: 2, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22, textAlign: 'center'}}>
                Version 1.01
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
              	<Text style={{fontSize: 16, textAlign: 'center'}}>
                <Image source={require('../assets/ic_copyright_black_24dp.png')} style={{height:20,width:20}} /> 2016 Thomas Leupp
                </Text>
                <Text></Text>
                <Text style={{fontSize: 14, textAlign: 'center'}}>
                Beer data courtesy of BreweryDB
                </Text>
              </View>
          </View>
        </View>
      </LinearGradient >
    </View>)
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    flex: 4,
    justifyContent: 'center'
  },
  choose: {
    fontSize: 27,
    textAlign: 'center',
    margin: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  }
});

export default About
