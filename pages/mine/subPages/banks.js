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
  ImageBackground,
  Platform
} from 'react-native'
import { BANKS_GETMYBANKS } from '../../../utils/api/pathMap'
import axios from '../../../utils/api/request'
import { pxToPt } from "../../../utils/styleKits";
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
        add: require('../../../assets/icons/MybandCardad222d.png'),
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
      <SafeAreaView style={{flex:1}}>
        {
          Platform.OS === 'ios' ? <View style={{marginTop:pxToPt(28)}}></View> : <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        }
        <View style={styles.arroWrap}>
          <TouchableOpacity
            style={{ width: pxToPt(60), height: pxToPt(44),paddingLeft:pxToPt(16), justifyContent: 'center' }}
            onPress={() => {
              this.props.navigation.navigate('Tabbar')

            }}>
            <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.title}>我的银行卡</Text>
        </View>
        {
          this.state.myBanks.length < 1 ? <></> :
            <TouchableOpacity style={styles.btn} activeOpacity={1} onPress={this._addBank}>
              <Image style={{ height: pxToPt(14), width: pxToPt(14) }} source={this.state.Imgs.add}></Image>
              <Text style={styles.txt}>添加银行卡</Text>
            </TouchableOpacity>
        }
        <SafeAreaView>
          <ScrollView style={{height:550}}>
            <View style={styles.container}>
              {
                this.state.myBanks.map((v, i) => {
                  var reg = /^(\d{4})\d+(\d{4})$/;
                  v.account_no = v.account_no.replace(reg, "**** $2");
                  return (
                    <View key={i}>
                      <View style={styles.wrapper} key={i}>
                        <ImageBackground source={{ uri: v.background_url }} style={styles.wrapperBc}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.icon}>
                              <Image source={{ uri: v.icon }} style={{ width: pxToPt(28), height: pxToPt(28) }}></Image>
                            </View>
                            <Text style={styles.bankTitle}>{v.full_name}</Text>
                          </View>
                          <View>
                            <Text style={styles.bankNum}>{v.account_no}</Text>
                          </View>
                        </ImageBackground>
                      </View>
                      <View style={styles.wrapper} key={i}>
                        <ImageBackground source={{ uri: v.background_url }} style={styles.wrapperBc}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={styles.icon}>
                              <Image source={{ uri: v.icon }} style={{ width: pxToPt(28), height: pxToPt(28) }}></Image>
                            </View>
                            <Text style={styles.bankTitle}>{v.full_name}</Text>
                          </View>
                          <View>
                            <Text style={styles.bankNum}>{v.account_no}</Text>
                          </View>
                        </ImageBackground>
                      </View>
                    </View>
                  )
                })
              }
              {
                this.state.myBanks.length < 1 ?
                  <>
                    <Image style={{ width: pxToPt(206.22), height: pxToPt(217.11), alignSelf: 'center', top: pxToPt(53) }} source={require('../../../assets/icons/default/Nobindingbankcard.png')}></Image>
                    <Text style={{ color: '#8D9099', marginTop: pxToPt(78), alignSelf: 'center', fontWeight: '400', fontSize: pxToPt(15) }}>暂无绑定银行卡</Text>
                    <TouchableOpacity
                      style={styles.nobtn} activeOpacity={1} onPress={this._addBank}>
                      <Image style={{ height: pxToPt(14), width: pxToPt(14) }} source={this.state.Imgs.add}></Image>
                      <Text style={styles.notxt}>添加银行卡</Text>
                    </TouchableOpacity>
                  </> :
                  <></>
              }
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    )
  }
}

class Pionts extends Component {
  render() {
    let item = Array.from({ length: 3 }, (v, i) => (
      <View style={{ height: pxToPt(3), width: pxToPt(3), backgroundColor: '#F5F5F7', marginLeft: pxToPt(4), borderRadius: pxToPt(2) }} key={i}></View>
    ))
    return (
      <View
        style={{ flexDirection: 'row', height: pxToPt(30), width: pxToPt(60), justifyContent: 'flex-end' }}
      >
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
    marginBottom: pxToPt(8),

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
    marginLeft: pxToPt(84)
  },
  container: {
    marginLeft: pxToPt(16),
    marginRight: pxToPt(16),
  },
  wrapper: {
    height: pxToPt(120),
    width: pxToPt(343),
    overflow: 'hidden',
    marginBottom: pxToPt(12),
    borderRadius: pxToPt(12),
    position: 'relative',

  },
  wrapperBc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: pxToPt(350),
    height: '100%',
    position: 'absolute',
    left: pxToPt(-2)
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
  showDelete: {
    flexDirection: 'row',
    height: pxToPt(30),
    width: pxToPt(60),
    justifyContent: 'flex-end'
  },
  btn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToPt(620),
    width: pxToPt(343),
    height: pxToPt(44),
    borderRadius: pxToPt(8),
    backgroundColor: '#3D72E4',
    marginBottom: pxToPt(100),
    position: 'absolute',
    marginLeft: pxToPt(16),
    zIndex:100,
  },
  nobtn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToPt(28),
    width: pxToPt(140),
    height: pxToPt(36),
    borderRadius: pxToPt(8),
    borderWidth: pxToPt(1),
    backgroundColor: '#fff',
    marginBottom: pxToPt(100),
    borderColor: '#3D72E4',
    alignSelf: 'center'
  },
  fontTex: {
    color: '#fff',
    fontSize: pxToPt(12)
  },
  txt: {
    marginLeft: pxToPt(4),
    color: '#FFFFFF'
  },
  notxt: {
    marginLeft: pxToPt(4),
    color: '#3D72E4'
  }

})