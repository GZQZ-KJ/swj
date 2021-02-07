import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import basicStyle from '../../components/styles/basic/index'
import { USER_INDEX } from '../../utils/api/pathMap'
import axios from '../../utils/api/request'
import { inject, observer } from 'mobx-react'
import Toast from '../../utils/api/Toast';
@inject('rootStore')
@observer
/**
 * 底部我的页面
 */
export default class minePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: [
        {
          icon: require('../../assets/icons/mine/bankCard.png'),
          title: '我的银行卡',
        },
        {
          icon: require('../../assets/icons/mine/share.png'),
          title: '我的分享',
        },
        {
          icon: require('../../assets/icons/mine/AccountRecords.png'),
          title: '账户记录',
        },
        {
          icon: require('../../assets/icons/mine/order.png'),
          title: '仲裁订单',
        },
        {
          icon: require('../../assets/icons/mine/service.png'),
          title: '联系客服',
        },
        {
          icon: require('../../assets/icons/mine/souComp.png'),
          title: '开源组件',
        },
        {
          icon: require('../../assets/icons/mine/regard.png'),
          title: '关于',
        },
        {
          icon: require('../../assets/icons/mine/set.png'),
          title: '清除缓存',
        },
      ],
      token: this.props.rootStore.token,
      isUpdate: this.props.rootStore.isUpdate,
      phoneNum: this.props.rootStore.phoneNum
    }
  }

  //用户首页
  userIndex = async () => {
    await axios.get(USER_INDEX, {
      headers: {
        "Content-Type": "application/json",
        "token": this.state.token
      }
    }).then(r => {
      if(r.data.code === 1) {
        this.props.rootStore.setNss(r.data.result.nss_balance, r.data.result.locked_nss_balance)
      this.props.rootStore.setUserInfo( r.data.result.email,this.state.token)
      this.props.rootStore.setPNInfo(r.data.result.avater_url, this.state.phoneNum, r.data.result.user_name)
      }else {
        Toast.message(r.data.message,2000,'center')
        
      }
    }).catch(e => console.log('[用户首页]', e))
  }


  componentDidMount() {
    this.userIndex()
  }


  goPresonallMSg = () => {
    this.props.navigation.navigate("PersonallMsg")
  }
  render() {
    let { rootStore } = this.props
    return (
      <View>
        <StatusBar backgroundColor="#fff"></StatusBar>
        <View style={styles.top}>
          <Text style={styles.mineTxt}>我的</Text>
          <View style={[styles.wrap, basicStyle.flexRow]}>
            <View style={[styles.userInfo, basicStyle.flexRow]}>
              <View style={{ width: 60, height: 60, borderRadius: 30 }}>
                {
                 rootStore.avaUrl !== null && rootStore.avaUrl.length > 0 ?
                    <Image style={styles.avatar} source={{ uri: rootStore.avaUrl }}></Image>
                    :
                    <Image style={styles.avatar} source={require('../../assets/icons/avatar/tou1.png')}></Image>
                }
              </View>
              <View style={styles.details}>
                <Text style={styles.name}>{rootStore.name}</Text>
                <Text style={styles.email}>{rootStore.email}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{ height: '100%', width: 30, justifyContent: 'center', alignItems: 'flex-end' }}
              onPress={this.goPresonallMSg
              }
            >
              <Image style={styles.arrow} source={require('../../assets/icons/arrows/ck.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.sellWrap, basicStyle.flexRow]}>
          <View style={[styles.wraplf, basicStyle.flexRow]}>
            <Image style={styles.logo} source={require('../../assets/icons/mine/nssLOGO.png')}></Image>
            <View>
              <Text style={styles.num}>NSS：{rootStore.nss}</Text>
              <Text style={styles.lockNum}>锁定余额：{rootStore.lockNss}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => {
            this.props.navigation.navigate("SellProduct")
          }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>挂卖产品</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 8 }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("Banks")
          }}>
            <ListItem list={this.state.listData[0]}></ListItem>
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: '#F2F3F7', marginLeft: 16, marginRight: 16 }}></View>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("Share")
          }}>
            <ListItem list={this.state.listData[1]}></ListItem>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 8 }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("Paylogs")
          }}>
            <ListItem list={this.state.listData[2]}></ListItem>
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: '#F2F3F7', marginLeft: 16, marginRight: 16 }}></View>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("Order")
          }}>
            <ListItem list={this.state.listData[3]}></ListItem>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 8 }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("Service")
          }}>
            <ListItem list={this.state.listData[4]}></ListItem>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 8 }}>
          {/* <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("SouComp")
          }}> */}
          <ListItem list={this.state.listData[5]}></ListItem>
          {/* </TouchableOpacity> */}
          <View style={{ height: 1, backgroundColor: '#F2F3F7', marginLeft: 16, marginRight: 16 }}></View>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("About")
          }}>
            {
              !!this.props.isUpdate ? <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#FE5564', zIndex: 222, position: 'absolute', right: 30, top: 15 }}></View> : <></>
            }
            <ListItem list={this.state.listData[6]} isUpdate={this.state.isUpdate}></ListItem>
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: '#F2F3F7', marginLeft: 16, marginRight: 16 }}></View>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("Setting")
          }}>
            <ListItem list={this.state.listData[7]}></ListItem>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

/**
 *
 * @param {list} 数组
 */
class ListItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.item}>
        <View style={[styles.itBox, basicStyle.flexRow]}>
          <View style={[styles.itLf, basicStyle.flexRow]}>
            <View style={styles.itIcon}>
              <Image source={this.props.list.icon}></Image>
            </View>
            <Text style={styles.itTitle}>{this.props.list.title}</Text>
          </View>
          <Image style={styles.itArrow} source={require('../../assets/icons/arrows/ck.png')}></Image>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  top: {
    height: 128,
    backgroundColor: '#FFFFFF'
  },
  mineTxt: {
    marginTop: 10,
    alignSelf: "center",
    height: 25,
    color: '#2B2D33',
    fontSize: 18
  },
  wrap: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 21,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  details: {
    marginLeft: 12
  },
  name: {
    marginTop: 8,
    height: 25,
    fontSize: 18,
    color: '#2B2D33'
  },
  email: {
    height: 16,
    fontSize: 11,
    color: '#8D9099'
  },

  sellWrap: {
    marginTop: 8,
    marginBottom: 8,
    paddingRight: 16,
    paddingLeft: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  wraplf: {
    alignItems: 'center',
  },
  num: {
    height: 25,
    fontSize: 18,
    color: '#3D72E4'
  },
  lockNum: {
    fontSize: 11,
    fontWeight: '400',
    color: '#8D9099'
  },
  btn: {
    height: 32,
    width: 80,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D72E4'
  },
  item: {
    backgroundColor: '#FFFFFF'
  },
  itBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  itTitle: {
    marginLeft: 12,
    height: 20,
    color: '#2B2D33'
  },
  arrow: {
    width: 4.95,
    height: 8.49
  }

})