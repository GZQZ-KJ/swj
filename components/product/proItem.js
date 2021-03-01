import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import basicStyle from '../styles/basic/index'
import { NavigationContext } from '@react-navigation/native'
import { pxToPt } from "../../utils/styleKits";

/**
 * 产品列表
 */
export default class proItem extends Component {
  static contextType = NavigationContext
  constructor(props) {
    super(props)
    this.state = {
      targetTime: this.props.v.sale_expire_time,
      remain: ''
    }
    this.time = null
  }
  onFn = () => {
    this.time = setInterval(() => {
      let { targetTime } = this.state
      const now = Math.round(new Date())
      targetTime = targetTime.substring(0, 19)
      targetTime = targetTime.replace(/-/g, '/')
      const Target = new Date(targetTime).getTime()
      let reduces = Target - now
      if (reduces <= 0) {
        clearInterval(this.time)
        this.setState({
          remain: 0
        })
      } else {
        reduces -= 1000
        const days = parseInt(reduces / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
        const hours = parseInt(reduces / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
        const minutes = parseInt(reduces / 1000 / 60 % 60, 10);//计算剩余的分钟 
        const seconds = parseInt(reduces / 1000 % 60, 10);//计算剩余的秒数
        const t = `${days}天${hours}时${minutes}分${seconds}秒`
        this.setState({
          remain: t
        })
      }
    }, 1000)
  }
  componentDidMount() {
    //开启定时器
    this.onFn()
  }
  componentWillUnmount() {
    clearInterval(this.time)
  }

  render() {
    let { v } = this.props
    return (
      <TouchableOpacity
      activeOpacity={1}
        underlayColor={'rgba(255,255,255,.1)'}
        style={styles.container}
        onPress={() => {
          clearInterval(this.time)
          this.context.navigate("Buyer", { id: v.sp_id, remain: this.state.remain })
        }}
      >
        <>
          <View style={[styles.upper, basicStyle.flexRow]}>

            <View style={[styles.info, basicStyle.flexRow]}>
              {
                v.avater_url !== '' ?
                  <Image style={{width:pxToPt(40),height:pxToPt(40),borderRadius:pxToPt(20)}} source={{ uri: v.avater_url }}></Image>
                  : <Image source={require('../../assets/icons/avatar/tou2.png')}></Image>
              }
              <View style={{ marginLeft: pxToPt(8)}}>
                <Text style={styles.name}>{v.user_name}</Text>
                <Text style={styles.outTime}>下架倒计时: {this.state.remain}</Text>
              </View>
            </View>
            <Text style={styles.price}>￥:{v.price}</Text>
          </View>
          <View style={[styles.next, basicStyle.flexRow]}>
            <Text style={styles.num}>NSS：{v.value}</Text>
            <Text style={styles.totalPrice}>总价:{v.sum_count}</Text>
          </View>
        </>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: pxToPt(8),
    marginLeft: pxToPt(16),
    marginRight: pxToPt(16),
    marginBottom: pxToPt(4),
    backgroundColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#565A66',
    elevation: 2,
    shadowOpacity: 0.12,
    borderRadius: pxToPt(8)
  },
  upper: {
    marginLeft: pxToPt(12),
    marginRight: pxToPt(12),
    paddingTop: pxToPt(12),
    paddingBottom: pxToPt(11),
    borderBottomWidth: pxToPt(1),
    borderBottomColor: '#F2F3F7',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  info: {
    marginLeft: 0
  },
  name: {
    height: pxToPt(21),
    fontSize:pxToPt(15),
    color: '#2B2D33',
    fontFamily: 'PingFang SC'
  },
  outTime: {
    height: pxToPt(17),
    fontSize: pxToPt(12),
    color: '#8D9099'
  },
  price: {
    height: pxToPt(22),
    fontSize: pxToPt(16),
    color: '#FE5564',
    fontWeight: '700',
  },
  next: {
    justifyContent: 'space-between',
    alignItems:'center',       
    marginLeft: pxToPt(12),
    marginRight: pxToPt(12),
    paddingTop: pxToPt(11),
    paddingBottom: pxToPt(12),
  },
  num: {
    height: pxToPt(21),
    fontSize: pxToPt(15),
    color: '#2B2D33'
  },
  totalPrice: {
    height: pxToPt(20),
    fontSize: pxToPt(14),
    color: '#2B2D33'
  }
})