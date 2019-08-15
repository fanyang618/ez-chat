import React from 'react'
import PropTypes from 'prop-types'
import { Grid,List } from 'antd-mobile';

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
            .split(',').map(v=>({
                icon:require(`./avatar/${v}.png`),
                text:v
            }))
        const gridHeader = this.state.text?(<div>
                                                <span>Selected Avatar</span>
                                                <img style={{width:25}} src={this.state.icon} alt=""/>
                                            </div>)
                                            :<div>Please Select an Avatar</div>
        return(
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid columnNum={5} 
                        data={avatarList} 
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}>
                    </Grid>
                </List>
            </div>
        )
    }
}

export default AvatarSelector