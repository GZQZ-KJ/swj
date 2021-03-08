import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    StatusBar,
    TouchableHighlight,
    TouchableOpacity,
    Platform
} from 'react-native'
import Toast from '../../../utils/api/Toast'
import axios from '../../../utils/api/request'
import { pxToPt } from '../../../utils/styleKits'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationContext } from '@react-navigation/native'
import { isIphoneX } from "../../../utils/isIphoneX";
import { ACCOUNT_CHANGEPASSWORD, ACCOUNT_SENDCODE } from '../../../utils/api/pathMap'
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer
export default class forgetPass extends Component {
    static contextType = NavigationContext

    constructor(props) {
        super(props)
        this.state = {
            myemail: '',
            code: '',
            password: '',
            rePassword: '',
            showSetPass: true,        //是否显示重置密码
            showPassword: true, //是否显示再次输入密码
            btnText: '获取验证码',
            isCountDowning: false,  //控制验证码
        }
        this.timeId = null
    }

    changeSetPass = () => {
        this.setState({
            showSetPass: !this.state.showSetPass
        })
        //展示重置的密码 或 隐藏
    }
    changeShowPass = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        })
        //展示再次输入密码 或 隐藏
    }
    enterGo = async () => {
        //找回密码信息确认
        const { myemail, code, password, rePassword } = this.state
        var re = /^[a-zA-Z\d]+([-_\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/
        //匹配邮箱
        if (!re.test(myemail) || myemail === '') {
            Toast.message('邮箱格式不正确', 1000, 'center')
            return
        }
        //匹配Code
        if (code.length !== 6 || code === '') {
            Toast.message('验证码必须是6位数字', 1000, 'center')

            return
        }
        //匹配密码
        var reg = /^[a-zA-Z0-9]{6,20}$/
        if (!reg.test(password) || password === '' || password !== rePassword) {
            Toast.message('两次密码匹配不一致,请重新输入', 1000, 'center')
            return
        }
        // 成功发送进行请求
        const res = await axios.post(ACCOUNT_CHANGEPASSWORD, {
            account: myemail,
            code: code,
            password: password,
            re_password: rePassword,
        }
            , {
                Header: {
                    "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            })

        if (res.data.code === 1) {
            AsyncStorage.setItem('email', myemail)
            this.props.rootStore.setUserInfo(myemail, '')
            clearInterval(this.timeId);

            Toast.message('成功，为您跳转到登录页面', 1000, 'center')
            setTimeout(() => {

                this.context.navigate("Login", { email: myemail });

            }, 1000)
        } else {
            clearInterval(this.timeId);

            Toast.message(res.data.message, 1000, 'center')
        }
    }
    goBack = () => {
        this.props.navigation.navigate("Login");
    }
    getCode = async () => {
        if (this.state.isCountDowning) {
            return
        }
        const { myemail } = this.state
        var re = /^[a-zA-Z\d]+([-_\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/
        //匹配邮箱
        if (!re.test(myemail) || myemail === '') {
            Toast.message('邮箱格式不正确', 1000, 'center')
            return
        }
        await axios.post(ACCOUNT_SENDCODE, {
            account: myemail
        }, {
            Header: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(r => {
            if (r.data.code === 1) {
                this.setState({
                    isCountDowning: true
                })
                let seconds = 60;
                // 重新获取(60s)
                this.setState({ btnText: `重新获取(${seconds}s)` })
                this.timeId = setInterval(() => {
                    seconds--
                    this.setState({ btnText: `重新获取(${seconds}s)` })
                    if (seconds === 0) {
                        clearInterval(this.timeId);
                        this.setState({
                            btnText: "重新获取",
                            isCountDowning: false
                        })
                    }
                }, 1000)
            } else {
                Toast.message(r.data.message, 2000, 'center')
            }
        }).catch(e => console.log('[找回密码获取验证码]', e))
    }
    async componentDidMount() {
        let email = await AsyncStorage.getItem("email") || ''
        this.setState({
            myemail: email
        })
    }
    render() {
        let { myemail, password, rePassword, btnText } = this.state
        var re = /^[a-zA-Z\d]+([-_\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/
        return (
            <>
                <StatusBar backgroundColor="#3D72E4" barStyle={'light-content'}></StatusBar>
                <View style={styles.container}>
                    <TouchableOpacity style={{ width: pxToPt(60), height: pxToPt(44), alignItems: 'center', justifyContent: 'center' }} onPress={this.goBack}>
                        <Image style={styles.arrow} onPress={this.goBack} source={require('../../../assets/icons/backo.png')}></Image>
                    </TouchableOpacity>
                    <View>
                        <View style={styles.texWrap}>
                            <Text style={styles.tex}>找回密码</Text>
                        </View>
                        <View style={styles.regWrap}>
                            <Text style={styles.reg}>找回密码后需要重新登录</Text>
                        </View>
                        <View style={styles.inpWrap}>
                            <View style={styles.inp}>
                                <View style={styles.inpImgWrap}>
                                    <Image style={styles.inpImg} source={require('../../../assets/icons/loginjujh.png')}></Image>
                                </View>
                                <View style={styles.inpTexWrap}>
                                </View>
                                <TextInput
                                    selectionColor="#fff"
                                    style={{ ...styles.inpTex, width: pxToPt(190) }}
                                    placeholder='请输入邮箱'
                                    placeholderTextColor='#ccc'
                                    onChangeText={(email) => {
                                        // !!email ? email : email = myemail
                                        this.setState({ myemail: email })
                                    }}
                                    value={this.state.myemail}
                                />
                            </View>
                            <View style={styles.inp}>
                                <View style={styles.inpImgWrap}>
                                    <Image style={styles.inpImg} source={require('../../../assets/icons/loginpppp.png')}></Image>
                                </View>
                                <View style={styles.inpTexWrap}>
                                </View>
                                <TextInput
                                    selectionColor="#fff"

                                    style={styles.inpTex}
                                    placeholder='请输入验证码'
                                    placeholderTextColor='#ccc'
                                    onChangeText={(code) => this.setState({ code })}
                                />
                                {
                                    this.state.isCountDowning ?
                                        <>
                                            <View style={{ ...styles.inpBtn, backgroundColor: 'rgba(255,255,255,.7)' }}>
                                                <Text style={{ ...styles.btnTex, color: '#0066C8' }}>{btnText}</Text>
                                            </View>
                                        </> :
                                        <>
                                            <View style={styles.inpBtn} >
                                                <Text style={{ ...styles.btnTex, color: '#0066C8' }} onPress={this.getCode}>获取验证码</Text>
                                            </View>
                                        </>
                                }

                            </View>
                            <View style={styles.inp}>
                                <View style={styles.inpImgWrap}>
                                    <Image style={styles.inpImg} source={require('../../../assets/icons/loginp.png')}></Image>
                                </View>
                                <View style={styles.inpTexWrap}>
                                </View>
                                <TextInput
                                    selectionColor="#fff"

                                    style={styles.inpTex}
                                    placeholder='请输入重置的密码'
                                    placeholderTextColor='#ccc'
                                    secureTextEntry={this.state.showSetPass} //隐藏输入内容
                                    onChangeText={(password) => this.setState({ password })}
                                />
                                <View style={styles.inpImgWrap}>
                                    <TouchableOpacity onPress={this.changeSetPass} >
                                        {
                                            this.state.showSetPass ?
                                                <Image style={styles.inpImgLast} source={require('../../../assets/icons/eyer1.png')}></Image> :
                                                <Image style={styles.inpImgLast} source={require('../../../assets/icons/eyee4.png')}></Image>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.inp}>
                                <View style={styles.inpImgWrap}>
                                    <Image style={styles.inpImg} source={require('../../../assets/icons/loginp.png')}></Image>
                                </View>
                                <View style={styles.inpTexWrap}>
                                </View>
                                <TextInput
                                    selectionColor="#fff"

                                    style={styles.inpTex}
                                    placeholder='请再次输入密码'
                                    placeholderTextColor='#ccc'
                                    secureTextEntry={this.state.showPassword} //隐藏输入内容
                                    onChangeText={(rePassword) => this.setState({ rePassword })}
                                />
                                <View style={styles.inpImgWrap}>
                                    <TouchableOpacity onPress={this.changeShowPass}>
                                        {
                                            this.state.showPassword ?
                                                <Image style={styles.inpImgLast} source={require('../../../assets/icons/eyer1.png')}></Image> :
                                                <Image style={styles.inpImgLast} source={require('../../../assets/icons/eyee4.png')}></Image>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {
                            !re.test(myemail) || password === '' || rePassword === '' ?
                                <TouchableHighlight style={{ ...styles.loginGo, backgroundColor: 'rgba(255,255,255,.6)' }}
                                    underlayColor="rgba(255,255,255,.6)">
                                    <Text style={styles.loginTex}>确认</Text>
                                </TouchableHighlight>
                                :
                                <TouchableHighlight onPress={this.enterGo} style={{ ...styles.loginGo, backgroundColor: 'rgba(255,255,255,1)' }}
                                    underlayColor="rgba(255,255,255, .6)">
                                    <Text style={styles.loginTex}>确认</Text>
                                </TouchableHighlight>
                        }
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D72E4',
        paddingTop:Platform.OS === 'ios' ? pxToPt(44) : null,
    },

    arroWrap: {
        height: pxToPt(44),
        justifyContent: 'center',
    },
    arrow: {
        width: pxToPt(11.82),
        height: pxToPt(22)
    },

    texWrap: {
        marginTop: pxToPt(50),
        marginLeft: pxToPt(40),
        height: pxToPt(48)
    },
    tex: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: pxToPt(34)
    },
    regWrap: {
        flexDirection: 'row',
        marginLeft: pxToPt(40),
        marginTop: pxToPt(12),
        width: pxToPt(190),
        height: pxToPt(22),
    },
    reg: {
        color: '#FFF5FA',
        fontSize: pxToPt(16),
    },
    inpWrap: {
        marginTop: pxToPt(53),
        marginLeft: pxToPt(36),
        height: pxToPt(202),
        width: pxToPt(303),
        borderWidth: pxToPt(1),
        borderColor: '#fff',
        borderRadius: pxToPt(12),
        paddingLeft: pxToPt(20),
        paddingRight: pxToPt(20),
    },

    inp: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        height: pxToPt(46)

    },
    inpImg: {
        width: pxToPt(22),
        height: pxToPt(22),
    },
    inpTexWrap: {
        marginLeft: pxToPt(12),
        borderLeftWidth: pxToPt(1),
        borderLeftColor: '#FFFEFF',
        height: pxToPt(12),
    },
    inpTex: {
        paddingLeft: pxToPt(5),
        width: pxToPt(135),
        overflow: 'hidden',
        fontSize: pxToPt(15),
        color: '#fff'
    },
    loginGo: {
        width: pxToPt(303),
        height: pxToPt(48),
        marginLeft: pxToPt(36),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: pxToPt(8),
        marginTop: pxToPt(72),
    },
    loginTex: {
        color: '#3D72E4',
        fontSize: pxToPt(18),
    },
    inpImgLast: {
        width: pxToPt(14),
        height: pxToPt(6),
        marginLeft: pxToPt(74)
    },
    inpBtn: {
        backgroundColor: '#FFF',
        width: pxToPt(87),
        height: pxToPt(32),
        borderRadius: pxToPt(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: pxToPt(10),

    },
    btnTex: {
        fontSize: pxToPt(12),
    }
});