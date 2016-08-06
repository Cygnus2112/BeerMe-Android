import React from 'react';

import {
	View,
	Text,
	StyleSheet,
	TouchableNativeFeedback
} from 'react-native';

import { Actions } from 'react-native-router-flux';

class Forgot extends React.Component {
	constructor(props){
		super(props);

		this.loadSignup = this.loadSignup.bind(this);
		this.whatever = this.whatever.bind(this);
	}

	loadSignup () {
		Actions.signup();
	}

	whatever () {
		Actions.whatever();
	}


	render() {
		return (
			<View style={styles.container}>
			  <View style={styles.top}>
				<Text style={{fontSize: 18,textAlign: 'center'}}>
					Ugh.
				</Text>
				<Text style={{fontSize: 18,textAlign: 'center'}}>
					Coding password resets is a nightmare.
				</Text>
				<TouchableNativeFeedback onPress={ this.loadSignup }>
					<View>
					<Text style={{fontSize: 18,textAlign: 'center'}}>
						Can't you just <Text style={{fontWeight: 'bold'}}>create a new account?</Text>
					</Text>
					</View>
				</TouchableNativeFeedback>
			  </View>
			  <View style={styles.bottom}>
			  		<TouchableNativeFeedback onPress={ this.whatever }>
						<View>
			  				<Text style={{fontSize: 12,textAlign: 'center'}}>
							No, I insist. <Text style={{fontWeight: 'bold'}}>Reset my password</Text>.
							</Text>
						</View>
					</TouchableNativeFeedback>
			  </View>
			</View>

			)
	}
}

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
	},
	mainText: {
		fontSize: 18,
		textAlign: 'center'
	}
});

export default Forgot

