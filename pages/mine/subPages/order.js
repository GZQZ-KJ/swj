import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    FlatList,
    Platform
} from 'react-native'
import ArbitrationOrder from '../arbitrationOrder'
import axios from '../../../utils/api/request'
import { pxToPt } from "../../../utils/styleKits";
import { ORDERS_ARBITRATIONLIST } from '../../../utils/api/pathMap'
import { inject } from 'mobx-react'
import Toast from '../../../utils/api/Toast'
@inject('rootStore')
/**
 * 仲裁订单
 */
export default class order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.rootStore.token,
            active: 1,
            page: 1,
            page_size: 10,
            total: 0,
            data: [],
            control: false,
            title: [
                {
                    id: 1,
                    txt: '进行中',

                },
                {
                    id: 3,
                    txt: '已结束'
                },
            ]
        }
    }

    //滚动条到底加载
    getMore = async () => {
        let { active, page, page_size, total, data } = this.state
        page === 1 ? 2 : page + 1
        if (data.length >= total) return
        let url = ORDERS_ARBITRATIONLIST + `?status=${active}&page=${page}&page_size=${page_size}`
        await axios.get(url, {
            headers: {
                "token": token
            }
        }).then(r => {
            if (r.data.code === 1) {
                this.setState({
                    data: [...data, r.data.result.list],
                    page: r.data.result.page.current_page,
                    total: r.data.result.page.total
                })
            }
        }).catch(e => console.log('[下拉加载仲裁订单]', e))
    }
    _selected = (i) => {
        if (this.state.active === i) return
        console.log('[仲裁订单IIIIIIIIII]',i)
        this.setState({
            active: i
        })
        this.getOrderArbitrationList(i)
    }
    getOrderArbitrationList = async (active = 1) => {
        let { token, page, page_size } = this.state
        page = 1

        let url = ORDERS_ARBITRATIONLIST + `?status=${active}&page=${page}&page_size=${page_size}`
        console.log('[仲裁地址Url]', url)
        await axios.get(url, {
            headers: {
                "token": token
            }
        }).then(r => {
            if (r.data.code === 1) {
                this.setState({
                    data: r.data.result.list,
                    page: r.data.result.page.current_page,
                    total: r.data.result.page.total
                })
            } else {
                this.props.navigation.navigate("Login")
            }
        }).catch(e => console.log('[仲裁订单列表]', e))
    }
    componentDidMount() {
        this.getOrderArbitrationList()
    }

    render() {
        return (
            <>
                {
          Platform.OS === 'ios' ? <View style={{marginTop:pxToPt(28)}}></View> : <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        }
                <View style={styles.arroWrap}>
                    <TouchableOpacity
                        style={{ width: pxToPt(60),  height: pxToPt(44),paddingLeft:pxToPt(16), justifyContent: 'center' }}
                        onPress={() => {
                            this.props.rootStore.clearNewArb()
                            this.props.navigation.navigate('Tabbar')

                        }}>
                        <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>仲裁订单</Text>
                </View>

                <View style={styles.chooseHead}>
                    {
                        this.state.title.map((v, i) => {
                            return (
                                <View style={{height:'100%',flexDirection:'row',justifyContent:'space-around'}} key={i}>
                                    {
                                        this.state.active === v.id ?
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                key={i}
                                                style={{ alignItems: 'center', width: '50%' }}
                                                onPress={() => this._selected(v.id)}
                                            >
                                                <Text style={styles.activeTex}>{v.txt}</Text>
                                                {
                                                  this.state.active === v.id ? <View style={[styles.underscore, styles.activeBto]} /> : <></>
                                                }
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                key={i}
                                                style={{ alignItems: 'center', width: '50%' }}
                                                onPress={() => this._selected(v.id)}
                                            >
                                                <Text style={styles.chooseTex}>{v.txt}</Text>
                                                {
                                                 this.state.active === v.id ? <View style={[styles.underscore, styles.activeBto]} /> : <></>
                                                }
                                            </TouchableOpacity>
                                    }
                                </View>
                            )
                        })
                    }
                </View>
                {
                    this.state.data.length < 1 ?
                        <>
                            <Image style={{ width: pxToPt(206.22), height: pxToPt(217.11), alignSelf: 'center', top: pxToPt(53)}} source={require('../../../assets/icons/default/noProduct.png')}></Image>
                            <View style={{ marginTop: pxToPt(58), alignSelf: 'center', flexDirection: 'row'}}>
                                <Text style={{ color: '#8D9099', fontWeight: '400', fontSize: 15 }}>暂无</Text>
                                <Text style={{ color: '#FE5564', fontWeight: '400', fontSize: 15 }}>仲裁订单</Text>
                            </View>

                        </> :
                        <FlatList
                            onEndReachedThreshold={0.05}
                            onEndReached={this.getMore}
                            data={this.state.data}
                            keyExtractor={(v, i) => i}
                            renderItem={({ item, index }) =>
                                <ArbitrationOrder key={index} item={item} navigation={this.props.navigation} />}
                        />
                }

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
    title: {
        color: '#2B2D33',
        fontSize: pxToPt(18),
        fontWeight: "500",
        fontFamily: 'PingFang SC',
        marginLeft: pxToPt(92)
    },
    chooseHead: {
        height: 44,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        paddingTop: pxToPt(12),
        flexDirection: 'row',
    },
    chooseTex: {
        color: '#5A5D66'
    },
    activeTex: {
        color: '#3D72E4',
    },
    underscore: {
        marginTop: pxToPt(4),
        width: pxToPt(12),
        height: pxToPt(1),
    },
    activeBto: {
        backgroundColor: '#3D72E4FF',
    }
})