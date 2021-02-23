import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper'

/**
 * 首页轮播图
 */
const banner = () => {
  return (
    <View style={styles.box}>
      <Swiper
        autoplay={true}
        style={styles.swiper}
        height={126}
        horizontal={true}
        paginationStyle={{ bottom: 10 }}
        showsButtons={false}
        dot={<View style={{           //未选中的圆点样式 
          backgroundColor: '#fff',
          width: 16,
          height: 2,
          borderRadius: 1,
          marginLeft: 3,
          marginRight: 3,
        }} />}
        activeDot={<View style={{    //选中的圆点样式
          backgroundColor: '#3D72E4',
          width: 16,
          height: 2,
          borderRadius: 1,
          marginLeft: 3,
          marginRight: 3,
        }} />}
      >
        <View style={styles.slide1}>
        <Text style={styles.text}>朝风</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>冷秋</Text>
        </View>
      </Swiper>
    </View>
  )
}
const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 13,
    marginRight: 13,
    height: 126,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  // swiper: {
  //   backgroundColor: 'red',
  // },

})
export default banner