import React, { Component } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
  Modal,
  Platform,
  SafeAreaView
} from 'react-native'
import Toast from '../../../utils/api/Toast'
import ToastTwo from "../../../components/ToastTwo"
import ImagePicker from 'react-native-image-crop-picker'
import { USER_INDEX, SETTING_LOGOUT, USER_SAVE, UPLOAD_PIC } from '../../../utils/api/pathMap'
import { pxToPt } from "../../../utils/styleKits";
import { NavigationContext } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from '../../../utils/api/request'
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer

/**
 * 
 * @param {*} 设置
 */
export default class setting extends Component {
  static contextType = NavigationContext
  constructor(props) {
    super(props)
    this.state = {
      avaUrl: '',
      avater_url: '',   //头像地址
      email: this.props.rootStore.email,
      user_name: this.props.rootStore.name,    //用户名
      phoneNum: this.props.rootStore.phoneNum,  //电话号码 
      token: this.props.rootStore.token,
      canChange: false, //可编辑状态
      showModal: false,  //弹窗
      complate: false,  //区分返回和完成按钮
    }
  }
  //我的
  userIndex = async () => {
    await axios.get(USER_INDEX, {
      headers: {
        "Content-Type": "application/json",
        "token": this.state.token
      }
    }).then(r => {
      if (r.data.code === 1) {
        this.setState({
          avater_url: r.data.result.avater_url,
          email: r.data.result.email,
          user_name: r.data.result.user_name,
        })
      }
      else {
        Toast.message(r.data.message, 2000, 'center')
      }
    }).catch(e => console.log('[用户信息修改页]', e))
  }

  loginOut = async () => {
    await axios.post(SETTING_LOGOUT, {}, {
      headers: {
        "token": this.state.token
      }
    }).then(r => {
      //清空本地储存的token
      AsyncStorage.setItem('usertoken', '')
      AsyncStorage.setItem('email', '')
      AsyncStorage.setItem('bigData', '')
      AsyncStorage.setItem('userName', '')

      //清空仓库数据email token
      this.props.rootStore.clearUserInfo()
      this.setState({
        avater_url: ''
      })
      //跳转到登录页面
      this.props.navigation.navigate("Login")
    }).catch(e =>
      console.log('[清理缓存]', e)
    )

  }
  componentDidMount() {
    this.userIndex()
  }
  // 调用相册 获取本地图片路径
  upLoadHead = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.props.rootStore.setAvaUrl(image.path)
      this.getHead(image)
    }).catch(e => console.log('[获取本地图片]', e))

  }
  //发送上头像图片传请求
  getHead = async (image) => {
    let file = { uri: image.path, type: 'multipart/form-data', name: image.mime }
    let formdata = new FormData()
    formdata.append('file', file)
    await axios.post(UPLOAD_PIC, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "token": this.state.token
      }
    }).then(r => {
      if (r.data.code === 1) {
        this.setState({
          avater_url: r.data.result.url
        })
      } else {
        //弹窗不成功
        Toast.message(r.data.message, 1000, 'center')
        return
      }
    }).catch(e => {
      console.log('[头像上传]', e)
    })
  }
  //信息完成 并 提交
  onsumbit = async () => {
    const { avater_url, user_name, phoneNum } = this.state
    var reg = /\d/g
    // 电话号码存在 以及 不满足电话号码匹配规则就 啥也不做
    if ((phoneNum + '').length > 16) {
      Toast.message('手机号码格式不正确', 1000, 'center')
      this.setState({
        showModal: false
      })
      return
    }
    if (user_name.length == null || user_name.length > 14) {
      Toast.message('用户名不得超过14个字母，或7个中文', 2000, 'center')
      this.setState({
        showModal: false
      })
      return
    }
    let name = user_name
    let phone = phoneNum
    !!name ? name : name = this.props.rootStore.name
    !!phone ? phone : phone = this.props.rootStore.phoneNum
    console.log('[发送name,avater_url]', name, avater_url)
    //发送请求
    //发送头像路径 用户名 手机号
    await axios.put(USER_SAVE, {
      "user_name": name,
      "avater_url": avater_url,
      "phone": phone
    }, {
      headers: {
        "token": this.state.token,
      }
    }).then(r => {
      if (r.data.code === 1) {
        this.props.rootStore.setPNInfo(avater_url, phoneNum, user_name)
        AsyncStorage.setItem('avater_url', avater_url)
        AsyncStorage.setItem('userName', user_name)
        this.setState({
          canChange: false,
          showModal: false
        })
      } else {
        Toast.message(r.data.message, 1000, 'center')
      }
    }).catch(e => {
      console.log('[用户信息提交]', e)
    })

  }
  async componentDidMount() {
    let avater = this.props.rootStore.avaUrl
    let userName = await AsyncStorage.getItem('userName') || ''
    let avaUrl = this.props.rootStore.avaUrl
    this.setState({
      avater_url: avater,
      user_name: userName,
      avaUrl: avaUrl
    })
  }

  render() {
    let { rootStore } = this.props
    return (
      <>
        {
          Platform.OS === 'ios' ? <View style={{ marginTop: pxToPt(44) }}></View> :
            <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        }
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>

          <View style={styles.arroWrap}>
            <TouchableOpacity
              style={{ width: pxToPt(60), height: pxToPt(60), marginRight: pxToPt(75), marginLeft: pxToPt(16), justifyContent: 'center' }}
              onPress={() => {
                this.state.canChange ? rootStore.setAvaUrl(this.state.avaUrl) : null
                this.props.navigation.navigate('Tabbar')
              }}>
              <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
            </TouchableOpacity>
            <Text style={styles.title}>个人中心</Text>

            {
              this.state.canChange ?
                <TouchableOpacity
                  style={{ height: '100%', justifyContent: 'center' }}
                  onPress={this.onsumbit}
                >
                  <Text style={{ fontSize: pxToPt(12), color: '#3D72E4' }}>完成</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={{ height: '100%', justifyContent: 'center' }} onPress={() => {
                  this.setState({
                    canChange: true
                  })
                }}>
                  <Text style={{ fontSize: pxToPt(12), color: '#3D72E4' }}>编辑</Text>
                </TouchableOpacity>
            }
          </View>
          <View style={styles.container}>
            <View style={styles.box}>
              <Text style={styles.txt}>头像</Text>
              {
                this.state.canChange ?
                  <TouchableHighlight
                    underlayColor="#abcdef"
                    style={{ width: pxToPt(40), height: pxToPt(40), borderRadius: pxToPt(20), overflow: 'hidden' }}
                    onPress={this.upLoadHead}
                  >
                    {
                      !!rootStore.avaUrl === true ?
                        <Image style={{ width: pxToPt(40), height: pxToPt(40) }} source={{ uri: rootStore.avaUrl }}></Image>
                        :
                        <Image style={{ width: pxToPt(40), height: pxToPt(40) }} source={require('../../../assets/icons/avatar/tou2.png')}></Image>
                    }
                  </TouchableHighlight>
                  :
                  <View style={{ width: pxToPt(40), height: pxToPt(40), borderRadius: pxToPt(20), overflow: 'hidden' }}>
                    {
                      !!rootStore.avaUrl === true ?
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            this.context.navigate('LightBox', { url: rootStore.avaUrl })
                          }}
                        >
                          <Image style={{ width: pxToPt(40), height: pxToPt(40) }} source={{uri: rootStore.avaUrl }}></Image>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            this.context.navigate('LightBox', { url: '../../../assets/icons/avatar/tou2.png'})
                          }}
                        >
                          <Image style={{ width: pxToPt(40), height: pxToPt(40) }} source={require('../../../assets/icons/avatar/tou2.png')}></Image>
                        </TouchableOpacity>
                    }
                  </View>
              }

            </View>
            <View style={styles.list}>
              {
                this.state.canChange ?
                  <>
                    <></>
                    <View style={styles.rowItem}>
                      <Text style={styles.itTxt}>用户名</Text>
                      <TextInput
                        style={styles.inpt}
                        placeholder={'请输入用户名'}
                        onChangeText={(user_name) => {
                          this.setState({ user_name })
                        }}

                      ></TextInput>
                    </View>
                    <View style={styles.rowItem}>
                      <Text style={styles.itTxt}>手机号</Text>
                      <TextInput
                        keyboardType={'numeric'}
                        style={styles.inpt}
                        placeholder={'请输入手机号'}
                        onChangeText={(phoneNum) => this.setState({ phoneNum })}

                      ></TextInput>
                    </View>
                  </> :
                  <>
                    <View style={styles.rowItem}>
                      <Text style={styles.itTxt}>用户名</Text>
                      <Text
                        style={styles.inpt}
                      >{rootStore.name}</Text>
                    </View>
                    <View style={styles.rowItem}>
                      <Text style={styles.itTxt}>手机号</Text>
                      <Text
                        style={styles.inpt}
                      >{this.state.phoneNum === '' ? '请输入手机号' : rootStore.phoneNum}</Text>
                    </View>
                  </>
              }
              <View style={styles.rowItem}>
                <Text style={styles.itTxt}>邮箱</Text>
                <Text
                  style={styles.inpt}
                >{rootStore.email}</Text>
              </View>
            </View>
            <Modal
              animationType={'slide'}
              visible={this.state.showModal}
              transparent={true}
            >
              <View style={{ flex: 1, alignItems: 'center', marginTop: pxToPt(193) }}>
                <View style={{ width: pxToPt(319), height: pxToPt(166), borderRadius: pxToPt(32), backgroundColor: '#2B2D33', paddingLeft: pxToPt(20), paddingRight: pxToPt(20), paddingTop: pxToPt(32), paddingBottom: pxToPt(32) }}>
                  <Text style={{ color: '#FFFFFF', fontWeight: '500', fontSize: pxToPt(14), height: pxToPt(44) }}>
                    请确认是否保存修改内容。
                </Text>
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginTop: pxToPt(28) }}>
                    <TouchableHighlight
                      onPress={
                        this.cancelSumb
                      }

                      style={{ width: pxToPt(88), height: pxToPt(30), borderRadius: pxToPt(14), justifyContent: 'center', alignItems: 'center', borderWidth: pxToPt(1), borderColor: '#fff' }}>
                      <Text style={{ color: '#fff', fontSize: pxToPt(14) }}>取消</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={this.onsumbit}
                      style={{ width: 88, height: 30, borderRadius: 14, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" }}>
                      <Text style={{ color: '#3D72E4', fontSize: 14 }}>确认</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
            {
              this.state.canChange ?
                <></> :
                <>
                  <View
                    style={{ height: pxToPt(44), width: pxToPt(343), marginLeft: pxToPt(16), marginTop: pxToPt(286), borderRadius: pxToPt(8), overflow: 'hidden' }}
                  >
                    <ToastTwo
                      loginOut={this.loginOut}
                      zbtnBC={"#3D72E4"}
                      zbtnFC={'#fff'}
                      zbtnF={'退出登录'}
                      qbtnBoC={"#3D72E4"}
                      qbtnBC={"#3D72E4"}
                      showTex={'退出账号不会删除数据，下次依旧可以使用本账号'}
                    ></ToastTwo>
                  </View>
                </>
            }
          </View>

        </SafeAreaView>
      </>
    )
  }
}
const styles = StyleSheet.create({
  arroWrap: {
    height: pxToPt(44),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  arrow: {
    width: pxToPt(11.82),
    height: pxToPt(22),
  },
  title: {
    color: '#2B2D33',
    fontSize: pxToPt(18),
    fontWeight: "500",
    fontFamily: 'PingFang SC',
    marginRight: pxToPt(108)
  },
  container: {
    flex: 1
  },
  box: {
    marginTop: pxToPt(8),
    paddingTop: pxToPt(10),
    paddingBottom: pxToPt(10),
    paddingLeft: pxToPt(16),
    paddingRight: pxToPt(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  txt: {
    height: pxToPt(21),
    lineHeight: pxToPt(21),
    fontSize: pxToPt(15),
    fontWeight: '400',
    color: '#2B2D33'
  },
  list: {
    marginTop: pxToPt(8),
    backgroundColor: '#FFFFFF'
  },
  rowItem: {
    marginLeft: pxToPt(16),
    marginRight: pxToPt(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: pxToPt(44),
    // borderBottomColor: '#F5F5F7',
  },
  itTxt: {
    height: pxToPt(21),
    lineHeight: pxToPt(21),
    fontSize: pxToPt(15),
    color: '#2B2D33'
  },
  inpt: {
    // paddingTop: 0,
    // paddingBottom: 0,
    // textAlign: 'center',
    // height: 32,
    // fontSize: 14,
    // borderBottomWidth: 1,
    // borderBottomColor: '#A6B8E0',
    // color: '#5A5D66',
  },
})
