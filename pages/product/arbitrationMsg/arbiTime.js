import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { pxToPt } from "../../../utils/styleKits";
export default class arbiTime extends Component {
    render() {
        let {timeList} = this.props
        console.log(timeList)
        //需要判断买家 和 卖家
        return (
            <View style={styles.cTime}>
                {
                    timeList.arbitration_finish_time === undefined ? <></>
                    :
                    <Text style={styles.fbT}>管理员给出仲裁结果时间：{timeList.arbitration_finish_time}</Text>
                }
                {
                    timeList.buy_arbitration_time === undefined ? <></>
                    :
                    <Text style={styles.fbT}>买家仲裁反馈时间：{timeList.buy_arbitration_time}</Text>
                }
                {
                    timeList.arbitration_time === undefined ? <></>
                    :
                    <Text style={styles.fbT}>卖家提出仲裁时间：{timeList.arbitration_time}</Text>
                }
                {
                    timeList.pay_time === undefined ? <></>
                    :
                    <Text style={styles.fbT}>确认付款时间：{timeList.pay_time}</Text>
                }
                {
                    timeList.created_time === undefined ? <></>
                    :
                    <Text style={styles.fbT}>锁定时间：{timeList.created_time}</Text>
                }
                {
                    timeList.created_time === undefined ? <></>
                    :
                    <Text style={styles.fbT}>发布时间：{timeList.created_time}</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cTime: {
        width: pxToPt(343),
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 0.12,
        elevation: 2,
        shadowRadius: pxToPt(2),
        borderRadius:pxToPt(8),
        // marginTop: pxToPt(12),
        // marginLeft: pxToPt(8),
        paddingBottom:pxToPt(20),
        marginBottom:pxToPt(12)
    },
    fbT: {
        paddingTop: pxToPt(16),
        paddingLeft: pxToPt(12),
        color: '#5A5D66',
        fontSize: pxToPt(14)
    },
})