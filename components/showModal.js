import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity
} from 'react-native'

/**
 * 登录页面弹窗
 */

export default class LoginToast extends Component {
    constructor(props) {
        super(props)
    }
    _closeToast = () => {
        this.props.onClose()
    }
    
    render() {
        return (
            <View style={styles.container}>
                {/* <StatusBar backgroundColor="rgba(0,0,0,.4)"></StatusBar> */}
                    <View style={styles.wrapper}>
                        <Text style={styles.headTex}>您的仲裁已提交，请等待买家提交证据，管理员会做出验证反馈</Text>
                        <TouchableOpacity>
                            <Text style={styles.numTex}>确认</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        zIndex:10,
        position: 'absolute',
        left:0,
        top:0,
        // marginTop:'50%',
        // flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.4)',
    },
    wrapper: {
        zIndex:10,
        width: 319,
        height: 183,
        borderRadius: 32,
        backgroundColor: '#2B2D33',
        alignItems: 'flex-start',
    },
    headTex: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#fff',
        fontSize: 18,
        paddingTop: 32,
        paddingRight: 20,
        paddingLeft: 20
    },
    numTex: {
        fontFamily: 'PingFang SC',
        fontSize: 18,
        fontWeight: '400',
        color: '#fff',
        marginTop: 8,
        paddingLeft: 20
    }
})