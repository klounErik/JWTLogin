import React from 'react'
import {Input, Button} from 'antd'

export default class Reset extends React.Component{
    render(){
        return(
            <div className="resetContainer">
                <div className="reset">
                    <div className="resetInput">
                    <h3>Reset Password</h3>
                    <Input placeholder="E-mail"/>
                    <Button>Submit</Button>
                    </div>
                </div>
            </div>
        )
    }
}