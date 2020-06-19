import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

/* Redux stuff...      */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as beerActions from '../actions/beerActions';
/* End Redux stuff...      */

import { gradientColors } from '../utils';

import Drawer from '../components/Drawer';

const Styles = (props) => {
  const [ styleChoice, setStyleChoice ] = useState('');
  const [ actionText, setActionText ] = useState('');
  const [ username, setUsername ] = useState('');

  const fetchBeers = (style) => {
    const { loadBeers } = props.beerActions;
    let userData = {
      username: props.username,
      style: style,
    };
    loadBeers(userData);
    props.navigation.navigate('swipe', { styleChoice: style });
  };

  const openSwipe = (swipeChoice) => {
    const { clearFrontBeer } = props.beerActions;
    clearFrontBeer();
    fetchBeers(swipeChoice);
  };

  let mainView = (
    <LinearGradient colors={gradientColors} style={styles.main}>
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.thirsty}>
            <Text style={styles.choose}>
              What are you thirsty {'for'}?
            </Text>
          </View>
          <View style={styles.beerWrap}>
            <View style={styles.beer}>
              <TouchableOpacity onPress={() => openSwipe('Ale')}>
                <Image
                  source={require('../assets/Ale-125.png')}
                  style={styles.ale}
                />
                <Text style={styles.welcome}>Ale</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.beer}>
              <TouchableOpacity onPress={() => openSwipe('Lager')}>
                <Image
                  source={require('../assets/Lager-125.png')}
                  style={styles.lager}
                />
                <Text style={styles.welcome}>Lager</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.beer}>
              <TouchableOpacity onPress={() => openSwipe('Pilsner')}>
                <Image
                  source={require('../assets/Pilsner-125.png')}
                  style={styles.pilsner}
                />
                <Text style={styles.welcome}>Pilsner</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.beer}>
              <TouchableOpacity onPress={() => openSwipe('Stout')}>
                <Image
                  source={require('../assets/Stout-125.png')}
                  style={styles.stout}
                />
                <Text style={styles.welcome}>Stout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.footer} />
      </View>
    </LinearGradient>
  );

  return <Drawer view={mainView} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  footer: {
    flex: 0.1,
  },
  container: {
    flex: 0.7,
    justifyContent: 'center',
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
  beer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ale: {
    width: 108 * 0.65,
    height: 254 * 0.65,
  },
  lager: {
    width: 108 * 0.65,
    height: 252 * 0.65,
  },
  pilsner: {
    width: 125 * 0.65,
    height: 247 * 0.665,
  },
  stout: {
    width: 108 * 0.65,
    height: 252 * 0.66,
  },
  thirsty: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    beerActions: bindActionCreators(beerActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Styles);
