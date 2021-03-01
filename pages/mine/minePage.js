import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  SafeAreaView
} from 'react-native';
import basicStyle from '../../components/styles/basic/index'
import { USER_INDEX } from '../../utils/api/pathMap'
import axios from '../../utils/api/request'
import { pxToPt } from "../../utils/styleKits";
import { inject, observer } from 'mobx-react'
import Toast from '../../utils/api/Toast';
import AsyncStorage from '@react-native-community/async-storage'
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
      if (r.data.code === 1) {
        AsyncStorage.setItem('userName', r.data.result.user_name)
        this.props.rootStore.setNss(r.data.result.nss_balance, r.data.result.locked_nss_balance)
        this.props.rootStore.setUserInfo(r.data.result.email, this.state.token)
        this.props.rootStore.setPNInfo(r.data.result.avater_url, this.state.phoneNum, r.data.result.user_name)
      } else {
        Toast.message(r.data.message, 2000, 'center')

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
      <SafeAreaView style={{flex:1}}>
       <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        <View style={styles.top}>
          <Text style={styles.mineTxt}>我的</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.wrap, basicStyle.flexRow]}
            onPress={this.goPresonallMSg}>
            <View style={[styles.userInfo, basicStyle.flexRow]}>
              <View style={{ width: pxToPt(60), height: pxToPt(60), borderRadius: pxToPt(30) }}>
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
            <View
              style={{ height: '100%', width: pxToPt(30), justifyContent: 'center', alignItems: 'flex-end' }}
            >
              <Image style={styles.arrow} source={require('../../assets/icons/arrows/ck.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.sellWrap, basicStyle.flexRow]}>
          <View style={[styles.wraplf, basicStyle.flexRow]}>
            <View style={{ flexDirection: 'row',alignItems:'center' }}>
                <Image style={styles.logo} source={require('../../assets/icons/logo/nssLOGO323x.png')}></Image>
              <View >
                <Text style={styles.num}>可交易余额：{rootStore.nss}</Text>
                <Text style={styles.lockNum}>锁定余额：{rootStore.lockNss}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: pxToPt(32),
                height: pxToPt(32),
                marginRight: pxToPt(12),
                borderRadius: 8,
                backgroundColor: '#3D72E4',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={()=>{
                this.userIndex()
                Toast.message('刷新成功')
              }}
            >
              <Image style={{ width: pxToPt(12), height: pxToPt(12) }} source={require('../../assets/icons/mine/shuaxin3x.png')}></Image>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.btn} onPress={() => {
              this.props.navigation.navigate("SellProduct")
            }}>
            <Text style={{ color: '#fff', fontSize: pxToPt(12) }}>挂卖产品</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: pxToPt(8) }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate("Banks")
            }}>
            <ListItem list={this.state.listData[0]}></ListItem>
          </TouchableOpacity>
          <View style={{ height: pxToPt(1), backgroundColor: '#F2F3F7', marginLeft: pxToPt(16), marginRight: pxToPt(16) }}></View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate("Share")
            }}>
            <ListItem list={this.state.listData[1]}></ListItem>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: pxToPt(8) }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate("Paylogs")
            }}>
            <ListItem list={this.state.listData[2]}></ListItem>
          </TouchableOpacity>
          <View style={{ height: pxToPt(1), backgroundColor: '#F2F3F7', marginLeft: pxToPt(16), marginRight: pxToPt(16) }}></View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate("Order")
            }}>
            {
              !!this.props.rootStore.newArb ? <View style={{ width: pxToPt(6), height: pxToPt(6), borderRadius: pxToPt(3), backgroundColor: '#FE5564', zIndex: 222, position: 'absolute', right: pxToPt(30), top: pxToPt(15) }}></View> : <></>
            }
            <ListItem list={this.state.listData[3]}></ListItem>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: pxToPt(8) }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate("Service")
            }}>
            <ListItem list={this.state.listData[4]}></ListItem>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: pxToPt(8) }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              Toast.message('组件功能尚未开放')
              // this.props.navigation.navigate("SouComp")
            }}>
            <ListItem list={this.state.listData[5]}></ListItem>
          </TouchableOpacity>
          <View style={{ height: pxToPt(1), backgroundColor: '#F2F3F7', marginLeft: pxToPt(16), marginRight: pxToPt(16) }}></View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate("About")
            }}>
            {
              !!this.props.isUpdate ? <View style={{ width: pxToPt(6), height: pxToPt(6), borderRadius: pxToPt(3), backgroundColor: '#FE5564', zIndex: 222, position: 'absolute', right: pxToPt(30), top: pxToPt(15) }}></View> : <></>
            }
            <ListItem list={this.state.listData[6]} isUpdate={this.state.isUpdate}></ListItem>
          </TouchableOpacity>
          <View style={{ height: pxToPt(1), backgroundColor: '#F2F3F7', marginLeft: pxToPt(16), marginRight: pxToPt(16) }}></View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate("Setting")
            }}>
            <ListItem list={this.state.listData[7]}></ListItem>
          </TouchableOpacity>

        </View>
      </SafeAreaView >
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
            <View style={{ height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.itTitle}>{this.props.list.title}</Text>
            </View>
          </View>
          <Image style={styles.itArrow} source={require('../../assets/icons/arrows/ck.png')}></Image>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  top: {
    height: pxToPt(128),
    backgroundColor: '#FFFFFF'
  },
  mineTxt: {
    marginTop: pxToPt(10),
    alignSelf: "center",
    height: pxToPt(25),
    color: '#2B2D33',
    fontSize: pxToPt(18),
    fontWeight:'500'
  },
  wrap: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: pxToPt(60),
    marginLeft: pxToPt(16),
    marginRight: pxToPt(16),
    marginTop: pxToPt(21),
  },
  logo: {
    width:pxToPt(32),
    height:pxToPt(32),
    marginLeft:pxToPt(16),
    marginRight:pxToPt(8)
  },
  avatar: {
    height: pxToPt(60),
    width: pxToPt(60),
    borderRadius: pxToPt(30)
  },
  details: {
    marginLeft: pxToPt(12)
  },
  name: {
    marginTop: pxToPt(8),
    height: pxToPt(25),
    fontSize: pxToPt(18),
    color: '#2B2D33',
    fontWeight:'500'
  },
  email: {
    height: pxToPt(16),
    fontSize: pxToPt(11),
    color: '#8D9099'
  },

  sellWrap: {
    marginTop: pxToPt(8),
    marginBottom: pxToPt(8),
    paddingRight: pxToPt(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    overflow:'hidden',
    height:pxToPt(60),
  },
  wraplf: {
    alignItems: 'center',
    width: pxToPt(279),
    justifyContent: 'space-between',
    overflow:'hidden'
  },
  num: {
    height: pxToPt(25),
    fontSize: pxToPt(18),
    color: '#3D72E4',
    fontWeight: '700'
  },
  lockNum: {
    fontSize: pxToPt(11),
    fontWeight: '400',
    color: '#8D9099'
  },
  btn: {
    height: pxToPt(32),
    width: pxToPt(80),
    borderRadius: pxToPt(8),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D72E4'
  },
  item: {
    backgroundColor: '#fff',
  },
  itBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: pxToPt(44),
    marginLeft: pxToPt(16),
    marginRight: pxToPt(16),
    paddingTop: pxToPt(10),
    paddingBottom: pxToPt(10),
  },
  itLf: {
    alignItems: 'center',
    height: '100%',
  },
  itTitle: {
    marginLeft: pxToPt(12),
    color: '#2B2D33',
    fontSize: pxToPt(14),
    fontWeight: '500'
  },
  arrow: {
    width: pxToPt(4.95),
    height: pxToPt(8.49),
  },
  itIcon: {
    width: pxToPt(24),
    height: pxToPt(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }

})