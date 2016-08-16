'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

const IMAGE_PREFETCH_URL = "https://s3.amazonaws.com/brewerydbapi/beer/zoIjRl/upload_2guJDE-medium.png";
var prefetchTask = Image.prefetch(IMAGE_PREFETCH_URL);

var NetworkImageCallbackExample = React.createClass({
  getInitialState: function() {
    return {
      events: [],
      startLoadPrefetched: false,
      mountTime: new Date(),
    };
  },

  componentWillMount() {
    this.setState({mountTime: new Date()});
  },

  render: function() {
    var { mountTime } = this.state;

    return (
      <View>
        <Image
          source={this.props.source}
          style={[styles.base, {overflow: 'visible'}]}
          onLoadStart={() => {
            this._loadEventFired("✔ onLoadStart ("+(new Date() - mountTime)+" ms)")
            console.log('this.props.source');
            console.log(this.props.source);
          }
        }
          onLoad={() => this._loadEventFired("✔ onLoad ("+(new Date() - mountTime)+" ms)")}
          onLoadEnd={() => {
            this._loadEventFired("✔ onLoadEnd ("+(new Date() - mountTime)+" ms)");
            this.setState({startLoadPrefetched: true}, () => {
              prefetchTask.then(() => {
                this._loadEventFired("✔ Prefetch OK ("+(new Date() - mountTime)+ " ms)");
              }, error => {
                this._loadEventFired("✘ Prefetch failed ("+(new Date() - mountTime)+" ms)");
              });
            });
          }}/>
        {this.state.startLoadPrefetched ?
          <Image
            source={this.props.prefetchedSource}
            style={[styles.base, {overflow: 'visible'}]}
            onLoadStart={() => {
              this._loadEventFired("✔ (prefetched) onLoadStart ("+ (new Date() - mountTime)+" ms)")
              
            }
            onLoad={() => this._loadEventFired("✔ (prefetched) onLoad ("+(new Date() - mountTime)+" ms)")}
            onLoadEnd={() => this._loadEventFired("✔ (prefetched) onLoadEnd ("+(new Date() - mountTime)+" ms)")}/>
          : null}
        <Text style={{marginTop: 20}}>
          {this.state.events.join('\n')}
        </Text>
      </View>
    );
  },

  _loadEventFired(event) {
    this.setState((state) => {
      return state.events = [...state.events, event];
    });
  }
});

var Prefetch = React.createClass({
    render: function() {
      return (
        <NetworkImageCallbackExample source={{uri: "https://s3.amazonaws.com/brewerydbapi/beer/pC7sCu/upload_sVn50Q-medium.png"}}
          prefetchedSource={{uri: IMAGE_PREFETCH_URL}}/>
      );
    }
  })

var styles = StyleSheet.create({
  base: {
    width: 150,
    height: 150,
  },
  progress: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: 100
  },
  leftMargin: {
    marginLeft: 10,
  },
  background: {
    backgroundColor: '#222222'
  },
  sectionText: {
    marginVertical: 6,
  },
  nestedText: {
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: 'transparent',
    color: 'white'
  },
  resizeMode: {
    width: 90,
    height: 60,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  resizeModeText: {
    fontSize: 11,
    marginBottom: 3,
  },
  icon: {
    width: 15,
    height: 15,
  },
  horizontal: {
    flexDirection: 'row',
  },
  gif: {
    flex: 1,
    height: 200,
  },
  base64: {
    flex: 1,
    height: 50,
    resizeMode: 'contain',
  },
  touchableText: {
    fontWeight: '500',
    color: 'blue',
  },
});

export default Prefetch