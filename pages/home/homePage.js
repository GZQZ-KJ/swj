import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView
} from 'react-native';


import TopShow from './topComp/index'
import Chart from './trendchart/index'
import MySwiper from './banner/index'
import DealMsg from './dealmsg/index'
import {pxToPt} from '../../utils/styleKits'
export default class homePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
       <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar> 
        <TopShow navigation={this.props.navigation}></TopShow>
        <Chart></Chart>
        {/* <MySwiper></MySwiper> */}
        <DealMsg></DealMsg>
      </>
    )
  }
}

const styles = StyleSheet.create({

})