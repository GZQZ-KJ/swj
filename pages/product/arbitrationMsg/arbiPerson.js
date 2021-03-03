import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import { pxToPt } from "../../../utils/styleKits";
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
            value,
            sumCount,
            price
        } = this.props
        return (
            <View style={styles.wrapper}>
                <View style={styles.head}>
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
                    {/* {
                        status === 2 ?
                            <View style={{ width: 48, height: 18, backgroundColor: '#FE5564', borderRadius: 9, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: '400', fontSize: 11, color: '#fff' }}>{statusStr}</Text>
                            </View> :
                            <View style={{ width: 48, height: 18, backgroundColor: '#3D72E4', borderRadius: 9, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: '400', fontSize: 11, color: '#fff' }}>{statusStr}</Text>
                            </View>
                    } */}
                </View>
                <View style={styles.orderDetailWrap}>
                    <View>
                        <Text style={styles.oNum}>NSS:{value}</Text>
                        {/* <Text style={styles.unTime}>下架倒计时:52分40秒</Text> */}

                    </View>
                    <View style={styles.allMoney}>
                        <Text style={styles.youMoney}>￥:{price}</Text>
                        <Text style={styles.money}>总价:{sumCount}</Text>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: pxToPt(343),
        height: pxToPt(190),
        marginTop: pxToPt(8),
        borderRadius: pxToPt(8),
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: pxToPt(1) },
        shadowColor: '#565A66',
        elevation: 2,
        shadowOpacity: 0.12,
        shadowRadius: pxToPt(2),
        // marginLeft: pxToPt(6),
        marginBottom: pxToPt(12)
    },
    head: {
        height: pxToPt(84),
        width: pxToPt(319),
        borderBottomWidth: pxToPt(1),
        borderBottomColor: '#F2F3F7',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: pxToPt(12),
        // justifyContent: 'space-between'
    },
    myHead: {
        width: pxToPt(51),
        height:pxToPt(51),
        marginRight: pxToPt(12)
    },
    headImg: {
        width: '100%',
        height: '100%',
        borderRadius: pxToPt(60)
    },
    headName: {
        fontSize: pxToPt(16),
        fontWeight: '500',
        color: '#2B2D33'
    },
    orderNum: {
        color: '#8D9099',
        marginTop: pxToPt(4),
        fontSize: pxToPt(12),
    },
    orderDetailWrap: {
        flexDirection: 'row',
        height: pxToPt(105),
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: pxToPt(12),
        paddingRight: pxToPt(12),
    },
    oNum: {
        marginTop: pxToPt(24),
        fontWeight: '500',
        fontSize: pxToPt(18),
        color: '#2B2D33'
    },
    unTime: {
        marginTop: pxToPt(12),
        fontSize: pxToPt(14),
        fontWeight: '400',
        color: '#5A5D66'
    },
    allMoney: {
        alignItems: 'flex-end',
        marginLeft: pxToPt(48),
    },
    youMoney: {
        marginTop: pxToPt(24),
        color: '#FE5564',
        fontSize: pxToPt(18),
        fontWeight: 'bold'
    },
    money: {
        marginTop: pxToPt(12),
        color: '#5A5D66',
        fontSize: pxToPt(14),
        fontWeight: '400'
    },
})
