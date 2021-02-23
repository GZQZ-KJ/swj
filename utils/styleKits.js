import {  Dimensions} from "react-native";


export const screenWidth=Dimensions.get("window").width;
export const screenHeight=Dimensions.get("window").height;


/**
 * 将px转为pt
 * @param {Number} elePx 元素的宽度或者高度 单位 px
 */
export const pxToPt=(elePx)=>screenWidth * elePx / 375;