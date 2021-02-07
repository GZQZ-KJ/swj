import React from 'react';
import { 
  View, 
  Image,
  StyleSheet, 
  Text
} from 'react-native';
import basicStyle from "./styles/basic/index.js"

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
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  upper:{
    marginLeft: 12,
    marginRight: 12,
    paddingTop: 12,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F7',
    alignItems: 'center'
  },
  info:{
    marginLeft: 8
  },
  name:{
    height: 21,
    fontSize: 15,
    color: '#2B2D33',
    fontFamily: 'PingFang SC'
  },
  outTime:{
    height: 17,
    fontSize: 12,
    color: '#8D9099'
  },
  price:{ 
    height: 22,
    marginLeft: 74,
    fontSize: 16,
    color: '#FE5564'
  },
  next:{
    justifyContent: 'space-between',
    marginLeft: 12,
    marginRight: 12,
    paddingTop: 11,
    paddingBottom: 12,  
  },
  num:{
    height: 21,
    fontSize: 15,
    color: '#2B2D33'
  },
  totalPrice:{
    height: 20,
    fontSize: 14,
    color: '#2B2D33',
	  marginLeft: 203
	
  }
})

export default ProItem