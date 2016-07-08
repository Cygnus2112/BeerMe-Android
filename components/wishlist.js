import React from 'react';

import {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  AsyncStorage,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';

/* Redux stuff...      */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as wishlistActions from '../actions/wishlistActions';
import * as authActions from '../actions/authActions';

class Wishlist extends React.Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      //ds:[{name: "TeamA", HomeTeam: "TeamB", Selection: "AwayTeam"},{name: "TeamC", HomeTeam: "TeamD", Selection: "HomeTeam"}],
      //ds: [],
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount(){
    this.setState({
      //dataSource: this.state.dataSource.cloneWithRows(this.state.ds),
      dataSource: this.state.dataSource.cloneWithRows(this.props.wishlist)
    })

  }

  pressRow(rowData){

    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(newDs)
    // })
  }
    
  render() {
    let wishlistView = this.props.isFetching ? (
        <View style={styles.main}>
          <Image source={require('../assets/spinner.gif')} />
        </View>

      ) : (<ListView
        dataSource = {this.state.dataSource}
        renderRow = {(selectedBeer) => 
          <TouchableHighlight
            onPress={()=> Actions.beerdetail({ selectedBeer })}
            underlayColor = '#ddd'>

            <View style ={styles.row}>
              <Text style={{fontSize:18}}>{selectedBeer.name} </Text>
            </View>
          </TouchableHighlight>} />);
     // <ListView
      //   dataSource = {this.state.dataSource}
      //   renderRow = {(selectedBeer) => 
      //     <TouchableHighlight
      //       onPress={()=> Actions.beerdetail({ selectedBeer })}
      //       underlayColor = '#ddd'>

      //       <View style ={styles.row}>
      //         <Text style={{fontSize:18}}>{selectedBeer.name} </Text>
      //       </View>
      //     </TouchableHighlight>} />
    return (
      <View>
      { wishlistView } 
      </View>
      );
  }

}
let styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  row:{
    flex:1,
    flexDirection:'row',
    padding:10,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
  },
  selectionText:{
    fontSize:15,
    paddingTop:3,
    color:'#b5b5b5',
    textAlign:'right'
  },
}); 

//module.exports = Wishlist

const mapStateToProps = (state) => {
  return {
    isFetching: state.wishlistReducer.isFetching,
    username: state.authReducer.username,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
