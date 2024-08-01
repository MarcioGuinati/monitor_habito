import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5
  },
  icon: {
    position: 'absolute',
    left: 10,
    color: 'black'
  },
  textInput: {
    flex: 1,
    paddingLeft: 50, 
    fontSize: 20,
  },
});