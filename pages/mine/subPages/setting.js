import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'
// import Toast from '../../../utils/api/Toast'
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
        this.props.rootStore.clearArr()
        Toast.showLoading('清理缓存中...')
    }
    chooseCDN = (choose) => {
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
                    <Text style={styles.title}>清除缓存</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.chooseCDN(1)}
                        style={{ width: '100%', height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 12, height: 12, marginLeft: 16 }}>
                            {
                                active === 1 ?
                                    <Image style={{ height: 12, width: 12 }} source={require('../../../assets/icons/jujiao2.png')}></Image>
                                    :
                                    <Image style={{ height: 12, width: 12 }} source={require('../../../assets/icons/login4.png')}></Image>
                            }
                        </View>
                        <View>
                            <Text style={{ color: '#2B2D33', fontSize: 15, fontWeight: '500', paddingLeft: 5 }}>
                                线路名称一
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.chooseCDN(2)}
                        style={{ width: '100%', height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 12, height: 12, marginLeft: 16 }}>
                            {
                                active === 2 ?
                                    <Image style={{ height: 12, width: 12 }} source={require('../../../assets/icons/jujiao2.png')}></Image>
                                    :
                                    <Image style={{ height: 12, width: 12 }} source={require('../../../assets/icons/login4.png')}></Image>
                            }

                        </View>
                        <View>
                            <Text style={{ color: '#2B2D33', fontSize: 15, fontWeight: '500', paddingLeft: 5 }}>
                                线路名称二
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.clearInfo} style={{ width: 343, height: 44, backgroundColor: '#3D72E4', borderRadius: 8, marginTop: 434, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>清除缓存</Text>
                    </TouchableOpacity>
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
        marginLeft:100
    },
})