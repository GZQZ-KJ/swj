import React, { Component } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";

class Toast extends Component {
    /**
     * showTex 显示的文本
     * zbtnBC 主按钮的背景颜色
     * zbtnF 主按钮的文字
     * zbtnFC 主按钮的文字颜色
     * zbtnBoC 主按钮的边框颜色
     * 
     * qbtnW 弹窗的取消按钮宽度
     * qbtnH 弹窗的取消按钮高度
     * qbtnC  取消按钮的背景颜色
     * qbtnBC 取消按钮的边框颜色
     * qbtnF  取消按钮的文字
     * qbtnFC 取消按钮的字体颜色
     * 
     * ebtnW 弹窗的确认按钮宽度
     * ebtnH 弹窗的确认按纽高度
     * ebtnC  确认按钮的背景颜色
     * ebtnBC 确认按钮的边框颜色
     * ebtnF 确认按钮的文字
     * ebtnFC 取消按钮的字体颜色
     *
     * @static
     * @memberof Toast
     */
    static defaultProps = {
        width: 88,
        height: 20,
        bgC: '#fff',
        fC: '#3D72E4',
        showTex: '',
        zbtnF: '按钮',
        zbtnC: '#fff',
        zbtnBC: '#3D72E4',
        zbtnFC: '#3D72E4',

        qbtnW: 88,
        qbtnH: 30,
        qbtnFC: '#fff',
        qbtnBC: '#2B2D33',
        qbtnBoC: '#fff',
        qbtnF: '取消',

        ebtnW: 88,
        ebtnH: 30,
        ebtnFC: '#fff',
        ebtnBC: '#2B2D33',
        ebtnBoC: '#fff',
        ebtnF: '确认',
    }
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        };
    }
    enterPay = (cancal, val,id) => {  //确认按钮
        this.setModalVisible(cancal);
        if (val === '完成1') {
            this.props.onsumbit()
        }
        if (val === '取消挂卖1') {
            this.props.onYes()
        }
        if (val === '确认付款1') {
            this.props.onEnter(id)
        }
        if (val === '取消锁定1') {
            this.props.onCancel()
        }
        if (val === '退出登录1') {
            this.props.loginOut()
        }
        if (val === '确认收款1') {
            this.props.onMakeCollect(id)
        }
    }
    cancalClock = (enter, val) => { //取消按钮
        this.setModalVisible(enter);
        // alert(val)
        if (val === '完成0') return
        if (val === '退出登录0') return
        if (val === '取消挂卖0') return
        if (val === '确认付款0') return
        if (val === '取消锁定0') return
        if (val === '确认收款0') return
    }

    setModalVisible = (visible) => {  //Modal层隐藏
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                // onRequestClose={() => {
                //     Alert.alert("Modal has been closed.");
                //     this.setModalVisible(!modalVisible);
                // }} 鼠标右键事件
                >
                    <View style={styles.centered}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{this.props.showTex}</Text>
                            <View style={styles.dobut}>
                                <TouchableHighlight
                                    underlayColor="#A6B8E0"
                                    style={{
                                        ...styles.openButton,
                                        width: this.props.qbtnW,
                                        height: this.props.qbtnH,
                                        backgroundColor: this.props.qbtnBC,
                                        borderColor: this.props.qbtnBoC,
                                    }}
                                    onPress={() => {
                                        this.cancalClock(!modalVisible, this.props.zbtnF + '0');
                                    }}
                                >
                                    <Text style={{
                                        ...styles.textStyle,
                                        color: this.props.qbtnFC
                                    }}>{this.props.qbtnF}</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor="#A6B8E0"
                                    style={{
                                        ...styles.openButton,
                                        width: this.props.ebtnW,
                                        height: this.props.ebtnH,
                                        backgroundColor: this.props.ebtnBC,
                                        borderColor: this.props.ebtnBoC,
                                    }}
                                    onPress={() => {
                                        this.enterPay(!modalVisible, this.props.zbtnF + '1',this.props.id);
                                    }}
                                >
                                    <Text style={{
                                        ...styles.textTStyle,
                                        color: this.props.ebtnFC
                                    }}>{this.props.ebtnF}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    underlayColor="rgba(255,255,255,0)"
                    style={{
                        ...styles.showWrap,
                        backgroundColor: this.props.zbtnBC,
                        borderColor: this.props.zbtnBoC
                    }}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                >
                    <Text style={{ color: this.props.zbtnFC }}>{this.props.zbtnF}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
    },
    centered: {
        alignItems: "center",
        paddingTop: 195,
    },
    modalView: {
        width: 319,
        height: 166,
        backgroundColor: "#282D33",
        borderRadius: 32,
        // justifyContent: 'center',
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 32,
        marginBottom:32,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        borderRadius: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 14,
        textAlign: "center"
    },
    textTStyle: {
        fontSize: 14,
        textAlign: "center"
    },
    modalText: {
        color: '#fff',
        // backgroundColor:'#fff',
        fontWeight: '500',
        fontSize: 15,
        letterSpacing: -1,
        height:44,
        marginBottom:28 
      },
    dobut: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-around"
    },
    showWrap: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default Toast;