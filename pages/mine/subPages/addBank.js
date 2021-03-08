import React, { Component } from "react"
import { View, Platform, Text, Image, ImageBackground, TextInput, StyleSheet, StatusBar, TouchableOpacity, Modal, ScrollView, SafeAreaView } from 'react-native'
import axios from '../../../utils/api/request'
import { BANKS_BANKLIST, BANKS_ADDBANK } from '../../../utils/api/pathMap'
import mobx from '../../../utils/mobx'
import {isIphoneX} from '../../../utils/isIphoneX'
import LoginToast from '../../../utils/LoginToast'
import { pxToPt } from "../../../utils/styleKits";
import Toast from "../../../utils/api/Toast"
/**
 * 添加银行卡
 */
export default class addBank extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chooseBank: [],  //添加银行卡
      openbank: '请选择开户行',
      show: false,
      account_no: '',//银行卡号
      account_name: '',//开户名
      account_address: '', //开户银行地址
      bank_id: ''
    }
  }

  //选择开户行

  _gotoBank = async () => {
    await axios.get(BANKS_BANKLIST, {
      headers: {
        "Content-Type": "application/json",
        "token": mobx.token
      }
    })
      .then(r => {
        if (r.data.code === 1) {
          console.log('开户银行', r.data.result)
          this.setState({
            chooseBank: r.data.result,
            show: true
          })
        } else {
          Toast.message(r.data.message, 2000, 'center')
        }
      })
      .catch(e => console.log(e))
  }
  _confirm = async () => {
    var { account_no, account_name, openbank, bank_id, account_address } = this.state
    if (account_no === ''|| account_no.length > 20) {
      Toast.message('银行卡号填写不正确', 2000, 'center')
      return
    }
    if (account_name === '') {
      Toast.message('开户名未填写', 2000, 'center')
      return
    }
    await axios.post(BANKS_ADDBANK, {
      account_no: account_no,
      account_name: account_name,
      bank_id: bank_id,
      affiliates: account_address
    }, {
      headers: {
        "token": mobx.token
      }
    })
      .then(r => {
        if (r.data.code === 1) {
          Toast.message(r.data.message, 1000, 'center')
          this.setState({
            account_no: '',
            account_name: '',
            openbank: '请选择开户行',
            showSuccess: true,
          })
          setTimeout(() => {
            this.props.navigation.goBack()
          }, 1000)
        }
        else {
          Toast.message(r.data.message, 2000, 'center')
          return
        }
      })
      .catch(e => console.log('[选择银行卡]', e))
  }
  render() {
    return (
      <>
      {
          Platform.OS === 'ios' ? <StatusBar></StatusBar>
            : <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        }
      <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
        <View style={{ flex: 1,backgroundColor:'#f8f9fa' }}>
        <View style={styles.arroWrap}>
          <TouchableOpacity
            style={{ width: pxToPt(60), height: pxToPt(60), alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              this.props.navigation.goBack()
            }}>
            <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.headtitle}>添加银行卡</Text>
        </View>
        <View style={styles.list}>
          <TouchableOpacity style={styles.item} activeOpacity={1} onPress={this._gotoBank}>
            <Text style={styles.title}>开户银行</Text>
            <View style={styles.rtBox}>
              <Text style={styles.note}>{this.state.openbank}</Text>
              <Image source={require('../../../assets/icons/arrows/ck.png')}></Image>
            </View>
          </TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.title}>开户名</Text>
            <TextInput style={styles.ipt}
              textAlign={'right'}
              placeholder="请输入户名"
              placeholderTextColor="#5A5D66"
              onChangeText={(account_name) => this.setState({ account_name })}
            ></TextInput>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>银行卡号</Text>
            <TextInput style={styles.ipt}
              textAlign={'right'}
              keyboardType='numeric'
              placeholder="请输入银行卡号"
              placeholderTextColor="#5A5D66"
              onChangeText={(account_no) => this.setState({ account_no })}
            ></TextInput>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>开户支行(选填)</Text>
            <TextInput style={styles.ipt}
              textAlign={'right'}
              placeholder="请输入开户支行"
              placeholderTextColor="#5A5D66"
              onChangeText={(account_address) => this.setState({ account_address })}
            ></TextInput>
          </View>
        </View>
        {
          <Modal visible={this.state.show} >
            <View style={styles.arroWrap1}>
              <TouchableOpacity
                style={{ width: pxToPt(60), height: pxToPt(44), paddingLeft: pxToPt(16), justifyContent: 'center' }}
                onPress={() => {
                  this.setState({
                    show: false
                  })
                }}>
                <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
              </TouchableOpacity>
              <Text style={styles.headtitle}>选择银行卡</Text>
            </View>
            <ScrollView>
              <View style={{ paddingLeft: pxToPt(16), paddingRight: pxToPt(20), paddingTop: pxToPt(10), paddingBottom: pxToPt(10), backgroundColor: '#fff', overflow: 'hidden', borderWidth: pxToPt(1), borderColor: '#fff' }}>
                {
                  this.state.chooseBank.map((v, i) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={i} style={styles.bank} onPress={() => {
                          this.setState({
                            openbank: v.short_name,
                            bank_id: v.bank_id,
                            show: false
                          })
                        }}>
                        <ImageBackground
                          activeOpacity={1}
                          source={{ uri: v.background_url }}
                          style={styles.wrapperBc}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.icon}>
                              <Image source={{ uri: v.icon }} style={{ width: pxToPt(28), height: pxToPt(28) }}></Image>
                            </View>
                            <Text style={styles.bankTitle}>{v.full_name}</Text>
                          </View>
                          <View>
                            {/* <Text style={styles.bankNum}>{v.bank_id}</Text> */}
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </ScrollView>
          </Modal>
        }
        <TouchableOpacity style={styles.btn} activeOpacity={.7} onPress={this._confirm}>
          <Text style={styles.txt}>确认</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
    )
  }
}
class Pionts extends Component {
  render() {
    let item = Array.from({ length: 3 }, (v, i) => (
      <View style={{ height: pxToPt(3), width: pxToPt(3), backgroundColor: '#F5F5F7', marginLeft: pxToPt(4) }} key={i}></View>
    ))
    return (
      <View style={{ flexDirection: 'row' }}>
        {item}
      </View>
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
  arroWrap1:{
    height: pxToPt(44),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop:Platform.OS === 'ios' ? isIphoneX() ? pxToPt(44) : pxToPt(24) : null
  },
  arrow: {
    width: pxToPt(11.82),
    height: pxToPt(22),
  },
  headtitle: {
    color: '#2B2D33',
    fontSize: pxToPt(18),
    fontWeight: "500",
    fontFamily: 'PingFang SC',
    marginLeft: pxToPt(84)
  },
  list: {
    paddingLeft: pxToPt(16),
    paddingRight: pxToPt(16),
    backgroundColor: '#FFFFFF'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: pxToPt(44),
    borderBottomWidth: pxToPt(1),
    borderBottomColor: '#F5F5F7'
  },
  title: {
    height: pxToPt(21),
    lineHeight: pxToPt(21),
    fontSize: pxToPt(15),
    color: '#2B2D33'
  },
  ipt: {
    paddingTop: 0,
    paddingBottom: 0,
    height: pxToPt(30),
    borderBottomWidth: pxToPt(1),
    borderBottomColor: '#A6B8E0',
    color: '#5A5D66'
  },
  rtBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  note: {
    marginRight: pxToPt(8),
    height: pxToPt(20),
    lineHeight: pxToPt(20),
    fontSize: pxToPt(14),
    color: '#5A5D66'
  },
  btn: {
    marginTop: pxToPt(318),
    marginLeft: pxToPt(16),
    marginRight: pxToPt(16),
    height: pxToPt(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToPt(8),
    backgroundColor: '#3D72E4'
  },
  txt: {
    height: pxToPt(21),
    lineHeight: pxToPt(21),
    fontSize: pxToPt(15),
    color: '#FFFFFF'
  },
  bank: {
    marginTop: pxToPt(8),
    marginBottom: pxToPt(10),
    height: pxToPt(120),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: pxToPt(0), height: pxToPt(1) },
    shadowOpacity: 0.8,
    shadowRadius: pxToPt(6),
    elevation: pxToPt(2),
    overflow: 'hidden'
  },
  img: {
    position: 'absolute',
    width: pxToPt(365),
    height: '100%',
    margin: 0
  },
  num: {
    marginTop: pxToPt(31),
    left: pxToPt(120),
    height: pxToPt(20),
    lineHeight: pxToPt(20),
    fontSize: pxToPt(14),
    color: '#F5F5F7'
  },
  pit: {
    left: pxToPt(154),
    top: pxToPt(50)
  },
  wrapperBc: {
    width: pxToPt(343),
    height: pxToPt(120),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: pxToPt(12),
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToPt(20),
    marginLeft: pxToPt(10),
    width: pxToPt(40), height: pxToPt(40),
    backgroundColor: '#fff',
    borderRadius: pxToPt(20)
  },
  bankTitle: {
    marginTop: pxToPt(29),
    marginLeft: pxToPt(8),
    fontSize: pxToPt(16),
    fontWeight: "500",
    color: '#F5F5F7'
  },
  bankNum: {
    color: '#F5F5F7',
    paddingRight: pxToPt(12),
    fontSize: pxToPt(14),
    fontWeight: '400',
    marginTop: pxToPt(31),
    marginBottom: pxToPt(50)

  },
})