import React, { Component } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Platform,
  SafeAreaView
} from 'react-native'
import { USER_ACCOUNTLOG } from '../../../utils/api/pathMap'
import axios from '../../../utils/api/request'
import { pxToPt } from "../../../utils/styleKits";
import { inject, observer } from 'mobx-react'
import Toast from "../../../utils/api/Toast"
@inject('rootStore')
@observer
/**
 * 账户记录
 */
export default class pylogs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: this.props.rootStore.token,
      data: [],
      total: null, //数据总量
      page: 0,  //当前页
      showNone: false,
      isRefreshing: false,  //下拉刷新

    }
  }
  getMore = (e) => {
    var { data, total, showNone } = this.state
    var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight + 20 >= contentSizeHeight) {
      if (showNone) return
      if (data.length === total) {
        this.setState({
          showNone: true
        })
        return
      } else {
        this.getData()
      }
    }
  }
  getData = async () => {
    const { page } = this.state
    var current_page = page + 1
    // if(current_page > last_page) return
    var url = USER_ACCOUNTLOG + `?page=${current_page}`
    await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "token": this.state.token
      }
    })
      .then(r => {
        if (r.data.code === 1) {
          console.log(r.data.result)
          if (this.state.data.length === 0) {
            this.setState({
              data: r.data.result.list,
              page: r.data.result.page.current_page,
              total: r.data.result.page.total
            })
          } else {
            this.setState({
              data: [...this.state.data, ...r.data.result.list],
              current_page: r.data.result.page.current_page,
            })
          }
        } else {
          Toast.message(r.data.message, 2000, 'center')
        }
      })
      .catch(e => console.log(e))
  }

  async onRefreshHandle() {
    this.setState({
      isRefreshing: true
    })
    var url = USER_ACCOUNTLOG + `?page=1`
    await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "token": this.state.token
      }
    }).then(r => {
      if (r.data.code === 1) {
          this.setState({
            data: r.data.result.list,
            page: r.data.result.page.current_page,
            total: r.data.result.page.total,
            isRefreshing: false
          })
      } else {
        Toast.message(r.data.message, 2000, 'center')
      }
    })
    .catch(e => console.log(e))
    }
  componentDidMount() {
    this.getData()
  }

  render() {
    console.log(this.state.data.length, this.state.total)
    return (
      <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        
        <View style={styles.arroWrap}>
          <TouchableOpacity
            style={{ width: pxToPt(60), height: pxToPt(44),paddingLeft:pxToPt(16), justifyContent: 'center' }}
            onPress={() => {
              this.props.navigation.navigate('Tabbar')

            }}>
            <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.title}>账户记录</Text>
        </View>
        {
          this.state.data.length < 1 ?
            <>
              <Image style={{ width: pxToPt(206.22), height: pxToPt(217.11), alignSelf: 'center', top: pxToPt(53) }} source={require('../../../assets/icons/default/noPaylog.png')}></Image>
              <Text style={{ color: '#8D9099', marginTop: pxToPt(58), alignSelf: 'center', fontWeight: '400', fontSize: pxToPt(15) }}>暂无账户记录</Text>
            </>
            : <>
              <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={true}
                onMomentumScrollEnd={this.getMore}
                scrollsToTop={true}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.onRefreshHandle()}
                  />
                }
              >

                {
                  this.state.data.map((v, i) => {
                    var reg = /\-/g
                    const bol = reg.test(v.balance_changed)
                    return (
                      <View style={styles.item} key={i}>
                        <View style={styles.lt}>
                          <Text style={styles.txt}>{v.source_str}</Text>
                          <Text style={[styles.common, styles.lftime]}>{v.transfer_time}</Text>
                        </View>
                        <View style={styles.rt}>
                          <Text style={[styles.txt, styles.rtnum, [!bol ? { color: '#FE5564' } : { color: '#2B2D33' }],]}>{v.balance_changed}NSS</Text>
                          {/* <Text style={[styles.common, styles.rtnote]}>余额: {v.after_balance}</Text> */}
                        </View>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </>
        }

        {
          this.state.showNone ? <>
            <View style={{ paddingLeft:pxToPt(60), paddingBottom:pxToPt(12), paddingTop: pxToPt(12), backgroundColor: "#fff" }}>
              <Text>没有更多了.....</Text>
            </View>
          </> : <></>
        }
      </SafeAreaView>
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
    height:pxToPt(22),
  },
  title: {
    color: '#2B2D33',
    fontSize: pxToPt(18),
    fontWeight: "500",
    fontFamily: 'PingFang SC',
    marginLeft: pxToPt(92)
  },
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: pxToPt(10),
    paddingBottom: pxToPt(9),
    paddingLeft: pxToPt(16),
    paddingRight: pxToPt(16),
    marginBottom: pxToPt(4),
    backgroundColor: '#FFFFFF'
  },
  lt: {

  },
  txt: {
    height: pxToPt(21),
    lineHeight: pxToPt(21),
    fontSize: pxToPt(15),
    fontWeight: '600',
    color: '#2B2D33'
  },
  common: {
    marginTop: pxToPt(4),
    height: pxToPt(16),
    lineHeight: pxToPt(16),
    fontSize: pxToPt(11),
    color: '#5A5D66'
  },
  rtnum: {
    textAlign: 'right'
  }
})
