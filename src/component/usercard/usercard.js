import React from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'

class UserCard extends React.Component {
    static propTypes={
        userList:PropTypes.array.isRequired
    }

    render() {
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.props.userList.map(v=>(
                    v.avatar?(<Card key={v._id}>
                        <Card.Header 
                            title={v.user} 
                            thumb={require(`../avatar-selector/avatar/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}>
                        </Card.Header>
                        <Card.Body>
                            {v.type==='mentor'?<div>Company: {v.company}</div>:null}
                            <WhiteSpace></WhiteSpace>
                            {v.desc.split('\n').map(d=>(
                                <div key={d}>{d}</div>
                            ))}
                        </Card.Body>
                    </Card>):null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard