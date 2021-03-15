import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
    SafeAreaView
} from 'react-native'
import Toast from '../../../utils/api/Toast'
// import ApiHost from '../../../utils/apiHost'
import { pxToPt } from "../../../utils/styleKits";
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer


export default class setting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: 1
        }
        this.timer = null
    }
    clearInfo = () => {
        Toast.showLoading('清理缓存中')
        setTimeout(() => {
            Toast.hideLoading()
            Toast.success()
        }, 1000);
    }
    chooseCDN = (choose) => {
        if (choose === this.state.active) return
        this.props.rootStore.setActiveCDN(choose)
        Toast.showLoading('正在切换...')
        this.timer = setTimeout(() => {
            Toast.hideLoading()
            Toast.message('已切换线路' + choose + '请重新登录', 1000, 'center')
            this.props.navigation.navigate("Login")
        }, 1000)

    }
    componentDidMount() {
        this.setState({
            active: this.props.rootStore.activeCDN
        })
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        let { active } = this.state
        return (
            <>
                {
                    Platform.OS === 'ios' ? <StatusBar></StatusBar>
                        : <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                }
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1 }}>
                        <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                        <View style={styles.arroWrap}>
                            <TouchableOpacity
                            activeOpacity={1}
                                style={{ width: pxToPt(60), height: pxToPt(44), paddingLeft: pxToPt(16), justifyContent: 'center' }}
                                onPress={() => {
                                    this.props.navigation.navigate('Tabbar')

                                }}>
                                <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.title}>清除缓存</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                            activeOpacity={1}
                                onPress={() => this.chooseCDN(1)}
                                style={{ width: '100%', height: pxToPt(60), backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: pxToPt(12), height: pxToPt(12), marginLeft: pxToPt(16) }}>
                                    {
                                        active === 1 ?
                                            <Image style={{ height: pxToPt(12), width: pxToPt(12) }} source={require('../../../assets/icons/jujiao2.png')}></Image>
                                            :
                                            <Image style={{ height: pxToPt(12), width: pxToPt(12) }} source={require('../../../assets/icons/login4.png')}></Image>
                                    }
                                </View>
                                <View>
                                    <Text style={{ color: '#2B2D33', fontSize: pxToPt(15), fontWeight: '500', paddingLeft: pxToPt(5) }}>
                                        线路一
                            </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.chooseCDN(2)}
                                style={{ width: '100%', height: pxToPt(60), backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: pxToPt(12), height: pxToPt(12), marginLeft: pxToPt(16) }}>
                                    {
                                        active === 2 ?
                                            <Image style={{ height: pxToPt(12), width: pxToPt(12) }} source={require('../../../assets/icons/jujiao2.png')}></Image>
                                            :
                                            <Image style={{ height: pxToPt(12), width: pxToPt(12) }} source={require('../../../assets/icons/login4.png')}></Image>
                                    }

                                </View>
                                <View>
                                    <Text style={{ color: '#2B2D33', fontSize: pxToPt(15), fontWeight: '500', paddingLeft: pxToPt(5) }}>
                                        线路二
                            </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.clearInfo} style={{ width: pxToPt(343), height: pxToPt(44), backgroundColor: '#3D72E4', borderRadius: pxToPt(8), marginTop: pxToPt(434), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: pxToPt(15), fontWeight: '500' }}>清除缓存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
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
        marginLeft: pxToPt(92)
    },
})