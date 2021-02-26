import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { Toast } from 'teaset'
import Clipboard from '@react-native-community/clipboard'
import { pxToPt } from "../../../utils/styleKits";
export default class arbiDetail extends Component {
    constructor(props) {
        super(props)
    }
    copyBankNum = () => {
        Clipboard.setString(this.props.bankAccountNo)
        Toast.message('复制成功')
    }
    render() {
        let {
            bankAccountName,
            bankAccountNo,
            bankFullName,
            sumCount
        } = this.props
        return (
            <View style={styles.msgDetail}>
                <View style={styles.msgHead}>
                    <Text style={styles.msgTitle}>收款信息</Text>
                </View>
                <View style={styles.msgBody}>
                    <Text style={styles.msgContent}>收款人姓名</Text>
                    <Text style={styles.msgTex}>{bankAccountName}</Text>
                </View>
                <View style={styles.msgBody}>
                    <Text style={styles.msgContent}>卡号</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#3D72E4', paddingRight: pxToPt(8) }}>{bankAccountNo}</Text>
                        <View style={styles.copyWrap} >
                            <TouchableOpacity onPress={this.copyBankNum} >
                                <Text style={styles.copyTex} >复制</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.msgBody}>
                    <Text style={styles.msgContent}>银行</Text>
                    <Text style={styles.msgTex}>{bankFullName}</Text>
                </View>
                <View style={styles.msgFoot}>
                    <Text style={styles.msgContent}>金额</Text>
                    <Text style={styles.msgMoney}>{sumCount}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    msgDetail: {
        width: pxToPt(343),
        height: pxToPt(220),
        backgroundColor: '#fff',
        shadowOffset: { width: pxToPt(0), height: pxToPt(1) },
        shadowColor: '#565A66',
        shadowOpacity: pxToPt(12),
        shadowRadius: pxToPt(2),
        elevation: pxToPt(2),
        borderRadius: pxToPt(8),
        overflow: 'hidden',
        alignItems: 'center',
        marginLeft: pxToPt(8),
        marginBottom: pxToPt(12)
    },
    msgHead: {
        height: pxToPt(44),
        width: pxToPt(343),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    msgTitle: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#2B2D33',
        fontSize: pxToPt(16),
    },
    msgBody: {
        height: pxToPt(43),
        width: pxToPt(319),
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: pxToPt(1),
        borderBottomColor: '#F2F3F7',
    },
    msgContent: {
        fontFamily: "PingFang SC",
        fontWeight: '400',
        color: '#8D9099',
        fontSize: pxToPt(14)
    },
    msgTex: {
        fontFamily: 'PingFang SC',
        fontWeight: '400',
        color: '#5A5D66',
        fontSize: pxToPt(14)
    },
    copyWrap: {
        width: pxToPt(36),
        height: pxToPt(18),
        borderColor: '#3D72E4',
        borderRadius:pxToPt(15),
        borderWidth: pxToPt(1),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    copyTex: {
        color: '#3D72E4',
        fontSize: pxToPt(11),
        fontWeight: '500',
        fontFamily: 'PingFang SC'
    },
    msgMoney: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#FE5564',
        fontSize:pxToPt(14)
    },
    msgFoot: {
        height: pxToPt(44),
        width: pxToPt(319),
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
})