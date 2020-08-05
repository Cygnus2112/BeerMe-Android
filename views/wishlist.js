import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableHighlight,
} from 'react-native';
import FastImage from 'react-native-fast-image';

/* Redux stuff...      */
import { useSelector } from 'react-redux';

import Drawer from '../components/Drawer';

const Wishlist = (props) => {
  const wishlist = useSelector((state) => state.wishlistReducer.wishlist);
  console.log(wishlist);

  // TODO: use flatlist header
  // const renderHeader = () => {
  //   return (
  //     <View style={styles.header}>
  //       <Text style={styles.headerText}>Wishlist</Text>
  //     </View>
  //   );
  // };

  const emptyLoadStyles = () => {
    props.navigation.navigate('styles');
  };

  const emptyWishlistView = (
    <View>
      <Text style={styles.choose}>
        You {"haven't"} added any beers to your wishlist!
      </Text>
      <TouchableNativeFeedback onPress={emptyLoadStyles}>
        <View>
          <Text style={styles.choose}>Find your brew</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  const wishlistView = (
    <FlatList
      data={wishlist}
      renderItem={({ item, index }) => {
        return (
          <TouchableHighlight
            onPress={() => {
              props.navigation.navigate(
                'beerdetail',
                {
                  selectedBeer: item,
                  rowID: item.id,
                  isAlreadyInWishlist: true,
                }
              );
            }}
            underlayColor="#ddd"
          >
            <View style={styles.row}>
              <FastImage
                source={{ uri: item.icon }}
                style={styles.icon}
              />
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
            </View>
          </TouchableHighlight>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );

  if (!Object.keys(wishlist).length) {
    return <Drawer view={emptyWishlistView} navigation={props.navigation} />;
  } else {
    return <Drawer view={wishlistView} navigation={props.navigation} />;
  }
};

let styles = StyleSheet.create({
  header: {
    backgroundColor: 'brown',
    height: 30,
    elevation: 3,
  },
  choose: {
    fontSize: 27,
    textAlign: 'center',
    margin: 30,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    height: 34,
    width: 34,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default Wishlist;
