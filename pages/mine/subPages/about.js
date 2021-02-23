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
import { pxToPt } from "../../../utils/styleKits";
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
                    style={{ width: pxToPt(60), height: pxToPt(60), alignItems: 'center', justifyContent: 'center' }} 
                    onPress={() => {
                        this.props.navigation.navigate('Tabbar')
                    }}>
                        <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>关于</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text style={{ marginBottom:pxToPt(8) }}>
                            目前版本：
                            <Text style={styles.ver}>V{this.state.version}</Text>
                        </Text>
                        <Text style={{ marginBottom:pxToPt(8) }}>
                            最新版本：
                            <Text style={styles.ver}>V{this.props.rootStore.appVersion}</Text>
                        </Text>
                        <Text style={styles.int}>{this.state.introduction}</Text>
                        <Text style={styles.msg}>{this.state.msg}</Text>
                    </View>
                    {
                        !!this.state.isUpdate ? <View style={{ top: pxToPt(286), width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                            onPress={this.upDate}
                                style={{ height: pxToPt(44), width: pxToPt(343), backgroundColor: '#3D72E4', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
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
        height: pxToPt(44),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    arrow: {
        width: pxToPt(11.82),
        height: pxToPt(22),
    },
    title: {
        color: '#2B2D33',
        fontSize: pxToPt(18),
        fontWeight: "500",
        fontFamily: 'PingFang SC',
        marginLeft:pxToPt(120)
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        alignItems: 'center'
    },
    wrapper: {
        width:pxToPt(343),
        backgroundColor: '#fff',
        borderRadius: pxToPt(20),
        shadowOffset: { width: pxToPt(0), height: pxToPt(2) },
        shadowColor: '#565A66',
        shadowOpacity: 0.12,
        elevation: pxToPt(2),
        shadowRadius: pxToPt(2),
        padding: pxToPt(20),
        marginTop: pxToPt(16)
    },
    ver: {
        fontSize: pxToPt(17),
        fontWeight: '500',
        color: '#3D72E4',
    },
    int: {
        fontSize: pxToPt(14),
        color: '#000',
        fontWeight: '400',
        marginBottom: pxToPt(8)
    }
})
