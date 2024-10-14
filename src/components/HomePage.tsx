import "../styles/homePage.css"
import React from "react";

export function HomePage() {
    return (
        <div className='centre'>
            <img src='/face.jpeg' alt='selfie' className='face'/>
            <div className='content'>
                <div className='left'>
                    <h1>Andrei's Page</h1>

                    I like programming. <br/>

                    4th year university student at University of Glasgow <br/>

                    <br/>

                    Interests: graphics programming, data science, networks <br/>

                    <br/>

                    I also like history, cooking, biking and hiking. <br/>
                </div>
                <div className='right'>
                    <h3>Contact:</h3>
                    andrei.ghita2002@gmail.com <br/>
                    <a href={"https://github.com/AndreiGhita2002"}>github</a> <br/>
                    <a href={"https://www.linkedin.com/in/andrei-iuliu-ghita-dev/"}>linkedin</a>

                    <h3>Pals:</h3>
                    Fraser <a href={"https://frasermiller.dev"}>frasermiller.dev</a> <br/>
                    Nour <a href={"https://nourl.dev"}>nourl.dev</a> <br/>
                    Ben <a href={"https://vyrz.dev"}>vyrz.dev</a> <br/>
                    Luke <a href={"https://lukeormiston.com"}>lukeormiston.com</a> <br/>
                    Mark <a href={"https://marksoftwaredev.com/"}>marksoftwaredev.com/</a> <br/>
                </div>
            </div>
        </div>
    )
}