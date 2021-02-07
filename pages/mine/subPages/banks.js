import React, { Component } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ImageBackground
} from 'react-native'
import { BANKS_GETMYBANKS } from '../../../utils/api/pathMap'
import axios from '../../../utils/api/request'
import { inject, observer } from 'mobx-react'
import Toast from "../../../utils/api/Toast"
@inject('rootStore')

/**
 * 我的银行卡
 */

export default class bank extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAdd: 2,
      showDelete: false,
      myBanks: [],
      token: this.props.rootStore.token,
      Imgs: {
        add: require('../../../assets/icons/add.png'),
        nongye: require('../../../assets/icons/mine/MybandCardad3d.png')
      }
    }
  }
  getMyBanks = async () => {
    await axios.get(BANKS_GETMYBANKS, {
      headers: {
        "Content-Type": "application/json",
        "token": this.state.token
      }
    })
      .then(r => {
        if (r.data.code === 1) {
          this.setState({
            myBanks: r.data.result
          })
        }
        else {
          Toast.message(r.data.message, 2000, 'center')
          return
        }
      })
      .catch(e => console.log(e))
  }
  componentDidMount() {
    this.getMyBanks()
  }

  _addBank = () => {
    this.props.navigation.navigate("AddBank")
  }
  _cli = () => {
    alert('abbabab')
  }
  showDelete = (i) => {
    this.setState({
      showDelete: !this.state.showDelete
    })
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
          <Text style={styles.title}>我的银行卡</Text>
        </View>
        <SafeAreaView>
          <ScrollView showsHorizontalScrollIndicator={false} style={{ marginBottom: 120 }}>
            <View style={styles.container}>
              {
                this.state.myBanks.map((v, i) => {
                  var reg = /^(\d{4})\d+(\d{4})$/;
                  v.account_no = v.account_no.replace(reg, "**** $2");
                  return (
                    <>
                      {
                        i === this.state.showAdd ? <>
                          <TouchableOpacity style={styles.btn} activeOpacity={.7} onPress={this._addBank}>
                            <Image style={{ height: 14, width: 14 }} source={this.state.Imgs.add}></Image>
                            <Text style={styles.txt}>添加银行卡</Text>
                          </TouchableOpacity>
                        </> :
                          <></>
                      }
                      <View style={styles.wrapper} key={i}>
                        <ImageBackground source={{ uri: v.background_url }} style={styles.wrapperBc}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.icon}>
                              <Image source={{ uri: v.icon }} style={{ width: 28, height: 28 }}></Image>
                            </View>
                            <Text style={styles.bankTitle}>{v.full_name}</Text>
                          </View>
                          <View>
                            <Text style={styles.bankNum}>{v.account_no}</Text>
                            {/* {
                            this.state.showDelete ? <>
                              <View style={styles.showDelete} onPress={this.showDelete}>
                                <TouchableOpacity style={{ marginRight: 15, borderRadius: 6 }} onPress={(i) => { console.log(i) }}>
                                  <Text style={styles.fontTex}>删除</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ borderRadius: 6 }} onPress={(i) => this.showDelete(i)}>
                                  <Text style={styles.fontTex}>取消</Text>
                                </TouchableOpacity>
                              </View>
                            </> :
                              <>
                                <TouchableOpacity
                                  onPress={this.showDelete}
                                >
                                  <Pionts />
                                </TouchableOpacity>
                              </>
                          } */}
                          </View>
                        </ImageBackground>
                      </View>
                    </>
                  )
                })
              }
              {/* <View style={styles.wrapper}>
                <ImageBackground source={this.state.Imgs.nongye} style={styles.wrapperBc}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.icon}>
                      <Image source={require('../../../assets/icons/biaoqin.png')} style={{ width: 28, height: 28 }}></Image>
                    </View>
                    <Text style={styles.bankTitle}>中国农业银行储蓄卡</Text>
                  </View>
                  <View>
                    <Text style={styles.bankNum}>**** 7576</Text>

                    {
                      this.state.showDelete ? <>
                        <View style={ styles.showDelete} onPress={this.showDelete}>
                          <TouchableOpacity style={{ marginRight: 15, borderRadius: 6 }} onPress={() => { alert('11') }}>
                            <Text style={styles.fontTex}>删除</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{  borderRadius: 6 }} onPress={this.showDelete}>
                            <Text style={styles.fontTex}>取消</Text>
                          </TouchableOpacity>
                        </View>
                      </> :
                        <>
                          <TouchableOpacity
                            onPress={this.showDelete}
                          >
                            <Pionts />
                          </TouchableOpacity>
                        </>
                    }
                  </View>
                </ImageBackground>
              </View> */}
              {
                this.state.myBanks.length < 1 ?
                  <>
                    <Image style={{ width: 206.22, height: 217.11, alignSelf: 'center', top: 53 }} source={require('../../../assets/icons/default/Nobindingbankcard.png')}></Image>
                    <Text style={{ color: '#8D9099', marginTop: 78, alignSelf: 'center', fontWeight: '400', fontSize: 15 }}>暂无绑定银行卡</Text>
                    <TouchableOpacity style={styles.nobtn} activeOpacity={.7} onPress={this._addBank}>
                      <Image style={{ height: 14, width: 14 }} source={this.state.Imgs.add}></Image>
                      <Text style={styles.notxt}>添加银行卡</Text>
                    </TouchableOpacity>
                  </> : this.state.myBanks.length >= 2 ? <></> : <TouchableOpacity style={styles.btn} activeOpacity={.7} onPress={this._addBank}>
                    <Image style={{ height: 14, width: 14 }} source={this.state.Imgs.add}></Image>
                    <Text style={styles.txt}>添加银行卡</Text>
                  </TouchableOpacity>
              }
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

class Pionts extends Component {
  render() {
    let item = Array.from({ length: 3 }, (v, i) => (
      <View style={{ height: 3, width: 3, backgroundColor: '#F5F5F7', marginLeft: 4, borderRadius: 2 }} key={i}></View>
    ))
    return (
      <View
        style={{ flexDirection: 'row', height: 30, width: 60, justifyContent: 'flex-end' }}
      >
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
  title: {
    color: '#2B2D33',
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'PingFang SC',
    marginLeft:90
  },
  container: {
    marginLeft: 22,
    marginRight: 16,
  },
  wrapper: {
    height: 121,
    width: 346,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 12
  },
  wrapperBc: {
    width: 343,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    width: 40, height: 40,
    backgroundColor: '#fff',
    borderRadius: 20
  },
  bankTitle: {
    marginTop: 29,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: '#F5F5F7'
  },
  bankNum: {
    color: '#F5F5F7',
    paddingRight: 12,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 31,
    marginBottom: 50

  },
  showDelete: {
    flexDirection: 'row',
    height: 30,
    width: 60,
    justifyContent: 'flex-end'
  },
  btn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    width: 343,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#3D72E4',
    marginBottom: 100,
  },
  nobtn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    width: 140,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 100,
    borderColor: '#3D72E4',
    alignSelf: 'center'
  },
  fontTex: {
    color: '#fff',
    fontSize: 12
  },
  txt: {
    marginLeft: 4,
    color: '#FFFFFF'
  },
  notxt: {
    marginLeft: 4,
    color: '#3D72E4'
  }

})