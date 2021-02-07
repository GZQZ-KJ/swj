import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Modal
} from 'react-native'
let time = null
export default class myTeaset extends Component {
    static defaultProps = {
        font: '',
        duration: 1000,
    }
    constructor(props) {
        super(props)
        this.state = {
            font: this.props.font,
            duration: this.props.duration,
            show: false,
        }
    }

    getDuration = () => {
        let { duration } = this.state
        this.time = setTimeout(() => {
            this.setState({
                font: ''
            })
        }, duration)
    }
    componentDidMount() {
        this.getDuration()
    }

    render() {
        return (
            <Modal visible={this.state.font !== ''} transparent={true} animationType={'slide'}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ width: 319, height: 80, backgroundColor: '#2B2D33', borderRadius: 24, marginTop: 193, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}></Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({

})
