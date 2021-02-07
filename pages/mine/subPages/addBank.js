import React, { Component } from "react"
import { View, Text, Image, TextInput, StyleSheet, StatusBar, TouchableOpacity, Modal, ScrollView, TouchableHighlight } from 'react-native'
import axios from '../../../utils/api/request'
import { BANKS_BANKLIST, BANKS_ADDBANK } from '../../../utils/api/pathMap'
import mobx from '../../../utils/mobx'
import LoginToast from '../../../utils/LoginToast'
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
    this.setState({
      show: true
    })
    await axios.get(BANKS_BANKLIST, {
      headers: {
        "Content-Type": "application/json",
        "token": mobx.token
      }
    })
      .then(r => {
        if(r.data.code === 1) {
          this.setState({
            chooseBank:r.data.result
          })
          Toast.message(r.data.message, 2000, 'center')
        }else {
          Toast.message(r.data.message, 2000, 'center')

        }
        
      })
      .catch(e => console.log(e))
  }
  _confirm = async () => {
    var { account_no, account_name, openbank, bank_id, account_address } = this.state
    if (account_no === '' || account_name === '' || openbank === '请选择开户行') {
      Toast.message('请检查信息是否已填写', 2000, 'center')
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
        <StatusBar backgroundColor="#fff"></StatusBar>
        <View style={styles.arroWrap}>
          <TouchableOpacity
          style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} 
          onPress={() => {
            this.props.navigation.goBack()
          }}>
            <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.headtitle}>添加银行卡</Text>
        </View>
        <View style={styles.list}>
          <TouchableOpacity style={styles.item} activeOpacity={.7} onPress={this._gotoBank}>
            <Text style={styles.title}>开户银行</Text>
            <View style={styles.rtBox}>
              <Text style={styles.note}>{this.state.openbank}</Text>
              <Image source={require('../../../assets/icons/arrows/ck.png')}></Image>
            </View>
          </TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.title}>银行卡号</Text>
            <TextInput style={styles.ipt}
              placeholder="请输入银行卡号"
              placeholderTextColor="#5A5D66"
              onChangeText={(account_no) => this.setState({ account_no })}
            ></TextInput>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>开户名</Text>
            <TextInput style={styles.ipt}
              placeholder="请输入户名"
              placeholderTextColor="#5A5D66"
              onChangeText={(account_name) => this.setState({ account_name })}
            ></TextInput>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>开户银行(选填)</Text>
            <TextInput style={styles.ipt}
              placeholder="请输入开户银行"
              placeholderTextColor="#5A5D66"
              onChangeText={(account_address) => this.setState({ account_address })}
            ></TextInput>
          </View>

          {
            <Modal visible={this.state.show} transparent={true} animationType={'slide'}>
              <ScrollView>
                <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff' }}>
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
                          <Image style={styles.img} source={{ uri: v.background_url }}></Image>
                          <Text style={styles.num}>{i}</Text>
                          {/* <View style={styles.pit}><Pionts /></View> */}
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </ScrollView>
            </Modal>
          }
        </View>
        <TouchableOpacity style={styles.btn} activeOpacity={.7} onPress={this._confirm}>
          <Text style={styles.txt}>确认</Text>
        </TouchableOpacity>
      </>
    )
  }
}
class Pionts extends Component {
  render() {
    let item = Array.from({ length: 3 }, (v, i) => (
      <View style={{ height: 3, width: 3, backgroundColor: '#F5F5F7', marginLeft: 4 }} key={i}></View>
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
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  arrow: {
    width: 11.82,
    height: 22,
  },
  headtitle: {
    color: '#2B2D33',
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'PingFang SC',
    marginLeft:90
  },
  list: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#FFFFFF'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F7'
  },
  title: {
    height: 21,
    lineHeight: 21,
    fontSize: 15,
    color: '#2B2D33'
  },
  ipt: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#A6B8E0',
    color: '#5A5D66'
  },
  rtBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  note: {
    marginRight: 8,
    height: 20,
    lineHeight: 20,
    fontSize: 14,
    color: '#5A5D66'
  },
  btn: {
    marginTop: 318,
    marginLeft: 16,
    marginRight: 16,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#3D72E4'
  },
  txt: {
    height: 21,
    lineHeight: 21,
    fontSize: 15,
    color: '#FFFFFF'
  },
  bank: {
    marginTop: 8,
    marginBottom: 10,
    height: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden'
  },
  img: {
    position: 'absolute',
    width: 365,
    height: '100%',
    margin: 0
  },
  num: {
    marginTop: 31,
    left: 120,
    height: 20,
    lineHeight: 20,
    fontSize: 14,
    color: '#F5F5F7'
  },
  pit: {
    left: 154,
    top: 50
  },
})