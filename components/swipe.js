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

class Swipe extends React.Component {
  constructor(props){
    super(props);

    this.likeBeer = this.likeBeer.bind(this);
    this.dislikeBeer = this.dislikeBeer.bind(this);

    this.showProps = this.showProps.bind(this);

    this.state = {
      likeMessage: "",
      wishlistToAdd: [],
      dislikesToAdd: []
    }
  }

  componentDidMount() {
    // console.log('this.props.styleChoice ', this.props.styleChoice);
    // console.log('this.props.beerData in SWIPE ', this.props.beerData);
    // console.log('this.props.beerToView in SWIPE ', this.props.beerToView);
  }

  componentWillUnmount() {
    const { clearBeerData } = this.props.beerActions;
    clearBeerData();
    const { updateWishlist } = this.props.wishlistActions;
    updateWishlist({
      "username": this.props.username,
      "wishlistToAdd": this.state.wishlistToAdd,
      "dislikesToAdd": this.state.dislikesToAdd
      });
  }

  showProps = () => {
    // console.log('this.props.styleChoice ', this.props.styleChoice);
    // console.log('this.props.beerData in SWIPE ', this.props.beerData);
    // console.log('this.props.beerToView in SWIPE ', this.props.beerToView);

  }

  likeBeer = (beer) => {
    const { loadFrontBeer } = this.props.beerActions;
    loadFrontBeer();

    this.setState({
      likeMessage: "You liked " + beer.name,
      wishlistToAdd: this.state.wishlistToAdd.concat([{
        "id": beer.id,
        "name": beer.name,
        "labelUrl": beer.label,
        "style": beer.style
      }])
    })

    setTimeout(() => {this.setState({
      likeMessage: ""
    });}, 1000);

    if(this.props.beerData.length < 5){
      const { loadBeers } = this.props.beerActions;
      let userData = {
        username: this.props.username,
        style: this.props.styleChoice
      }
      loadBeers(userData);
    }

  }

  dislikeBeer = (beer) => {
    const { loadFrontBeer } = this.props.beerActions;
    loadFrontBeer();

    this.setState({
      likeMessage: "You disliked " + beer.name,
      dislikesToAdd: this.state.dislikesToAdd.concat([{
        "id": beer.id,
        "name": beer.name,
        "labelUrl": beer.label,
        "style": beer.style
      }])
    })

    setTimeout(() => {this.setState({
      likeMessage: ""
    });}, 2000);

    if(this.props.beerData.length < 5){
      const { loadBeers } = this.props.beerActions;
      let userData = {
        username: this.props.username,
        style: this.props.styleChoice
      }
      loadBeers(userData);
    }
  }

  // <View style={styles.header}>
  //             <Image source={require('../assets/logo.png')} style={{width: 290*.50, height: 70*.50}} />
  //         </View>

  render() {
    let swipeView = (this.props.isSearching && this.props.beerToView) ? (
      <View style={styles.main}>
        <ActivityIndicator
          animating={ true }
          style={[styles.centering, {height: 80}]}
          size="large"/>
      </View>
      ) : (
      <View style={styles.main}>
        <View style={styles.card}>
              <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Image source={{uri: this.props.beerToView.label}} style={{width: 256, height: 256}}/>
              </View>
              <Text style={styles.choose}>
                {this.props.beerToView.name}
              </Text>
          </View>
          <View style={ styles.thumbs }>
              <TouchableOpacity onPress={ () => this.dislikeBeer(this.props.beerToView) } >
                <Image source={require('../assets/thumbdown.png') } style={{width: 72, height: 72}}/>
              </TouchableOpacity >
              <TouchableOpacity onPress={ () => this.likeBeer(this.props.beerToView) } >
                <Image source={require('../assets/thumbup.png') } style={{width: 72, height: 72}}/>
              </TouchableOpacity >
          </View>
          <View style={ styles.footer }>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Text style={styles.like} >
                  { this.state.likeMessage }
                </Text>
            </View>
          </View>
      </View>
      );


    return (
      <View style={styles.main}>
        { swipeView }  
      </View>)
  }
}

const styles = StyleSheet.create({
  like: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
    fontSize: 18,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
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
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
    beerActions: bindActionCreators(beerActions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    beerToView: state.beerReducer.beerToView,
    beerData: state.beerReducer.beerData,
    isSearching: state.beerReducer.isSearching,
    isFetching: state.wishlistReducer.isFetching,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Swipe);

