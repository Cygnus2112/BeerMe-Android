import React, { useState, useEffect } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

/* Redux stuff...      */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as wishlistActions from '../actions/wishlistActions';

import Drawer from '../components/Drawer';

const Wishlist = (props) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  const [dataSource, setDataSource] = useState(
    ds.cloneWithRows(props.wishlist),
  );

  useEffect(() => {
    const newData = dataSource.cloneWithRows(props.wishlist);
    setDataSource(newData);
    const { updateWishlistSuccess } = props.wishlistActions;
    updateWishlistSuccess();
  }, [props.wishlist]);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Wishlist</Text>
      </View>
    );
  };

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
    <ScrollView>
      <ListView
        dataSource={dataSource}
        renderHeader={renderHeader}
        renderRow={(selectedBeer, sectionID, rowID) => {
          return (
            <TouchableHighlight
              onPress={() => {
                props.navigation.navigate(
                  'beerdetail',
                  {
                    selectedBeer: selectedBeer,
                    rowID: rowID,
                    isAlreadyInWishlist: true,
                  }
                );
              }}
              underlayColor="#ddd"
            >
              <View style={styles.row}>
                <Image
                  source={{ uri: selectedBeer.icon }}
                  style={styles.icon}
                />
                <Text style={{ fontSize: 18 }}>{selectedBeer.name}</Text>
              </View>
            </TouchableHighlight>
          );
        }}
      />
    </ScrollView>
  );

  if (!Object.keys(props.wishlist).length) {
    return <Drawer view={emptyWishlistView} />;
  } else {
    return <Drawer view={wishlistView} />;
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

const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlistReducer.wishlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
