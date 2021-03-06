import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  TouchableNativeFeedback,
  SafeAreaView,
  Alert,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Dimensions,
  Platform
} from 'react-native';

import { isIphoneX } from '../../utils/isIphoneX'
import { pxToPt } from "../../utils/styleKits";
import TopComp from './topComp/index'
import ProItem from '../../components/product/proItem'
import basicStyle from '../../components/styles/basic/index'
import axios from '../../utils/api/request'
import { PRODUCT_INDEX } from '../../utils/api/pathMap'
import { inject, observer } from "mobx-react";
@inject("rootStore")
@observer
//排序


export default class productPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      flag: false,
      modalVisible: false,
      token: this.props.rootStore.token,
      min_sum_count: '',// 最低总价
      max_sum_count: '', //最高总价
      min_price: '', //最低单价
      max_price: '', //最高单价

      time_Sort: true,    //返回时间的升序
      // time_desc   //时间降序
      // time_asc    //时间升序
      sum_count_Sort: true,  //返回总价的升序
      // sum_count_desc //总价价格降序
      // sum_count_asc //总价价格升序
      price_Sort: true,    //返回单价的升序或降序
      // price_desc  //单价价格降序，
      // price_asc   //单价价格升序
      page: 0,
      pageSize: 10,
      data: [],
      total: null,
      isScroll: true,  //是否正在滑动，滑动不让点击
      control: false,

      isRefreshing: false,  //下拉刷新

    }
  }
  _onchange = (value) => {
    if (value === 'true') {
      this.setState({
        flag: true,
      })
      if (this.state.flag) {
        this.setState({
          modalVisible: !this.state.modalVisible,
        })
      }
    } else if (value == 0) {
      this.setState({
        flag: false,
      })
      if (!this.state.flag) {
        this.setState({
          modalVisible: !this.state.modalVisible,
        })
      }
    }
  }
  _onShow = (value) => {
    if (value === 'true') {
      this.state.flag = true
    } else if (value == 0) {
      this.state.flag = false
    }
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
  }
  _cancal = () => {
    this.setState({
      modalVisible: false,
    })
  }
  //筛选价格 和 排序的请求
  _confirm = async () => {
    const {
      token,
      min_sum_count,
      max_sum_count,
      min_price,
      max_price,
      time_Sort,
      sum_count_Sort,
      price_Sort,
      page,
      pageSize,
    } = this.state
    var current_page = page
    var timeSort = time_Sort ? 'time_desc' : 'time_asc'
    var sumCountSort = sum_count_Sort ? 'sum_count_desc' : 'sum_count_asc'
    var priceSort = price_Sort ? 'price_desc' : 'prrice_asc'
    var url = PRODUCT_INDEX + `?min_sum_count=${min_sum_count}&max_sum_count=${max_sum_count}&min_price=${min_price}&max_price=${max_price}&page=${current_page}&page_size=${pageSize}&sort_code=${timeSort, sumCountSort, priceSort}`
    //发送请求
    await axios.get(url, {
      headers: {
        "token": token
      }
    }).then(r => {
      console.log('[请求回来的数据]', r.data.result.list)
      if (r.data.code === 1) {
        this.props.rootStore.setProductList(r.data.result.list)
        this.setState({
          data: r.data.result.list,
          page: r.data.result.page.current_page,
          total: r.data.result.page.total,
          modalVisible: false,
          min_sum_count: '',
          max_sum_count: '',
          min_price: '',
          max_price: '',
        })
      } else {
        Toast.message(r.data.message, 2000, 'center')
      }
    })
  }
  //滚动条到底 的请求
  getMore = (e) => {
    let { data, total, control } = this.state
    this.setState({
      isScroll: true
    })
    if (control) return
    var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight + 20 >= contentSizeHeight) {
      if (data.length >= total) {
        this.setState({
          control: true
        })
        return
      } else {
        this.getProductIndex()
      }
    }
  }
  //cdm发送请求
  getProductIndex = async () => {
    const {
      token,
      min_sum_count,
      max_sum_count,
      min_price,
      max_price,
      time_Sort,
      sum_count_Sort,
      price_Sort,
      page,
      pageSize,
      data
    } = this.state
    var current_page = page + 1
    var timeSort = time_Sort ? 'time_desc' : 'time_asc'
    var sumCountSort = sum_count_Sort ? 'sum_count_desc' : 'sum_count_asc'
    var priceSort = price_Sort ? 'price_desc' : 'prrice_asc'
    var url = PRODUCT_INDEX + `?min_sum_count=${min_sum_count}&max_sum_coount=${max_sum_count}&min_price=${min_price}&max_price=${max_price}&page=${current_page}&page_size=${pageSize}&sort_code=${timeSort, sumCountSort, priceSort}`
    //发送请求
    await axios.get(url, {
      headers: {
        "token": token
      }
    })
      .then(r => {
        if (data.length === 0) {
          //产品列表存到mobx中
          console.log(r.data.result.list)
          this.props.rootStore.setProductList(r.data.result.list)
          this.setState({
            data: r.data.result.list,
            page: r.data.result.page.current_page,
            total: r.data.result.page.total,
          })
          return
        }
        else {
          this.setState({
            data: [...data, ...r.data.result.list],
            page: r.data.result.current_page,
            total: r.data.result.page.total
          })
          return
        }
      })
      .catch(e => console.log(e))
  }
  componentDidMount() {
    this.getProductIndex()
  }

  //头部下拉刷新
  async onRefreshHandle() {
    this.setState({
      isRefreshing: true
    })
    await axios.get(PRODUCT_INDEX, {
      headers: {
        "token": this.state.token
      }
    })
      .then(r => {
        if (r.data.code === 1) {
          //产品列表存到mobx中
          this.props.rootStore.setProductList(r.data.result.list)
          this.setState({
            data: r.data.result.list,
            page: r.data.result.page.current_page,
            total: r.data.result.page.total,
            isRefreshing: false
          })
          return
        }
        else {
          this.setState({
            isRefreshing: false
          })
          Toast.message(r.data.message, 2000, 'center')
          return
        }
      })
      .catch(e => console.log(e))
  }

  render() {
    let { rootStore } = this.props
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          {
            Platform.OS === 'ios' ? <StatusBar></StatusBar> :
              <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
          }
          <View style={styles.topBox}>
            <TopComp showState={this._onShow} show={this.state.show}></TopComp>
            <Modal
              animationType={'fade'}
              visible={this.state.modalVisible}
            >
              <View style={{...styles.modalBox, marginTop: !this.state.flag && Platform.OS === 'ios' || this.state.flag && Platform.OS === 'ios'? pxToPt(44) : null}}>
                <TopComp modalState={this._onchange} flag={this.state.flag} onPress={() => { this._cancal() }}></TopComp>
              {/* 价格筛选头部弹窗 */}
              {
                this.state.flag ? (
                  <View style={styles.drawer}>
                    <Text style={styles.priceTxt}>总价价格区间（元）</Text>
                    <View style={[styles.inpRow, basicStyle.flexRow]}>
                      <TextInput
                        style={styles.floorInput}
                        allowFontScaling={true}
                        placeholder={'最低价'}
                        onChangeText={(val) => this.setState({
                          min_sum_count: val
                        })}
                      ></TextInput>
                      {/* <View style={styles.line}></View> */}
                      <TextInput
                        style={styles.floorInput}
                        allowFontScaling={true}
                        placeholder={'最高价'}
                        onChangeText={(val) => this.setState({
                          max_sum_count: val
                        })}
                      ></TextInput>
                    </View>
                    <Text style={styles.priceTxt}>单价价格区间（元）</Text>
                    <View style={[styles.inpRow, basicStyle.flexRow]}>
                      <TextInput
                        style={styles.floorInput}
                        allowFontScaling={true}
                        placeholder={'最低价'}
                        onChangeText={(val) => this.setState({
                          min_price: val
                        })}
                      ></TextInput>
                      {/* <View style={styles.line}></View> */}
                      <TextInput
                        style={styles.floorInput}
                        allowFontScaling={true}
                        placeholder={'最高价'}
                        onChangeText={(val) => this.setState({
                          max_price: val
                        })}
                      ></TextInput>
                    </View>
                  </View>
                ) : null
              }
              {/* 排序筛选头部弹窗 */}
              {
                this.state.flag ? null : (
                  <>
                    <View style={styles.box}>
                      <View style={styles.sortBox}>
                        <Text style={styles.lftxt}>产品交易剩余时间</Text>
                        <TouchableOpacity
                          style={styles.rt}
                          onPress={() => {
                            this.setState({
                              time_Sort: !this.state.time_Sort
                            })
                          }}>
                          {
                            this.state.time_Sort ?
                              <>
                                <Text style={styles.rttxt}>从高到低</Text>
                                <Image style={{ width: pxToPt(14.78), height: pxToPt(18) }} source={require('../../assets/icons/pro/pro1.png')}></Image>
                              </> :
                              <>
                                <Text style={styles.rttxt}>从低到高</Text>
                                <Image style={{ width: pxToPt(14.78), height: pxToPt(18) }} source={require('../../assets/icons/pro/pro.png')}></Image>
                              </>
                          }
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.box}>
                      <View style={[styles.sortBox,styles.sortBoxLine]}>
                        <Text style={styles.lftxt}>产品总价价格</Text>
                        <TouchableOpacity style={styles.rt}
                          onPress={() => {
                            this.setState({
                              sum_count_Sort: !this.state.sum_count_Sort
                            })
                          }}>
                          {
                            this.state.sum_count_Sort ?
                              <>
                                <Text style={styles.rttxt}>从高到低</Text>
                                <Image style={{ width: pxToPt(14.78), height: pxToPt(18) }} source={require('../../assets/icons/pro/pro1.png')}></Image>
                              </> :
                              <>
                                <Text style={styles.rttxt}>从低到高</Text>
                                <Image style={{ width: pxToPt(14.78), height: pxToPt(18) }} source={require('../../assets/icons/pro/pro.png')}></Image>
                              </>
                          }
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.box}>
                      <View style={[styles.sortBox,styles.sortBoxLine]}>
                        <Text style={styles.lftxt}>产品单价价格</Text>
                        <TouchableOpacity style={styles.rt}
                          onPress={() => {
                            this.setState({
                              price_Sort: !this.state.price_Sort
                            })
                          }}>
                          {
                            this.state.price_Sort ?
                              <>
                                <Text style={styles.rttxt}>从高到低</Text>
                                <Image style={{ width: pxToPt(14.78), height: pxToPt(18) }} source={require('../../assets/icons/pro/pro1.png')}></Image>
                              </> :
                              <>
                                <Text style={styles.rttxt}>从低到高</Text>
                                <Image style={{ width: pxToPt(14.78), height: pxToPt(18) }} source={require('../../assets/icons/pro/pro.png')}></Image>
                              </>
                          }

                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )
              }
              <View style={[styles.choose, basicStyle.flexRow]}>
                <TouchableNativeFeedback onPress={this._cancal}>
                  <Image style={styles.cancel} source={require('../../assets/icons/pro/proqx.png')}></Image>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this._confirm}>
                  <Image style={styles.check} source={require('../../assets/icons/pro/pro-s.png')}></Image>
                </TouchableNativeFeedback>
              </View>
              </View>
            </Modal>
          <SafeAreaView >
            <ScrollView
              style={{ marginBottom: isIphoneX() ? pxToPt(48) : 0 }}
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
                rootStore.productList.length < 1 ?
                  <>
                    <Image style={{ width: pxToPt(206.22), height: pxToPt(217.11), alignSelf: 'center', top: pxToPt(53) }} source={require('../../assets/icons/default/noProduct.png')}></Image>
                    <Text style={{ color: '#8D9099', marginTop: pxToPt(58), alignSelf: 'center', fontWeight: '400', fontSize: pxToPt(15) }}>暂无产品</Text>
                  </>
                  :
                  rootStore.productList.map((v, i) => {
                    return <ProItem
                      key={i}
                      navigation={this.props.navigation}
                      isScroll={this.state.isScroll}
                      v={v}
                    />
                  })
              }
              {
                this.state.control && rootStore.productList.length > 0 ?
                  <View style={{ height: pxToPt(44), width: '100%', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: pxToPt(12), color: '#000' }}>---人家是有底线的---</Text></View> : <></>
              }
            </ScrollView>
          </SafeAreaView>
          {/* } */}

          </View>
      </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#FFFFFF'
  },
  topBox:{
    backgroundColor:'#f8f9fa',
    flex:1
  },
  priceTxt: {
    marginTop: pxToPt(11),
    marginLeft: pxToPt(16),
    marginBottom: pxToPt(11),
    color: '#2B2D33',
    fontSize: pxToPt(16)
  },
  inpRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: pxToPt(8),
    marginLeft: pxToPt(16),
    marginBottom: pxToPt(12)
  },
  floorInput: {
    width: pxToPt(106),
    height: pxToPt(32),
    paddingTop: pxToPt(6),
    paddingBottom: pxToPt(6),
    paddingLeft: pxToPt(19),
    paddingRight: pxToPt(18),
    borderRadius: pxToPt(32),
    fontSize: pxToPt(14),
    backgroundColor: '#F5F5F7',
    color: '#5A5D66'
  },
  line: {
    width: pxToPt(64),
    // height: pxToPt(2),
    // backgroundColor: '#EBECED'
  },
  choose: {
    justifyContent: 'space-around',
    borderTopWidth: pxToPt(1),
    borderTopColor: '#EBECEDFF',
    paddingTop: pxToPt(9),
    paddingBottom: pxToPt(8),
    backgroundColor: '#fff',
    height: pxToPt(48),
    alignItems: 'center',
    // borderBottomWidth:pxToPt(1),
    // borderBottomColor:'#EBECEDFF',
  },
  modalBox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .6)'  //蒙层
  },
  cancel: {
    height: pxToPt(30),
    width: pxToPt(30)
  },
  check: {
    height: pxToPt(24),
    width: pxToPt(30)
  },

  box: {
    backgroundColor: '#fff',
  },
  sortBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: pxToPt(16),
    marginRight: pxToPt(16),
  },
  sortBoxLine:{
    borderTopWidth: pxToPt(1),
    borderTopColor: '#EBECEDFF'
  },
  lftxt: {
    height: pxToPt(22),
    marginTop: pxToPt(13),
    marginBottom: pxToPt(13),
    color: '#2B2D33',
    fontSize: pxToPt(16),
  },
  rt: {
    flexDirection: 'row',
    marginTop: pxToPt(14),
    marginBottom: pxToPt(14),
  },
  rttxt: {
    height: pxToPt(18),
    marginRight: pxToPt(4),
    fontSize: pxToPt(14),
    color: '#5A5D66'
  },

})