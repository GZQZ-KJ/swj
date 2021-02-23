import React from 'react';
import { 
  View, 
  Image,
  StyleSheet, 
  Text
} from 'react-native';
import basicStyle from "./styles/basic/index.js"
import { pxToPt } from "../utils/styleKits";
const ProItem = () =>{
  return (
    <View style={styles.container}>
      <View style={[styles.upper, basicStyle.flexRow]}>
        <Image source={require('../assets/icons/avatar/tou2.png')}></Image>
        <View style={styles.info}>
        <Text style={styles.name}>isme</Text>
        <Text style={styles.outTime}>订单编号:1782563816</Text>
        </View>
      
       </View>
       <View style={[styles.next, basicStyle.flexRow]}>
       <Text style={styles.num}>NSS：6600</Text>
	    <Text style={styles.price}>￥:17.782512</Text>
	</View>
	 <View style={[styles.next, basicStyle.flexRow]}>
	  <Text style={styles.totalPrice}>总价:117364.579200</Text>
	 </View>
  </View>
  )
}
const styles= StyleSheet.create({
    container:{
    marginTop: pxToPt(8),
    marginLeft: pxToPt(16),
    marginRight: pxToPt(16),
    marginBottom: pxToPt(4),
    backgroundColor: '#FFFFFF',
  },
  upper:{
    marginLeft:pxToPt(12),
    marginRight: pxToPt(12),
    paddingTop: pxToPt(12),
    paddingBottom:pxToPt(11),
    borderBottomWidth: pxToPt(1),
    borderBottomColor: '#F2F3F7',
    alignItems: 'center'
  },
  info:{
    marginLeft: pxToPt(8)
  },
  name:{
    height: pxToPt(21),
    fontSize: pxToPt(15),
    color: '#2B2D33',
    fontFamily: 'PingFang SC'
  },
  outTime:{
    height: pxToPt(17),
    fontSize: pxToPt(12),
    color: '#8D9099'
  },
  price:{ 
    height:pxToPt(22),
    marginLeft: pxToPt(74),
    fontSize: pxToPt(16),
    color: '#FE5564'
  },
  next:{
    justifyContent: 'space-between',
    marginLeft: pxToPt(12),
    marginRight: pxToPt(12),
    paddingTop: pxToPt(11),
    paddingBottom: pxToPt(12),  
  },
  num:{
    height: pxToPt(21),
    fontSize: pxToPt(15),
    color: '#2B2D33'
  },
  totalPrice:{
    height: pxToPt(20),
    fontSize: pxToPt(14),
    color: '#2B2D33',
	  marginLeft: pxToPt(203)
	
  }
})

export default ProItem