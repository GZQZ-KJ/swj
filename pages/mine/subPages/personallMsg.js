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
} from 'react-native'
import Toast from '../../../utils/api/Toast'
import ToastTwo from "../../../components/ToastTwo"
import ImagePicker from 'react-native-image-crop-picker'
import { USER_INDEX, SETTING_LOGOUT, USER_SAVE, UPLOAD_PIC } from '../../../utils/api/pathMap'

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
  constructor(props) {
    super(props)
    this.state = {
      file: '',
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
      if (r.data.code === 1) {
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

      } else {
        Toast.message(r.data.message, 1000, 'center')

      }
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
      this.getHead(image)
      console.log('设置头像路径', image.path)
      this.props.rootStore.setAvaUrl(image.path)
      this.setState({
        avater_url: image.path
      })
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
    if (user_name.length > 14) {
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
    console.log('[发送name,avater_url]',name,avater_url)
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
    let avater = await AsyncStorage.getItem('avater_url')
    let userName = await AsyncStorage.getItem('userName') || ''
    this.setState({
      avater_url: avater,
      user_name: userName
    })
  }

  render() {
    let { rootStore } = this.props
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        <View style={styles.arroWrap}>
          <TouchableOpacity style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
            // if (this.state.canChange) {
            //   this.setState({
            //     showModal: true
            //   })
            // } else {
            this.props.navigation.navigate('Tabbar')

            // }
          }}>
            <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.title}>个人中心</Text>

          {
            this.state.canChange ?
              <TouchableOpacity
                style={{ paddingRight: 10, height: '100%', justifyContent: 'center' }}
                // onPress={() => {
                //   this.setState({
                //     showModal: true,
                //     complate: true,
                //   })
                // }}
                onPress={this.onsumbit}
              >
                <Text>完成</Text>
              </TouchableOpacity> :
              <TouchableOpacity style={{ paddingRight: 10, height: '100%', justifyContent: 'center' }} onPress={() => {
                this.setState({
                  canChange: true
                })
              }}>
                <Text >编辑</Text>
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
                  style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden' }}
                  onPress={this.upLoadHead}
                >
                  {
                    !rootStore.avaUrl === true ?
                      <Image style={{ width: 40, height: 40 }} source={require('../../../assets/icons/avatar/tou2.png')}></Image>
                      :
                      <Image style={{ width: 40, height: 40 }} source={{ uri: this.state.avater_url }}></Image>
                  }
                </TouchableHighlight>
                :
                <View style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden' }}>
                  {
                    !rootStore.avaUrl === true ?
                      <Image style={{ width: 40, height: 40 }} source={require('../../../assets/icons/avatar/tou2.png')}></Image>
                      :
                      <Image style={{ width: 40, height: 40 }} source={{ uri: rootStore.avaUrl }}></Image>
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
                    >{this.state.phoneNum === '' ? 'Phone Number' : rootStore.phoneNum}</Text>
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
            <View style={{ flex: 1, alignItems: 'center', marginTop: 193 }}>
              <View style={{ width: 319, height: 166, borderRadius: 32, backgroundColor: '#2B2D33', paddingLeft: 20, paddingRight: 20, paddingTop: 32, paddingBottom: 32 }}>
                <Text style={{ color: '#FFFFFF', fontWeight: '500', fontSize: 14, height: 44 }}>
                  请确认是否保存修改内容。
                </Text>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginTop: 28 }}>
                  <TouchableHighlight
                    onPress={
                      this.cancelSumb
                    }

                    style={{ width: 88, height: 30, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#fff' }}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>取消</Text>
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
                  style={{ height: 44, width: 343, marginLeft: 26, marginTop: 286, borderRadius: 8, overflow: 'hidden' }}
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

      </>
    )
  }
}
const styles = StyleSheet.create({
  arroWrap: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // paddingLeft: 26,
    backgroundColor: '#fff'
  },
  arrow: {
    width: 11.82,
    height: 22,
  },
  title: {
    color: '#2B2D33',
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'PingFang SC'
  },
  container: {
    flex: 1
  },
  box: {
    marginTop: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  txt: {
    height: 21,
    lineHeight: 21,
    fontSize: 15,
    fontWeight: '400',
    color: '#2B2D33'
  },
  list: {
    marginTop: 8,
    backgroundColor: '#FFFFFF'
  },
  rowItem: {
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    // borderBottomColor: '#F5F5F7',
  },
  itTxt: {
    height: 21,
    lineHeight: 21,
    fontSize: 15,
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
