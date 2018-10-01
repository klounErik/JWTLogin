import React from 'react'
import {Input, Button, Modal} from 'antd'

export default class Reset extends React.Component{
    state ={
            email: '',
        }

        onSuccess = (status) =>{
            return Modal.success({
                title: status
            },
            this.props.history.push('/login')
            )
            
          }
          onError = (status) =>{
            return Modal.error({
              title: status
            })
          } 
    
    handleSubmit = async (e) =>{
        e.preventDefault()
       const res = await fetch('http://localhost:1234/api/resetpassword',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({email: this.state.email})
        })
        if(res.ok){
            this.onSuccess('Check mail for further instructions')
        }else{
            this.onError('Could not reset password')
        }
    }

    render(){
        return(
            <div className="resetContainer">
                <div className="reset">
                    <div className="resetInput">
                    <h3>Reset Password</h3>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label>E-mail</label>
                        <Input onChange={(e) => this.setState({email: e.target.value})} />
                        <Button htmlType="submit">Submit</Button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}