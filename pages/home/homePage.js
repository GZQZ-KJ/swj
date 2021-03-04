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
import { pxToPt } from '../../utils/styleKits'
export default class homePage extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <>
        {
          Platform.OS === 'ios' ? <StatusBar></StatusBar>
            : <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        }
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
            <TopShow navigation={this.props.navigation}></TopShow>
            <Chart></Chart>
            {/* <MySwiper></MySwiper> */}
            <DealMsg></DealMsg>
          </View>
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({

})