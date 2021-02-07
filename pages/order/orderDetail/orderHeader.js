import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
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
        minHeight:44,
        width: '100%',
        backgroundColor: '#A6B8E0',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight:16,
        paddingLeft:16,
        paddingTop:8,
        paddingBottom:7
    },
    headTex: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'PingFang SC'
    },
})