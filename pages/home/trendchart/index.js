import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Echarts } from 'native-echarts';
import PriceShow from '../billboard/index'
import Toast from '../../../utils/api/Toast'
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
          start: 0,
          end: 0,
          zoomLock: false,
        }],
        tooltip: {
          trigger: 'axis',
        },
        xAxis: { //x轴
          boundaryGap: false,
          data: [],
          // data: ["13:40:00", "13:42:00", "13:44:00", "13:46:00", "13:48:00", "13:50:00", "13:52:00", "13:54:00", "13:56:00", "13:58:00", "14:00:00", "14:02:00", "14:04:00", "14:06:00", "14:08:00", "14:10:00", "14:12:00", "14:14:00", "14:16:00", "14:18:00", "14:20:00", "14:22:00", "14:24:00", "14:26:00", "14:28:00", "14:30:00", "14:32:00", "14:34:00", "14:36:00", "14:38:00", "14:40:00", "14:42:00", "14:44:00", "14:46:00", "14:48:00", "14:50:00", "14:52:00", "14:54:00", "14:56:00", "14:58:00", "15:00:00", "15:02:00", "15:04:00", "15:06:00", "15:08:00", "15:10:00", "15:12:00", "15:14:00", "15:16:00", "15:18:00", "15:20:00", "15:22:00", "15:24:00", "15:26:00", "15:28:00", "15:30:00", "15:32:00", "15:34:00", "15:36:00", "15:38:00", "15:40:00", "15:42:00", "15:44:00", "15:46:00", "15:48:00", "15:50:00", "15:52:00", "15:54:00", "15:56:00", "15:58:00", "16:00:00", "16:02:00", "16:04:00", "16:06:00", "16:08:00", "16:10:00", "16:12:00", "16:14:00", "16:16:00", "16:18:00", "16:20:00", "16:22:00", "16:24:00", "16:26:00", "16:28:00", "16:30:00", "16:32:00", "16:34:00", "16:36:00", "16:38:00", "16:40:00", "16:42:00", "16:44:00", "16:46:00", "16:48:00", "16:50:00", "16:52:00", "16:54:00", "16:56:00", "16:58:00", "17:00:00", "17:02:00", "17:04:00", "17:06:00", "17:08:00", "17:10:00", "17:12:00", "17:14:00", "17:16:00", "17:18:00", "17:20:00", "17:22:00", "17:24:00", "17:26:00", "17:28:00", "17:30:00", "17:32:00", "17:34:00", "17:36:00", "17:38:00", "17:40:00", "17:42:00", "17:44:00", "17:46:00", "17:48:00", "17:50:00", "17:52:00", "17:54:00", "17:56:00", "17:58:00", "18:00:00", "18:02:00", "18:04:00", "18:06:00", "18:08:00", "18:10:00", "18:12:00", "18:14:00", "18:16:00", "18:18:00", "18:20:00", "18:22:00", "18:24:00", "18:26:00", "18:28:00", "18:30:00", "18:32:00", "18:34:00", "18:36:00", "18:38:00", "18:40:00", "18:42:00", "18:44:00", "18:46:00", "18:48:00", "18:50:00", "18:52:00", "18:54:00", "18:56:00", "18:58:00", "19:00:00", "19:02:00", "19:04:00", "19:06:00", "19:08:00", "19:10:00", "19:12:00", "19:14:00", "19:16:00", "19:18:00", "19:20:00", "19:22:00", "19:24:00", "19:26:00", "19:28:00", "19:30:00", "19:32:00", "19:34:00", "19:36:00", "19:38:00", "19:40:00", "19:42:00", "19:44:00", "19:46:00", "19:48:00", "19:50:00", "19:52:00", "19:54:00", "19:56:00", "19:58:00", "20:00:00", "20:02:00", "20:04:00", "20:06:00", "20:08:00", "20:10:00", "20:12:00", "20:14:00", "20:16:00", "20:18:00", "20:20:00", "20:22:00", "20:24:00", "20:26:00", "20:28:00", "20:30:00", "20:32:00", "20:34:00", "20:36:00", "20:38:00", "20:40:00", "20:42:00", "20:44:00", "20:46:00", "20:48:00", "20:50:00", "20:52:00", "20:54:00", "20:56:00", "20:58:00", "21:00:00", "21:02:00", "21:04:00", "21:06:00", "21:08:00", "21:10:00", "21:12:00", "21:14:00", "21:16:00", "21:18:00", "21:20:00", "21:22:00", "21:24:00", "21:26:00", "21:28:00", "21:30:00", "21:32:00", "21:34:00", "21:36:00", "21:38:00", "21:40:00", "21:42:00", "21:44:00", "21:46:00", "21:48:00", "21:50:00", "21:52:00", "21:54:00", "21:56:00", "21:58:00", "22:00:00", "22:02:00", "22:04:00", "22:06:00", "22:08:00", "22:10:00", "22:12:00", "22:14:00", "22:16:00", "22:18:00", "22:20:00", "22:22:00", "22:24:00", "22:26:00", "22:28:00", "22:30:00", "22:32:00", "22:34:00", "22:36:00", "22:38:00", "22:40:00", "22:42:00", "22:44:00", "22:46:00", "22:48:00", "22:50:00", "22:52:00", "22:54:00", "22:56:00", "22:58:00", "23:00:00", "23:02:00", "23:04:00", "23:06:00", "23:08:00", "23:10:00", "23:12:00", "23:14:00", "23:16:00", "23:18:00", "23:20:00", "23:22:00", "23:24:00", "23:26:00", "23:28:00", "23:30:00", "23:32:00", "23:34:00", "23:36:00", "23:38:00", "23:40:00", "23:42:00", "23:44:00", "23:46:00", "23:48:00", "23:50:00", "23:52:00", "23:54:00", "23:56:00", "23:58:00", "00:00:00", "00:02:00", "00:04:00", "00:06:00", "00:08:00", "00:10:00", "00:12:00", "00:14:00", "00:16:00", "00:18:00", "00:20:00", "00:22:00", "00:24:00", "00:26:00", "00:28:00", "00:30:00", "00:32:00", "00:34:00", "00:36:00", "00:38:00", "00:40:00", "00:42:00", "00:44:00", "00:46:00", "00:48:00", "00:50:00", "00:52:00", "00:54:00", "00:56:00", "00:58:00", "01:00:00", "01:02:00", "01:04:00", "01:06:00", "01:08:00", "01:10:00", "01:12:00", "01:14:00", "01:16:00", "01:18:00", "01:20:00", "01:22:00", "01:24:00", "01:26:00", "01:28:00", "01:30:00", "01:32:00", "01:34:00", "01:36:00", "01:38:00", "01:40:00", "01:42:00", "01:44:00", "01:46:00", "01:48:00", "01:50:00", "01:52:00", "01:54:00", "01:56:00", "01:58:00", "02:00:00", "02:02:00", "02:04:00", "02:06:00", "02:08:00", "02:10:00", "02:12:00", "02:14:00", "02:16:00", "02:18:00", "02:20:00", "02:22:00", "02:24:00", "02:26:00", "02:28:00", "02:30:00", "02:32:00", "02:34:00", "02:36:00", "02:38:00", "02:40:00", "02:42:00", "02:44:00", "02:46:00", "02:48:00", "02:50:00", "02:52:00", "02:54:00", "02:56:00", "02:58:00", "03:00:00", "03:02:00", "03:04:00", "03:06:00", "03:08:00", "03:10:00", "03:12:00", "03:14:00", "03:16:00", "03:18:00", "03:20:00", "03:22:00", "03:24:00", "03:26:00", "03:28:00", "03:30:00", "03:32:00", "03:34:00", "03:36:00", "03:38:00", "03:40:00", "03:42:00", "03:44:00", "03:46:00", "03:48:00", "03:50:00", "03:52:00", "03:54:00", "03:56:00", "03:58:00", "04:00:00", "04:02:00", "04:04:00", "04:06:00", "04:08:00", "04:10:00", "04:12:00", "04:14:00", "04:16:00", "04:18:00", "04:20:00", "04:22:00", "04:24:00", "04:26:00", "04:28:00", "04:30:00", "04:32:00", "04:34:00", "04:36:00", "04:38:00", "04:40:00", "04:42:00", "04:44:00", "04:46:00", "04:48:00", "04:50:00", "04:52:00", "04:54:00", "04:56:00", "04:58:00", "05:00:00", "05:02:00", "05:04:00", "05:06:00", "05:08:00", "05:10:00", "05:12:00", "05:14:00", "05:16:00", "05:18:00", "05:20:00", "05:22:00", "05:24:00", "05:26:00", "05:28:00", "05:30:00", "05:32:00", "05:34:00", "05:36:00", "05:38:00", "05:40:00", "05:42:00", "05:44:00", "05:46:00", "05:48:00", "05:50:00", "05:52:00", "05:54:00", "05:56:00", "05:58:00", "06:00:00", "06:02:00", "06:04:00", "06:06:00", "06:08:00", "06:10:00", "06:12:00", "06:14:00", "06:16:00", "06:18:00", "06:20:00", "06:22:00", "06:24:00", "06:26:00", "06:28:00", "06:30:00", "06:32:00", "06:34:00", "06:36:00", "06:38:00", "06:40:00", "06:42:00", "06:44:00", "06:46:00", "06:48:00", "06:50:00", "06:52:00", "06:54:00", "06:56:00", "06:58:00", "07:00:00", "07:02:00", "07:04:00", "07:06:00", "07:08:00", "07:10:00", "07:12:00", "07:14:00", "07:16:00", "07:18:00", "07:20:00", "07:22:00", "07:24:00", "07:26:00", "07:28:00", "07:30:00", "07:32:00", "07:34:00", "07:36:00", "07:38:00", "07:40:00", "07:42:00", "07:44:00", "07:46:00", "07:48:00", "07:50:00", "07:52:00", "07:54:00", "07:56:00", "07:58:00", "08:00:00", "08:02:00", "08:04:00", "08:06:00", "08:08:00", "08:10:00", "08:12:00", "08:14:00", "08:16:00", "08:18:00", "08:20:00", "08:22:00", "08:24:00", "08:26:00", "08:28:00", "08:30:00", "08:32:00", "08:34:00", "08:36:00", "08:38:00", "08:40:00", "08:42:00", "08:44:00", "08:46:00", "08:48:00", "08:50:00", "08:52:00", "08:54:00", "08:56:00", "08:58:00", "09:00:00", "09:02:00", "09:04:00", "09:06:00", "09:08:00", "09:10:00", "09:12:00", "09:14:00", "09:16:00", "09:18:00", "09:20:00", "09:22:00", "09:24:00", "09:26:00", "09:28:00", "09:30:00", "09:32:00", "09:34:00", "09:36:00", "09:38:00", "09:40:00", "09:42:00", "09:44:00", "09:46:00", "09:48:00", "09:50:00", "09:52:00", "09:54:00", "09:56:00", "09:58:00", "10:00:00", "10:02:00", "10:04:00", "10:06:00", "10:08:00", "10:10:00", "10:12:00", "10:14:00", "10:16:00", "10:18:00", "10:20:00", "10:22:00", "10:24:00", "10:26:00", "10:28:00", "10:30:00", "10:32:00", "10:34:00", "10:36:00", "10:38:00", "10:40:00", "10:42:00", "10:44:00", "10:46:00", "10:48:00", "10:50:00", "10:52:00", "10:54:00", "10:56:00", "10:58:00", "11:00:00", "11:02:00", "11:04:00", "11:06:00", "11:08:00", "11:10:00", "11:12:00", "11:14:00", "11:16:00", "11:18:00", "11:20:00", "11:22:00", "11:24:00", "11:26:00", "11:28:00", "11:30:00", "11:32:00", "11:34:00", "11:36:00", "11:38:00", "11:40:00", "11:42:00", "11:44:00", "11:46:00", "11:48:00", "11:50:00", "11:52:00", "11:54:00", "11:56:00", "11:58:00", "12:00:00", "12:02:00", "12:04:00", "12:06:00", "12:08:00", "12:10:00", "12:12:00", "12:14:00", "12:16:00", "12:18:00", "12:20:00", "12:22:00", "12:24:00", "12:26:00", "12:28:00", "12:30:00", "12:32:00", "12:34:00", "12:36:00", "12:38:00", "12:40:00", "12:42:00", "12:44:00", "12:46:00", "12:48:00", "12:50:00", "12:52:00", "12:54:00", "12:56:00", "12:58:00", "13:00:00", "13:02:00", "13:04:00", "13:06:00", "13:08:00", "13:10:00", "13:12:00", "13:14:00", "13:16:00", "13:18:00", "13:20:00", "13:22:00", "13:24:00", "13:26:00", "13:28:00", "13:30:00", "13:32:00", "13:34:00", "13:36:00", "13:38:00"],//需要动态改变
          // data:date,
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
            data: [],
            yAxisIndex: 0
          },
          {
            name: '总交易量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: [],
             yAxisIndex: 1

          },
          {
            name: '成交量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: [],
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
    let { active,option1 } = this.state
    return (
      <>
        <PriceShow price={this.state.avaPrice} percent={this.state.percent}></PriceShow>
        <View style={styles.box} >
          <View style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'space-around', height: 40, alignItems: 'center' }}>
            <TouchableOpacity style={{ ...styles.boxon }} onPress={() => {
              Toast.message('加载中', 1200, 'top')
              this.getHomeDataList('day')
            }}>
              <Text style={[active === 'day' ? styles.active : styles.fon]}>1天</Text>
              {
                active === 'day' ? <Text style={{ backgroundColor: '#008c', height: 1, marginTop: 2 }}>--</Text> : <></>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxon} onPress={() => {
              Toast.message('加载中', 1200, 'top')
              this.getHomeDataList('week')
            }}>
              <Text style={[active === 'week' ? styles.active : styles.fon]}>1周</Text>
              {
                active === 'week' ? <Text style={{ backgroundColor: '#008c', height: 1, marginTop: 2 }}>--</Text> : <></>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxon} onPress={() => {
              Toast.message('加载中', 1200, 'top')
              this.getHomeDataList('month')
            }}>
              <Text style={[active === 'month' ? styles.active : styles.fon]}>1月</Text>
              {
                active === 'month' ? <Text style={{ backgroundColor: '#008c', height: 1, marginTop: 2 }}>--</Text> : <></>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxon} onPress={() => {
              Toast.message('加载中', 1200, 'top')
              this.getHomeDataList('quarter')
            }}>
              <Text style={[active === 'quarter' ? styles.active : styles.fon]}>季度</Text>
              {
                active === 'quarter' ? <Text style={{ backgroundColor: '#008c', height: 1, marginTop: 2 }}>--</Text> : <></>
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
                active === 'year' ? <Text style={{ backgroundColor: '#008c', height: 1, marginTop: 2 }}>--</Text> : <></>
              }
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={this._dbclick}
            style={{ backgroundColor: 'rgba(255,255,255,0)', width: '100%', height: 120, position: 'absolute', top: 60, zIndex: 2 }}></TouchableOpacity>
          <Echarts ref={this.echartsRef} option={option1} height={286} />
        </View>
      </>
    );
  }
}


const styles = StyleSheet.create({
  box: {
    height: 300,
    backgroundColor: '#fff',
  },
  boxon: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,

  },
  fon: {
    color: '#8D9099',
    fontSize: 11,
    fontWeight: '400'
  },
  active: {
    color: '#3D72E4',
    fontWeight: '500',
    fontSize: 11,
  }
});