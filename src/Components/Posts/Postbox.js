import React, { Component } from 'react'
import {deletePost} from './DeletePost'
import {getPosts} from './GetPosts'
import {Button, Popconfirm, message } from 'antd'

export default class Postbox extends Component {
    state ={
        posts: []
    }

    confirm = (post) =>{
        deletePost(post)
        message.success('Post Successfully deleted')
  
    }

    componentWillMount(){
        getPosts()
        .then(res => this.setState({posts: res}))
    }

    render() {
      const {posts} = this.state
      if(posts.length === undefined){
          return <h1>Loading posts....</h1>
      }
      const liste = posts.map((post, index)=>{
          return(
              <div className="postBox" key={index}>
                <header>
                    <div>
                        <h1>{post.title}</h1>
                        <a href={`/profile/${post.user}`}>
                        <h3>{post.user}</h3>
                        </a>
                    </div>
                </header>
                <hr/>
                <div>
                <article>
                    <span>
                        <p>{post.content}</p>
                    </span>
                </article>
                </div>
                <Popconfirm title="Are you sure？" onConfirm={this.confirm.bind(this, post._id)} okText="Yes" cancelText="No">
                    <Button>Delete</Button>
                </Popconfirm>
              </div>
          )
      })
    return (
      <div className="postContainer">
            {liste}
      </div>
    )
  }
}
