import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {pxToPt} from './styleKits'
export default class lightBox extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <StatusBar backgroundColor={"#000"} barStyle={'light-content'}></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity
                        style={{ width: pxToPt(60), height: pxToPt(44), paddingLeft: pxToPt(16), justifyContent: 'center' }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image style={styles.arrow} source={require('../assets/icons/backo.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#000',justifyContent:'center',alignItems:'center' }}>
                    <Image resizeMode={'contain'} style={{height:pxToPt(400),width:pxToPt(400),padding:pxToPt(16)}} source={{ uri: this.props.route.params.url }}></Image>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    arroWrap: {
        height: pxToPt(44),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#000',
    
    },
    arrow: {
        width: pxToPt(11.82),
        height: pxToPt(22),
    },
})