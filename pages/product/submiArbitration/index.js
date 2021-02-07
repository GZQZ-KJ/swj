import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Modal,
    TouchableHighlight,
    Keyboard
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import Toast from '../../../utils/api/Toast'
import AsyncStorage from '@react-native-community/async-storage'
import axios from '../../../utils/api/request'
import { UPLOAD_PIC, PRODUCT_ARBITRATION, ORDERS_ARBITRATION } from '../../../utils/api/pathMap'
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer
export default class arbitration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTop: this.props.route.params.activeTop,
            modalVisible: false,
            id: this.props.route.params.id,
            status: this.props.route.params.status,
            token: this.props.rootStore.token,
            orderNum: this.props.route.params.orderNum,
            arbitrationFont: '',
            arbitrationImages: [],

        }
    }
    //弹窗
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    //得到本地图片
    upLoadImg = async () => {
        //上传图片
        await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.getHead(image)
        }).catch(e => console.log(e))

    }
    //发送请求 上传图片
    getHead = async (image) => {
        let { arbitrationImages } = this.state
        let file = { uri: image.path, type: 'multipart/form-data', name: image.mime }
        let formdata = new FormData()
        formdata.append('file', file)
        await axios.post(UPLOAD_PIC, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": this.state.token
            }
        }).then(r => {
            console.log('[仲裁图片]', r.data.result)
            if (r.data.code === 1) {
                this.setState({
                    arbitrationImages: [...arbitrationImages, r.data.result.url]
                })
            }
            else {
                //弹窗不成功
                Toast.message(r.data.message, 1000, 'center')
                return
            }
        }).catch(e => {
            console.log('[上传图片]', e)
        })
    }
    //确认提交证据
    enterSubmit = async () => {
        let { arbitrationFont, arbitrationImages, id, token, activeTop } = this.state
        let url = PRODUCT_ARBITRATION.replace('{sp_id}', id)
        if (activeTop === 0) {
            await axios.put(url, {
                "sale_arbitration": arbitrationFont,
                "sale_images": arbitrationImages
            }, {
                headers: {
                    "token": token
                }
            }).then(r => {
                if (r.data.code === 1) {
                    // Toast.message('提交证据成功', 1000, 'center')
                    this.setState({
                        modalVisible: true,
                    })
                }
                else {
                    Toast.message(r.data.message, 2000, 'center')
                    // setTimeout(() => {
                    //     this.props.navigation.navigate("Tabbar")
                    // }, 2000)
                }
            }).catch(e => console.log('[确定提交证据]', e))
        } else {
            let url = ORDERS_ARBITRATION.replace('{so_id}', id)
            await axios.put(url, {
                "buy_arbitration": arbitrationFont,
                "buy_images": arbitrationImages
            }, {
                headers: {
                    "token": token
                }
            }).then(r => {
                console.log(r.data)
                if (r.data.code === 1) {
                    // Toast.message('提交证据成功', 1000, 'center')
                    this.setState({
                        modalVisible: true,
                    })
                } else {
                    Toast.message(r.data.message, 2000, 'center')
                    // setTimeout(() => {
                    //     this.props.navigation.navigate("Tabbar")
                    // }, 2000)
                }
            }).catch(e => console.log(e))
        }
    }
    render() {
        const { modalVisible, id, status, token, orderNum, arbitrationImages, arbitrationFont, activeTop } = this.state;
        console.log(status)
        return (
            <>

                <StatusBar backgroundColor="#fff"></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity
          style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} 
                    onPress={() => {
                        this.props.navigation.navigate('Tabbar')
                    }}>
                        <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                    </TouchableOpacity>
                    {
                        activeTop === 0 ?
                            //卖家
                            <Text style={{ ...styles.title, marginLeft: 100 }}>未到账，提出仲裁</Text> :

                            //买
                            <Text style={{ ...styles.title, marginLeft: 140 }}>仲裁反馈</Text>
                    }
                </View>
                <View style={styles.wrapper}>
                    <View styles={{ justifyContent: 'center' }}>
                        {/* <View style={styles.wrap}> */}
                        {
                            activeTop === 0 ?
                                // 卖家
                                <Text style={{ ...styles.ft, marginTop: 32 }}>您正在对订单{orderNum}提出仲裁，请简要阐述缘由</Text> :

                                // 买家
                                <Text style={{ ...styles.ft, marginTop: 32 }}>请简要阐述缘由</Text>
                        }
                        {/* </View> */}

                        <View style={styles.inpText}>
                            <TextInput
                                style={{ padding: 32, height: 140 }}
                                maxLength={50}
                                numberOfLines={2}
                                placeholder='请输入缘由，字数控制在15~50个汉字'
                                onChangeText={(arbitrationFont) => {
                                    this.setState({
                                        arbitrationFont: arbitrationFont
                                    })
                                }
                                }
                            />
                        </View>

                        <View style={styles.nowrap}>
                            <Text style={styles.ft}>请上传截图证明</Text>
                            <Text style={styles.fxt}>图片限制3张，格式JPG/JPEG</Text>
                        </View>
                        {
                            arbitrationImages.length > 0 ?
                                <View style={styles.showMyimg}>
                                    <Image style={{ width: 110, height: 70 }} source={{ uri: arbitrationImages[0] }}></Image>
                                    <Image style={{ width: 110, height: 70 }} source={{ uri: arbitrationImages[1] }}></Image>
                                    <Image style={{ width: 110, height: 70 }} source={{ uri: arbitrationImages[2] }}></Image>
                                </View>
                                : <></>
                        }
                        {
                            arbitrationImages && arbitrationImages.length < 3 ?
                                <TouchableOpacity style={styles.upLoadImg} onPress={this.upLoadImg}>
                                    <Text style={{ color: '#A6B8E0' }}>上传图片</Text>
                                </TouchableOpacity> : <></>
                        }

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    {
                                        activeTop === 0 ?
                                            <Text style={styles.modalText}>您的仲裁申请已提交，请等待买家提交证据，管理员会做出验证反馈。</Text>
                                            : <Text style={styles.modalText}>您的仲裁申请已提交,管理员会做出结果反馈。</Text>
                                    }

                                    <TouchableHighlight
                                        underlayColor="#a6b8e0"
                                        style={styles.enterButton}
                                        onPress={() => {
                                            this.setState({
                                                modalVisible: false,
                                            })
                                            setTimeout(() => {
                                                this.props.navigation.navigate("Tabbar")
                                            }, 1000)
                                        }}
                                    >
                                        <Text style={styles.entertext}>确认</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
                        {
                            activeTop === 1 ? arbitrationFont === '' ? <TouchableHighlight
                                underlayColor="#A6B8E0"
                                style={{ ...styles.openButton, backgroundColor: '#A6B8E0' }}
                            >
                                <Text style={styles.textStyle}>提交证据</Text>
                            </TouchableHighlight> : <TouchableHighlight
                                underlayColor="#A6B8E0"
                                style={{ ...styles.openButton, backgroundColor: '#3D72E4' }}
                                onPress={this.enterSubmit}
                            >
                                    <Text style={styles.textStyle}>提交证据</Text>
                                </TouchableHighlight> : arbitrationFont === '' || arbitrationImages.length < 1 ?
                                    <TouchableHighlight
                                        underlayColor="#A6B8E0"
                                        style={{ ...styles.openButton, backgroundColor: '#A6B8E0' }}
                                    >
                                        <Text style={styles.textStyle}>提交证据</Text>
                                    </TouchableHighlight>
                                    :
                                    <TouchableHighlight
                                        underlayColor="#A6B8E0"
                                        style={{ ...styles.openButton, backgroundColor: '#3D72E4' }}
                                        onPress={this.enterSubmit}
                                    >
                                        <Text style={styles.textStyle}>提交证据</Text>
                                    </TouchableHighlight>
                        }
                    </View>
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
    wrapper: {
        // marginLeft: 20,
        width: '100%',
        backgroundColor: "#F8F9FA",
        alignItems: 'center'
    },
    nowrap: {
        marginTop: 32,
        height: 46,
        width: 229,
    },
    ft: {
        fontFamily: 'PingFang SC',
        fontWeight: '400',
        color: '#2B2D33',
        fontSize: 16,
        width: 343,
    },
    fxt: {
        fontFamily: 'PingFang SC',
        fontWeight: '400',
        color: '#8D9099',
        fontSize: 11,
        marginTop: 4
    },
    inpText: {
        width: 343,
        height: 164,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        shadowRadius: 2,
        elevation: 2,
        marginTop: 16
    },
    upLoadImg: {
        width: 343,
        height: 144,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        shadowRadius: 2,
        elevation: 2,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    showMyimg: {
        width: 343,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        resizeMode: 'stretch'
    },
    showImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    ArbtiMsg: {
        marginTop: 4,
        width: 319,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    //Modal弹窗
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: 319,
        height: 166,
        margin: 20,
        marginTop: 156,
        backgroundColor: "#2B2D33",
        borderRadius: 32,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: "center",

    },
    openButton: {
        marginTop: 50,
        height: 44,
        width: 343,
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        alignItems: 'center'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 28,
        fontSize: 15,
        color: '#fff',
        fontWeight: '500'
    },
    enterButton: {
        width: 88,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center'
    },
    entertext: {
        color: '#3D72E4'
    }
})
