import React from 'react'
import './style/Home.css'


export default class Home extends React.Component{
    render(){
        return(
        <div className="homeWrapper">
            <div className="textContainer">
                <header className="textHeader">
                    <h1>Welcome to JWT Login!</h1>
                    <h3>A Project by Jan Erik Egge</h3>
                </header>
                <div className="textBody">
                    <article>
                        <span>
                            <p><strong>JWT Login</strong> is a page for submitting post on forums and sending PM to other users.
                            I made this to learn about JWT and how to establish a secure way of authenticating users.
                            I also made this because i simply <strong>love</strong> to code!
                            In the progress of doing my backend stuff i stumbled upon a problem. "How do i reset the password?" 
                            After some digging i found this neat library called <a href="https://www.npmjs.com/package/nodemailer">Nodemailer</a>.
                            With this i could send a user an email to with a link that will redirect you to the page where you can set a new password.
                            The project started with JWT, and then after the authenticating was done i wanted to add even more functions to the page.
                            some of these are: Posting messages on forum, and sending messages to other users.
                            </p>
                        </span>
                        </article>
                        <div  className="textFooter">
                        <article>
                            <span>
                                <p>A big thanks to <a href="https://stackoverflow.com/">Stackoverflow</a>, <a href="https://jwt.io/">JWT</a>
                                    <br/>
                                 and <a href="https://ant.design">Antd</a>!</p>
                            </span>
                        </article>
                        </div>
                </div>
            </div>
            
        </div>
        )}
    }