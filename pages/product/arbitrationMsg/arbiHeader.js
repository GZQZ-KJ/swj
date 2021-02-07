import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
export default class arbiHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: this.props.statusStr,
            buyImages: this.props.buyImages,
            saleImages: this.props.saleImages
        }
    }
    render() {
        let { status, buyImages, saleImages } = this.state
        return (
            <>
                {
                    status === 1 && buyImages.length < 1 && saleImages.length > 0 ?
                        <>
                            <View style={styles.headMsg}>
                                <Text style={styles.headTex}>卖家对该订单提出仲裁，请提交您的仲裁反馈</Text>
                            </View>
                        </>
                        :
                        <>
                        </>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    headMsg: {
        height: 44,
        width: '100%',
        backgroundColor: '#A6B8E0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headTex: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'PingFang SC'
    },
})