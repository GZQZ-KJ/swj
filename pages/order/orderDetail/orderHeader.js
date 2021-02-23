import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { pxToPt } from "../../../utils/styleKits";
export default class arbiHeader extends Component {
    render() {
        return (
            <>
              <View style={styles.headMsg}>
                        <Text style={styles.headTex}>{this.props.msg()}</Text>
                    </View>
            </>

        )
    }
}

const styles = StyleSheet.create({
    headMsg: {
        // height: 44,
        minHeight:pxToPt(44),
        width: '100%',
        backgroundColor: '#A6B8E0',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight:pxToPt(16),
        paddingLeft:pxToPt(16),
        paddingTop:pxToPt(8),
        paddingBottom:pxToPt(7)
    },
    headTex: {
        color: '#fff',
        fontSize: pxToPt(15),
        fontWeight: '500',
        fontFamily: 'PingFang SC'
    },
})