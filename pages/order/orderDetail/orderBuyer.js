import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
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
        width: 343,
        height: 84,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#565A66',
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 6,
        marginBottom:12,
    },
    headImg: {
        width: 52,
        height: 52,
        borderRadius: 26,
        marginRight: 12
    },
    buyerName: {
        color: '#2B2D33',
        fontSize: 16,
        fontWeight: '500'
    },
    buyerwrap: {
        height: 18,
        width: 40,
        backgroundColor: "#3D72E4",
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyerfont: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '400'
    }
})
