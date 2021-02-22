import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
export default class arbiPicmsg extends Component {
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
                <Text style={{ color: '#8D9099', fontSize: 14, fontWeight: '400', marginTop: 8 }}>
                    卖家描述
                                </Text>
                <Text style={{ color: '#5A5D66', fontSize: 14, fontWeight: '500', marginTop: 4 }}>
                    {saleArbitration}
                </Text>
                <Text style={{ color: '#8D9099', fontSize: 14, fontWeight: '400', marginTop: 12 }}>
                    图片
                                </Text>
                <View style={styles.ArbtiMsg}>
                    <View style={{ width: 101, height: 70, flexDirection: 'row' }} >
                        {
                            saleImages.length > 0 ?
                                saleImages.map((v, i) => {
                                    return (<Image style={styles.showImg} key={i} source={{ uri: v }}></Image>)
                                }) : <></>
                        }

                    </View>
                </View>
                {
                    buyArbitration && buyImages ? <>
                        <Text style={{ color: '#8D9099', fontSize: 14, fontWeight: '400', marginTop: 8 }}>
                            买家描述
                                </Text>
                        <Text style={{ color: '#5A5D66', fontSize: 14, fontWeight: '500', marginTop: 4 }}>
                            {buyArbitration}
                        </Text>

                        <Text style={{ color: '#8D9099', fontSize: 14, fontWeight: '400', marginTop: 12 }}>
                            图片
                                </Text>
                        <View style={styles.ArbtiMsg}>
                            <View style={{ width: 101, height: 70, flexDirection: 'row' }}>
                                {
                                    buyImages.map((v, i) => {
                                        return (<Image style={styles.showImg} key={i} source={{ uri: v }}></Image>)
                                    })
                                }
                            </View>
                        </View>
                    </> : buyArbitration && !buyImages.length ? <>
                        <Text style={{ color: '#8D9099', fontSize: 14, fontWeight: '400', marginTop: 8}}>
                            买家描述
                                </Text>
                        <Text style={{ color: '#5A5D66', fontSize: 14, fontWeight: '500', marginTop: 4 }}>
                            {buyArbitration}
                        </Text></> : <></>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    msgArbitration: {
        width: 343,
        // height: 239,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 8,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom:10,
        marginBottom:24
    },
    msgArbHead: {
        height: 44,
        width: 319,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#F5F5F7'
    },
    msgArbTitle: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#2B2D33',
        fontSize: 16
    },
    showImg: {
        width: 100,
        height: '100%',
        resizeMode: 'stretch',
        marginRight: 8
    },
    ArbtiMsg: {
        marginTop: 8,
        width: 319,
        height: 80,
        flexDirection: 'row',
        paddingBottom:8,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F3F7',
    }
})
