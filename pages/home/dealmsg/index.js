import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import basicStyle from '../../../components/styles/basic/index';
import axios from '../../../utils/api/request'
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
        <View style={styles.list}>
          {this.state.data.map((v, i) => {
            return (
              <Item data={v} key={i}></Item>
            )
          })
          }
        </View>
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
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF'
  },
  title: {
    marginTop: 11,
    marginBottom: 10,
    marginLeft: 26,
    height: 22,
    lineHeight: 22,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'System',
    color: '#2B2D33FF'
  },
  line: {
    marginLeft: 12,
    marginRight: 12,
    height: 1,
    backgroundColor: '#F8F9FAFF'
  },
  itemWrap: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 12,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  wraplf: {
    alignItems: 'center'
  },
  list: {
    marginTop: 8,
    marginBottom: 8
  },
  img: {
    height: 32,
    width: 32,
    borderRadius:16
  },
  wraprt: {
    alignItems: 'center'
  },
  txt: {
    height: 20,
    lineHeight: 20,
    fontSize: 14,
    color: '#5A5D66FF'
  },
  txtmsg: {
    marginLeft: 8
  },
  txtstate: {
    marginRight: 4
  },
})

