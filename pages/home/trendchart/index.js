import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Echarts } from 'native-echarts';
import PriceShow from '../billboard/index'
import Toast from '../../../utils/api/Toast'
import {pxToPt} from '../../../utils/styleKits'
import axios from '../../../utils/api/request'
import { HOME_DATALIST } from '../../../utils/api/pathMap'
import { NavigationContext } from '@react-navigation/native'
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer
export default class chart extends Component {
  static contextType = NavigationContext
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      avaPrice: 0,
      percent: 0,
      active: 'day',
      token: this.props.rootStore.token,
      option1: {
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
        },
        legend: {
          left: 16
        },
        dataZoom: [{
          type: 'inside',
          start: 95,
          end: 100,
          zoomLock: false,
        }],
        tooltip: {
          trigger: 'axis',
        },
        xAxis: { //x轴
          boundaryGap: false,
          data:[],
          axisLine: {
            show: false, //是否显示轴线
          },
          type: 'category',
          // offset: 9, //偏移量
          axisTick: {
            show: false, //刻度
            alignWithLabel: true //刻度线和标签对齐
          },
          axisLabel: {
            align: {
              option: 'right'
            },
            color: 'rgba(141, 144, 153, 1)',
            fontSize: 10,
            lineHeight: 14,
          },
        },
        yAxis: [
          {
            type: 'value',
            boundaryGap: [0, '100%'],
            position: 'left',
            max: function (value) {
              return value.max + value.max * 0.008
            },
            min: function (value) {
              return value.min - value.min * 0.005
            },
            axisLine: {
              show: false, //是否显示轴线
            },
            axisTick: {
              show: false, //刻度
            },
            splitLine: {
              show: false, //是否显示分隔线
            },
            scale: true,

          },
          {
            type: 'value',
            boundaryGap: [0, '100%'],
            position: 'left',
            max: function (value) {
              return value.max + value.max * 0.008
            },
            min: function (value) {
              return value.min - value.min * 0.005
            },
            axisLine: {
              show: false, //是否显示轴线
            },
            axisTick: {
              show: false, //刻度
            },
            splitLine: {
              show: false, //是否显示分隔线
            },
            scale: true,

          },
          {
            type: 'value',
            boundaryGap: [0, '100%'],
            position: 'left',
            max: function (value) {
              return value.max + value.max * 0.008
            },
            min: function (value) {
              return value.min - value.min * 0.005
            },
            axisLine: {
              show: false, //是否显示轴线
            },
            axisTick: {
              show: false, //刻度
            },
            splitLine: {
              show: false, //是否显示分隔线
            },
            scale: true,

          },
        ],
        series: [
          {
            name: '价格',
            type: 'line',
            smooth: false,    //光滑
            symbol: 'none',
            data:[],
            yAxisIndex: 0
          },
          {
            name: '总交易量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data:[],
            yAxisIndex: 1

          },
          {
            name: '成交量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data:[],
            yAxisIndex: 2
          },
        ]
      },
      flag: true
    }
    this.lastTimer = null;
    this.timer = null;
    this.requestTime = null
  }

  getHomeDataList = async (active = 'day') => {
    let { token } = this.state
    let url = HOME_DATALIST + `?type=${active}`
    await axios.get(url, {
      headers: {
        "token": token
      }
    }).then(r => {
      if (r.data.code === 1) {
        let counTime = []
        let price = []
        let marketCap = []
        let volh = []
        r.data.result.data.forEach(ele => {
          if (active === 'day') {
            counTime.push(ele.count_time.trim().split(" ")[1])
          } else {
            counTime.push(ele.count_time)
          }
          marketCap.push(ele.market_cap)
          price.push(ele.price_usdt)
          volh.push(ele.vol_24h)
        });
        let priceArr = []  //装的是价格 最大单位级别 直接用
        price.forEach(ele => {
          priceArr.push(ele)
        })
        let volhArr = []    //装的是24小时成交量 最大单位级  直接用
        volh.forEach(ele => {
          volhArr.push(ele)
        })
        let mystart,
          myend
        if (active !== 'day') {
          mystart = 75,
            myend = 100//x坐标的百分比容量
        } else {
          mystart = 95,
            myend = 100//x坐标的百分比容量
        }
        this.setState({
          active: active,
          avaPrice: r.data.result.lastPrice,
          percent: r.data.result.percent,
          flag: false,
          option1: {
            grid: {
              left: 0,
              right: 0,
              bottom: 50,
            },
            legend: {
              left: 16
            },
            dataZoom: [{
              type: 'inside',
              start: mystart,
              end: myend,
              zoomLock: false,
            }],
            tooltip: {
              trigger: 'axis',
            },
            xAxis: { //x轴
              boundaryGap: false,
              data: counTime,//需要动态改变
              axisLine: {
                show: false, //是否显示轴线
              },
              type: 'category',
              // offset: 9, //偏移量
              axisTick: {
                show: false, //刻度
                alignWithLabel: true //刻度线和标签对齐
              },
              axisLabel: {
                align: {
                  option: 'right'
                },
                color: 'rgba(141, 144, 153, 1)',
                fontSize: 10,
                lineHeight: 14,
              },
            },
            yAxis: [
              {
                type: 'value',
                boundaryGap: [0, '100%'],
                position: 'left',
                max: function (value) {
                  return value.max + value.max * 0.008
                },
                min: function (value) {
                  return value.min - value.min * 0.005
                },
                axisLine: {
                  show: false, //是否显示轴线
                },
                axisTick: {
                  show: false, //刻度
                },
                splitLine: {
                  show: false, //是否显示分隔线
                },
                scale: true,
              },
              {
                type: 'value',
                boundaryGap: [0, '100%'],
                position: 'left',
                max: function (value) {
                  return value.max + value.max * 0.008
                },
                min: function (value) {
                  return value.min - value.min * 0.005
                },
                axisLine: {
                  show: false, //是否显示轴线
                },
                axisTick: {
                  show: false, //刻度
                },
                splitLine: {
                  show: false, //是否显示分隔线
                },
                scale: true,
              },
              {
                type: 'value',
                boundaryGap: [0, '100%'],
                position: 'left',
                max: function (value) {
                  return value.max + value.max * 0.008
                },
                min: function (value) {
                  return value.min - value.min * 0.005
                },
                axisLine: {
                  show: false, //是否显示轴线
                },
                axisTick: {
                  show: false, //刻度
                },
                splitLine: {
                  show: false, //是否显示分隔线
                },
                scale: true,
              },
            ],
            series: [
              {
                name: '价格',
                type: 'line',
                smooth: true,    //光滑
                symbol: 'none',
                data: priceArr,
                yAxisIndex: 0
              },
              {
                name: '总交易量',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: marketCap,
                yAxisIndex: 1

              },
              {
                name: '成交量',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: volhArr,
                yAxisIndex: 2
              },
            ]
          },
        })
      }
    }).catch(e => console.log('[大数据趋势图Error]', e))

  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.getHomeDataList();
    this.requestTime = setInterval(() => {
    this.getHomeDataList();
    }, 120000)

  }
  
  _dbclick = () => {
    let { active } = this.state
    const clickTime = new Date().getTime();
    if (this.lastclick && (clickTime - this.lastclick < 300)) {
      //第二次及以上点击
      clearTimeout(this.timer);
      //跳去满屏图 传active
      this.context.navigate("SecondEchart", { active: active })
    } else {
      //第一次点击
      this.timer = setTimeout(() => {
        return
      }, 300);
    }
    this.lastclick = clickTime;
  }

  componentWillUnmount() {
    clearInterval(this.requestTime)
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    BackHandler.exitApp();
    return;
  }
  render() {
    let { active, option1, avaPrice, percent } = this.state
    return (
      <>
        <PriceShow price={avaPrice} percent={percent}></PriceShow>
        <View style={styles.box} >
          <View style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'space-around', height: pxToPt(40), alignItems: 'center' }}>
            <TouchableOpacity style={{ ...styles.boxon }} onPress={() => {
              Toast.message('加载中', 1200, 'top')
              this.getHomeDataList('day')
            }}>
              <Text style={[active === 'day' ? styles.active : styles.fon]}>1天</Text>
              {
                active === 'day' ? <Text style={{ backgroundColor: '#008c', height: pxToPt(1), marginTop: pxToPt(2) }}>--</Text> : <></>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxon} onPress={() => {
              Toast.message('加载中', 1200, 'top')
              this.getHomeDataList('week')
            }}>
              <Text style={[active === 'week' ? styles.active : styles.fon]}>1周</Text>
              {
                active === 'week' ? <Text style={{ backgroundColor: '#008c', height: pxToPt(1), marginTop: pxToPt(2) }}>--</Text> : <></>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxon} onPress={() => {
              Toast.message('加载中', 1200, 'top')
              this.getHomeDataList('month')
            }}>
              <Text style={[active === 'month' ? styles.active : styles.fon]}>1月</Text>
              {
                active === 'month' ? <Text style={{ backgroundColor: '#008c', height: pxToPt(1), marginTop: pxToPt(2) }}>--</Text> : <></>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxon} onPress={() => {
              Toast.message('加载中', 1200, 'top')
              this.getHomeDataList('quarter')
            }}>
              <Text style={[active === 'quarter' ? styles.active : styles.fon]}>季度</Text>
              {
                active === 'quarter' ? <Text style={{ backgroundColor: '#008c', height: pxToPt(1), marginTop: pxToPt(2) }}>--</Text> : <></>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxon} onPress={() => {
              Toast.message('加载中', 1200, 'top')
              this.getHomeDataList('half_year')
            }}>
              <Text style={[active === 'half_year' ? styles.active : styles.fon]}>半年</Text>
              {
                active === 'half_year' ? <Text style={{ backgroundColor: '#008c', height: 1, marginTop: 2 }}>--</Text> : <></>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxon} onPress={() => {
              Toast.message('加载中', 1200, 'top')
              this.getHomeDataList('year')
            }}>
              <Text style={[active === 'year' ? styles.active : styles.fon]}>1年</Text>
              {
                active === 'year' ? <Text style={{ backgroundColor: '#008c', height: pxToPt(1), marginTop: pxToPt(2) }}>--</Text> : <></>
              }
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={this._dbclick}
            style={{ backgroundColor: 'rgba(255,255,255,0)', width: '100%', height: pxToPt(120), position: 'absolute', top: pxToPt(60), zIndex: 2 }}></TouchableOpacity>
          <Echarts
            option={option1} height={288} width={'100%'} />
        </View >
      </>
    );
  }
}


const styles = StyleSheet.create({
  box: {
    height: pxToPt(300),
    backgroundColor: '#fff',
  },
  boxon: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: pxToPt(75),

  },
  fon: {
    color: '#8D9099',
    fontSize: pxToPt(11),
    fontWeight: '400'
  },
  active: {
    color: '#3D72E4',
    fontWeight: '500',
    fontSize: pxToPt(11),
  }
});