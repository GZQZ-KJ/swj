import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Toast from 'teaset'
import Clipboard from '@react-native-community/clipboard'
export default class arbiDetail extends Component {
    constructor(props) {
        super(props)
    }
    copyBankNum = () => {
        
        Clipboard.setString(this.props.bankNo)
    }
    render() {
        let {
            bankName,
            bankNo,
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
                    <Text style={styles.msgTex}>{bankName}</Text>
                </View>
                <View style={styles.msgBody}>
                    <Text style={styles.msgContent}>卡号</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#3D72E4', paddingRight: 8 }}>{bankNo}</Text>
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
        width: 343,
        height: 220,
        marginTop: 12,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        marginLeft: 8,
        marginBottom: 12
    },
    msgHead: {
        height: 44,
        width: 343,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    msgTitle: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#2B2D33',
        fontSize: 16,
    },
    msgBody: {
        height: 43,
        width: 319,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F3F7',
    },
    msgContent: {
        fontFamily: "PingFang SC",
        fontWeight: '400',
        color: '#8D9099',
        fontSize: 14
    },
    msgTex: {
        fontFamily: 'PingFang SC',
        fontWeight: '400',
        color: '#5A5D66',
        fontSize: 14
    },
    copyWrap: {
        width: 36,
        height: 18,
        borderColor: '#3D72E4',
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    copyTex: {
        color: '#3D72E4',
        fontSize: 11,
        fontWeight: '500',
        fontFamily: 'PingFang SC'
    },
    msgMoney: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#FE5564',
        fontSize: 14
    },
    msgFoot: {
        height: 44,
        width: 319,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
})