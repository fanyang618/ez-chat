import React from'react'
import axios from 'axios'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'

class Mentee extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        axios.get('/user/list?type=mentor').then(res=>{
            if (res.data.code==0) {
                this.setState({data:res.data.data})
            }
        })
    }

    render() {
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.state.data.map(v=>(
                    v.avatar?(<Card key={v._id}>
                        <Card.Header 
                        title={v.user} 
                        thumb={require(`../avatar-selector/avatar/${v.avatar}.png`)}
                        extra={<span>{v.title}</span>}
                        ></Card.Header>
                        <Card.Body>
                            {v.desc.split('\n').map(v=>(
                                <div key={v}>{v}</div>
                            ))}
                        </Card.Body>
                    </Card>):null
                ))}
            </WingBlank>
        )
    }
}

export default Mentee