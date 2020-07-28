import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import FastImage from 'react-native-fast-image';

/* Redux stuff...      */
import { useSelector, useDispatch } from 'react-redux';
import * as wishlistActions from '../actions/wishlistActions';
/* End redux stuff...      */

import Toolbar from '../components/Toolbar';
//import OrderModal from '../components/Order';
import { gradientColors } from '../utils';

let screenWidth = Dimensions.get('window').width;

const BeerDetail = (props) => {
  // this.goBack = this.goBack.bind(this);
  const { isAlreadyInWishlist } = props.route.params;
  const [toggled, setToggled] = useState(isAlreadyInWishlist);
  const [actionMessage, setActionMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const username = useSelector((state) => state.authReducer.username);
  const dispatch = useDispatch();

  const { selectedBeer } = props.route.params;

  const openShoppingModal = () => {
    setModalVisible(true);
  };

  const toggleWishlist = () => {
    const { rowID } = props.route.params;
    if (!username) {
      setActionMessage('Please sign in to save beers to wishlist');
    } else {
      if (toggled) {
        dispatch(
          wishlistActions.addDislike(
            {
              username: username,
              dislike: rowID,
            },
            props.navigation,
          ),
        );
        setToggled(false);
        setActionMessage('Removed From Wishlist');
      } else {
        dispatch(
          wishlistActions.addToWishlist(
            {
              username: username,
              wishlistToAdd: rowID,
            },
            props.navigation,
          ),
        );
        setToggled(true);
        setActionMessage('Added to Wishlist');
      }
    }
    setTimeout(() => {
      setActionMessage('');
    }, 2000);
  };

  // goBack = () => {
  //   Actions.pop();
  // }

  const totalWineClicked = () => {
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
      website: selectedBeer.website,
      url: selectedBeer.website,
    });
  };

  const heartView = toggled ? (
    <View style={styles.icon}>
      <TouchableOpacity onPress={toggleWishlist}>
        <FastImage
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
        <FastImage
          source={require('../assets/heart_empty.png')}
          style={styles.favorite}
        />
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>Add</Text>
      <Text style={styles.buttonLabel}>To Wishlist</Text>
    </View>
  );

  let abvColor;

  if (selectedBeer.abv < 4) {
    abvColor = '#ffff00';
  } else if (selectedBeer.abv >= 4 && selectedBeer.abv < 5.7) {
    abvColor = '#ffcc00';
  } else if (selectedBeer.abv >= 5.7 && selectedBeer.abv < 7.4) {
    abvColor = '#ff9900';
  } else if (selectedBeer.abv >= 7.4 && selectedBeer.abv < 9) {
    abvColor = '#ff6600';
  } else {
    abvColor = '#ff3300';
  }

  const beerTitle = (
    <View style={styles.titleWrap}>
      <View style={styles.title}>
        <Text style={styles.choose}>{selectedBeer.name}</Text>
        <Text style={styles.brewery}>{selectedBeer.brewery}</Text>
        <Text style={styles.titleText}>{selectedBeer.style}</Text>
        <View style={styles.center}>
          <Text style={styles.titleText}>ABV: </Text>
          <View style={[styles.abvWrap, { backgroundColor: abvColor }]}>
            <Text style={styles.abv}>
              {selectedBeer.abv ? selectedBeer.abv + '%' : 'N/A'}
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
                <FastImage
                  source={{ uri: selectedBeer.icon }}
                  style={{ width: 80, height: 80 }}
                />
              </View>
              {beerTitle}
            </View>
            <View style={styles.notProvided}>
              <Text numberOfLines={12} style={{ margin: 10 }}>
                {selectedBeer.descript
                  ? selectedBeer.descript
                  : selectedBeer.brewery +
                    ' has not provided a description provided for this beer.'}
              </Text>
            </View>
            <View style={styles.icons}>
              {heartView}
              <View style={styles.icon}>
                <TouchableOpacity onPress={websiteClicked}>
                  <FastImage
                    source={require('../assets/ic_language_black_24dp.png')}
                    style={styles.web}
                  />
                </TouchableOpacity>
                <Text style={styles.buttonLabel}>Brewery</Text>
                <Text style={styles.buttonLabel}>Website</Text>
              </View>
              <View style={styles.icon}>
                <TouchableOpacity onPress={openShoppingModal}>
                  <FastImage
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
                    <FastImage
                      source={require('../assets/total_wine_logo.png')}
                      style={{ width: 200, height: 54 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.icon}>
                  <TouchableOpacity onPress={bevMoClicked}>
                    <FastImage
                      source={require('../assets/bevmo_logo.png')}
                      style={{ width: 150, height: 47 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.icon}>
                  <TouchableOpacity onPress={craftCityClicked}>
                    <FastImage
                      source={require('../assets/craft_city_logo.png')}
                      style={{ width: 150, height: 66 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.icon}>
                  <TouchableOpacity onPress={kingsClicked}>
                    <FastImage
                      source={require('../assets/craft_beer_kings_logo.png')}
                      style={{ width: 180, height: 50 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.twoicon}>
                  <TouchableOpacity onPress={beerTempleClicked}>
                    <FastImage
                      source={require('../assets/beer_temple_logo.jpg')}
                      style={{ width: 80, height: 76 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={craftshackClicked}>
                    <FastImage
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

export default BeerDetail;
