import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

import basicStyle from '../../../components/styles/basic/index'


/**
 * 首页顶部
 */


export default class board extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { percent, price } = this.props
    return (
      <View style={[styles.box, basicStyle.flexRow]}>
        <View style={[styles.boxlf, basicStyle.flexRow]}>
          <Image style={styles.logo} source={require('../../../assets/icons/logo/nssLOGO.png')}></Image>
          <Text style={styles.name}>NSS</Text>
        </View>
        <Text style={styles.price}>￥:{price}</Text>
        <View style={[styles.percent, basicStyle.flexRow]}>
          {
             percent.status === 0 ?
              (<>
                <Image style={styles.downIcon} source={require('../../../assets/icons/home/decline.png')}></Image>
                <Text style={{...styles.addPec,color: 'green'}}>-{percent.result}%</Text>
              </>)
              :
              (<>
                <Image source={require('../../../assets/icons/home/up.png')}></Image>
                <Text style={{...styles.addPec,color: '#FE5564FF'}}>+{percent.result}%</Text>
              </>)
          }
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F2F3F7FF',
    borderBottomWidth: 1
  },
  boxlf: {
    marginLeft: 5,
    alignItems: 'center',
  },
  logo: {
    // borderWidth: 1,
  },
  name: {
    position: 'absolute',
    marginLeft: 43,
    height: 25,
    lineHeight: 25,
    fontSize: 18,
    color: '#3D72E4FF',
    fontWeight:'bold'
  },
  price: {
    marginLeft: 44,
    height: 25,
    lineHeight: 25,
    fontSize: 18,
    color: '#FE5564FF',
    fontWeight:'700'
  },
  percent: {
    marginLeft: 12,
    alignItems: 'center',
  },
  addPec: {
    marginLeft: 3,
    height: 16,
    lineHeight: 16,
    fontSize: 11,
  },
  downIcon: {
    marginLeft: 3,
  }
})
