import React, { Component } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView
} from 'react-native'
import { pxToPt } from "../../../utils/styleKits";

/**
 * 联系客服
 */
export default class service extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        <View style={styles.arroWrap}>
          <TouchableOpacity 
          style={{ width:pxToPt(60), height: pxToPt(60), alignItems: 'center', justifyContent: 'center' }} 
          onPress={() => {
            this.props.navigation.navigate('Tabbar')

          }}>
            <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.title}>联系客服</Text>
        </View>
        <View style={styles.container}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                <Text style={styles.time}>昨天 12:00</Text>
                <View style={[styles.box]}>
                  <Image style={styles.img} source={require('../../../assets/icons/ket.png')}></Image>
                  <View style={styles.dialogBox}>
                    <Text style={styles.msg}>您好，请问有什么可以帮您的</Text>
                  </View>
                </View>
                <View style={[styles.box, styles.client]}>
                  <View style={styles.clientBox}>
                    <Text style={[styles.msg, styles.clientMsg]}>没有，谢谢</Text>
                  </View>
                  <Image style={styles.avatar} source={require('../../../assets/icons/tou1.png')}></Image>
                </View>
                <View style={[styles.box]}>
                  <Image style={styles.img} source={require('../../../assets/icons/ket.png')}></Image>
                  <View style={styles.dialogBox}>
                    <Text style={styles.msg}>问点什么吧，不然你进来干啥啊，干啥啊，干啥啊</Text>
                  </View>
                </View>
                <View style={[styles.box, styles.client]}>
                  <View style={styles.clientBox}>
                    <Text style={[styles.msg, styles.clientMsg]}>
                      <Text>"6"</Text>
                      <Image style={styles.voimg} source={require('../../../assets/icons/yuyin4.png')}></Image>
                    </Text>
                  </View>
                  <Image style={styles.avatar} source={require('../../../assets/icons/avatar/tou1.png')}></Image>
                </View>
                <Text style={styles.time}>昨天 12:00</Text>
                <View style={[styles.box]}>
                  <Image style={styles.img} source={require('../../../assets/icons/ket.png')}></Image>
                  <View style={styles.dialogBox}>
                    <Text style={styles.msg}>您好，请问有什么可以帮您的</Text>
                  </View>
                </View>
                <View style={[styles.box, styles.client]}>
                  <View style={styles.clientBox}>
                    <Text style={[styles.msg, styles.clientMsg]}>没有，谢谢</Text>
                  </View>
                  <Image style={styles.avatar} source={require('../../../assets/icons/tou1.png')}></Image>
                </View>
                <Text style={styles.time}>昨天 12:00</Text>
                <View style={[styles.box]}>
                  <Image style={styles.img} source={require('../../../assets/icons/ket.png')}></Image>
                  <View style={styles.dialogBox}>
                    <Text style={styles.msg}>您好，请问有什么可以帮您的</Text>
                  </View>
                </View>
                <View style={[styles.box, styles.client]}>
                  <View style={styles.clientBox}>
                    <Text style={[styles.msg, styles.clientMsg]}>没有，谢谢</Text>
                  </View>
                  <Image style={styles.avatar} source={require('../../../assets/icons/tou1.png')}></Image>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
          <View style={styles.footer}>
            <View style={styles.wrap}>
              <Image source={require('../../../assets/icons/yuyin2.png')}></Image>
              <TouchableOpacity style={styles.btn} ></TouchableOpacity>
              <TouchableOpacity onPress={() => {
                //调用输入法的表情
              }}>
                <Image style={{ width: 26, height: 26 }} source={require('../../../assets/icons/biaoqin.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                //调用相册接口

              }}>
                <Image style={{ width: 26, height: 26 }} source={require('../../../assets/icons/add.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </>
    )
  }
}

const styles = StyleSheet.create({
  arroWrap: {
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  arrow: {
    width: 11.82,
    height: 22,
  },
  title: {
    color: '#2B2D33',
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'PingFang SC',
    marginLeft:100
  },
  container: {
    justifyContent: 'space-between',
    flex: 1
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16
  },
  time: {
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
    height: 16,
    lineHeight: 16,
    fontSize: 11,
    color: '#8D9099'
  },
  box: {
    flexDirection: 'row',
    marginBottom: 28
  },
  img: {
    height: 52,
    width: 52
  },
  dialogBox: {
    marginLeft: 14,
    marginTop: 6,
    width: 230,
  },
  msg: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    borderRadius: 30,
    color: '#2B2D33',
    backgroundColor: '#FFFFFF',
    shadowColor: "#565A66",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 10,
  },
  client: {
    justifyContent: 'flex-end'
  },
  avatar: {
    height: 52,
    width: 52
  },
  clientBox: {
    marginTop: 6,
    marginRight: 14,
    justifyContent: 'center',
    alignContent: 'center'
  },
  clientMsg: {
    backgroundColor: '#3D72E4',
    color: '#FFFFFF',
  },
  voimg: {
    height: 20,
    width: 16,
    borderWidth: 1,
    backgroundColor: 'red',
    marginLeft: 10
  },
  footer: {
    paddingTop: 7,
    paddingBottom: 40,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF'
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  btn: {
    width: 227,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F7'
  }
})
