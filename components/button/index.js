/**
 * 参数
 * btnStyle  按钮样式
 * txtStyle  文字样式
 * click     回调函数
 */

import React, { Component } from 'react'

import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'


export default class btn extends Component{
  constructor(props) {
    super(props)
  }
   _clickHandle=()=>{
    // alert(props)
    // this.props.click()
  }
  render() {
  return (
    <TouchableOpacity style={[styles.btn,this.props.btnStyle]} activeOpacity={.8} onPress={this._clickHandle()}>
      <Text style={[styles.txt,this.props.txtStyle]}>{this.props.title}</Text>
    </TouchableOpacity>
  )
  }
}

const styles =StyleSheet.create({
  btn:{
    justifyContent:'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 8
  },
  txt:{
    height: 21,
    lineHeight: 21,
    fontSize: 15
  }
})
