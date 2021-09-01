import React from 'react';
import "./style/about.css";

export default function About() {
    return (
        <div className="about">
            <h2>Welcome.</h2>
            <p className="intro">
                This app is learning project, <br/> 
                Build using <b>React</b> as Frontend, <br/>  
                <b>NodeJs/Express</b> as Backend/API and <br/> 
                <b>MongoDB</b> as Database.
            </p>
            <div className="ports">
                <p>
                    Each tech is used as a service, which is containerized with the help of Docker and is running on different port.
                </p>
                <ul>
                    <h3>Ports</h3>
                    <li>
                        <dl>
                            <dt>80</dt>
                            <dd>React as UI</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>3000</dt>
                            <dd>Nodejs as API</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>27017</dt>
                            <dd>MongoDB as Database</dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <h1>I hope you liked it!</h1>

        </div>
    )
}
