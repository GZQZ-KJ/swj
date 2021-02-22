import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';


import TopShow from './topComp/index'
import Chart from './trendchart/index'
import MySwiper from './banner/index'
import DealMsg from './dealmsg/index'

export default class homePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
       <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        <TopShow navigation={this.props.navigation}></TopShow>
          <Chart></Chart>
        {/* <MySwiper></MySwiper> */}
        <DealMsg></DealMsg>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})