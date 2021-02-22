import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    FlatList
} from 'react-native'
import ArbitrationOrder from '../arbitrationOrder'
import axios from '../../../utils/api/request'
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
        this.setState({
            active: i
        })
        this.getOrderArbitrationList(i)
    }
    getOrderArbitrationList = async (active = 1) => {
        let { token, page, page_size } = this.state
        page = 1

        let url = ORDERS_ARBITRATIONLIST + `?status=${active}&page=${page}&page_size=${page_size}`
        console.log('[仲裁地址Url]',url)
        await axios.get(url, {
            headers: {
                "token": token
            }
        }).then(r => {
            if (r.data.code === 1) {
                console.log('[仲裁订单]',r.data.result.list)
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
                <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity
                        style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {
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
                                <>
                                    {
                                        this.state.active === v.id ?
                                            <TouchableOpacity
                                                key={i}
                                                style={{ alignItems: 'center', width: '50%' }}
                                                onPress={() => this._selected(v.id)}
                                            >
                                                <Text style={styles.activeTex}>{v.txt}</Text>
                                                {/* <Text style={styles.activeTex}>—</Text> */}
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                key={i}
                                                style={{ alignItems: 'center', width: '50%' }}
                                                onPress={() => this._selected(v.id)}
                                            >
                                                <Text style={styles.chooseTex}>{v.txt}</Text>
                                                {/* <Text style={styles.chooseTex}>—</Text> */}

                                            </TouchableOpacity>
                                    }
                                </>
                            )
                        })
                    }
                </View>
                {
                    this.state.data.length < 1 ?
                        <>

                            <Image style={{ width: 206.22, height: 217.11, alignSelf: 'center', top: 53 }} source={require('../../../assets/icons/default/noProduct.png')}></Image>
                            <View style={{ marginTop: 58, alignSelf: 'center', flexDirection: 'row' }}>
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
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    arrow: {
        width: 11.82,
        height: 22,
    },
    title: {
        color: '#2B2D33',
        fontSize: 18,
        fontWeight: "500",
        fontFamily: 'PingFang SC',
        marginLeft:100
    },
    chooseHead: {
        height: 44,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    chooseTex: {
        color: '#5A5D66'
    },
    activeTex: {
        color: '#3D72E4'
    },
})