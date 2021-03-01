import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Modal,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    Platform
} from 'react-native'
import Toast from '../../../utils/api/Toast'
import axios from '../../../utils/api/request'
import { pxToPt } from "../../../utils/styleKits";
import { NavigationContext } from '@react-navigation/native'
import { PRODUCT_GETPRICE, BANKS_GETMYBANKS, PRODUCT_SALEPRODUCT } from '../../../utils/api/pathMap'
import { inject, observer } from 'mobx-react'

@inject("rootStore")
@observer
//发布产品
export default class sellProduct extends Component {
    static contextType = NavigationContext
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.rootStore.token,
            showMyBanks: false,
            price: null,  //单价
            sellNss: null,  //输入的nss个数
            showBtn: false, //按钮是否可以点击
            myBanks: [],
            bankId: '',
            bankName: '',
            bankNum: '',
            myNss: this.props.rootStore.nss, //mobx中的nss数量
            mylockNss: this.props.rootStore.lockNss,  //mobx中的锁定余额
        }
    }
    chooseBankCard = async () => {
        //下拉列表 选择银行卡 调用我的银行卡接口
        this.setState({
            showMyBanks: true
        })
        await axios.get(BANKS_GETMYBANKS, {
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        })
            .then(r => {
                if (r.data.code === 1) {
                    this.setState({
                        myBanks: r.data.result
                    })
                }
                else {
                    Toast.message(r.data.message, 2000, 'center')
                    return
                }
            })
            .catch(e => console.log(e))
    }
    //发布按钮
    goProSeller = async () => {
        let { sellNss, bankId, myNss, mylockNss } = this.state
        //发送请求
        await axios.post(PRODUCT_SALEPRODUCT, {
            value: sellNss,
            bank_card_id: bankId
        }, {
            headers: {
                token: this.state.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                var finish = 'ismine'
                var mobxnss = myNss - (+sellNss)
                var mobxLockNss = mylockNss + (+sellNss)
                this.props.rootStore.setNss(mobxnss, mobxLockNss)
                this.props.rootStore.axiosProductList()
                this.context.navigate('Seller', { id: r.data.result.sp_id, sellNss: sellNss, finish })
                return
            }
            else {
                Toast.message(r.data.message, 2000, 'center')
                return
            }
        }).catch(e => console.log('[发布产品]', e))
    }
    //获取单价
    getPrice = async () => {
        await axios.get(PRODUCT_GETPRICE, {
            headers: {
                "token": this.state.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                this.setState({
                    price: r.data.result
                })
            }
            else {
                Toast.message(r.data.message, 2000, 'center')
            }
        }).catch(e => console.log('[获取单价]', e))
    }
    _addBank = () => {
        this.setState({
            showMyBanks: false
        })
        this.props.navigation.navigate("AddBank")
    }
    componentDidMount() {
        this.getPrice()
    }

    render() {
        let { price, sellNss, myNss, bankId, } = this.state
        let total = `${price * sellNss}`
        if (!!total.indexOf('.')) {
            total = total.substring(0, total.indexOf('.') + 7)
        }
        let { rootStore } = this.props
        return (

            <SafeAreaView style={{flex:1}}>
                {
                    Platform.OS === 'ios' ? <View style={{ marginTop: pxToPt(28) }}></View> : <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                }
                <View style={styles.arroWrap}>
                    <TouchableOpacity style={{ width: pxToPt(60), height: pxToPt(44), paddingLeft: pxToPt(16), justifyContent: 'center' }} onPress={() => {
                        this.props.navigation.navigate("Tabbar")
                    }}>
                        <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>挂卖产品</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text style={styles.sellTex}>请输入卖出数量</Text>
                        <View style={styles.sellNum}>
                            <View>
                                <Text style={styles.sellMoney}>￥:{this.state.price}</Text>
                            </View>
                            <View style={styles.sellInput}>
                                <Text>NSS : </Text>
                                <TextInput
                                    placeholder="0"
                                    keyboardType='numeric'
                                    style={{ paddingTop: pxToPt(0), borderBottomWidth: pxToPt(1), borderBottomColor: '#0075D7', width: pxToPt(64), height: pxToPt(30) }}
                                    onChangeText={(sellNss) => {
                                        if (sellNss.includes('.')) {
                                            // var subNss = sellNss.substring(0, sellNss.indexOf('.'))
                                            this.setState({
                                                sellNss: '0'
                                            })
                                            return
                                        }
                                        // console.log(sellNss)
                                        this.setState({ sellNss })
                                    }}
                                ></TextInput>
                            </View>
                        </View>
                        <View style={{ marginBottom: pxToPt(40), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.sellAllMoney}>总价: {total}</Text>
                            <Text style={styles.nowMoney}>当前可交易NSS为 {rootStore.nss}</Text>
                        </View>
                        {
                            <TouchableOpacity style={styles.chooseBankCard} onPress={
                                this.chooseBankCard
                            }>
                                {
                                    !!this.state.bankName ?
                                        <Text style={{ color: '#2B2D33', fontSize: pxToPt(16), fontWeight: '500' }}>{this.state.bankName}</Text> :
                                        <Text style={{ color: '#2B2D33', fontSize: pxToPt(16), fontWeight: '500' }}>请选择收款银行卡</Text>
                                }
                                {
                                    !!this.state.bankNum ?
                                        <Text style={{ color: '#2B2D33', fontSize: pxToPt(16), fontWeight: '500' }}>{this.state.bankNum}</Text> :
                                        <Image style={{ height: pxToPt(8.49), width: pxToPt(4.95) }} source={require('../../../assets/icons/xuanzeka.png')}></Image>
                                }
                            </TouchableOpacity>
                        }
                        <View>
                            <Text style={styles.tekeNote}>注意事项</Text>
                            <Text style={styles.illustrate}>1、挂卖产品时以该界面的单价为准。</Text>
                            <Text style={styles.illustrate}>2、双方交易时，请认准双方的账户和用户名。</Text>
                            <Text style={styles.illustrate}>3、如果想取消该产品订单，请在未被其他用户锁定前，取消挂卖。</Text>
                        </View>
                    </View>
                    {
                        bankId === '' || total === '0' || myNss < 0 ?
                            <View style={{ ...styles.release, opacity: .7 }} >
                                <Text style={{ color: '#fff', fontSize: pxToPt(15), fontWeight: '500' }}>发布</Text>
                            </View> :
                            <TouchableOpacity style={styles.release} onPress={
                                this.goProSeller
                            }>
                                <Text style={{ color: '#fff', fontSize: pxToPt(15), fontWeight: '500' }}>发布</Text>
                            </TouchableOpacity>
                    }

                </View>
                <Modal visible={this.state.showMyBanks} animationType={'slide'} >
                    <View style={styles.arroWrap}>
                        <TouchableOpacity
                            style={{ width: pxToPt(60), height: pxToPt(44), alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.setState({
                                    showMyBanks: false,
                                })
                            }}>
                            <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                        </TouchableOpacity>
                        <Text style={styles.headbanktitle}>选择银行卡</Text>
                    </View>
                    <TouchableOpacity style={styles.btn} activeOpacity={1} onPress={this._addBank}>
                        <Image style={{ height: pxToPt(14), width: pxToPt(14) }} source={require('../../../assets/icons/MybandCardad222d.png')}></Image>
                        <Text style={styles.txt}>添加银行卡</Text>
                    </TouchableOpacity>
                    <SafeAreaView >
                        <ScrollView style={{ height: 550, paddingLeft: pxToPt(16) }}>
                            {
                                this.state.myBanks.map((v, i) => {
                                    var reg = /^(\d{4})\d+(\d{4})$/;
                                    v.account_no = v.account_no.replace(reg, "**** $2");
                                    return (
                                        <>
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                style={styles.bankwrap} key={i} onPress={() => {
                                                    this.setState({
                                                        bankId: v.bank_card_id,
                                                        bankName: v.full_name,
                                                        bankNum: v.account_no,
                                                        showMyBanks: false,
                                                    })
                                                }} >
                                                <ImageBackground source={{ uri: v.background_url }} style={styles.bankBC}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <View style={styles.bankicon}>
                                                            <Image source={{ uri: v.icon }} style={{ width: pxToPt(28), height: pxToPt(28) }}></Image>
                                                        </View>
                                                        <Text style={styles.bankTitle}>{v.full_name}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.bankNum}>{v.account_no}</Text>
                                                    </View>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        </>
                                    )
                                })
                            }
                        </ScrollView>
                    </SafeAreaView>
                </Modal>
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
        height: pxToPt(22),
    },
    title: {
        marginLeft: pxToPt(92),
        color: '#2B2D33',
        fontSize: pxToPt(18),
        fontWeight: "500",
        fontFamily: 'PingFang SC'
    },
    banktitle: {
        marginLeft: pxToPt(90),
        color: '#2B2D33',
        fontSize: pxToPt(18),
        fontWeight: "500",
        fontFamily: 'PingFang SC'
    },
    headbanktitle: {
        marginLeft: pxToPt(84),
        color: '#2B2D33',
        fontSize: pxToPt(18),
        fontWeight: "500",
        fontFamily: 'PingFang SC',
        marginBottom: pxToPt(8)
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        position: 'relative'
    },
    wrapper: {
        marginTop: pxToPt(28),
        width: pxToPt(343),
        paddingTop: pxToPt(42),
        paddingBottom: pxToPt(38),
        paddingLeft: pxToPt(12),
        paddingRight: pxToPt(12),
        backgroundColor: '#fff',
        // elevation: pxToPt(2),
        // shadowColor: '#565A66',
        // shadowOpacity: pxToPt(1),
        // shadowOffset: {
        //     width: pxToPt(0),
        //     height: pxToPt(1)
        // },
        borderRadius: pxToPt(12),
        marginBottom: pxToPt(48)
    },
    sellTex: {
        fontSize: pxToPt(16),
        color: '#2B2D33',
        fontWeight: '500'
    },
    sellNum: {
        // marginTop: 24,
        marginBottom: pxToPt(8),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sellMoney: {
        color: '#FF5B42',
        fontWeight: 'bold',
        fontSize: pxToPt(18),
        paddingTop: pxToPt(24)
    },
    sellInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: pxToPt(24)
    },
    sellAllMoney: {
        color: '#5A5D66',
        fontSize: pxToPt(14),
        fontWeight: '400',
    },
    nowMoney: {
        color: '#8D9099',
        fontSize: pxToPt(11),
        fontWeight: '400'

    },
    chooseBankCard: {
        borderBottomWidth: pxToPt(1),
        borderBottomColor: '#F5F5F7',
        paddingBottom: pxToPt(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tekeNote: {
        marginTop: pxToPt(40),
        marginBottom: pxToPt(12),
        color: '#2B2D33',
        fontWeight: '500',
        fontSize: pxToPt(15)
    },
    illustrate: {
        color: '#5A5D66',
        fontSize: pxToPt(14),
        fontWeight: '400'
    },
    release: {
        width: pxToPt(343),
        height: pxToPt(44),
        borderRadius: pxToPt(8),
        backgroundColor: '#3D72E4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //我的卡的样式
    bankwrap: {
        height: pxToPt(121),
        width: pxToPt(343),
        overflow: 'hidden',
        marginBottom: pxToPt(12),
        borderRadius: pxToPt(12),
        position: 'relative'
    },
    bankBC: {
        position: 'absolute',
        width: pxToPt(355),
        height: pxToPt(120),
        left: pxToPt(-5),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bankicon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: pxToPt(20),
        marginLeft: pxToPt(15),
        width: pxToPt(40),
        height: pxToPt(40),
        backgroundColor: '#fff',
        borderRadius: pxToPt(20)
    },
    bankTitle: {
        marginTop: pxToPt(29),
        marginLeft: pxToPt(8),
        fontSize: pxToPt(16),
        fontWeight: "500",
        color: '#F5F5F7'
    },
    bankNum: {
        color: '#F5F5F7',
        paddingRight: pxToPt(17),
        fontSize: pxToPt(14),
        fontWeight: '400',
        marginTop: pxToPt(31),
        marginBottom: pxToPt(50)

    },
    btn: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: pxToPt(343),
        height: pxToPt(44),
        borderRadius: pxToPt(8),
        backgroundColor: '#3D72E4',
        marginBottom: pxToPt(100),
        marginTop: pxToPt(644),
        position: 'absolute',
        marginLeft: pxToPt(16),
        zIndex: 100,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: '#181D29',
        shadowOpacity: 0.12,
        shadowRadius: pxToPt(2),

    },
    txt: {
        marginLeft: pxToPt(4),
        color: '#FFFFFF'
    },
})