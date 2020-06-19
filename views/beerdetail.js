import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';

/* Redux stuff...      */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as beerActions from '../actions/beerActions';
import * as wishlistActions from '../actions/wishlistActions';
import * as authActions from '../actions/authActions';
/* End redux stuff...      */

import Toolbar from '../components/Toolbar';
//import OrderModal from '../components/Order';
import { gradientColors } from '../utils';

let screenWidth = Dimensions.get('window').width;

const BeerDetail = (props) => {
  // this.goBack = this.goBack.bind(this);
  const [ toggled, setToggled ] = useState(props.isAlreadyInWishlist);
  const [ actionMessage, setActionMessage ] = useState('');
  const [ wishlistMessage, setWishlistMessage ] = useState('Remove From Wishlist');
  const [ wishlistClicked, setWishlistClicked ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);

  useEffect(() => {
    return () => {
      const { selectedBeer, rowID, isAlreadyInWishlist } = props.route.params;
      if (props.username) {
        const { removeWishlistItem } = props.wishlistActions;
        if (!toggled && isAlreadyInWishlist) {
          removeWishlistItem(
            {
              username: props.username,
              dislike: rowID,
            },
            props.navigation,
          );
        }
        if (toggled && !isAlreadyInWishlist && !wishlistClicked) {
          //add to wishlist
          const { updateWishlist } = props.wishlistActions;
          let a = {
            id: rowID,
            name: selectedBeer.name,
            style: selectedBeer.style,
            labelUrl: selectedBeer.label,
            icon: selectedBeer.icon,
            descript: selectedBeer.descript,
            abv: selectedBeer.abv,
            brewery: selectedBeer.brewery,
            website: selectedBeer.website,
          };

          updateWishlist(
            {
              username: props.username,
              wishlistToAdd: [a],
              'dislikesToAdd': [],
            },
            props.navigation,
          );
        }
      }
    };
  }, []);

  const openShoppingModal = () => {
    setModalVisible(true);
  };

  const totalWineClicked = () => {
    const { selectedBeer } = props.route.params;
    setModalVisible(false);
    const url = (
      'http://www.totalwine.com/search/all?text=' +
      selectedBeer.brewery
        .replace(' Ales', '')
        .replace(' Lagers', '')
        .replace(' and', '') +
      ' ' +
      selectedBeer.name +
      '&tab=fullcatalog'
    )
      .replace(' Brewery', '')
      .replace(' Brewing', '')
      .replace(' Company', '')
      .replace(' Co.', '');
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err),
    );
  };

  const bevMoClicked = () => {
    const { selectedBeer } = props.route.params;
    setModalVisible(false);
    const url = (
      'http://shop.bevmo.com/search?w=' +
      selectedBeer.brewery
        .replace(' Ales', '')
        .replace(' Lagers', '')
        .replace(' and', '') +
      ' ' +
      selectedBeer.name
    )
      .replace(' Brewery', '')
      .replace(' Brewing', '')
      .replace(' Company', '')
      .replace(' Co.', '');
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err),
    );
  };

  const beerTempleClicked = () => {
    const { selectedBeer } = props.route.params;
    setModalVisible(false);
    const url = (
      'http://store2.craftbeertemple.com/search.php?search_query=' +
      selectedBeer.brewery
        .replace(' Beer', '')
        .replace(' Ales', '')
        .replace(' Lagers', '')
        .replace(' and', '') +
      '+' +
      selectedBeer.name
    )
      .replace(' Brewery', '')
      .replace(' Brewing', '')
      .replace(' Company', '')
      .replace(' Co.', '')
      .replace(/ /gi, '+');
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err),
    );
  };

  const craftshackClicked = () => {
    const { selectedBeer } = props.route.params;
    setModalVisible(false);
    const url = (
      'https://craftshack.com/search?type=product&q=' +
      selectedBeer.brewery
        .replace(' Beer', '')
        .replace(' Ales', '')
        .replace(' Lagers', '')
        .replace(' and', '') +
      '+' +
      selectedBeer.name
    )
      .replace(' Brewery', '')
      .replace(' Brewing', '')
      .replace(' Company', '')
      .replace(' Co.', '')
      .replace(/ /gi, '+');
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err),
    );
  };

  const kingsClicked = () => {
    const { selectedBeer } = props.route.params;
    setModalVisible(false);
    const url = (
      'http://www.craftbeerkings.com/index.php?route=product/search&filter_name=' +
      selectedBeer.brewery
        .replace(' Beer', '')
        .replace(' Ales', '')
        .replace(' Lagers', '')
        .replace(' and', '') +
      ' ' +
      selectedBeer.name
    )
      .replace(' Brewery', '')
      .replace(' Brewing', '')
      .replace(' Company', '')
      .replace(' Co.', '');
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err),
    );
  };

  const craftCityClicked = () => {
    const { selectedBeer } = props.route.params;
    setModalVisible(false);
    const url = (
      'https://www.craftcity.com/index.php?route=product/search&search=' +
      selectedBeer.brewery
        .replace(' Beer', '')
        .replace(' Ales', '')
        .replace(' Lagers', '')
        .replace(' and', '') +
      ' ' +
      selectedBeer.name
    )
      .replace(' Brewery', '')
      .replace(' Brewing', '')
      .replace(' Company', '')
      .replace(' Co.', '');
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err),
    );
  };

  const websiteClicked = () => {
    props.navigation.navigate('webview', {
      website: props.selectedBeer.website,
      url: props.selectedBeer.website,
    });
  };

  const toggleWishlist = () => {
    if (!props.username) {
      setActionMessage('Please sign in to save beers to wishlist');
    } else {
      if (toggled){
        setToggled(toggled);
        setActionMessage('Removed From Wishlist');
      } else {
        setActionMessage('Added to Wishlist');
        setToggled(!toggled);
      }
    }
    setTimeout(() => {
      setActionMessage('');
    }, 2000);
  };

  // wishlist = () => {
  //   this.setState({
  //     wishlistClicked: true,
  //     isLoadingWishlist: true
  //   })
  //   this.refs['DRAWER'].closeDrawer();
  //   if(this.state.toggled && !this.props.isAlreadyInWishlist){
  //     //add to wishlist
  //     const { updateAndLoadWishlist } = this.props.wishlistActions;
  //     let a = {
  //       "id": this.props.rowID,
  //       "name": this.props.selectedBeer.name,
  //       "style": this.props.selectedBeer.style,
  //       "labelUrl": this.props.selectedBeer.label,
  //       "icon": this.props.selectedBeer.icon,
  //       "descript": this.props.selectedBeer.descript,
  //       "abv": this.props.selectedBeer.abv,
  //       "brewery": this.props.selectedBeer.brewery,
  //       "website": this.props.selectedBeer.website
  //     }

  //     updateAndLoadWishlist({
  //       "username": this.props.username,
  //       "wishlistToAdd": [a],
  //       "dislikesToAdd": []
  //     });
  //   } else {
  //     const { loadWishlist } = this.props.wishlistActions;
  //     loadWishlist({"username": this.props.username});
  //   }
  // }
  // goBack = () => {
  //   Actions.pop();
  // }

  const heartView = toggled ? (
    <View style={styles.icon}>
      <TouchableOpacity onPress={toggleWishlist}>
        <Image
          source={require('../assets/ic_favorite_filled_3x.png')}
          style={styles.favorite}
        />
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>Remove</Text>
      <Text style={styles.buttonLabel}>From Wishlist</Text>
    </View>
  ) : (
    <View style={styles.icon}>
      <TouchableOpacity onPress={toggleWishlist}>
        <Image
          source={require('../assets/heart_empty.png')}
          style={styles.favorite}
        />
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>Add</Text>
      <Text style={styles.buttonLabel}>To Wishlist</Text>
    </View>
  );

  let abvColor;

  if (props.selectedBeer.abv < 4) {
    abvColor = '#ffff00';
  } else if (props.selectedBeer.abv >= 4 && props.selectedBeer.abv < 5.7) {
    abvColor = '#ffcc00';
  } else if (props.selectedBeer.abv >= 5.7 && props.selectedBeer.abv < 7.4) {
    abvColor = '#ff9900';
  } else if (props.selectedBeer.abv >= 7.4 && props.selectedBeer.abv < 9) {
    abvColor = '#ff6600';
  } else {
    abvColor = '#ff3300';
  }

  const beerTitle = (
    <View style={styles.titleWrap}>
      <View style={styles.title}>
        <Text style={styles.choose}>{props.selectedBeer.name}</Text>
        <Text style={styles.brewery}>{props.selectedBeer.brewery}</Text>
        <Text style={styles.titleText}>{props.selectedBeer.style}</Text>
        <View style={styles.center}>
          <Text style={styles.titleText}>ABV: </Text>
          <View style={[styles.abvWrap, { backgroundColor: abvColor }]}>
            <Text style={styles.abv}>
              {props.selectedBeer.abv ? props.selectedBeer.abv + '%' : 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.wrap}>
      <Toolbar iconAction={'back'} navigation={props.navigation} />
      <LinearGradient colors={gradientColors} style={styles.wrap}>
        <View style={styles.main}>
          <View style={styles.card}>
            <View style={styles.cardWrap}>
              <View style={styles.selected}>
                <Image
                  source={{ uri: props.selectedBeer.icon }}
                  style={{ width: 80, height: 80 }}
                />
              </View>
              {beerTitle}
            </View>
            <View style={styles.notProvided}>
              <Text numberOfLines={12} style={{ margin: 10 }}>
                {props.selectedBeer.descript
                  ? props.selectedBeer.descript
                  : props.selectedBeer.brewery +
                    ' has not provided a description provided for this beer.'}
              </Text>
            </View>
            <View style={styles.icons}>
              {heartView}
              <View style={styles.icon}>
                <TouchableOpacity onPress={websiteClicked}>
                  <Image
                    source={require('../assets/ic_language_black_24dp.png')}
                    style={styles.web}
                  />
                </TouchableOpacity>
                <Text style={styles.buttonLabel}>Brewery</Text>
                <Text style={styles.buttonLabel}>Website</Text>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity onPress={openShoppingModal}>
                  <Image
                    source={require('../assets/ic_shopping_cart_black_24dp.png')}
                    style={styles.favorite}
                  />
                </TouchableOpacity>
                <Text style={styles.buttonLabel}>Order Online</Text>
                <Text style={styles.buttonLabel}>
                  <Text style={{ color: 'red' }}>(Beta)</Text>
                </Text>
              </View>
            </View>
          </View>
          <Modal
            animationType={'slide'}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.modal}>
              <View style={styles.modalHead}>
                <Text style={{ fontSize: 16 }}>
                  Select a merchant to search its inventory
                </Text>
              </View>
              <View style={{ flex: 6, justifyContent: 'space-between' }}>
                <View style={styles.icon}>
                  <TouchableOpacity onPress={totalWineClicked}>
                    <Image
                      source={require('../assets/total_wine_logo.png')}
                      style={{ width: 200, height: 54 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.icon}>
                  <TouchableOpacity onPress={bevMoClicked}>
                    <Image
                      source={require('../assets/bevmo_logo.png')}
                      style={{ width: 150, height: 47 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.icon}>
                  <TouchableOpacity onPress={craftCityClicked}>
                    <Image
                      source={require('../assets/craft_city_logo.png')}
                      style={{ width: 150, height: 66 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.icon}>
                  <TouchableOpacity onPress={kingsClicked}>
                    <Image
                      source={require('../assets/craft_beer_kings_logo.png')}
                      style={{ width: 180, height: 50 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.twoicon}>
                  <TouchableOpacity onPress={beerTempleClicked}>
                    <Image
                      source={require('../assets/beer_temple_logo.jpg')}
                      style={{ width: 80, height: 76 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={craftshackClicked}>
                    <Image
                      source={require('../assets/craftshack_logo.png')}
                      style={{ width: 115, height: 67 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.dismiss}>
                <Button
                  style={{ fontSize: 16 }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  Dismiss
                </Button>
              </View>
            </View>
          </Modal>
          <View style={styles.footer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.like}>{actionMessage}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  modal: {
    elevation: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 25,
    marginBottom: 25,
    marginRight: 25,
    marginLeft: 25,
    backgroundColor: '#ffbf00',
  },
  like: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
    fontSize: 18,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 15,
  },
  card: {
    elevation: 5,
    flex: 1.1,
    width: screenWidth * 0.9,
    margin: 5,
    backgroundColor: '#F5FCFF',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },
  abvtitle: {
    fontSize: 10,
    textAlign: 'center',
  },
  abv: {
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'top',
    fontWeight: 'bold',
  },
  avbbox: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 3,
    paddingRight: 3,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'red',
  },
  brewery: {
    fontSize: 14,
    textAlign: 'left',
  },
  descript: {
    fontSize: 14,
    textAlign: 'left',
  },
  icons: {
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1.1,
    flexDirection: 'row',
    margin: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  twoicon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footer: {
    flex: 0.1,
  },
  choose: {
    fontSize: 22,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  buttonLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
  favorite: {
    width: 60,
    height: 60,
  },
  titleWrap: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  abvWrap: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 3,
    paddingRight: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  cardWrap: {
    marginTop: 2,
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: 'black',
    borderBottomWidth: 5,
    backgroundColor: 'white',
  },
  selected: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notProvided: {
    flex: 2.5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  web: {
    width: 60,
    height: 60,
    marginLeft: 20,
    marginRight: 20,
  },
  modalHead: {
    flex: 0.8,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  dismiss: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 12,
    textAlign: 'left',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
    beerActions: bindActionCreators(beerActions, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BeerDetail);
