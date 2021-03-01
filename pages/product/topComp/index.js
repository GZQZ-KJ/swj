import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  StyleSheet,
  Platform
} from 'react-native'
import { pxToPt } from "../../../utils/styleKits";

export default class top extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true
    }
  }

  _isFiltrate = () => {
    if (this.props.showState) {
      this.props.showState(this.state.active ? 'true' : 'false')
    } else {
      this.props.modalState(this.state.active ? 'true' : 'false')
    }
  }
  _getSort = () => {
    if (this.props.showState) {
      this.props.showState(this.state.active ? 0 : 1)
    } else {
      this.props.modalState(this.state.active ? 0 : 1)
    }
  }
  render() {
    return (
      <View style={[styles.header,Platform.OS === 'ios' ? styles.headerTwo : null]}>
        <TouchableNativeFeedback onPress={() => this._isFiltrate()}>
          <View style={styles.item}>
            <Text style={styles.title, [this.props.flag ? { color: '#3D72E4',fontSize:15,fontWeight:'700' } : { color: '#2B2D33' }]}>价格筛选</Text>
            <Image style={styles.topIcon} source={this.props.flag ? require('../../../assets/icons/arrows/pro-sx.png') : require('../../../assets/icons/arrows/pros.png')}></Image>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => this._getSort()}>
          <View style={styles.item}>
            <Text  style={styles.title, [this.props.show || this.props.flag ? { color: '#2B2D33' } : { color: '#3D72E4',fontSize:15,fontWeight:'700' }]}>排序</Text>
            <Image style={styles.topIcon} source={this.props.show || this.props.flag ? require('../../../assets/icons/pro/propaxu.png') : require('../../../assets/icons/pro/proc.png')}></Image>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: pxToPt(44),
    backgroundColor: '#FFFFFF',
  },
  headerTwo:{
    marginTop:pxToPt(44)
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    height: pxToPt(21),
    fontSize: pxToPt(15),
    // color: '#2B2D33'
  },
  topIcon: {
    marginLeft: pxToPt(4)
  },
})
