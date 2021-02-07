import React from "react";
import { ActivityIndicator,Image } from "react-native";
import {Toast,Theme  } from "teaset";

let customKey = null;
/**
 * 
 * @param {*} text // 传入的文本
 */
Toast.showLoading=(text)=> {
  if (customKey) return;
  customKey = Toast.show({
    text,
    icon: <ActivityIndicator size='large'  style={{width:'100%', height:'100%'}} color={Theme.toastIconTintColor} />,
    position: 'center',
    duration: 100000,
  });
}

Toast.hideLoading=()=> {
  if (!customKey) return;
  Toast.hide(customKey);
  customKey = null;
}

export default Toast;