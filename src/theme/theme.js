import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  flex1: {flex: 1},
  safeAreaTop: {
    flex: 0,
    backgroundColor: '#fffff',
  },
  safeAreaBottom: {
    flex: 1,
    backgroundColor: '#fffff',
  },
  forceInset: {
    top: 'alaways',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyLeft: {
    justifyContent: 'flex-start',
    alignItems: 'left',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: 'black', fontSize: 12},
  safeArea: {flex: 1, backgroundColor: 'white'},
  error: {
    color: 'red',
    width: '100%',
    fontSize: 12,
    marginLeft: 0,
  },
});
