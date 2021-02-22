import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer
export default class about extends Component {
    state = {
        version: '1.0.0', //版本
        introduction: '依托于NSS虚拟币的矿池，所开发的交易系统，通过帮助用户线上转币，线下交易的模式，实现对NSS的货币的投资及理财',
        msg: '更多完善功能正在开发中 . . .',
        appVersion: this.props.rootStore.appVersion,
        isUpdate: this.props.rootStore.isUpdate,
    }
    goBack = () => {
        this.props.navigation.goBack()
    }
    upDate = () => {
        //调用更新接口
        //然后将appVersion 赋给 version
    }
    componentDidMount() {

    }

    render() {
        return (
            <>
                <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity
                    style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} 
                    onPress={() => {
                        this.props.navigation.navigate('Tabbar')
                    }}>
                        <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>关于</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text style={{ marginBottom: 8 }}>
                            目前版本：
                            <Text style={styles.ver}>V{this.state.version}</Text>
                        </Text>
                        <Text style={{ marginBottom: 8 }}>
                            最新版本：
                            <Text style={styles.ver}>V{this.props.rootStore.appVersion}</Text>
                        </Text>
                        <Text style={styles.int}>{this.state.introduction}</Text>
                        <Text style={styles.msg}>{this.state.msg}</Text>
                    </View>
                    {
                        !!this.state.isUpdate ? <View style={{ top: 286, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                            onPress={this.upDate}
                                style={{ height: 44, width: 343, backgroundColor: '#3D72E4', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff' }}>更新App</Text>
                            </TouchableOpacity>
                        </View> : <></>
                    }
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    arroWrap: {
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    arrow: {
        width: 11.82,
        height: 22,
    },
    title: {
        color: '#2B2D33',
        fontSize: 18,
        fontWeight: "500",
        fontFamily: 'PingFang SC',
        marginLeft:120
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        alignItems: 'center'
    },
    wrapper: {
        width: 343,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        elevation: 2,
        shadowRadius: 2,
        padding: 20,
        marginTop: 16
    },
    ver: {
        fontSize: 17,
        fontWeight: '500',
        color: '#3D72E4',
    },
    int: {
        fontSize: 14,
        color: '#000',
        fontWeight: '400',
        marginBottom: 8
    }
})
