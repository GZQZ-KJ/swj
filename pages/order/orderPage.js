import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  Dimensions,
  SafeAreaView
} from 'react-native'

import basicStyle from '../../components/styles/basic/index'
import ListItem from './ListItem/listitem'
import { ORDERS_TAG, PRODUCT_TAG, ORDERS_LIST, PRODUCT_SALELIST, PRODUCT_RECEIVE, ORDERS_PAY } from '../../utils/api/pathMap'
import axios from '../../utils/api/request'
import Toast from '../../utils/api/Toast'
import { pxToPt } from "../../utils/styleKits";
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer
/*
* 订单页面
*/
export default class orderPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: this.props.rootStore.token,
      activeTop: 1,  //默认时订单表  0挂卖表 可获取 
      active: 0,   // 头部导航栏的选择索引 默认0全部  可获取
      activeCss: {
        marginLeft: 2,
      },
      tag: [],  //头部标签信息
      page: 1,   //默认第一页
      pageSize: 10,  //默认10条一页
      dataList: [],  //数据列表
      total: 0, //数据总条数
      control: false,  //控制滚动条加载,
      remain: 0,  //定时器返回的数字

      isRefreshing: false, //下拉刷新
    }
  }

  //右按钮 一级挂卖导航栏
  _selectRt = async () => {
    this.setState({
      active: 0,
      activeTop: 0,
      activeCss: { marginLeft: pxToPt(110)},
    })
    this._selectRt2()
  }
  //右边 二级挂卖导航栏
  _selectRt2 = async () => {
    await axios.get(PRODUCT_TAG, {
      headers: {
        "token": this.state.token
      }
    }).then(r => {
      //获取订单列表信息
      this.setState({
        tag: r.data.result,
      })
      if (this.state.activeTop === 0) {
        this.getProductList(0)
      }
    }).catch(e => console.log(e))
  }
  //获取挂卖列表<右>
  getProductList = async (status = 0) => {
    console.log('右边的Status', status)
    let { page, pageSize } = this.state
    page = 1
    pageSize = 10
    let url = PRODUCT_SALELIST + `?status=${status}&page=${page}&page_size=${pageSize}`
    await axios.get(url, {
      headers: {
        "token": this.state.token
      }
    }).then(r => {
      if (r.data.code === 1) {
        let result = r.data.result
        console.log('【右边列表】',r.data.result)
        this.props.rootStore.setOrderList(result.list)
        this.setState({
          active: status,
          page: result.page.current_page,
          total: result.page.total,
          control: false,
        })
      } else {
        Toast.message(r.data.message, 2000, 'center')
      }

    }).catch(e => console.log('[挂卖列表右]', e))
  }
  //左按钮 一级挂卖导航栏
  _selectLf = () => {
    this.setState({
      activeTop: 1,
      active: 0,
      activeCss: { marginLeft: 2 },
    })
    this._selectLf2()
  }
  //左边 二级挂卖导航栏
  _selectLf2 = async () => {
    await axios.get(ORDERS_TAG, {
      headers: {
        "token": this.state.token
      }
    }).then(r => {
      if (r.data.code === 1) {
        this.setState({
          tag: r.data.result,
        })
        //获取订单列表信息
        if (this.state.activeTop === 1) {
          this.getOrdersList(0)
        }
      } else {
        Toast.message(r.data.message, 2000, 'center')
      }
    }).catch(e => console.log('[订单导航栏《左》]', e))
  }
  //获取订单列表<左>
  getOrdersList = async (status = 0) => {
    let { page, pageSize } = this.state
    page = 1
    pageSize = 10
    let url = ORDERS_LIST + `?status=${status}&page=${page}&page_size=${pageSize}`
    await axios.get(url, {
      headers: {
        "token": this.state.token
      }
    }).then(r => {
      if (r.data.code === 1) {
        console.log('【左边列表】',r.data.result)
        let result = r.data.result
        this.props.rootStore.setOrderList(result.list)
        this.setState({
          page: result.page.current_page,
          total: result.page.total,
          control: false,
        })
      } else {
        Toast.message(r.data.message, 2000, 'center')
      }
    }).catch(e => console.log('[订单列表左]', e))
  }
  //滚动条 (底部加载数据)
  getMore = async () => {
    let { active, total, control, dataList, page, pageSize, activeTop } = this.state
    //   //判断是否还有数据
    if (this.props.rootStore.orderList.length === total) {
      this.setState({
        control: true
      })
      return
    }
    if (control) return
    if (activeTop === 1) {
      page = page + 1
      let url = ORDERS_LIST + `?status=${active}&page=${page}&page_size=${pageSize}`
      await axios.get(url, {
        headers: {
          "token": this.state.token
        }
      }).then(r => {
        if (r.data.code === 1) {
          let result = r.data.result
          this.props.rootStore.setOrderScroll(result.list)
          this.setState({
            // dataList: [...dataList, ...result.list],
            page: result.page.current_page,
          })
        } else {
          Toast.message(r.data.message, 2000, 'center')
        }
      }).catch(e => console.log('[订单滚动条]', e))
    } else {
      page = page + 1
      let url = PRODUCT_SALELIST + `?status=${active}&page=${page}&page_size=${pageSize}`
      await axios.get(url, {
        headers: {
          "token": this.state.token
        }
      }).then(r => {
        if (r.data.code === 1) {
          let result = r.data.result
          this.props.rootStore.setOrderScroll(result.list)
          this.setState({
            page: result.page.current_page,
          })
        } else {
          Toast.message(r.data.message, 2000, 'center')
        }
      }).catch(e => console.log('[挂卖滚动条]', e))
    }

  }

  //选择头部导航切换样式 && 请求 二级导航
  _selected = async (status) => {
    this.setState({
      active: status
    })
    if (this.state.activeTop === 1) {
      this.getOrdersList(status)
    } else {
      this.getProductList(status)
    }
  }

  componentDidMount() {
    //加载订单表
    this.time = null
    this._selectLf2()
  }

  onRefreshHandle() {
    let { activeTop, active } = this.state
    this.setState({
      isRefreshing: true
    })
    //判断加载数据
    if (activeTop === 1) {
      this.getOrdersList(active)
    } else {
      this.getProductList(active)
    }
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      })
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.time)
  }
  render() {
    let { rootStore } = this.props
    return (
      <View style={{ flex: 1 }}>
        <TopHeadChoose
          _selectLf={this._selectLf}
          _selectRt={this._selectRt}
          activeTop={this.state.activeTop}
          activeCss={this.state.activeCss}></TopHeadChoose>
        <View style={[styles.navBar, basicStyle.flexRow]}>
          {
            this.state.activeTop === 1 ? 
            <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
            {this.state.tag.map((v, i) => {
              return (
                <TouchableOpacity style={styles.box1} key={i} onPress={() => {
                  if (v.tag_status === this.state.active) return
                  if (this.state.activeTop === 1) {
                    if (i === 3) {
                      i = 4
                    } else if (i === 4) {
                      i = 6
                    }
                    this._selected(i)
                  } else {
                    if (i === 5) {
                      i = 6
                    }
                    this._selected(i)
                  }
                }}>
                  <Text style={v.tag_status === this.state.active ? styles.itemO : styles.item} >{v.tag_name}</Text>
                  {v.tag_status === this.state.active ? (<View style={styles.underscore} />) : null}
                </TouchableOpacity>
              )
            })
            }
          </View> 
            :
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row'}}>
            {this.state.tag.map((v, i) => {
              return (
                <TouchableOpacity style={styles.box} key={i} onPress={() => {
                  if (v.tag_status === this.state.active) return
                  if (this.state.activeTop === 1) {
                    if (i === 3) {
                      i = 4
                    } else if (i === 4) {
                      i = 6
                    }
                    this._selected(i)
                  } else {
                    if (i === 5) {
                      i = 6
                    }
                    this._selected(i)
                  }
                }}>
                  <Text style={v.tag_status === this.state.active ? styles.itemO : styles.item} >{v.tag_name}</Text>
                  {v.tag_status === this.state.active ? (<View style={styles.underscore} />) : null}
                </TouchableOpacity>
              )
            })
            }
          </ScrollView> 
          }
          
        </View>
        {
          rootStore.orderList.length < 1 ?
            <>
              <Image style={{ width: pxToPt(206.22), height: pxToPt(217.11), alignSelf: 'center', top: pxToPt(53) }} source={require('../../assets/icons/default/noProduct.png')}></Image>
              <Text style={{ color: '#8D9099', marginTop: pxToPt(58), alignSelf: 'center', fontWeight: '400', fontSize: pxToPt(15) }}>暂无订单</Text>
            </>
            :
            <SafeAreaView style={{ paddingBottom: pxToPt(90) }}>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.onRefreshHandle()}
                  />
                }
                showsVerticalScrollIndicator={false}
                scrollsToTop={true}
                onMomentumScrollEnd={this.getMore}
                onScroll={() => {
                  this.setState({
                    isScroll: false
                  })
                }}
              >
                {
                  rootStore.orderList.map((v, i) => {
                    return <ListItem
                      key={i}
                      navigation={this.props.navigation}
                      isScroll={this.state.isScroll}
                      activeTop={this.state.activeTop}
                      status={v.status}
                      item={v}
                    />
                  })
                }

              </ScrollView>
            </SafeAreaView>
        }
      </View>

    )
  }
}

class TopHeadChoose extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.ordTop}>
        <View style={[styles.contol, basicStyle.flexRow]}>
          <TouchableOpacity style={styles.ctrlf} onPress={() => this.props._selectLf()}>
            <View style={styles.ctrlf}>
              <Text style={styles.txtlf}>订单表</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctrrt} onPress={() => this.props._selectRt()}>
            <View style={styles.ctrrt}>
              <Text style={styles.txtrt}>挂卖表</Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.active, this.props.activeCss]}>
            <Text style={styles.acttxt}>{this.props.activeTop === 1 ? '订单表' : '挂卖表'}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ordTop: {
    justifyContent: 'center',
    alignItems: 'center',
    height: pxToPt(44),
    backgroundColor:'#FFFFFF'
  },
  contol: {
    position: 'relative',
    alignItems: 'center',
    height: pxToPt(32),
    width: pxToPt(229),
    borderRadius: pxToPt(9),
    backgroundColor: '#7676801F',
  },
  ctrlf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToPt(9)
  },
  txtlf: {
    height: pxToPt(18),
    fontSize: pxToPt(13),
    color: '#2B2D33'
  },
  ctrrt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  txtrt: {
    height: pxToPt(18),
    fontSize: pxToPt(13),
    color: '#2B2D33'
  },
  active: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: pxToPt(28),
    width: pxToPt(117),
    borderRadius: pxToPt(7),
    backgroundColor: '#3D72E4FF',
    elevation: pxToPt(8),
    shadowColor: '#1f000000',
    shadowOffset: { width:pxToPt(0), height: pxToPt(3) },
    shadowOpacity: pxToPt(1)
  },
  acttxt: {
    height: pxToPt(20),
    fontSize: pxToPt(14),
    color: '#FFFFFF'
  },
  navBar: {
    justifyContent:'space-between',
    backgroundColor: '#fff',
    marginBottom:pxToPt(8)
  },
  box: {
    alignItems: 'center',
    width: pxToPt(70),
  },
  box1:{
    alignItems: 'center',
    width:'20%',
  },
  item: {
    marginTop:pxToPt(12),
    marginBottom: pxToPt(11),
    height:pxToPt(21),
    fontSize: pxToPt(15),
    color: '#8D9099'
  },
  itemO: {
    marginTop: pxToPt(12),
    marginBottom:pxToPt(11),
    height: pxToPt(21),
    fontSize: pxToPt(15),
    color: '#3D72E4'
  },
  underscore: {
    position: 'absolute',
    marginTop: pxToPt(37),
    width: pxToPt(12),
    height: pxToPt(1),
    backgroundColor: '#3D72E4FF'
  },
})