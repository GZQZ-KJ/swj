import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import { pxToPt } from "../../../utils/styleKits";
import { NavigationContext } from '@react-navigation/native'
export default class arbiPicmsg extends Component {
    static contextType = NavigationContext
    constructor(props) {
        super(props)
        this.state = {
            buyImages: this.props.buyImages,
            saleImages: this.props.saleImages,
            saleArbitration: this.props.saleArbitration,
            buyArbitration: this.props.buyArbitration,
        }
    }
    render() {
        let { buyImages, saleImages, saleArbitration, buyArbitration } = this.state
        return (
            <View style={styles.msgArbitration}>
                <View style={styles.msgArbHead}>
                    <Text style={styles.msgArbTitle}>仲裁信息</Text>
                </View>
                <Text style={{ color: '#8D9099', fontSize: pxToPt(14), fontWeight: '400', marginTop: pxToPt(8) }}>
                    卖家描述
                                </Text>
                <Text style={{ color: '#5A5D66', fontSize: pxToPt(14), fontWeight: '500', marginTop: pxToPt(4) }}>
                    {saleArbitration}
                </Text>
                <Text style={{ color: '#8D9099', fontSize: pxToPt(14), fontWeight: '400', marginTop: pxToPt(12) }}>
                    图片
                                </Text>
                <View style={styles.ArbtiMsg}>
                    <View style={{ width: pxToPt(101), height: pxToPt(70), flexDirection: 'row' }} >
                        {
                            saleImages.length > 0 ?
                                saleImages.map((v, i) => {
                                    return (<TouchableOpacity
                                        activeOpacity={1}
                                        key={i}
                                        onPress={() => {
                                            this.context.navigate("LightBox", { url: v })
                                        }}
                                    ><Image style={styles.showImg} source={{ uri: v }}></Image></TouchableOpacity>)
                                }) : <></>
                        }

                    </View>
                </View>
                {
                    buyArbitration && buyImages ? <>
                        <Text style={{ color: '#8D9099', fontSize: pxToPt(14), fontWeight: '400', marginTop: pxToPt(8) }}>
                            买家描述
                                </Text>
                        <Text style={{ color: '#5A5D66', fontSize: pxToPt(14), fontWeight: '500', marginTop: pxToPt(4) }}>
                            {buyArbitration}
                        </Text>

                        <Text style={{ color: '#8D9099', fontSize: pxToPt(14), fontWeight: '400', marginTop: pxToPt(12) }}>
                            图片
                                </Text>
                        <View style={styles.ArbtiMsg}>
                            <View style={{ width: pxToPt(101), height: pxToPt(70), flexDirection: 'row' }}>
                                {
                                    buyImages.map((v, i) => {
                                        return (<TouchableOpacity
                                            activeOpacity={1}
                                            key={i}
                                            onPress={() => {
                                                this.context.navigate("LightBox", { url: v })
                                            }}
                                        ><Image style={styles.showImg} key={i} source={{ uri: v }}></Image></TouchableOpacity>)
                                    })
                                }
                            </View>
                        </View>
                    </> : buyArbitration && !buyImages.length ? <>
                        <Text style={{ color: '#8D9099', fontSize: pxToPt(14), fontWeight: '400', marginTop: pxToPt(8) }}>
                            买家描述
                                </Text>
                        <Text style={{ color: '#5A5D66', fontSize: pxToPt(14), fontWeight: '500', marginTop: pxToPt(4) }}>
                            {buyArbitration}
                        </Text></> : <></>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    msgArbitration: {
        width: pxToPt(343),
        // height: 239,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        shadowRadius: pxToPt(2),
        elevation: 2,
        borderRadius: pxToPt(8),
        // marginLeft: pxToPt(8),
        paddingLeft: pxToPt(12),
        paddingRight: pxToPt(12),
        paddingBottom: pxToPt(10),
        marginBottom: pxToPt(24),
        overflow:'hidden'
    },
    msgArbHead: {
        height: pxToPt(44),
        width: pxToPt(319),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: pxToPt(1),
        borderColor: '#F5F5F7'
    },
    msgArbTitle: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#2B2D33',
        fontSize: pxToPt(16)
    },
    showImg: {
        width: pxToPt(100),
        height: '100%',
        resizeMode: 'stretch',
        marginRight: pxToPt(8)
    },
    ArbtiMsg: {
        marginTop: pxToPt(8),
        width: pxToPt(319),
        height: pxToPt(80),
        flexDirection: 'row',
        paddingBottom: pxToPt(8),
        // borderBottomWidth: pxToPt(1),
        // borderBottomColor: '#F2F3F7',
    }
})
