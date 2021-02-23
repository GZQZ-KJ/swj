/**
 * 主页面
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { pxToPt } from "../utils/styleKits";

import TabNavigator from 'react-native-tab-navigator';
import HomePage from './home/homePage';
import ProductPage from './product/productPage';
import OrderPage from './order/orderPage';
import MinePage from './mine/minePage';
import images from '../utils/icon';

const dataSource = [
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
var navigation = null;

export default class tabbar extends Component {
  constructor(props) {
    super(props);
    navigation = this.props.navigation;
    this.state = {
      selectedTab: 'Home'
    };
  }
  render() {
    let tabViews = dataSource.map((item, i) => {
      return (
        <TabNavigator.Item
          title={item.tabName}
          selected={this.state.selectedTab === item.tabPage}
          titleStyle={{ color: '#979797' }}
          selectedTitleStyle={{ color: '#3D72E4' }}
          renderIcon={() => <Image style={styles.tabIcon} source={item.icon} />}
          renderSelectedIcon={() => <Image style={styles.tabIcon} source={item.selectedIcon} />}
          tabStyle={{ alignSelf: 'center' }}
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
    backgroundColor: '#F8F9FA',
  },

  tabIcon: {
    width: pxToPt(23),
    height: pxToPt(23),
  }
});