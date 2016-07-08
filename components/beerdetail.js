import React from 'react';

import {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableNativeFeedback,
  AsyncStorage,
  TouchableOpacity 
} from 'react-native';

/* Redux stuff...      */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as beerActions from '../actions/beerActions'; 
import * as wishlistActions from '../actions/wishlistActions'; 
import * as authActions from '../actions/authActions';
/* End redux stuff...      */ 

import { Actions } from 'react-native-router-flux';
let width = Dimensions.get('window').width;

class BeerDetail extends React.Component {
  constructor(props){
    super(props);

    this.likeBeer = this.likeBeer.bind(this);
    this.dislikeBeer = this.dislikeBeer.bind(this);

    this.state = {
      actionMessage: "",
    
     
    }
  }

  // componentWillUnmount() {

  // }

  // showProps = () => {
  //   console.log('this.props.styleChoice ', this.props.styleChoice);
  //   console.log('this.props.beerData in SWIPE ', this.props.beerData);
  //   console.log('this.props.beerToView in SWIPE ', this.props.beerToView);
  // }

  likeBeer = (beer) => {
    //console.log('beer in beerDetail ', beer);
    // this.setState({
    //   likeMessage: "You liked " + beer.name,
    //   wishlistToAdd: this.state.wishlistToAdd.concat([beer])
    // })

    // setTimeout(() => {this.setState({
    //   likeMessage: ""
    // });}, 1000);
  }

  dislikeBeer = (beer) => {

  //   this.setState({
  //     likeMessage: "You disliked " + beer.name,
  //     dislikesToAdd: this.state.dislikesToAdd.concat([beer])
  //   })

  //   setTimeout(() => {this.setState({
  //     likeMessage: ""
  //   });}, 2000);
  }

  // <View style={styles.header}>
  //             <Image source={require('../assets/logo.png')} style={{width: 290*.50, height: 70*.50}} />
  //         </View>

  render() {
    return (
      <View style={styles.main}>

          <View style={styles.card}>
              <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Image source={{uri: this.props.selectedBeer.label}} style={{width: 256, height: 256}}/>
              </View>
              <Text style={styles.choose}>
                {this.props.selectedBeer.name}
              </Text>
          </View>
          <View style={ styles.thumbs }>
              <TouchableOpacity onPress={ () => this.dislikeBeer(this.props.selectedBeer) } >
                <Image source={require('../assets/heart_empty.png') } style={{width: 72, height: 72}}/>
              </TouchableOpacity >
              <TouchableOpacity onPress={ () => this.likeBeer(this.props.selectedBeer) } >
                <Image source={require('../assets/shopping_cart.png') } style={{width: 72, height: 72}}/>
              </TouchableOpacity >
          </View>
          <View style={ styles.footer }>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Text style={styles.instructions} >
                  { this.state.actionMessage }
                </Text>
            </View>
          </View>
        </View>)
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  header: {
    flex: .1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  divider: {
    flex: .1
  },
  footer: {
    flex: .1,
  },
  thumbs: {
    flex: .2,
    //width: width*.8,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-around'
  },
  card: {
    flex: .7,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  choose: {
    fontSize: 27,
    textAlign: 'center',
   // justifyContent: 'center',
    margin: 10,
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    wishlistActions: bindActionCreators(wishlistActions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BeerDetail);