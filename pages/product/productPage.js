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
} from 'react-native';



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
    var url = PRODUCT_INDEX + `?min_sum_count=${min_sum_count}&max_sum_coount=${max_sum_count}&min_price=${min_price}&max_price=${max_price}&page=${current_page}&page_size=${pageSize}&sort_code=${timeSort, sumCountSort, priceSort}`
    //发送请求
    console.log('[条件筛选前]', timeSort, sumCountSort, priceSort, url)

    await axios.get(url, {
      headers: {
        "token": token
      }
    }).then(r => {
      if (r.data.code === 1) {
        console.log('[筛选价格 和 排序]', r.data.result.list)
        this.setState({
          data: r.data.result.list,
          page: r.data.result.page.current_page,
          total: r.data.result.page.total,
          modalVisible: false,
        })
      } else {
        Toast.message(r.data.message, 2000, 'center')
      }
    })
  }
  //滚动条到底 的请求
  getMore = (e) => {
    let { data, total, control } = this.state
    // this.setState({
    //   isScroll: true
    // })
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
          this.props.rootStore.setProductList(r.data.result.list)
          this.setState({
            data: r.data.result.list,
            page: r.data.result.page.current_page,
            total: r.data.result.page.total
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
        <StatusBar backgroundColor="#fff"></StatusBar>
        <View style={styles.topBox}>
          <TopComp showState={this._onShow} show={this.state.show}></TopComp>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={styles.modalBox}>
              <TopComp modalState={this._onchange} flag={this.state.flag} onPress={() => { this._cancal() }}></TopComp>
              {/* 价格筛选头部弹窗 */}
              {
                this.state.flag ? (
                  <View style={styles.drawer}>
                    <Text style={styles.priceTxt}>总价价格区间（元）</Text>
                    <View style={[styles.inpRow, basicStyle.flexRow]}>
                      <TextInput
                        style={styles.floorInput}
                        placeholder={'输入最低价'}
                        onChangeText={(val) => this.setState({
                          min_sum_count: val
                        })}
                      ></TextInput>
                      <View style={styles.line}></View>
                      <TextInput
                        style={styles.floorInput}
                        placeholder={'输入最高价'}
                        onChangeText={(val) => this.setState({
                          max_sum_count: val
                        })}
                      ></TextInput>
                    </View>
                    <Text style={styles.priceTxt}>单价价格区间（元）</Text>
                    <View style={[styles.inpRow, basicStyle.flexRow]}>
                      <TextInput
                        style={styles.floorInput}
                        placeholder={'输入最低价'}
                        onChangeText={(val) => this.setState({
                          min_price: val
                        })}
                      ></TextInput>
                      <View style={styles.line}></View>
                      <TextInput
                        style={styles.floorInput}
                        placeholder={'输入最高价'}
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
                                <Image source={require('../../assets/icons/pro/pro1.png')}></Image>
                              </> :
                              <>
                                <Text style={styles.rttxt}>从低到高</Text>
                                <Image source={require('../../assets/icons/pro/pro.png')}></Image>
                              </>
                          }
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.box}>
                      <View style={styles.sortBox}>
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
                                <Image source={require('../../assets/icons/pro/pro1.png')}></Image>
                              </> :
                              <>
                                <Text style={styles.rttxt}>从低到高</Text>
                                <Image source={require('../../assets/icons/pro/pro.png')}></Image>
                              </>
                          }
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.box}>
                      <View style={styles.sortBox}>
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
                                <Image source={require('../../assets/icons/pro/pro1.png')}></Image>
                              </> :
                              <>
                                <Text style={styles.rttxt}>从低到高</Text>
                                <Image source={require('../../assets/icons/pro/pro.png')}></Image>
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
          {
            rootStore.productList.length < 1 ?
              <>
                <Image style={{ width: 206.22, height: 217.11, alignSelf: 'center', top: 53 }} source={require('../../assets/icons/default/noProduct.png')}></Image>
                <Text style={{ color: '#8D9099', marginTop: 58, alignSelf: 'center', fontWeight: '400', fontSize: 15 }}>暂无产品</Text>
              </>
              :
              <SafeAreaView style={{ paddingBottom: 90 }}>
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
                    this.state.control ?
                      <View style={{ height: 44, width: '100%', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 12, color: '#000' }}>---人家是有底线的---</Text></View> : <></>
                  }
                </ScrollView>
              </SafeAreaView>
          }

        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#FFFFFF'
  },
  priceTxt: {
    marginTop: 11,
    marginLeft: 16,
    marginBottom: 11,
    color: '#2B2D33',
    fontSize: 16
  },
  inpRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 12
  },
  floorInput: {
    width: 106,
    height: 32,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 19,
    paddingRight: 18,
    borderRadius: 32,
    fontSize: 14,
    backgroundColor: '#F5F5F7',
    color: '#5A5D66'
  },
  line: {
    width: 64,
    height: 2,
    backgroundColor: '#EBECED'
  },
  choose: {
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#EBECED',
    paddingTop: 9,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF'
  },
  modalBox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .6)'
  },
  cancel: {
    height: 30,
    width: 30
  },
  check: {
    height: 24,
    width: 30
  },

  box: {
    backgroundColor: '#FFFFFF',
  },
  sortBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F7'
  },
  lftxt: {
    height: 22,
    marginTop: 13,
    marginBottom: 13,
    color: '#2B2D33',
    fontSize: 16,
  },
  rt: {
    flexDirection: 'row',
    marginTop: 14,
    marginBottom: 14,
  },
  rttxt: {
    height: 18,
    marginRight: 4,
    fontSize: 14,
    color: '#5A5D66'
  },

})