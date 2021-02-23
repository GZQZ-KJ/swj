import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import { pxToPt } from "../../../utils/styleKits";
export default class arbibuyer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { avaterUrl, userName } = this.props
        return (
            <View style={styles.buyerInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        !!avaterUrl ?
                            <Image style={styles.headImg} source={{ uri: avaterUrl }}></Image>
                            :
                            <Image style={styles.headImg} source={require('../../../assets/icons/tou1.png')}></Image>
                    }
                    <View>
                        <Text style={styles.buyerName}>{userName}</Text>
                    </View>
                </View>
                <View style={styles.buyerwrap}>
                    <Text style={styles.buyerfont}>买方</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buyerInfo: {
        width: pxToPt(343),
        height: pxToPt(84),
        borderRadius: pxToPt(8),
        backgroundColor: '#fff',
        shadowColor: '#565A66',
        shadowOffset: { width: pxToPt(0), height: pxToPt(1) },
        elevation: pxToPt(2),
        paddingLeft: pxToPt(12),
        paddingRight: pxToPt(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: pxToPt(6)
    },
    headImg: {
        width: pxToPt(52),
        height:pxToPt(52),
        borderRadius: pxToPt(26),
        marginRight:pxToPt(12)
    },
    buyerName: {
        color: '#2B2D33',
        fontSize: pxToPt(16),
        fontWeight: '500'
    },
    buyerwrap: {
        height:pxToPt(18),
        width: pxToPt(40),
        backgroundColor: "#3D72E4",
        borderRadius: pxToPt(9),
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyerfont: {
        color: '#fff',
        fontSize:pxToPt(11),
        fontWeight: '400'
    }
})
