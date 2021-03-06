import React, { Component } from "react"
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    ScrollView,
    Platform,
} from 'react-native'
import { WebView } from 'react-native-webview'
import { pxToPt } from "../../../utils/styleKits";
 
/**
 * 联系客服
 */
export default class service extends Component {
    constructor(props) {
        super(props)
        this.params = {
            appkey:'a87bd28f5f1375c1f52f25453e15af32',   //客服后台 Appkey
            uid:'454',
            name:'454',
            uuid:'msiniatamjgdzpwo5gsd',
            gid:'0',
            sid:'3962459',
            qtype:'0',
            welcomeTemplateId:'0',
            dvctimer:'0',
            robotShuntSwitch:'1',
            hc:'0',
            robotId:'5227019',
            pageId:'16142567909802WwbkrFLam',
            shuntId:'0',
            ctm:'NDU0LS0xNjE0MjU2OTEyMDE3',
            n:'%E8%AD%AF',
            e:'4439***.com',
            m:'13888888888'
        }
    }
    render() {
        return (
            <>
            {
          Platform.OS === 'ios' ? <StatusBar></StatusBar>
            : <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        }
            <SafeAreaView style={{ flex: 1,backgroundColor:'#fff'}}>
                <View style={{ flex: 1,backgroundColor:'#f8f9fa' }}>
              <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity
                        style={{ width: pxToPt(60),  height: pxToPt(44),paddingLeft:pxToPt(16), justifyContent: 'center' }}
                        onPress={() => {
                            this.props.navigation.navigate('Tabbar')

                        }}>
                        <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>联系客服</Text>
                </View>
                <WebView
                style={{width:'100%',height:'100%'}}
                    // javaScriptEnabled={true} 
                    source={{uri:`https://qiyukf.com/client?k=${this.params.appkey}&gid=${this.params.gid}&sid=${this.params.sid}&qtype=${this.params.qtype}&welcomeTemplateId=${this.params.welcomeTemplateId}&dvctimer=${this.params.dvctimer}&robotShuntSwitch=${this.params.robotShuntSwitch}&hc=${this.params.hc}&robotId=${this.params.robotId}&pageId=${this.params.pageId}&shuntId=${this.params.shuntId}&ctm=${this.params.ctm}&n=${this.params.n}&e=${this.params.e}&m=${this.params.m}`}}
                    setAllowFileAccessFromFileURLs={true}
                    setAllowUniversalAccessFromFileURLs={true}
                />
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
