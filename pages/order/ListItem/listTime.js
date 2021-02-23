import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import {pxToPt} from '../../../utils/styleKits'
export default class listTime extends Component {
    constructor(props) {
        super(props)
        this.state = {
            remain: 0,
        }
        this.time = null
    }
    onFn = () => {
        let { countTime } = this.props
        console.log(countTime,'countTime')
        this.time = setInterval(() => {
            let targetTime = countTime
            const now = Math.round(new Date())
            targetTime = targetTime.substring(0, 19)
            targetTime = targetTime.replace(/-/g, '/')
            const Target = new Date(targetTime).getTime()
            let reduces = Target - now
            if (reduces <= 0) {
                clearInterval(this.time)
                this.setState({
                    remain: 0
                })
                return
            } else {
                reduces -= 1000
                const days = parseInt(reduces / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
                const hours = parseInt(reduces / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
                const minutes = parseInt(reduces / 1000 / 60 % 60, 10);//计算剩余的分钟 
                const seconds = parseInt(reduces / 1000 % 60, 10);//计算剩余的秒数
                const t = `${days}天${hours}时${minutes}分${seconds}秒`
                this.setState({
                    remain: t
                })
            }
        }, 1000)
    }
    componentDidMount() {
        this.onFn()
    }
    componentWillUnmount() {
        clearInterval(this.time)
    }

    render() {
        let { remark } = this.props
        return (
            <>
                <Text style={styles.txt}>{remark}{this.state.remain}</Text>
            </>
        )
    }
}

const styles = StyleSheet.create({
    txt: {
        height: pxToPt(17),
        lineHeight: pxToPt(17),
        fontSize: pxToPt(12),
        color: '#5A5D66'
    },
})