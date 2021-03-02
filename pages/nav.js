import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabbar from "./tabbar";
import Login from './account/login'
import ForgetPass from './account/forgetPass'
import Regiest from './account/regiest'
import Agreement from './account/agreement'
import AddBank from './mine/subPages/addBank'
import Banks from './mine/subPages/banks'
import Order from './mine/subPages/order'
import Paylogs from './mine/subPages/pylogs'
import Service from './mine/subPages/service'
import Setting from './mine/subPages/setting'
import PersonallMsg from './mine/subPages/personallMsg'
import Share from './mine/subPages/share'
import Scan from './mine/scan'
import CameraScan from './home/scan'
import About from './mine/subPages/about'
import SellProduct from './mine/sellProduct'
import Seller from './product/seller/seller'
import ProItem from '../components/product/proItem'
import Buyer from './product/buyer/buyer'
import ArbitrationMsg from './product/arbitrationMsg'
import SubmiArbitration from './product/submiArbitration'
import OrderDetail from './order/orderDetail'
import secondEchart from './home/trendchart/secondEchart';
import { inject, observer } from "mobx-react";
const Stack = createStackNavigator();
@inject("rootStore")
@observer

export default class nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialRouteName: this.props.rootStore.token ? "Tabbar" : "Login"
        }
    }

    render() {
        const { initialRouteName } = this.state;
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
                    <Stack.Screen name="Tabbar" component={Tabbar} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="OrderDetail" component={OrderDetail} />
                    <Stack.Screen name="Regiest" component={Regiest} />
                    <Stack.Screen name="ForgetPass" component={ForgetPass} />
                    <Stack.Screen name="Agreement" component={Agreement} />
                    <Stack.Screen name="AddBank" component={AddBank} />
                    <Stack.Screen name="Banks" component={Banks} />
                    <Stack.Screen name="Order" component={Order} />
                    <Stack.Screen name="Paylogs" component={Paylogs} />
                    <Stack.Screen name="Service" component={Service} />
                    <Stack.Screen name="Setting" component={Setting} />
                    <Stack.Screen name="PersonallMsg" component={PersonallMsg} />
                    <Stack.Screen name="Share" component={Share} />
                    <Stack.Screen name="Scan" component={Scan} />
                    <Stack.Screen name="CameraScan" component={CameraScan} />
                    <Stack.Screen name="SellProduct" component={SellProduct} />
                    <Stack.Screen name="Seller" component={Seller} />
                    <Stack.Screen name="ProItem" component={ProItem} />
                    <Stack.Screen name="Buyer" component={Buyer} />
                    <Stack.Screen name="ArbitrationMsg" component={ArbitrationMsg} />
                    <Stack.Screen name="SubmiArbitration" component={SubmiArbitration} />
                    <Stack.Screen name="About" component={About} />
                    <Stack.Screen name="SecondEchart" component={secondEchart} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}