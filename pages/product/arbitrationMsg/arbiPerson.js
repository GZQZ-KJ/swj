import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
export default class arbiPerson extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let {
            avaterUrl,
            status,
            statusStr,
            userName,
            soOrder,
            value
        } = this.props
        return (
            <View style={styles.wrapper}>
                <View style={styles.head}>
                    <>
                        <View style={styles.myHead}>
                            {
                                !!avaterUrl ?
                                    <Image style={styles.headImg} source={{ uri: avaterUrl }}></Image>
                                    :
                                    <Image style={styles.headImg} source={require('../../../assets/icons/tou1.png')}></Image>
                            }
                        </View>
                        <View>
                            <Text style={styles.headName}>{userName}</Text>
                            <Text style={styles.orderNum}>订单编号：{soOrder}</Text>
                        </View>
                    </>
                    {
                        status === 2 ?
                            <View style={{ width: 48, height: 18, backgroundColor: '#FE5564', borderRadius: 9, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: '400', fontSize: 11, color: '#fff' }}>{statusStr}</Text>
                            </View> :
                            <View style={{ width: 48, height: 18, backgroundColor: '#3D72E4', borderRadius: 9, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: '400', fontSize: 11, color: '#fff' }}>{statusStr}</Text>
                            </View>
                    }
                </View>
                <View style={styles.orderDetailWrap}>
                    <View>
                        <Text style={styles.oNum}>NSS:{value}</Text>
                        {/* <Text style={styles.unTime}>下架倒计时:52分40秒</Text> */}

                    </View>
                    <View style={styles.allMoney}>
                        <Text style={styles.youMoney}>￥:17.782512</Text>
                        <Text style={styles.money}>总价:117364.781512</Text>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: 343,
        height: 190,
        marginTop: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        elevation: 2,
        shadowOpacity: 0.12,
        shadowRadius: 2,
        marginLeft: 6,
        marginBottom: 12
    },
    head: {
        height: 84,
        width: 319,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F3F7',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
        justifyContent: 'space-between'
    },
    myHead: {
        width: 51,
        height: 51,
        marginRight: 12
    },
    headImg: {
        width: '100%',
        height: '100%',
        borderRadius: 60
    },
    headName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2B2D33'
    },
    orderNum: {
        color: '#8D9099',
        marginTop: 4,
        fontSize: 12,
    },
    orderDetailWrap: {
        flexDirection: 'row',
        height: 105,
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
    },
    oNum: {
        marginTop: 24,
        fontWeight: '500',
        fontSize: 18,
        color: '#2B2D33'
    },
    unTime: {
        marginTop: 12,
        fontSize: 14,
        fontWeight: '400',
        color: '#5A5D66'
    },
    allMoney: {
        alignItems: 'flex-end',
        marginLeft: 48,
    },
    youMoney: {
        marginTop: 24,
        color: '#FE5564',
        fontSize: 18,
        fontWeight: 'bold'
    },
    money: {
        marginTop: 12,
        color: '#5A5D66',
        fontSize: 14,
        fontWeight: '400'
    },
})
