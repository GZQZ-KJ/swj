import {
    PixelRatio,
    Dimensions,
    Platform
} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 判断是否为iphoneX   ture || false
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH >= X_HEIGHT && screenW >= X_WIDTH) ||
            (screenH >= X_WIDTH && screenW >= X_HEIGHT))
    )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */

export function ifIphoneX(iphoneXStyle, iosStyle, androidStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;  //isIX
    } else if (Platform.OS === 'ios') {
        return iosStyle  // 不是 IX
    } else {
        if (androidStyle) return androidStyle;
        return iosStyle  
    }
}