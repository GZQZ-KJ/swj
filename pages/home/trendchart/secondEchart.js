import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Dimensions
} from 'react-native'
import { Echarts } from 'native-echarts';

import axios from '../../../utils/api/request'
import { HOME_DATALIST } from '../../../utils/api/pathMap'

import { inject, observer } from 'mobx-react'
import Toast from '../../../utils/api/Toast'
@inject('rootStore')
@observer
export default class secondEchart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoading: true,
            active: this.props.route.params.active,
            token: this.props.rootStore.token,
            option: {
                grid: {
                    left: 0,
                    right: 0,
                    bottom: 50,
                },
                legend: {
                },
                dataZoom: [{   //
                    type: 'inside',
                    start: 95,
                    end: 100,//x坐标的百分比容量
                    zoomLock: false,
                },],
                toolbox: {
                    right: 30,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    // formatter: function (params) {
                    //     var htmlStr = '';
                    //     htmlStr += '<div><span style="color:#fff;">' + params[0].name + '</span><br/> ';
                    //     for (var i = 0; i < params.length; i++) {
                    //         htmlStr += '<span style="width: 8px;height: 8px;display:inline-block;border-radius: 50%;background-color:' + params[i].color + '"></span><span style="color:#fff;">' + params[i].seriesName + ':</span>' +
                    //             '<span style="color:#fff;">' + params[i].value + '</span><br/>';
                    //     }
                    //     htmlStr += '</div>';
                    //     return htmlStr;
                    // },
                },
                xAxis: { //x轴
                    boundaryGap: false,
                    data: [],   //需要动态改变
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
                    offset: 26,
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
                        position: 'left',
                        max: function (value) {
                            return value.max + value.max * 0.8
                        },
                        min: function (value) {
                            return value.min - value.min * 0.5
                        },
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        position: 'left',
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
                        // splitNumber:
                    },
                    {
                        position: 'left',
                        max: function (value) {
                            return value.max + value.max * 0.008
                        },
                        min: function (value) {
                            return value.min - value.min * 0.005
                        },
                        type: 'value',
                        boundaryGap: [0, '50%'],
                        position: 'left',
                        axisLine: {
                            show: false, //是否显示轴线
                        },
                        axisTick: {
                            show: false, //刻度
                        },
                        splitLine: {
                            show: false, //是否显示分隔线
                        },
                        scale: true
                    },
                    {
                        position: 'left',
                        max: function (value) {
                            return value.max + value.max * 0.008
                        },
                        min: function (value) {
                            return value.min - value.min * 0.005
                        },
                        type: 'value',
                        boundaryGap: [0, '50%'],
                        position: 'left',
                        axisLine: {
                            show: false, //是否显示轴线
                        },
                        axisTick: {
                            show: false, //刻度
                        },
                        splitLine: {
                            show: false, //是否显示分隔线
                        },
                        scale: true
                    },
                ],
                series: [
                    {
                        name: '价格',
                        type: 'line',
                        smooth: true,    //光滑
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
                        name: '24小时成交量',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        data: [],
                        yAxisIndex: 2
                    },
                ]
            },
        }
        this.requestTime = null

    }

    getHomeDataList = async () => {
        let { token, active } = this.state
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
                    mystart = 85,
                        myend = 100//x坐标的百分比容量
                } else {
                    mystart = 95,
                        myend = 100//x坐标的百分比容量
                }

                this.setState({
                    showLoading: false,
                    option: {
                        grid: {
                            left: 0,
                            right: 0,
                            bottom: 50,
                        },
                        legend: {
                        },
                        dataZoom: [{   //
                            type: 'inside',
                            start: mystart,
                            end: myend,//x坐标的百分比容量
                            zoomLock: false,
                        },],
                        toolbox: {
                            right: 30,
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                restore: {},
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            // formatter: function (params) {
                            //     var htmlStr = '';
                            //     htmlStr += '<div><span style="color:#fff;">' + params[0].name + '</span><br/> ';
                            //     for (var i = 0; i < params.length; i++) {
                            //         htmlStr += '<span style="width: 8px;height: 8px;display:inline-block;border-radius: 50%;background-color:' + params[i].color + '"></span><span style="color:#fff;">' + params[i].seriesName + ':</span>' +
                            //             '<span style="color:#fff;">' + params[i].value + '</span><br/>';
                            //     }
                            //     htmlStr += '</div>';
                            //     return htmlStr;
                            // },
                        },
                        xAxis: { //x轴
                            boundaryGap: false,
                            data: counTime,   //需要动态改变
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
                            offset: 26,
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
                                position: 'left',
                                max: function (value) {
                                    return value.max + value.max * 0.008
                                },
                                min: function (value) {
                                    return value.min - value.min * 0.005
                                },
                                type: 'value',
                                boundaryGap: [0, '100%'],
                                position: 'left',
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
                                position: 'left',
                                max: function (value) {
                                    return value.max + value.max * 0.008
                                },
                                min: function (value) {
                                    return value.min - value.min * 0.005
                                },
                                type: 'value',
                                boundaryGap: [0, '50%'],
                                position: 'left',
                                axisLine: {
                                    show: false, //是否显示轴线
                                },
                                axisTick: {
                                    show: false, //刻度
                                },
                                splitLine: {
                                    show: false, //是否显示分隔线
                                },
                                scale: true
                            },
                            {
                                position: 'left',
                                max: function (value) {
                                    return value.max + value.max * 0.008
                                },
                                min: function (value) {
                                    return value.min - value.min * 0.005
                                },
                                type: 'value',
                                boundaryGap: [0, '50%'],
                                position: 'left',
                                axisLine: {
                                    show: false, //是否显示轴线
                                },
                                axisTick: {
                                    show: false, //刻度
                                },
                                splitLine: {
                                    show: false, //是否显示分隔线
                                },
                                scale: true
                            }
                        ],
                        series: [
                            {
                                data: priceArr,
                                name: '价格',
                                type: 'line',
                                smooth: true,    //光滑
                                symbol: 'none',
                                yAxisIndex: 0
                            },
                            {
                                data: marketCap,
                                name: '总交易量',
                                type: 'line',
                                smooth: true,    //光滑
                                symbol: 'none',
                                yAxisIndex: 1,
                            },
                            {
                                data: volhArr,
                                name: '成交量',
                                type: 'line',
                                smooth: true,    //光滑
                                symbol: 'none',
                                yAxisIndex: 2,
                            },
                        ]
                    }
                })

            }
        }).catch(e => {
            console.log('大数据图2', e)
        })
    }
    componentDidMount() {
        this.getHomeDataList()
        this.requestTime = setInterval(() => {
            this.getHomeDataList()
        }, 120000)
    }
    componentWillUnmount() {
        clearInterval(this.requestTime)
    }
    render() {
        return (
            <>
                <StatusBar backgroundColor='#fff' barStyle={'light-content'}></StatusBar>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <View style={{ width: Dimensions.get('window').height, height: Dimensions.get('window').width, transform: [{ rotateZ: '90deg' }] }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}
                            style={{
                                marginLeft: 60,
                                marginTop: 26,
                                width: 60,
                                height: 23,
                                backgroundColor: '#3D72E4',
                                alignItems: 'center',
                                borderRadius: 4,
                                elevation: 1.5,
                                shadowColor: '#3D72E4',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: .6,
                                shadowRadius: 1,
                            }}>
                            <Text style={{ color: '#fff' }}>Back</Text>
                        </TouchableOpacity>
                        {
                            this.state.showLoading ?
                                <View style={{ position: 'absolute', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', zIndex: 1, width: '100%', height: '100%' }}>
                                    <Text>拼命加载中....</Text>
                                </View> : <></>
                        }
                        <Echarts option={this.state.option} height={320} />

                    </View>
                </View>
            </>
        )
    }
}
