import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/Main'
import { Provider } from 'react-redux';
import { store } from './src/CreateStore';
import {Root} from 'native-base'
import { LogBox } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

AntDesign.loadFont().then();
Ionicons.loadFont().then();
Feather.loadFont().then();
MaterialIcons.loadFont().then()

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <Provider store={store}>
      <Root>
        <Main/>
      </Root>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
