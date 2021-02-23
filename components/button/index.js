/**
 * 参数
 * btnStyle  按钮样式
 * txtStyle  文字样式
 * click     回调函数
 */

import React, { Component } from 'react'

import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { pxToPt } from "../../utils/styleKits";

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
    height: pxToPt(44),
    borderRadius: pxToPt(8)
  },
  txt:{
    height:pxToPt(21),
    lineHeight: pxToPt(21),
    fontSize: pxToPt(15)
  }
})
