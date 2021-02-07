import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import rootStore from "./utils/mobx";
import { Provider } from "mobx-react";

import Nav from './pages/nav'
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