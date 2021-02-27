import React, { Component } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal
} from 'react-native'
import { SHARE_PAGE, SHARE_GETQRCODE } from '../../../utils/api/pathMap'
import axios from '../../../utils/api/request'
import mobx from '../../../utils/mobx/index'
import Toast from '../../../utils/api/Toast'
import { pxToPt } from "../../../utils/styleKits";

/**
 * 我的分享
 */
const data = [
  {
    title: '新用户注册，奖励NSS',

  }
]
export default class myShare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      rtc: 0,
      qrcode: '',
      showCode: false,
      result: {}
    }
  }
  _getQrcode = async () => {
    //获取二维码
    await axios.get(SHARE_GETQRCODE, {
      headers: {
        "token": mobx.token
      }
    }).then(r => {
      if (r.data.code === 1) {
        this.setState({
          showCode: true,
          qrcode: r.data.result
        })
      }
      else {
        Toast.message(r.data.message, 2000, 'center')
      }
    }).catch(e => console.log('[获取二维码]', e))

  }
  getSharePage = async () => {
    await axios.get(SHARE_PAGE, {
      headers: {
        "Content-Type": "application/json",
        "token": mobx.token
      }
    }).then(r => {
      if (r.data.code === 1) {
        console.log(r.data.result)
        this.setState({
          result: r.data.result
        })
      }
      else {
        Toast.message(r.data.message, 2000, 'center')
      }
    })
      .catch(e => console.log(e))
  }
  componentDidMount() {
    this.getSharePage()
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        <View style={styles.arroWrap}>
          <TouchableOpacity
            style={{ width: pxToPt(60),  height: pxToPt(44),paddingLeft:pxToPt(16), justifyContent: 'center', marginRight: pxToPt(92)}}
            onPress={() => {
              this.props.navigation.navigate('Tabbar')
            }}>
            <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.headtitle}>我的分享</Text>
        </View>

        <View style={styles.container}>
          <SafeAreaView >
            <ScrollView style={{ paddingBottom: pxToPt(10) }} showsVerticalScrollIndicator={false}>
              <View style={styles.card}>
                <Text style={styles.title}>新用户注册，奖励NSS</Text>
                <View style={styles.contents}>
                  <View style={styles.msg}>
                    <Image source={require('../../../assets/icons/share10.png')}></Image>
                    <Text style={styles.txt}>好友下载</Text>
                  </View>
                  <View style={styles.msg}>
                    <Image source={require('../../../assets/icons/share7.png')}></Image>
                    <Text style={styles.txt}>扫二维码成为子集</Text>
                  </View>
                  <View style={styles.msg}>
                    <Image source={require('../../../assets/icons/share2.png')}></Image>
                    <Text style={styles.txt}>完成购买</Text>
                  </View>
                  <View style={styles.msg}>
                    <Image source={require('../../../assets/icons/share11.png')}></Image>
                    <Text style={styles.txt}>奖励NSS</Text>
                  </View>
                </View>
              </View>
              <View style={styles.card}>
                <Text style={styles.title}>我的分享收益</Text>
                <View style={styles.contents}>
                  <View style={styles.box}>
                    <View style={styles.lf}>
                      <Text style={styles.count}>{this.state.result.child_count ? this.state.result.child_count : 0}</Text>
                      <Text style={styles.note}>推广人数</Text>
                    </View>
                    <View style={styles.rt}>
                      <Text style={{ ...styles.count, color: '#FE5564' }}>{this.state.result.share_income_sum ? this.state.result.share_income_sum : 0}</Text>
                      <Text style={styles.note}>已获得NSS</Text>
                    </View>
                  </View>
                </View>
              </View>
              {
                this.state.showCode ? <>
                  <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={styles.title}>我的邀请二维码</Text>
                      <Image style={styles.xuanzekao} source={require('../../../assets/icons/arrows/pros.png')}></Image>
                    </View>
                    <View style={styles.showImage}>
                      <Image style={{ width: pxToPt(319.5), height: pxToPt(319.5) }} source={{ uri: this.state.qrcode }}></Image>
                    </View>
                  </View>
                </> : <></>
              }

              <View style={styles.card}>
                <Text style={styles.title}>活动规则</Text>
                <View style={styles.contents}>
                  <View style={styles.wrap}>
                    {/* <Text style={styles.info}>一期推广规则</Text> */}
                    <Text style={styles.info}>子集：扫描对方推广二维码，成为对方的子集，只能拥有一个父级，且不可解除，请谨慎选择
父级：当其他人扫描您的推广二维码，成为您的子集，您为父级，可同时拥有多个子集。</Text>
                    <Text style={styles.info}>奖励：当子集购买NSS币种时，根据系统设置会奖励您对应的NSS币。</Text>
                  </View>
                </View>
              </View>
              {
                this.state.showCode ? <></> : <>
                  <TouchableOpacity style={styles.btn} activeOpacity={.7} onPress={this._getQrcode}>
                    <Text style={styles.btntxt}>获取邀请二维码</Text>
                  </TouchableOpacity></>
              }
            </ScrollView>
          </SafeAreaView>
        </View>
      </>
    )
  }
}
const styles = StyleSheet.create({
  arroWrap: {
    height: pxToPt(44),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff'
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
  },
  container: {
    paddingTop: pxToPt(8),
    paddingLeft: pxToPt(16),
    paddingRight: pxToPt(16)
  },
  card: {
    paddingLeft: pxToPt(12),
    paddingRight: pxToPt(12),
    marginBottom: pxToPt(24),
    backgroundColor: '#FFFFFF',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 6,
    // elevation: 2,
    borderRadius: pxToPt(8)
  },
  title: {
    top: pxToPt(11),
    paddingBottom: pxToPt(11),
    fontSize: pxToPt(16),
    fontWeight: '600',
    color: '#2B2D33',
    borderBottomWidth: pxToPt(1),
    borderBottomColor: '#F5F5F7'
  },
  contents: {
    marginTop: pxToPt(11),
  },
  showImage: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  msg: {
    paddingTop: pxToPt(12),
    paddingBottom: pxToPt(12),
    flexDirection: 'row',
    alignItems: 'center'
  },
  txt: {
    marginLeft: pxToPt(3),
    height:pxToPt(20),
    lineHeight: pxToPt(20),
    fontSize: pxToPt(14),
    color: '#5A5D66'
  },
  box: {
    flexDirection: 'row',
    paddingTop: pxToPt(12),
    paddingBottom: pxToPt(12),
    justifyContent: 'space-around'
  },
  lf: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rt: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    height: pxToPt(25),
    lineHeight: pxToPt(25),
    fontSize: pxToPt(18),
    color: '#3D72E4'
  },
  note: {
    marginTop: pxToPt(4),
    height: pxToPt(17),
    lineHeight: pxToPt(17),
    fontSize: pxToPt(12),
    color: '#8D9099'
  },
  wrap: {
    marginTop: pxToPt(8),
    marginBottom: pxToPt(20)
  },
  info: {
    fontSize: pxToPt(14),
    color: '#5A5D66'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToPt(8),
    height: pxToPt(44),
    backgroundColor: '#3D72E4',
    marginBottom:pxToPt(60)
  },
  btntxt: {
    height: pxToPt(21),
    lineHeight: pxToPt(21),
    fontSize: pxToPt(15),
    color: '#FFFFFF'
  },
  xuanzekao: {
    marginTop: pxToPt(21)
  }
})