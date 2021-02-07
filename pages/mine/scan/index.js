import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Modal
} from 'react-native'
import axios from '../../../utils/api/request'
import { SHARE_BIND } from '../../../utils/api/pathMap'
import { inject, observer } from 'mobx-react'
import Toast from '../../../utils/api/Toast'
@inject('rootStore')
@observer

export default class scan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.rootStore.token,
            // isFriend: false,
            userId: this.props.route.params.userId,
            userName: this.props.route.params.userName,
            avaterUrl: this.props.route.params.avaterUrl,
            email: this.props.route.params.email,
            code: this.props.route.params.code,
            showModal: false,
            showNextModal: false,
            resultmessage: '',
            resultName: ''
        }
    }
    showToast = async () => {
        this.setState({
            showModal: true
        })
    }
    goBack = () => {
        this.props.navigation.navigate("Tabbar")
    }
    enterYes = async () => {
        let { userId, token } = this.state
        await axios.put(SHARE_BIND, {
            "parent_id": userId
        }, {
            headers: {
                "token": token
            }
        })
            .then(r => {
                console.log('[绑定用户]', r.data)
                if (r.data.code === 1) {
                    this.setState({
                        showNextModal: true,
                        resultName: r.data.result.user_name,
                        resultmessage: r.data.message
                    })
                }
                else {
                    //绑定失败
                    this.setState({
                        showNextModal: true,
                        resultName: r.data.result.user_name,
                        resultmessage: r.data.message
                    })
                }

            })
            .catch(e => console.log('[绑定用户]', e))
    }
    resultClick = () => {
        this.setState({
            showModal: false,
            showNextModal: false
        })
        this.props.navigation.navigate("Tabbar")
    }
    render() {
        let { userId, userName, avaterUrl, email, showModal, showNextModal, resultName, resultmessage, code } = this.state
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#fff"></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity >
                        {/* <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image> */}
                    </TouchableOpacity>
                    <Text style={styles.title}>扫描结果</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <View style={styles.friendWrap}>
                            {
                                !!avaterUrl ?
                                    <Image style={styles.headIcon} source={{ uri: avaterUrl }}></Image>
                                    :
                                    <Image style={styles.headIcon} source={require('../../../assets/icons/tou1.png')}></Image>

                            }
                            <View style={styles.texWrap}>
                                <Text style={styles.texName}>
                                    {userName}
                                </Text>
                                <Text style={styles.texEmail}>
                                    {email}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {
                        code === 0 ?
                            <View>
                                <View style={styles.btnTex}>
                                    <Text>
                                        您已有上级，无法与其他人建立关系。
                                     </Text>
                                </View>
                                <View style={styles.btnWrap}>
                                    <TouchableOpacity style={styles.btnTouc} onPress={this.goBack}>
                                        <Text style={styles.btnToucTex}>返回</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> : <></>
                            // <View style={styles.btnTwrap}>
                            //     <TouchableOpacity style={styles.btnBFriend} onPress={this.goBack}>
                            //         <Text style={styles.btnBTex}>返回</Text>
                            //     </TouchableOpacity>
                            //     <TouchableOpacity style={styles.btnBeFriend} onPress={this.showToast}>
                            //         <Text style={styles.btnBeTex} >绑定关系</Text>
                            //     </TouchableOpacity>
                            // </View>
                    }
                </View>
                <Modal visible={showModal} transparent={true} animationType="slide">
                    <View style={{ flex: 1, marginTop: 193, alignItems: 'center' }}>
                        <View style={{
                            width: 319,
                            height: 166,
                            backgroundColor: '#2B2D33',
                            borderRadius: 32,
                            paddingTop: 32,
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingBottom: 32
                        }}>
                            {
                                code === 0 ? <>
                                    <TouchableOpacity style={styles.btnBFriend} onPress={this.goBack}>
                                        <Text style={styles.btnBTex}>返回</Text>
                                    </TouchableOpacity>
                                </> :
                                    showModal && !showNextModal ?
                                        <>
                                            <Text style={{ height: 21, color: '#fff', fontSize: 15, fontWeight: '500', marginBottom: 8 }}>请确认是否与{userName}绑定关系。</Text>
                                            <View style={{ flexDirection: 'row', height: 16, alignItems: 'center', marginBottom: 27 }}>
                                                <Image style={{ width: 6, height: 6, marginRight: 5 }} source={require('../../../assets/icons/jujiao2.png')}></Image>
                                                <Text style={{ color: "#fff", fontSize: 11, fontWeight: '500' }}>你只能与一个邀请人绑定关系哦！</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({
                                                            showModal: false
                                                        })
                                                    }}
                                                    style={{ height: 30, width: 88, borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}
                                                >
                                                    <Text style={{ fontSize: 14, color: '#fff', fontWeight: '400' }}>否</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={this.enterYes}
                                                    style={{ height: 30, width: 88, borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}
                                                >
                                                    <Text style={{ fontSize: 14, color: '#3D72E4', fontWeight: '400' }}>是</Text>

                                                </TouchableOpacity>
                                            </View>
                                        </>
                                        :
                                        showNextModal ?
                                            <>
                                                <Text style={{ height: 21, color: '#fff', fontSize: 15, fontWeight: '500', marginBottom: 8 }}>您与{resultName}{resultmessage}</Text>
                                                <TouchableOpacity
                                                    onPress={this.resultClick}
                                                    style={{ height: 30, width: 88, alignSelf: 'center', borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginTop: 51 }}
                                                >
                                                    <Text style={{ fontSize: 14, color: '#3D72E4', fontWeight: '400' }}>确定</Text>

                                                </TouchableOpacity>
                                            </>
                                            :
                                            <>

                                            </>
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    arroWrap: {
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 16,
        backgroundColor: '#fff'
    },
    arrow: {
        width: 11.82,
        height: 22,
    },
    title: {
        marginLeft: 148,
        color: '#2B2D33',
        fontSize: 18,
        fontWeight: "500",
        fontFamily: 'PingFang SC'
    },
    container: {
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        flex: 1
    },
    wrapper: {
        marginTop: 80,
        width: 343,
        height: 84,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#565A66',
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 1
        },
    },
    friendWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headIcon: {
        width: 60,
        height: 60,
        marginTop: 12,
        marginLeft: 12,
        borderRadius: 30
    },
    texWrap: {
        marginLeft: 12,
        marginTop: 12
    },
    texName: {
        fontSize: 18,
        color: '#2B2D33',
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        marginBottom: 4
    },
    texEmail: {
        fontFamily: "PingFang SC",
        fontWeight: '400',
        color: "#8D9099",
        fontSize: 11,
    },
    btnWrap: {
        marginTop: 350,
    },
    btnTex: {
        textAlign: 'right',
        marginTop: 50
    },
    btnTouc: {
        height: 44,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#3D72E4'
    },
    btnToucTex: {
        color: '#3D72E4',

    },
    btnTwrap: {
        height: 44,
        width: 343,
        flexDirection: 'row',
        marginTop: 400,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btnBeFriend: {
        width: 188,
        borderWidth: 1,
        borderColor: '#3D72E4',
        borderRadius: 8,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    btnBFriend: {
        width: 143,
        borderWidth: 1,
        borderColor: '#FE5564',
        borderRadius: 8,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    btnBTex: {
        color: '#FE5564'
    },
    btnBeTex: {
        color: '#3D72E4'
    }
})
