import { StyleSheet, Dimensions } from 'react-native';

let width = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  signup: {
    height: screenHeight - 325,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    height: 250,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  error: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorMsg: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 16,
    marginBottom: 5,
  },
  iambold: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgot: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 14,
  },
  input: {
    backgroundColor: 'white',
    margin: 3,
    padding: 5,
    width: width * 0.7,
    fontSize: 18,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    margin: 5,
    padding: 5,
    width: width * 0.7,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonBox: {
    elevation: 3,
    padding: 10,
    margin: 5,
    height: 45,
    width: width * 0.7,
    overflow: 'hidden',
    borderRadius: 4,
  },
  signupbuttonBox: {
    elevation: 3,
    padding: 10,
    margin: 3,
    height: 45,
    width: width * 0.7,
    overflow: 'hidden',
    borderRadius: 4,
  },
  button: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 7,
    width: width * 0.7,
  },
  errorBox: {
    flex: 0.3,
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
