import React, { Component } from "react"
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    ScrollView
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
        var html=`<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>web sdk自定义接入（标签、窗口）</title>
            <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.3/css/bootstrap.css" rel="stylesheet">
            <style media="screen">
                .m-crm {
                    max-width: 400px;
                    margin: 2rem auto 2rem;
                }
            </style>
        </head>
        
        <body>
            <div class="m-crm">
               
                <button type="button" class="btn btn-default btn-lg btn-block" onclick="openSdk()">loading.....</button>
            </div>
        
            <script type="text/javascript">
               (function (w, d, n, a, j) {
                w[n] = w[n] || function () {
                    (w[n].a = w[n].a || []).push(arguments);
                };
                j = d.createElement('script');
                j.async = true;
                j.src ='https://qiyukf.com/script/a87bd28f5f1375c1f52f25453e15af32.js';
                d.body.appendChild(j);
            })(window, document, 'ysf');
                
                var isSdkReady = false;
                ysf('onready', function () {
                    isSdkReady = true;
                })
                window.openSdk = function () {
                if (isSdkReady) {
                ysf('config', {
                uid: "454",     
                name: '譯',          
                email: '4439***.com', 
                mobile: '13888888888',
                staffid:'3962459',
                level : 5 ,// vip级别
                robotShuntSwitch:1,
                robotId:5227019,
                referrer:"https:123456",//配置了referrer，来源页，frompage就会显示这个
                title:"测试",
                success: function(){     // 成功回调
                    ysf('open');
                },
                error: function(){       // 错误回调
                    // handle error
                }
                 });
            } }
            </script>
        </body>
        </html>`;
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
                    <Text style={styles.title}>联系客服</Text>
                </View>
                <WebView
                style={{width:'100%',height:'100%'}}
                    javaScriptEnabled={true} 
                    source={{uri:`https://qiyukf.com/client?k=${this.params.appkey}&gid=${this.params.gid}&sid=${this.params.sid}&qtype=${this.params.qtype}&welcomeTemplateId=${this.params.welcomeTemplateId}&dvctimer=${this.params.dvctimer}&robotShuntSwitch=${this.params.robotShuntSwitch}&hc=${this.params.hc}&robotId=${this.params.robotId}&pageId=${this.params.pageId}&shuntId=${this.params.shuntId}&ctm=${this.params.ctm}&n=${this.params.n}&e=${this.params.e}&m=${this.params.m}`}}
                    setAllowFileAccessFromFileURLs={true}
                    setAllowUniversalAccessFromFileURLs={true}
                />
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
        marginLeft: 100
    },
    container: {
        justifyContent: 'space-between',
        flex: 1
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16
    },
    time: {
        marginTop: 20,
        marginBottom: 12,
        textAlign: 'center',
        height: 16,
        lineHeight: 16,
        fontSize: 11,
        color: '#8D9099'
    },
    box: {
        flexDirection: 'row',
        marginBottom: 28
    },
    img: {
        height: 52,
        width: 52
    },
    dialogBox: {
        marginLeft: 14,
        marginTop: 6,
        width: 230,
    },
    msg: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 14,
        borderRadius: 30,
        color: '#2B2D33',
        backgroundColor: '#FFFFFF',
        shadowColor: "#565A66",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        elevation: 10,
    },
    client: {
        justifyContent: 'flex-end'
    },
    avatar: {
        height: 52,
        width: 52
    },
    clientBox: {
        marginTop: 6,
        marginRight: 14,
        justifyContent: 'center',
        alignContent: 'center'
    },
    clientMsg: {
        backgroundColor: '#3D72E4',
        color: '#FFFFFF',
    },
    voimg: {
        height: 20,
        width: 16,
        borderWidth: 1,
        backgroundColor: 'red',
        marginLeft: 10
    },
    footer: {
        paddingTop: 7,
        paddingBottom: 40,
        justifyContent: 'flex-end',
        backgroundColor: '#FFFFFF'
    },
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    btn: {
        width: 227,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F5F7'
    }
})
