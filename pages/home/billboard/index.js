import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

import basicStyle from '../../../components/styles/basic/index'
import {pxToPt} from '../../../utils/styleKits'

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
          <Image style={styles.logo} source={require('../../../assets/icons/logo/nssLOGO323x.png')}></Image>
          <Text style={styles.name}>NSS</Text>
        </View>
        <Text style={styles.price}>￥:{price}</Text>
        <View style={[styles.percent, basicStyle.flexRow]}>
          {
             percent.status === 0 ?
              (<>
                <Image style={styles.downIcon} source={require('../../../assets/icons/home/decline3x.png')}></Image>
                <Text style={{...styles.addPec,color: 'green'}}>-{percent.result}%</Text>
              </>)
              :
              (<>
                <Image   style={styles.downIcon} source={require('../../../assets/icons/home/goup3x.png')}></Image>
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
    height: pxToPt(44),
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F2F3F7FF',
    borderBottomWidth: 1
  },
  boxlf: {
    alignItems: 'center',
  },
  logo: {
    width:pxToPt(28),
    height:pxToPt(28),
    marginLeft:pxToPt(16)
  },
  name: {
    position: 'absolute',
    marginLeft: pxToPt(48),
    height: pxToPt(25),
    lineHeight: pxToPt(25),
    fontSize: pxToPt(18),
    color: '#3D72E4FF',
    fontWeight:'bold'
  },
  price: {
    marginLeft: pxToPt(56),
    fontSize: pxToPt(18),
    color: '#FE5564FF',
    fontWeight:'700'
  },
  percent: {
    marginLeft: pxToPt(12),
    // marginTop:11,
    alignItems: 'center',
  },
  addPec: {
    marginLeft: pxToPt(3),
    fontSize: pxToPt(11),
  },
  downIcon: {
    marginLeft: pxToPt(3),
    width:pxToPt(10),
    height:pxToPt(10)
  }
})
