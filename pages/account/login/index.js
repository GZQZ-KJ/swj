import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  StatusBar,
  TouchableOpacity,
  Platform,
  Keyboard,
  BackHandler
} from 'react-native'
import { isIphoneX } from "../../../utils/isIphoneX";
import Toast from '../../../utils/api/Toast'
import DeviceInfo from 'react-native-device-info';
import LoginToast from '../../../utils/LoginToast'
import axios from '../../../utils/api/request'
import { pxToPt } from '../../../utils/styleKits'
import { ACCOUNT_LOGIN } from '../../../utils/api/pathMap'

import AsyncStorage from '@react-native-community/async-storage'

import { inject, observer } from "mobx-react";
@inject("rootStore")
@observer
export default class login extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    email: this.props.rootStore.email,   //邮箱
    password: '', //密码
    showPassword: true,  //是否显示密码
    rootControl: true, //是否已经阅读用户协议
    wranningToast: false,  //弹出警告
    dangeingToast: false,
    showLogin: false,
    brand: '',     //设备品牌
    deviceId: '',  //设备id
    systemName: '',  //系统
    result: {},
    keyposition: {
      regWrap: pxToPt(12),
      inpWrap: pxToPt(73),
      lastWrap: pxToPt(24),
      loginGo: pxToPt(102),
    },
  }
  loginGo = async () => {
    var { email, password, brand, deviceId, systemName } = this.state
    //验证登录邮箱 //验证密码 //验证是否已经阅读用户协议
    // var re = /^[a-zA-Z\d]+([-_\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/
    //发送请求
    let changeEmail = await AsyncStorage.getItem("email") || email
    changeEmail === email ? changeEmail : changeEmail = email

    await axios.post(ACCOUNT_LOGIN, {
      account: changeEmail,
      password: password
    }, {
      headers: {
        "brand": brand,
        "deviceId": deviceId,
        "systemName": systemName,
      }
    }).then(res => {
      var data = res.data
      //获取数据，跳转页面
      if (data.code === 1) {
        //儲存數據到mobx中
        this.props.rootStore.setUserInfo(data.result.user_info.email, data.result.token)
        //儲存用戶數據到 本地緩存中 永久
        AsyncStorage.setItem('usertoken', data.result.token)
        AsyncStorage.setItem('email', email)
        AsyncStorage.setItem('appVersion', data.result.app_version)
        AsyncStorage.setItem('isUpdate', `${data.result.is_update}`)
        this.props.rootStore.setVersion(data.result.app_version, data.result.is_update, data.result.user_info.newOaOrder)

        this.setState({
          password: ''
        })
        this.props.navigation.replace('Tabbar')
      } else {
        if (data.code === -1) {
          this.setState({ //如果账号被冻结
            dangeingToast: true,
            result: data
          })
        } else {
          var re = /请重新修改密码/
          var rg = /账号不存在/
          if (data.message.match(re) || data.message.match(rg)) {
            Toast.message(data.message, 1000, 'center')
            this.setState({
              password: ''
            })
          }
          var reg = /\d/g
          let dataNum = data.message.match(reg)[0]
          data.message = data.message.split(reg, 1)
          if (dataNum) {
            Toast.message(data.message + `请重新输入。错误超过5次，可通过忘记密码找回。（${dataNum}/5）`, 2000, 'center')
            this.setState({
              password: ''
            })
          }
        }
      }
    }).catch(e => {
      console.log('[登录异常]', e)
    })


  }
  _closeToast = () => {
    this.setState({
      dangeingToast: false
    })
  }
  forgetPass = () => {
    //跳转到找回密码页面
    this.setState({
      password: '',
    })
    this.props.navigation.navigate("ForgetPass")

  }
  rootAgree = () => {
    this.props.navigation.navigate("Agreement")
  }
  changeCircle = () => {
    //是否已阅读并同意
    this.setState({
      rootControl: !this.state.rootControl
    })
  }
  changeShowPass = () => {
    //切换密码可见或隐藏
    this.setState({
      showPassword: !this.state.showPassword
    })
  }
  regiest = () => {
    //跳转到注册页面
    this.props.navigation.navigate("Regiest");

  }
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    Keyboard.addListener('keyboardDidShow', (event) => {
      this.setState({
        keyposition: {
          regWrap: pxToPt(4),
          inpWrap: pxToPt(61),
          lastWrap: pxToPt(20),
          loginGo: pxToPt(63),
        }
      })
    })
    Keyboard.addListener('keyboardDidHide', (event) => {
      this.setState({
        keyposition: {
          regWrap: pxToPt(12),
          inpWrap: pxToPt(73),
          lastWrap: pxToPt(24),
          loginGo: pxToPt(102),
        }
      })
    })
    let brand = await DeviceInfo.getBrand()
    let deviceId = await DeviceInfo.getDeviceId()
    let systemName = await DeviceInfo.getSystemName()
    let email = await AsyncStorage.getItem("email") || ''
    if (email) {
      this.setState({
        brand,
        deviceId,
        systemName,
        email: email
      })
    } else {
      this.setState({
        brand,
        deviceId,
        systemName,
      })
    }
  }
  onBackAndroid = () => {
    BackHandler.exitApp();
    return;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)

  }


  render() {
    let { result, keyposition } = this.state
    var re = /^[a-zA-Z\d]+([-_\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/
    return (
      <>
        <StatusBar backgroundColor="#3D72E4" barStyle={'light-content'}></StatusBar>
        <View style={styles.container}>
          <TouchableOpacity style={styles.arroWrap} >
            {/* <Image style={styles.arrow} source={require('../../../assets/icons/backo.png')}></Image> */}
          </TouchableOpacity>
          <View style={styles.texWrap}>
            <Text style={styles.tex}>欢迎登陆</Text>
          </View>
          <View style={{ ...styles.regWrap, marginTop: keyposition.regWrap }}>
            <Text style={styles.reg}>还没有账号，</Text>
            <View style={{ borderBottomWidth: pxToPt(1), borderBottomColor: '#fff' }}>
              <Text style={styles.regGo} onPress={this.regiest}>立即注册</Text>
            </View>
          </View>
          <View style={{ ...styles.inpWrap, marginTop: keyposition.inpWrap }}>
            <View style={{ ...styles.inp, marginBottom: pxToPt(16) }}>
              <View style={styles.inpImgWrap}>
                <Image style={styles.inpImg} source={require('../../../assets/icons/loginjujh.png')}></Image>
              </View>
              <View style={styles.inpTexWrap}>
              </View>
              <TextInput
                selectionColor="white"
                style={styles.inpEmail}
                placeholder='请输入邮箱'
                placeholderTextColor='#ccc'
                onChangeText={(myemail) => {
                  !!myemail ? myemail : myemail = this.props.email
                  this.setState({ email: myemail })
                }}
                value={this.state.email}
              />
            </View>
            <View style={{ ...styles.inp, justifyContent: 'space-between' }}>
              <>
                <View style={styles.inpImgWrap}>
                  <Image style={styles.inpImg} source={require('../../../assets/icons/loginp.png')}></Image>
                </View>
                <View style={styles.inpTexWrap}>
                </View>
                <TextInput style={styles.inpTex}
                  selectionColor="#fff"
                  placeholder='请输入密码'
                  placeholderTextColor='#ccc'
                  secureTextEntry={this.state.showPassword} //隐藏输入内容
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                />
              </>
              <View style={styles.inpIcon}>
                <TouchableOpacity onPress={this.changeShowPass} style={{ height: '100%', width: pxToPt(20), justifyContent: 'center' }}>
                  {
                    this.state.showPassword ? <Image style={styles.inpImgLast} source={require('../../../assets/icons/eyer1.png')}></Image> : <Image style={styles.inpImgLast} source={require('../../../assets/icons/eyee4.png')}></Image>
                  }
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ ...styles.lastWrap, marginTop: keyposition.regWrap }}>
            <View style={styles.lastCir}>
              <TouchableOpacity onPress={this.changeCircle} style={{ height: pxToPt(25), width: pxToPt(25), alignItems: 'flex-end', justifyContent: 'center' }} >
                {
                  this.state.rootControl ?
                    <Image style={styles.cirImg} source={require('../../../assets/icons/agree2.png')}></Image> :
                    <Image style={styles.cirImg} source={require('../../../assets/icons/agree1.png')} />
                }
              </TouchableOpacity>
              <Text style={styles.cirTex} onPress={this.rootAgree}>我已阅读并同意《用户协议》</Text>
            </View>
            <View style={styles.lastpro} >
              <Image style={styles.proImg} source={require('../../../assets/icons/loginjhih.png')}></Image>
              <Text style={styles.proTex} onPress={this.forgetPass}>忘记密码</Text>
            </View>
          </View>
          {
            this.state.email !== '' && this.state.password !== '' && this.state.password.length >= 6 && this.state.rootControl === true && re.test(this.state.email) ?
              <TouchableHighlight onPress={this.loginGo} style={{ ...styles.loginGo, marginTop: keyposition.loginGo, backgroundColor: '#fff' }}
                underlayColor="rgba(255,255,255,1)">
                <Text style={styles.loginTex}>登录</Text>
              </TouchableHighlight> : <View style={{ ...styles.loginGo, marginTop: keyposition.loginGo, backgroundColor: 'rgba(255,255,255,.7)' }}
                underlayColor="rgba(255,255,255,.7)">
                <Text style={styles.loginTex}>登录</Text>
              </View>
          }
          {
            this.state.dangeingToast ? <>
              <LoginToast
                onClose={this._closeToast}
                texOne={`${result.result.text}`}
                texTwo={`电话: ${result.result.phone}`}
                texThree={`微信: ${result.result.wechat} `}
                texfour={`邮箱: ${result.result.email}`}
              ></LoginToast>
            </> : <></>
          }
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#3D72E4',
    paddingTop: isIphoneX() ? pxToPt(44) : null,

  },
  arroWrap: {
    height: pxToPt(44),
    justifyContent: 'center',

  },
  arrow: {
    width: pxToPt(11.82),
    height: pxToPt(22)
  },
  texWrap: {
    marginTop: pxToPt(50),
    marginLeft: pxToPt(40),
    height: pxToPt(48),
    // paddingLeft: pxToPt(16)
  },
  tex: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: pxToPt(34)
  },
  regWrap: {
    flexDirection: 'row',
    marginLeft: pxToPt(40),
    // marginTop: pxToPt(12),
    width: pxToPt(160),
    height: pxToPt(22),
    // paddingLeft:pxToPt(16)

  },
  reg: {
    color: '#FFF5FA',
    fontSize: pxToPt(16),
  },
  regGo: {
    color: '#FFF5FA',
    // height:pxToPt(30),
    // paddingBottom:pxToPt(4),
    // borderBottomWidth: pxToPt(1),
    // borderBottomColor: '#fff',
    fontSize: pxToPt(16),
  },
  inpWrap: {
    // marginTop: pxToPt(73),
    marginLeft: pxToPt(36),
  },
  inp: {
    flexDirection: 'row',
    width: pxToPt(303),
    height: pxToPt(48),
    borderWidth: pxToPt(1),
    borderColor: '#fff',
    borderRadius: pxToPt(8),
    alignItems: 'center',
    // marginBottom: 16,
    paddingRight: pxToPt(20)
  },
  inpImgWrap: {
    marginLeft: pxToPt(20),
    marginRight: pxToPt(11),
  },
  inpIcon: {
    marginLeft: pxToPt(60)
  },

  inpImg: {
    width: pxToPt(22),
    height: pxToPt(22),
  },
  inpTexWrap: {
    borderLeftWidth: pxToPt(1),
    borderLeftColor: '#FFFEFF',
    height: pxToPt(12),
  },
  inpTex: {
    // paddingLeft: 5,
    width: pxToPt(160),
    overflow: 'hidden',
    fontSize: pxToPt(15),
    color: '#fff'
  },
  inpEmail: {
    // paddingLeft: pxToPt(5),
    width: pxToPt(200),
    overflow: 'hidden',
    fontSize: pxToPt(15),
    color: '#fff'
  },
  inpImgLast: {
    width: pxToPt(14),
    height: pxToPt(8),
    resizeMode: 'contain'
  },
  lastWrap: {
    flexDirection: 'row',
    marginLeft: pxToPt(36),
    // marginTop: pxToPt(24),

  },
  lastCir: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cirImg: {
    width: pxToPt(12),
    height: pxToPt(12),
    marginRight: pxToPt(5),
  },
  cirTex: {
    width: pxToPt(148),
    fontSize: pxToPt(11),
    color: '#fff',
    marginRight: pxToPt(67)
  },
  lastpro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  proImg: {
    width: pxToPt(12),
    height: pxToPt(12),
    marginRight: pxToPt(4)
  },
  proTex: {
    width: pxToPt(46),
    color: '#fff',
    fontSize: pxToPt(11)
  },
  loginGo: {
    width: pxToPt(303),
    height: pxToPt(48),
    marginLeft: pxToPt(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToPt(8),
    // marginTop: pxToPt(102),

  },
  loginTex: {
    color: '#3D72E4',
    fontSize: pxToPt(18),
  }
})
