import React from 'react';

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { gradientColors } from '../utils';

const Whatever = (props) => {
	sendEmail = () => {
		Linking.openURL('mailto:beerme216@gmail.com?subject=I forgot my password :(');
	}

  return (
    <LinearGradient colors={gradientColors} style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.bottom}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            Seriously? This is a freaking beer app.
          </Text>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            It's not like you've got nuclear launch
          </Text>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            codes saved on here.
          </Text>
        </View>
        <View style={{flex: .1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            *sigh*
          </Text>
        </View>
        <View style={styles.top}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            Fine. Whatever. 
          </Text>
          <TouchableOpacity onPress={ this.sendEmail }>
            <View>
              <Text style={{fontSize: 18, textAlign: 'center', fontWeight:'bold'}}>
                Send me an email
              </Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>
                and I'll figure it out.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	top: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	bottom: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

 export default Whatever;