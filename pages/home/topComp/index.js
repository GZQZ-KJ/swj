import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
/**
 * 首页顶部扫码块
 */
export default class topComp extends Component {
  constructor(props) {
    super(props)
  }

  _getSaoma = async () => {
    //扫码接口,调用相机
    //如果已经扫过了
    //或者还没被扫，弹出绑定关系页面
    this.props.navigation.navigate("CameraScan")
  }
  getCamera = () => {
    ImagePicker.openCamera({
      width: 100,
      height: 100,
      cropping: true
    }).then(image => {
      console.log(image);
    });

  }
  render() {
    return (
      <View style={styles.top}>
        <Text style={styles.txt}>首页</Text>
        <TouchableOpacity style={styles.imgBox} onPress={this._getSaoma}>
          <Image source={require('../../../assets/icons/home/saoma.png')}></Image>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#FFFFFF'
  },
  txt: {
    height: 25,
    lineHeight: 25,
    fontSize: 18,
    color: '#2B2D33FF',
    fontWeight: '400'
  },
  imgBox: {
    position: 'absolute',
    right: 20
  }
})