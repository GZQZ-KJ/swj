import React, { Component } from 'react'
import {
  View,
  Platform,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import rootStore from "./utils/mobx";
import SplashScreen from 'react-native-splash-screen';
import { Provider } from "mobx-react";

import Nav from './pages/nav'

const defaultFontFamily = {
  ...Platform.select({
    android: { fontFamily: '' }
  })
};

const oldRender = Text.render;
Text.render = function (...args) {
  const origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [defaultFontFamily, origin.props.style]
  });
};

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <>
        <Provider rootStore={rootStore}>
          <Nav></Nav>
        </Provider>
      </>
    )
  }
}