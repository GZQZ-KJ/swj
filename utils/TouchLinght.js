import React, { Component } from 'react'
import {
   View,
   Text
} from 'react-native'
export default class TouchLinght extends Component {
    render() {
        return (
            <View style={{zIndex:100}}>
                <Text style={{color:'#fff',fontWeight:'500',fontSize:15}}>{this.props.touchTex}</Text>
            </View>
        )
    }
}
