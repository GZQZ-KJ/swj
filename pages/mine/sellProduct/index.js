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
    ImageBackground
} from 'react-native'
import Toast from '../../../utils/api/Toast'
import axios from '../../../utils/api/request'
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
                console.log('[已经执行mobx请求了]')
                this.context.navigate('Seller', { id: r.data.result.sp_id, sellNss: sellNss,finish })
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
                return
            }
        }).catch(e => console.log('[获取单价]', e))
    }
    _addBank = () => {
        this.setState({
            showMyBanks:false
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

            <>
                <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}  onPress={() => {
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
                                    style={{ paddingTop: 0, borderBottomWidth: 1, borderBottomColor: '#0075D7', width: 64, height: 30 }}
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
                        <View style={{ marginBottom: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.sellAllMoney}>总价: {total}</Text>
                            <Text style={styles.nowMoney}>当前可交易NSS为 {rootStore.nss}</Text>
                        </View>
                        {
                            <TouchableOpacity style={styles.chooseBankCard} onPress={
                                this.chooseBankCard
                            }>
                                {
                                    !!this.state.bankName ?
                                        <Text style={{ color: '#2B2D33', fontSize: 16, fontWeight: '500' }}>{this.state.bankName}</Text> :
                                        <Text style={{ color: '#2B2D33', fontSize: 16, fontWeight: '500' }}>请选择收款银行卡</Text>
                                }
                                {
                                    !!this.state.bankNum ?
                                        <Text style={{ color: '#2B2D33', fontSize: 16, fontWeight: '500' }}>{this.state.bankNum}</Text> :
                                        <Image style={{ height: 8.49, width: 4.95 }} source={require('../../../assets/icons/xuanzeka.png')}></Image>
                                }
                            </TouchableOpacity>
                        }
                        <View>
                            <Text style={styles.tekeNote}>注意事项</Text>
                            <Text style={styles.illustrate}>1、挂卖产品时以该界面的单价为准。</Text>
                            <Text style={styles.illustrate}>2、双方交易时，请认准双方的账户和用户名。</Text>
                            <Text style={styles.illustrate}>3、如果想取消该产品订单，请在未被其他用户锁定前，取消挂卖</Text>
                        </View>
                    </View>
                    {
                        bankId === '' || total === '0' || myNss < 0 ?
                            <View style={{ ...styles.release, opacity: .7 }} >
                                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>发布</Text>
                            </View> :
                            <TouchableOpacity style={styles.release} onPress={
                                this.goProSeller
                            }>
                                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>发布</Text>
                            </TouchableOpacity>
                    }

                </View>
                <Modal visible={this.state.showMyBanks} animationType={'slide'} >
                    <View style={styles.arroWrap}>
                        <TouchableOpacity
                        style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} 
                        onPress={() => {
                            this.setState({
                                showMyBanks: false,
                            })
                        }}>
                            <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                        </TouchableOpacity>
                        <Text style={styles.banktitle}>选择银行卡</Text>
                    </View>
                    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 120, backgroundColor: '#fff' }}>
                            {
                                this.state.myBanks.map((v, i) => {
                                    var reg = /^(\d{4})\d+(\d{4})$/;
                                    v.account_no = v.account_no.replace(reg, "**** $2");
                                    return (
                                        <TouchableOpacity style={styles.bankwrap} key={i} onPress={() => {
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
                                                        <Image source={{ uri: v.icon }} style={{ width: 28, height: 28 }}></Image>
                                                    </View>
                                                    <Text style={styles.bankTitle}>{v.full_name}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.bankNum}>{v.account_no}</Text>
                                                </View>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            <TouchableOpacity style={styles.btn} activeOpacity={.7} onPress={this._addBank}>
                                <Image style={{ height: 14, width: 14 }} source={require('../../../assets/icons/add.png')}></Image>
                                <Text style={styles.txt}>添加银行卡</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </SafeAreaView>
                </Modal>
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
        marginLeft: 100,
        color: '#2B2D33',
        fontSize: 18,
        fontWeight: "500",
        fontFamily: 'PingFang SC'
    },
    banktitle:{
        marginLeft: 90,
        color: '#2B2D33',
        fontSize: 18,
        fontWeight: "500",
        fontFamily: 'PingFang SC'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    wrapper: {
        marginTop: 28,
        width: 343,
        paddingTop: 42,
        paddingBottom: 38,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#565A66',
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 1
        },
        borderRadius: 12,
        marginBottom: 48
    },
    sellTex: {
        fontSize: 16,
        color: '#2B2D33',
        fontWeight: '500'
    },
    sellNum: {
        // marginTop: 24,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sellMoney: {
        color: '#FF5B42',
        fontWeight: 'bold',
        fontSize: 18,
        paddingTop: 24
    },
    sellInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 24
    },
    sellAllMoney: {
        color: '#5A5D66',
        fontSize: 14,
        fontWeight: '400',
    },
    nowMoney: {
        color: '#8D9099',
        fontSize: 11,
        fontWeight: '400'

    },
    chooseBankCard: {
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F7',
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tekeNote: {
        marginTop: 40,
        marginBottom: 12,
        color: '#2B2D33',
        fontWeight: '500',
        fontSize: 15
    },
    illustrate: {
        color: '#5A5D66',
        fontSize: 14,
        fontWeight: '400'
    },
    release: {
        width: 343,
        height: 44,
        borderRadius: 8,
        backgroundColor: '#3D72E4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //我的卡的样式
    bankwrap: {
        height: 121,
        width: 346,
        overflow: 'hidden',
        marginTop: 8,
        marginBottom: 12,
        borderRadius: 12
    },
    bankBC: {
        width: 343,
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bankicon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        width: 40, height: 40,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    bankTitle: {
        marginTop: 29,
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "500",
        color: '#F5F5F7'
    },
    bankNum: {
        color: '#F5F5F7',
        paddingRight: 12,
        fontSize: 14,
        fontWeight: '400',
        marginTop: 31,
        marginBottom: 50

    },
    btn: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        width: 343,
        height: 44,
        borderRadius: 8,
        backgroundColor: '#3D72E4',
        marginBottom: 100,
    },
    txt: {
        marginLeft: 4,
        color: '#FFFFFF'
    },
})