import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  SafeAreaView,
  Keyboard,
  ScrollView,
  BackHandler
} from 'react-native'
import { isIphoneX } from '../../../utils/isIphoneX'
import Toast from '../../../utils/api/Toast'
import axios from '../../../utils/api/request'
import { pxToPt } from '../../../utils/styleKits'
import AsyncStorage from '@react-native-community/async-storage'
import { ACCOUNT_REGIEST, ACCOUNT_SENDCODE, ACCOUNT_LOGIN } from '../../../utils/api/pathMap'
import { NavigationContext } from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info';

import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer

export default class regiest extends Component {
  static contextType = NavigationContext
  constructor(props) {
    super(props)
    this.timeId = null;
  }
  state = {
    showPassword: true, //是否显示密码
    email: '',
    code: '',
    password: '',
    btnText: '获取验证码',
    isCountDowning: false, //是否开启验证码定时器
    rootControl: true,
    brand: '',     //设备品牌
    deviceId: '',  //设备id
    systemName: '',  //系统
    keyposition: {
      texWrap: pxToPt(48),
      regWrap: pxToPt(12),
      inpWrap: pxToPt(69),
      lastCir: pxToPt(24),
      loginGo: pxToPt(59),
    },  
  }
  changeShowPass = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }
  getCode = async () => {
    //发送验证码
    var { email } = this.state
    if (this.state.isCountDowning) {
      return;
    }
    //验证邮箱
    var re = /^[a-zA-Z\d]+([-_\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/
    if (!re.test(email)) {
      Toast.message('邮箱格式不正确', 1000, 'center')
      return
    }
    await axios.post(ACCOUNT_SENDCODE, {
      account: email
    }, {
      Header: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(r => {
      if (r.data.code === 1) {
        Toast.message(r.data.message, 2500, 'center')
        this.setState({
          isCountDowning: true
        })
        let seconds = 60;
        // 重新获取(60s)
        this.setState({ btnText: `重新获取(${seconds}s)` })
        this.timeId = setInterval(() => {
          seconds--
          this.setState({ btnText: `重新获取(${seconds}s)` })
          if (seconds === 0) {
            clearInterval(this.timeId);
            this.setState({
              btnText: "重新获取",
              isCountDowning: false
            })
          }
        }, 1000)
      } else {
        Toast.message(r.data.message, 2000, 'center')
      }
    }).catch(e => console.log('[注册获取验证码]', e))
  }
  changeCircle = () => {
    //是否已阅读并同意
    this.setState({
      rootControl: !this.state.rootControl
    })
  }
  rootAgree = () => {
    this.props.navigation.navigate("Agreement")
  }
  enterRegiest = async () => {
    var { email, code, password } = this.state
    //验证邮箱
    var re = /^[a-zA-Z\d]+([-_\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/
    //验证密码
    var reg = /^[a-zA-Z0-9]{6,20}$/

    if (!re.test(email) || email === '') {
      Toast.message('邮箱格式不正确', 1000, 'center')
      return
    }
    if (code.length !== 6) {
      Toast.message('邮箱格式不正确', 1000, 'center')
      return
    }
    if (!reg.test(password) || password === '') {
      Toast.message('密码必须为6~20字母和数字', 1000, 'center')
      return
    }
    // 注册
    // 弹出注册成功 发送请求
    var res = await axios.post(ACCOUNT_REGIEST, {
      account: email,
      code: code,
      password: password,
    }, {
      Header: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    // 判断注册成功->跳转到login
    if (res.data.code === 1) {
      clearInterval(this.timeId)
      AsyncStorage.setItem('email', email)
      this.props.rootStore.setUserInfo(email, '')
      Toast.message(res.data.message, 1000, 'center')
      setTimeout(() => {
        this.enterLogin()
        return
      }, 1000)
    } else {
      Toast.message(res.data.message, 2000, 'center')
      return
    }

  }
  enterLogin = async () => {
    var { email, password, brand, deviceId, systemName } = this.state

    await axios.post(ACCOUNT_LOGIN, {
      account: email,
      password: password
    }, {
      headers: {
        "brand": brand,
        "deviceId": deviceId,
        "systemName": systemName,
      }
    }).then(r => {
      if (r.data.code === 1) {
        this.props.rootStore.setUserInfo(r.data.result.user_info.email, r.data.result.token)
        //儲存用戶數據到 本地緩存中 永久
        AsyncStorage.setItem('usertoken', r.data.result.token)
        AsyncStorage.setItem('email', email)
        AsyncStorage.setItem('appVersion', r.data.result.app_version)
        AsyncStorage.setItem('isUpdate', `${r.data.result.is_update}`)
        this.props.rootStore.setVersion(r.data.result.app_version, r.data.result.is_update)
        this.setState({
          email: '',
          password: ''
        })
        this.props.navigation.navigate('Tabbar')
      } else if (r.data.code === -1) {
        Toast.message(data.message, 1000, 'center')
      } else { //
        Toast.message(data.message, 1000, 'center')
      }
    }).catch(e => console.log('[注册后登录]', e))
  }
  goBack = () => {
    this.props.navigation.goBack()
  }
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    Keyboard.addListener('keyboardDidShow', (event) => {
      this.setState({
        keyposition: {
          texWrap: pxToPt(12),
          regWrap: pxToPt(4),
          inpWrap: pxToPt(15),
          lastCir: pxToPt(10),
          loginGo: pxToPt(10)
        }
      })
    })
    Keyboard.addListener('keyboardDidHide', (event) => {
      this.setState({
        keyposition: {
          texWrap: pxToPt(48),
          regWrap: pxToPt(12),
          inpWrap: pxToPt(69),
          lastCir: pxToPt(24),
          loginGo: pxToPt(59)
        }
      })
    })
    let brand = await DeviceInfo.getBrand()
    let deviceId = await DeviceInfo.getDeviceId()
    let systemName = await DeviceInfo.getSystemName()
    this.setState({
      brand,
      deviceId,
      systemName
    })
  }

  onBackAndroid = () => {
    BackHandler.exitApp();
    return;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)

  }

  render() {
    let { email, password, btnText, keyposition } = this.state
    return (
      <>
        <StatusBar backgroundColor="#3D72E4" barStyle={'light-content'}></StatusBar>

        <View style={styles.container}>
          <TouchableOpacity style={{ width: pxToPt(60), height: pxToPt(44), alignItems: 'center', justifyContent: 'center' }} onPress={this.goBack}>
            <Image style={styles.arrow} onPress={this.goBack} source={require('../../../assets/icons/backo.png')}></Image>
          </TouchableOpacity>
          <View style={{ ...styles.texWrap, marginTop: keyposition.texWrap }}>
            <Text style={styles.tex}>注册</Text>
          </View>
          <View style={{ ...styles.regWrap, marginTop: keyposition.regWrap }}>
            <Text style={styles.reg}>注册完成后可直接登录</Text>
          </View>
          <View style={{ ...styles.inpWrap, marginTop: keyposition.inpWrap }}>
            <View style={styles.inp}>
              <View style={styles.inpImgWrap}>
                <Image style={styles.inpImg} source={require('../../../assets/icons/loginjujh.png')}></Image>
              </View>
              <View style={styles.inpTexWrap}>
              </View>
              <TextInput
                selectionColor="#fff"
                style={{ ...styles.inpTex, width: pxToPt(180) }}
                placeholder='请输入邮箱'
                placeholderTextColor='#ccc'
                onChangeText={(email) => this.setState({ email })}
              />
            </View>
            <View style={styles.inp}>
              <View style={styles.inpImgWrap}>
                <Image style={styles.inpImg} source={require('../../../assets/icons/loginpppp.png')}></Image>
              </View>
              <View style={styles.inpTexWrap}>
              </View>
              <TextInput
                selectionColor="#fff"
                style={styles.inpTex}
                placeholder='请输入验证码'
                placeholderTextColor='#ccc'
                onChangeText={(code) => this.setState({ code })}
              />
              {
                this.state.isCountDowning ?
                  <>
                    <View style={{ ...styles.inpBtn, backgroundColor: 'rgba(255,255,255,.7)' }}>
                      <Text style={{ ...styles.btnTex, color: '#0066C8', fontSize: pxToPt(10) }}>{btnText}</Text>
                    </View>
                  </> :
                  <>
                    <View style={styles.inpBtn} >
                      <Text style={{ ...styles.btnTex, color: '#0066C8' }} onPress={this.getCode}>获取验证码</Text>
                    </View>
                  </>
              }
            </View>
            <View style={styles.inp}>
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
                />
              </>
              <View style={{ marginLeft: pxToPt(60), height: pxToPt(40) }}>
                <TouchableOpacity
                  style={{ height: '100%', justifyContent: 'center' }}
                  onPress={this.changeShowPass}>
                  {
                    this.state.showPassword ?
                      <Image style={styles.inpImgLast} source={require('../../../assets/icons/eyer1.png')}></Image> :
                      <Image style={styles.inpImgLast} source={require('../../../assets/icons/eyee4.png')}></Image>
                  }
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ ...styles.lastCir, marginTop: keyposition.lastCir }}>
            <TouchableOpacity onPress={this.changeCircle} style={{ height: pxToPt(25), width: pxToPt(25), justifyContent: 'center', alignItems: 'center' }} >
              {
                this.state.rootControl ?
                  <Image style={styles.cirImg} source={require('../../../assets/icons/agree2.png')}></Image> :
                  <Image style={styles.cirImg} source={require('../../../assets/icons/agree1.png')} />
              }
            </TouchableOpacity>
            <Text style={styles.cirTex} onPress={this.rootAgree}>我已阅读并同意《用户协议》</Text>
          </View>
          {
            email === '' || password === '' || this.state.rootControl === false ?
              <TouchableHighlight style={{ ...styles.loginGo, marginTop: keyposition.loginGo, backgroundColor: 'rgba(255,255,255,.6)' }}
                underlayColor="rgba(255,255,255,.6)">
                <Text style={styles.loginTex}>注册</Text>
              </TouchableHighlight> :
              <TouchableHighlight onPress={this.enterRegiest} style={{ ...styles.loginGo, backgroundColor: 'rgba(255,255,255,1)' }}
                underlayColor="rgba(255,255,255,.6)">
                <Text style={styles.loginTex}>注册</Text>
              </TouchableHighlight>
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
    paddingTop: Platform.OS === 'ios' ? pxToPt(44) : null,
  },
  arroWrap: {
    height: pxToPt(44),
    justifyContent: 'center',
    paddingLeft: pxToPt(16),

  },
  arrow: {
    width: pxToPt(11.82),
    height: pxToPt(22)
  },
  texWrap: {
    // marginTop: this.state.keyposition.texWrap,
    marginLeft: pxToPt(40),
    height: pxToPt(48)
  },
  tex: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: pxToPt(34)
  },
  regWrap: {
    flexDirection: 'row',
    marginLeft: pxToPt(40),
    // marginTop: this.state.keyposition.regWrap,
    width: pxToPt(180),
    height: pxToPt(22),
  },
  reg: {
    color: '#FFF5FA',
    fontSize: pxToPt(16),
  },
  inpWrap: {
    // marginTop: this.state.keyposition.inpWrap ,
    marginLeft: pxToPt(42),
    height: pxToPt(159),
    width: pxToPt(303),
    borderWidth: pxToPt(1),
    borderColor: '#fff',
    borderRadius: pxToPt(12),
    paddingLeft: pxToPt(20),
    paddingRight: pxToPt(20),
    paddingLeft: pxToPt(16),

  },
  inp: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    height: pxToPt(45)
  },
  inpImg: {
    width: pxToPt(22),
    height: pxToPt(22),
  },
  inpTexWrap: {
    marginLeft: pxToPt(12),
    borderLeftWidth: 1,
    borderLeftColor: '#FFFEFF',
    height: pxToPt(12),
  },
  inpTex: {
    paddingLeft: 5,
    width: pxToPt(145),
    overflow: 'hidden',
    fontSize: pxToPt(15),
    color: '#fff'
  },
  inpBtn: {
    backgroundColor: '#FFF',
    width: pxToPt(87),
    height: pxToPt(32),
    borderRadius: pxToPt(8),
    paddingLeft: pxToPt(14),
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTex: {
    height: '100%',
    width: '100%',
    color: '#0066C8',
    fontSize: pxToPt(12),
    lineHeight: pxToPt(32),

  },
  inpImgLast: {
    width: pxToPt(14),
    height: pxToPt(6),
  },
  loginGo: {
    width: pxToPt(303),
    height: pxToPt(48),
    marginLeft: pxToPt(42),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToPt(8),
    // marginTop: this.state.keyposition.loginGo,
  },
  loginTex: {
    color: '#3D72E4',
    fontSize: pxToPt(18),
  },
  lastCir: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: pxToPt(44),
    // marginTop: this.state.keyposition.lastCir
  },
  cirImg: {
    width: pxToPt(12),
    height: pxToPt(12),
  },
  cirTex: {
    width: pxToPt(148),
    fontSize: pxToPt(11),
    color: '#fff',
    marginRight: pxToPt(71)
  },
  lastpro: {
    flexDirection: 'row',
    alignItems: 'center'
  },
})
