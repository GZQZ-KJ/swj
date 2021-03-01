import React, { Component } from 'react'
import {
  View,
  Platform,
  Text,
  SafeAreaView
} from 'react-native'
import {pxToPt} from './utils/styleKits'
import rootStore from "./utils/mobx";
import { Provider } from "mobx-react";
import { NavigationActions } from 'react-navigation'

import Nav from './pages/nav'

const defaultFontFamily = {
	...Platform.select({
		android: { fontFamily: '' }
	})
};

const oldRender = Text.render;
Text.render = function(...args) {
	const origin = oldRender.call(this, ...args);
	return React.cloneElement(origin, {
		style: [defaultFontFamily, origin.props.style]
	});
};

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1,backgroundColor:'rgba(255,255,255,0)' }}>
        <Provider rootStore={rootStore}>
          <Nav></Nav>
        </Provider>
      </SafeAreaView>
    )
  }
}