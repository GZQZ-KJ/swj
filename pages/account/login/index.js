import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    StatusBar,
    TouchableOpacity,
} from 'react-native'
import Toast from '../../../utils/api/Toast'
import DeviceInfo from 'react-native-device-info';
import LoginToast from '../../../utils/LoginToast'
import axios from '../../../utils/api/request'
import { ACCOUNT_LOGIN } from '../../../utils/api/pathMap'

import AsyncStorage from '@react-native-community/async-storage'

import { inject, observer } from "mobx-react";
@inject("rootStore")
@observer
export default class login extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        email: this.props.rootStore.email,   //邮箱
        password: '', //密码
        showPassword: true,  //是否显示密码
        rootControl: true, //是否已经阅读用户协议
        wranningToast: false,  //弹出警告
        dangeingToast: false,
        showLogin: false,
        brand: '',     //设备品牌
        deviceId: '',  //设备id
        systemName: '',  //系统
        result: {}
    }
    loginGo = async () => {
        var { email, password, brand, deviceId, systemName } = this.state
        //验证登录邮箱 //验证密码 //验证是否已经阅读用户协议
        // var re = /^[a-zA-Z\d]+([-_\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/
        //发送请求
        let changeEmail = await AsyncStorage.getItem("email") || email
        changeEmail === email ? changeEmail : changeEmail = email

        var res = await axios.post(ACCOUNT_LOGIN, {
            account: changeEmail,
            password: password
        }, {
            headers: {
                "brand": brand,
                "deviceId": deviceId,
                "systemName": systemName,
            }
        })
        var data = res.data
        //获取数据，跳转页面
        if (data.code === 1) {
            //儲存數據到mobx中
            this.props.rootStore.setUserInfo(data.result.user_info.email, data.result.token)
            //儲存用戶數據到 本地緩存中 永久
            AsyncStorage.setItem('usertoken', data.result.token)
            AsyncStorage.setItem('email', email)
            AsyncStorage.setItem('appVersion', data.result.app_version)
            AsyncStorage.setItem('isUpdate', `${data.result.is_update}`)
            this.props.rootStore.setVersion(data.result.app_version, data.result.is_update)

            this.setState({
                email: '',
                password: ''
            })
            this.props.navigation.navigate('Tabbar')
        } else {
            if (data.code === -1) {
                this.setState({ //如果账号被冻结
                    dangeingToast: true,
                    result: data
                })
            } else {
                var re = /请重新修改密码/
                var rg = /账号不存在/
                if (data.message.match(re) || data.message.match(rg)) {
                    Toast.message(data.message, 1000, 'center')
                    this.setState({
                        password: ''
                    })
                }
                var reg = /\d/g
                let dataNum = data.message.match(reg)[0]
                data.message = data.message.split(reg, 1)
                if (dataNum) {
                    Toast.message(data.message + `请重新输入。错误超过5次，可通过忘记密码找回。（${dataNum}/5）`, 2000, 'center')
                    this.setState({
                        password: ''
                    })
                }
            }
        }


    }
    _closeToast = () => {
        this.setState({
            dangeingToast: false
        })
    }
    forgetPass = () => {
        //跳转到找回密码页面
        this.setState({
            email: '',
            password: '',
        })
        this.props.navigation.navigate("ForgetPass")

    }
    rootAgree = () => {
        this.props.navigation.navigate("Agreement")
    }
    changeCircle = () => {
        //是否已阅读并同意
        this.setState({
            rootControl: !this.state.rootControl
        })
    }
    changeShowPass = () => {
        //切换密码可见或隐藏
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    regiest = () => {
        //跳转到注册页面
        this.props.navigation.navigate("Regiest");

    }
    async componentDidMount() {
        let brand = await DeviceInfo.getBrand()
        let deviceId = await DeviceInfo.getDeviceId()
        let systemName = await DeviceInfo.getSystemName()
        let email = await AsyncStorage.getItem("email") || ''
        console.log('[缓存]', email)
        if (email) {
            this.setState({
                brand,
                deviceId,
                systemName,
                email: email
            })
        } else {
            this.setState({
                brand,
                deviceId,
                systemName,
            })
        }



    }


    render() {
        let { result } = this.state
        let { email } = this.props
        console.log(this.state.email, this.state.password)
        var re = /^[a-zA-Z\d]+([-_\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#3D72E4" ></StatusBar>
                <TouchableOpacity style={styles.arroWrap} >
                    {/* <Image style={styles.arrow} source={require('../../../assets/icons/backo.png')}></Image> */}
                </TouchableOpacity>
                <View style={styles.texWrap}>
                    <Text style={styles.tex}>欢迎登陆</Text>
                </View>
                <View style={styles.regWrap}>
                    <Text style={styles.reg}>还没有账号，</Text>
                    <Text style={styles.regGo} onPress={this.regiest}>立即注册</Text>
                </View>
                <View style={styles.inpWrap}>
                    <View style={styles.inp}>
                        <View style={styles.inpImgWrap}>
                            <Image style={styles.inpImg} source={require('../../../assets/icons/loginjujh.png')}></Image>
                        </View>
                        <View style={styles.inpTexWrap}>
                        </View>
                        <TextInput
                            selectionColor="white"
                            style={styles.inpEmail}
                            placeholder='请输入邮箱'
                            placeholderTextColor='#ccc'
                            onChangeText={(myemail) => {
                                !!myemail ? myemail : myemail = email
                                this.setState({ email: myemail })
                            }}
                            value={this.state.email}
                        />

                    </View>
                    <View style={{ ...styles.inp, justifyContent: 'space-between' }}>
                        <>
                            <View style={styles.inpImgWrap}>
                                <Image style={styles.inpImg} source={require('../../../assets/icons/loginp.png')}></Image>
                            </View>
                            <View style={styles.inpTexWrap}>
                            </View>
                            <TextInput style={styles.inpTex}
                                selectionColor="#fff"
                                placeholder='请输入密码'
                                placeholderTextColor='#ccc'
                                secureTextEntry={this.state.showPassword} //隐藏输入内容
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}

                            />
                        </>
                        <View style={styles.inpIcon}>
                            <TouchableOpacity onPress={this.changeShowPass} style={{ height: '100%', width: 20, justifyContent: 'center' }}>
                                {
                                    this.state.showPassword ? <Image style={styles.inpImgLast} source={require('../../../assets/icons/eyer1.png')}></Image> : <Image style={styles.inpImgLast} source={require('../../../assets/icons/eyee4.png')}></Image>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.lastWrap}>
                    <View style={styles.lastCir}>
                        <TouchableOpacity onPress={this.changeCircle} style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center' }} >
                            {
                                this.state.rootControl ?
                                    <Image style={styles.cirImg} source={require('../../../assets/icons/agree2.png')}></Image> :
                                    <Image style={styles.cirImg} source={require('../../../assets/icons/agree1.png')} />
                            }
                        </TouchableOpacity>
                        <Text style={styles.cirTex} onPress={this.rootAgree}>我已阅读并同意《用户协议》</Text>
                    </View>
                    <View style={styles.lastpro} >
                        <Image style={styles.proImg} source={require('../../../assets/icons/loginjhih.png')}></Image>
                        <Text style={styles.proTex} onPress={this.forgetPass}>忘记密码</Text>
                    </View>
                </View>
                {
                    this.state.email !== '' && this.state.password !== '' && this.state.password.length >= 6 && this.state.rootControl === true && re.test(this.state.email) ?
                        <TouchableHighlight onPress={this.loginGo} style={{ ...styles.loginGo, backgroundColor: '#fff' }}
                            underlayColor="rgba(255,255,255,1)">
                            <Text style={styles.loginTex}>登录</Text>
                        </TouchableHighlight> : <View style={{ ...styles.loginGo, backgroundColor: 'rgba(255,255,255,.7)' }}
                            underlayColor="rgba(255,255,255,.7)">
                            <Text style={styles.loginTex}>登录</Text>
                        </View>
                }
                {
                    this.state.dangeingToast ? <>
                        <LoginToast
                            onClose={this._closeToast}
                            texOne={`${result.result.text}`}
                            texTwo={`电话: ${result.result.phone}`}
                            texThree={`微信: ${result.result.wechat} `}
                            texfour={`邮箱: ${result.result.email}`}
                        ></LoginToast>
                    </> : <></>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#3D72E4',
    },
    arroWrap: {
        height: 44,
        justifyContent: 'center',
        paddingLeft: 16

    },
    arrow: {
        width: 11.82,
        height: 22
    },
    texWrap: {
        marginTop: 50,
        marginLeft: 40,
        height: 48,
        paddingLeft: 16
    },
    tex: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 34
    },
    regWrap: {
        flexDirection: 'row',
        marginLeft: 40,
        marginTop: 12,
        width: 160,
        height: 22,
        paddingLeft: 16

    },
    reg: {
        color: '#FFF5FA',
        fontSize: 16,
    },
    regGo: {
        color: '#FFF5FA',
        borderBottomWidth: 1,
        borderBottomColor: '#FFF5FA',
        fontSize: 16,
    },
    inpWrap: {
        marginTop: 88,
        marginLeft: 36,
        paddingLeft: 16

    },
    inp: {
        flexDirection: 'row',
        width: 303,
        height: 48,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        paddingRight: 20
    },
    inpImgWrap: {
        marginLeft: 20,
        marginRight: 11,
    },
    inpIcon: {
        marginLeft: 60
    },

    inpImg: {
        width: 22,
        height: 22,
    },
    inpTexWrap: {
        borderLeftWidth: 1,
        borderLeftColor: '#FFFEFF',
        height: 12,
    },
    inpTex: {
        // paddingLeft: 5,
        width: 160,
        overflow: 'hidden',
        fontSize: 15,
        color: '#fff'
    },
    inpEmail: {
        paddingLeft: 5,
        width: 200,
        overflow: 'hidden',
        fontSize: 15,
        color: '#fff'
    },
    inpImgLast: {
        width: 14,
        height: 8,
        resizeMode: 'contain'
    },
    lastWrap: {
        flexDirection: 'row',
        marginLeft: 44,
        marginTop: 24,
        paddingLeft: 3

    },
    lastCir: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cirImg: {
        width: 8,
        height: 8,
        marginRight: 4,
    },
    cirTex: {
        width: 148,
        height: 16,
        fontSize: 11,
        color: '#fff',
        marginRight: 71
    },
    lastpro: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    proImg: {
        width: 12,
        height: 12,
        marginRight: 2
    },
    proTex: {
        width: 46,
        height: 16,
        color: '#fff',
        fontSize: 11
    },
    loginGo: {
        width: 303,
        height: 48,
        marginLeft: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 102,

    },
    loginTex: {
        color: '#3D72E4',
        fontSize: 18,
    }
})
