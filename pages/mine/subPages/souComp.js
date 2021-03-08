import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView
} from 'react-native'
import { pxToPt } from "../../../utils/styleKits";
let item = [
    {
        name: 'native-echarts',
        address: 'https://github.com/somonus/react-native-echarts',
    },
    {
        name: 'react-native-camera',
        address: 'https://github.com/react-native-camera/react-native-camera',
    },
    {
        name: 'react-native-charts-wrapper',
        address: 'https://github.com/wuxudong/react-native-charts-wrapper',
    },
    {
        name: 'react-native-device-info',
        address: 'https://github.com/react-native-device-info/react-native-device-info',
    },
    {
        name: 'react-native-gesture-handler',
        address: 'https://github.com/software-mansion/react-native-gesture-handler',
    },
    {
        name: 'react-native-image-crop-picker',
        address: 'https://github.com/ivpusic/react-native-image-crop-picker',
    },
    {
        name: 'react-native-image-picker',
        address: 'https://github.com/react-native-image-picker/react-native-image-picker',
    },
    {
        name: 'react-native-logs',
        address: 'https://github.com/onubo/react-native-logs',
    },
    {
        name: 'react-native-macos',
        address: 'https://github.com/ptmt/react-native-macos',
    },
    {
        name: 'react-native-permissions',
        address: 'https://github.com/zoontek/react-native-permissions',
    },
    {
        name: 'react-native-qrcode-scanner',
        address: 'https://github.com/moaazsidat/react-native-qrcode-scanner',
    },
    {
        name: 'react-native-reanimated',
        address: 'https://github.com/software-mansion/react-native-reanimated',
    },
    {
        name: 'react-native-safe-area-context',
        address: 'https://github.com/th3rdwave/react-native-safe-area-context',
    },
    {
        name: 'react-native-screens',
        address: 'https://github.com/software-mansion/react-native-screens',
    },
    {
        name: 'react-native-swiper',
        address: 'https://github.com/leecade/react-native-swiper',
    },
    {
        name: 'react-native-tab-navigator',
        address: 'https://github.com/ptomasroos/react-native-tab-navigator',
    },
    {
        name: 'react-native-webview',
        address: 'https://github.com/react-native-webview/react-native-webview',
    },
    {
        name: 'teaset',
        address: 'https://github.com/rilyu/teaset',
    },
]
export default class souComp extends Component {
    render() {
        return (
            <>
                {
                    Platform.OS === 'ios' ? <StatusBar></StatusBar>
                        : <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                }
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
                        <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                        <View style={styles.arroWrap}>
                            <TouchableOpacity
                                style={{ width: pxToPt(60), height: pxToPt(44), paddingLeft: pxToPt(16), justifyContent: 'center' }}
                                onPress={() => {
                                    this.props.navigation.navigate('Tabbar')
                                }}>
                                <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.title}>开源组件</Text>
                        </View>
                        <ScrollView>
                            {
                                item.map((v, i) => {
                                    return (
                                        <View key={i} style={styles.souCompWrap}>
                                            <Text style={styles.tex1}>{v.name}<Text>:</Text></Text>
                                            <Text style={styles.tex2}>{v.address}</Text>
                                        </View>
                                    )
                                })
                            }

                        </ScrollView>
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
        width: '100%',
        fontSize: pxToPt(18),
        fontWeight: "500",
        fontFamily: 'PingFang SC',
        marginLeft: pxToPt(92)
    },
    souCompWrap: {
        backgroundColor: '#fff',
        paddingTop: pxToPt(12),
        paddingBottom: pxToPt(12),
        marginBottom: pxToPt(8),
        paddingLeft: pxToPt(16),
        paddingRight: pxToPt(16)
    },
    tex1: {
        marginBottom: pxToPt(8),
        fontSize: 15,
        fontWeight: '500'
    },
    tex2: {
        lineHeight: pxToPt(20),
        fontSize: pxToPt(14),
        fontWeight: '500'
    }
})