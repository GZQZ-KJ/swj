import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import { pxToPt } from "./styleKits";

/**
 *  图片弹窗
 */
export default class MyToast extends Component {
    static defaultProps = {
        havPicture: true  //控制是否有图片，false为没有
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.havPicture ? (<View style={styles.wrapper}>
                        <View style={styles.imgWrap}>
                            <Image style={styles.tImg} source={require('../assets/icons/redlg.png')} ></Image>
                            <Text style={styles.tText}>锁定成功</Text>
                        </View>
                    </View>) :
                        (<View style={styles.wrapper}>
                            <View style={styles.imgWrap}>

                                <Text style={styles.tText}>您已成功绑定关系</Text>
                            </View>
                        </View>)
                }
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:99,
        flex: 1,
        width: '100%',
        height: '100%',

    },
    wrapper: {
        width: pxToPt(280),
        height: pxToPt(120),
        backgroundColor: '#2B2D33',
        borderRadius: pxToPt(32),
        alignItems: 'center',
    },
    imgWrap: {
        marginTop: pxToPt(25),
        width: pxToPt(65.39),
        height: pxToPt(32.82),
    },
    tImg: {
        width: '100%',
        height: '100%'
    },
    tText: {
        marginTop: pxToPt(14),
        fontSize: '500',
        color: '#3D72E4',
        fontSize: pxToPt(14)
    }
})
