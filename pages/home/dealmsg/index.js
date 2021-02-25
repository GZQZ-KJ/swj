import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import basicStyle from '../../../components/styles/basic/index';
import axios from '../../../utils/api/request'
import {pxToPt} from '../../../utils/styleKits'
import { HOME_GETBROADCAST } from '../../../utils/api/pathMap'
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer

/**
 * 
 * 交易播报数据
 */
/**
 * 
 * @param {*} 交易播报 
 */
export default class dealMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: this.props.rootStore.token,
      data: [],
    }
    this.timer = null
  }
  getHomeGetBroadcast = async () => {
    let { token } = this.state
    await axios.get(HOME_GETBROADCAST, {
      headers: {
        "token": token
      }
    }).then(r => {
      if (r.data.code === 1) {
        this.setState({
          data: r.data.result
        })
      }
    }).catch(e => console.log(e))
  }

  
  componentDidMount() {
    this.getHomeGetBroadcast()
    this.timer = setInterval(() => {
      this.getHomeGetBroadcast()
    }, 120000)
  }
  

  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.title}>交易播报</Text>
        <View style={styles.line}></View>
        {
          this.state.data.length < 1 ? 
          <View style={styles.nonlist}>
            <Text style={{color:'#E4E6E8',fontSize:pxToPt(16)}}>暂无交易</Text>
          </View> :<></>
        }
        {/* <View style={styles.list}>
          {this.state.data.map((v, i) => {
            return (
              <Item data={v} key={i}></Item>
            )
          })
          }
        </View> */}
      </View>
    )
  }
}
class Item extends Component {
  render() {
    let { data } = this.props
    data.created_time = data.created_time.trim().split(" ")[1]
    return (
      <View style={[styles.itemWrap, basicStyle.flexRow]}>
        <View style={[styles.wraplf, basicStyle.flexRow]}>
          {
            !!data.avater_url ?
              <Image style={styles.img} source={{ uri: data.avater_url }}></Image>
              :
              <Image style={styles.img} source={require('../../../assets/icons/tou1.png')}></Image>
          }
          <Text style={[styles.txt, styles.txtmsg]}>买{data.value}NSS</Text>
        </View>
        <View style={[styles.wraprt, basicStyle.flexRow]}>
          <Text style={[styles.txt, styles.txtstate]}>交易成功</Text>
          <Text style={styles.txt}>{data.created_time}</Text>
        </View>
      </View>
    )
  }
}




const styles = StyleSheet.create({
  box: {
    marginTop: pxToPt(8),
    marginLeft: pxToPt(16),
    marginRight: pxToPt(16),
    borderRadius: pxToPt(20),
    backgroundColor: '#FFFFFF'
  },
  title: {
    marginTop: pxToPt(11),
    marginBottom: pxToPt(10),
    marginLeft: pxToPt(26),
    height:pxToPt(22),
    lineHeight: pxToPt(22),
    fontSize: pxToPt(16),
    fontWeight: '800',
    fontFamily: 'System',
    color: '#2B2D33FF'
  },
  line: {
    marginLeft: pxToPt(12),
    marginRight: pxToPt(12),
    height: pxToPt(1),
    backgroundColor: '#F8F9FAFF'
  },
  itemWrap: {
    marginTop: pxToPt(8),
    marginBottom: pxToPt(8),
    marginLeft: pxToPt(12),
    marginRight: pxToPt(12),
    justifyContent: 'space-between',
  },
  wraplf: {
    alignItems: 'center'
  },
  list: {
    marginTop: pxToPt(8),
    marginBottom:pxToPt(8)
  },
  nonlist:{
    marginTop: pxToPt(8),
    marginBottom:pxToPt(8),
    height:pxToPt(60),
    justifyContent:'center',
    alignItems:'center'
  },
  img: {
    height: pxToPt(32),
    width: pxToPt(32),
    borderRadius:pxToPt(16)
  },
  wraprt: {
    alignItems: 'center'
  },
  txt: {
    height: pxToPt(20),
    lineHeight: pxToPt(20),
    fontSize: pxToPt(14),
    color: '#5A5D66FF'
  },
  txtmsg: {
    marginLeft: pxToPt(8)
  },
  txtstate: {
    marginRight: pxToPt(4)
  },
})

