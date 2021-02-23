import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { pxToPt } from "../../../utils/styleKits";
export default class orderTime extends Component {
    render() {
        let { timeList } = this.props
        console.log('[订单 和 挂卖里面的时间]', timeList)
        if (timeList === undefined) return (<></>)
        return (
            <>
                {
                    <View style={styles.cTime}>
                        {
                            timeList.cancel_time !== undefined && timeList.cancel_time ? <Text style={styles.fbT}>订单取消时间：{timeList.cancel_time}</Text> : <></>
                        }
                        {
                            timeList.finish_time && timeList.finish_time !== undefined ? <Text style={styles.fbT}>订单完成时间：{timeList.finish_time}</Text> : <></>
                        }
                        {
                            timeList.buy_arbitration_time && timeList.buy_arbitration_time !== undefined ? <Text style={styles.fbT}>买方仲裁反馈时间：{timeList.finish_time}</Text> : <></>
                        }
                        {
                            timeList.arbitration_time && timeList.arbitration_time !== undefined ? <Text style={styles.fbT}>卖方提出仲裁时间：{timeList.arbitration_time}</Text> : <></>
                        }
                        {
                            timeList.confirm_time && timeList.confirm_time !== undefined ? <Text style={styles.fbT}>确认收款时间：{timeList.confirm_time}</Text> : <></>
                        }
                        {
                            timeList.pay_time && timeList.pay_time !== undefined ? <Text style={styles.fbT}>确认付款时间：{timeList.pay_time}</Text> : <></>
                        }
                        {
                            timeList.locking_time && timeList.locking_time !== undefined ? <Text style={styles.fbT}>锁定时间：{timeList.locking_time}</Text> : <></>
                        }
                        {
                            timeList.created_time && timeList.created_time !== undefined ? <Text style={styles.fbT}>发布时间：{timeList.created_time}</Text> : <></>
                        }

                    </View>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    cTime: {
        width: pxToPt(343),
        backgroundColor: '#fff',
        shadowOffset: { width: pxToPt(0), height: pxToPt(1)},
        shadowColor: '#565A66',
        shadowOpacity:pxToPt(12),
        elevation: pxToPt(2),
        shadowRadius: pxToPt(2),
        borderRadius: pxToPt(8),
        marginLeft: pxToPt(8),
        paddingBottom: pxToPt(20),
        marginBottom: pxToPt(12)
    },
    fbT: {
        paddingTop: pxToPt(16),
        paddingLeft: pxToPt(12),
        color: '#5A5D66',
        fontSize: pxToPt(14)
    },
})