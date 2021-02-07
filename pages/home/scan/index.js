import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import axios from '../../../utils/api/request'
import Toast from '../../../utils/api/Toast'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {NavigationContext} from '@react-navigation/native'


import {inject,observer} from 'mobx-react'
@inject('rootStore')
@observer

export default class CameraScan extends Component {
  static contextType = NavigationContext
  constructor(props) {
    super(props)
    this.state = {
      token:this.props.rootStore.token
    }
  }

  onSuccess = async (e) => {
    let {token} = this.state
    let url = e.data
    await axios.get(url,{
      headers:{
         "token":token
      }
    }).then(r => {
      //  if(r.data.code === 1) {
          let {user_id,user_name,avater_url,email} = r.data.result
          this.context.navigate("Scan",{userId:user_id,userName:user_name,avaterUrl:avater_url,email:email,code:r.data.code})
      //  }
      //  else {
      //     Toast.message(r.data.message,1000,'center')
      //     setInterval(() => {
      //         this.props.navigation.navigate('Tabbar')
      //     },1000)
      //  }
    }).catch(e => console.log('[扫描二维码]',e))
  }
  goBack = () => {
    this.props.navigation.navigate("Tabbar")
  }
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <TouchableOpacity
            onPress={this.goBack}
            style={styles.buttonTouchable}>
            <View style={styles.arroWrap}>
              <TouchableOpacity onPress={() => {
                this.props.navigation.goBack()
              }}>
                <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
              </TouchableOpacity>
              <Text style={styles.title}>扫一扫</Text>
            </View>
          </TouchableOpacity>
        }
        showMarker={true}
        customMarker={
          <Image source={require('../../../assets/icons/saomaW.png')}></Image>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    position: 'absolute',
    zIndex: 999,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-start',
    // alignItems:'center',
    position: 'absolute',
    // backgroundColor:'#008c8c',
    padding: 16
  },
  arroWrap: {
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 16,
  },
  arrow: {
    width: 11.82,
    height: 22,
    marginRight: 128
  },
  title: {
    color: '#2B2D33',
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'PingFang SC'
},
});