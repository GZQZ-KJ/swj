import React, { Component } from 'react'
import {
  View,
  Platform,
  Text
} from 'react-native'
import rootStore from "./utils/mobx";
import { Provider } from "mobx-react";

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
      <View style={{ flex: 1 }}>
        <Provider rootStore={rootStore}>
          <Nav></Nav>
        </Provider>
      </View>
    )
  }
}