import {BackHandler, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WebView from 'react-native-webview';
const Stack = createNativeStackNavigator();

function HomeScreen(props) {
  const webViewRef = useRef();
  let canGoBack = false;

  const onAndroidBackPress = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    }

    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress,
        );
      }
    };
  }, []);

  const onNavigationStateChange = navState => {
    canGoBack = navState.canGoBack;
  };

  return (
    <WebView
      ref={webViewRef}
      source={{uri: 'https://jbmatrix.in/dev21/golden_tv/second-screen.html'}}
      // style={{marginTop: 20}}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
