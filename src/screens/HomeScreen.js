import {BackHandler, Platform} from 'react-native';
import WebView from 'react-native-webview';
import React, {useEffect, useRef} from 'react';

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
        source={{uri: 'https://jbmatrix.in/dev21/golden_tv/'}}
        // style={{marginTop: 20}}
        onNavigationStateChange={onNavigationStateChange}
      />
    );
  }
  
export default HomeScreen