/**
 * 主页面
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  StatusBar
} from 'react-native';

import { pxToPt } from "../utils/styleKits";
import TabNavigator from 'react-native-tab-navigator';
import HomePage from './home/homePage';
import ProductPage from './product/productPage';
import OrderPage from './order/orderPage';
import MinePage from './mine/minePage';
import images from '../utils/icon';
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer

export default class tabbar extends Component {
  constructor(props) {
    super(props);
    navigation = this.props.navigation;
    this.state = {
      selectedTab: 'Home'
    };
    this.dataSource = [
      {
        icon: images.home_icon,
        selectedIcon: images.home_icon_selected,
        tabPage: 'Home',
        tabName: '首页',
        component: HomePage
      },
      {
        icon: images.pro_icon,
        selectedIcon: images.pro_icon_selected,
        tabPage: 'Product',
        tabName: '产品',
        component: ProductPage
      },
      {
        icon: images.order_icon,
        selectedIcon: images.order_icon_selected,
        tabPage: 'Order',
        tabName: '订单',
        component: OrderPage
      },
      {
        icon: images.mine_icon,
        selectedIcon: images.mine_icon_selected,
        tabPage: 'Mine',
        tabName: '我的',
        component: MinePage
      }
    ];
  }
  render() {
    let tabViews = this.dataSource.map((item, i) => {
      return (
        <TabNavigator.Item
          title={item.tabName}
          selected={this.state.selectedTab === item.tabPage}
          titleStyle={{ color: '#B0B2B8',fontWeight:'400'}}
          selectedTitleStyle={{ color: '#3D72E4',fontWeight:'500' }}
          renderBadge={()=> i === 3 ? this.props.rootStore.isUpdate || this.props.rootStore.newArb ? <View style={styles.badgeView}></View> :<></> : <></>}
          renderIcon={() => <Image style={styles.tabIcon} source={item.icon} />}
          renderSelectedIcon={() => <Image style={styles.tabIcon} source={item.selectedIcon} />}
          tabStyle={{ alignSelf: 'center'}}
          onPress={() => { this.setState({ selectedTab: item.tabPage }) }}
          key={i}
        >
          <item.component navigation={navigation} />
        </TabNavigator.Item>

      );
    });
    return (
      <View style={styles.container}>
        <TabNavigator hidesTabTouch={true} tabBarStyle={{ backgroundColor: '#FFFFFF' }}>
          {tabViews}
        </TabNavigator>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex:20,
    paddingBottom:Platform.OS === 'ios' ? pxToPt(34) : 0
  },

  tabIcon: {
    width: pxToPt(23),
    height: pxToPt(23),
  },
  badgeView:{
    width:pxToPt(12),
    height:pxToPt(12) ,
    backgroundColor:'#f85959',
    borderWidth:pxToPt(1),
    marginTop:pxToPt(3),
    borderColor:'#FFF',
    borderRadius:pxToPt(8),
  },

});