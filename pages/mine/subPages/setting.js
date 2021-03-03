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
        Toast.message('已切换线路' + choose, 2000, 'center')
        //仓库存线路
        this.props.rootStore.setActiveCDN(choose)
        //发送请求,切换路线
        this.setState({
            active: choose
        })

    }
    componentDidMount() {
        this.setState({
            active: this.props.rootStore.activeCDN
        })
    }
    render() {
        let { active } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity
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
                                线路名称一
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
                                线路名称二
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.clearInfo} style={{ width: pxToPt(343), height: pxToPt(44), backgroundColor: '#3D72E4', borderRadius: pxToPt(8), marginTop: pxToPt(434), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: pxToPt(15), fontWeight: '500' }}>清除缓存</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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