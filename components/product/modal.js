import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  View
} from 'react-native';

/**
 * 产品弹窗组件
 * 
 * @flow
 */ 
export default class ModalDemo extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      animationType: 'none',
      modalVisible: false,
      transparent: true,
    };
  }
   
  _setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
   }
  
  startShow=()=>{
    alert('开始显示了');
  }
 
  render() {
    let modalBackgroundStyle = {
     backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, .2)' : null,
    };
    return (
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.tarnsparent}
          visible={this.state.modalVisible}
          onRequestClose={() => { this._setModalVisible(false) } }
          onShow={this.startShow}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            
          </View>
        </Modal>
 
        <Text style={{ fontSize: 30,color:'red' }}  onPress={this._setModalVisible.bind(this, true) }>预定火车票</Text>
       </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  
});
 
