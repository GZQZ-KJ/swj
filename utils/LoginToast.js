import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import { pxToPt } from "./styleKits";
/**
 * 登录页面弹窗
 */
export default class LoginToast extends Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        texOne: '',
        texTwo: '',
        texThree: '',
        texfour:''
    }
    _closeToast = () => {
        this.props.onClose()
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._closeToast}>
                <StatusBar backgroundColor="rgba(0,0,0,.4)"></StatusBar>
                <View style={styles.wrapper}>
                    <Text style={styles.headTex}>{this.props.texOne}</Text>
                    <Text style={styles.numTex}>{this.props.texTwo}</Text>
                    <Text style={styles.numTex}>{this.props.texThree}</Text>
                    <Text style={styles.numTex}>{this.props.texfour}</Text>

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.4)',
    },
    wrapper: {
        width: pxToPt(319),
        height: pxToPt(183),
        borderRadius: pxToPt(32),
        backgroundColor: '#2B2D33',
        alignItems: 'flex-start',
    },
    headTex: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#fff',
        fontSize: pxToPt(18),
        paddingTop: pxToPt(20),
        paddingRight: pxToPt(20),
        paddingLeft: pxToPt(20)
    },
    numTex: {
        fontFamily: 'PingFang SC',
        fontSize: pxToPt(18),
        fontWeight: '400',
        color: '#fff',
        marginTop: pxToPt(8),
        paddingLeft: pxToPt(20)
    }
})