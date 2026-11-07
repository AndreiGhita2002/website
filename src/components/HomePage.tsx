import "../styles/homePage.css"
import React from "react";

export function HomePage() {
    return (
        <div className='container'>
            <div className="sidebar">
                <div className="face-container">
                    <img src={'face.png'} alt='selfie' className='face'/>
                </div>
                <br/>
                {/*Home*/}
            </div>

            <div className='content'>
                <div className='right'>
                    <h1>Andrei's Page</h1>

                    Aspiring software developer. I am most interested in concurrency and model inference. <br/>

                    Just finished an Integrated Master's in Computing Science at University of Glasgow. <br/>

                    <br/>

                    Interests: inference optimisations, parallelism, graphics programming, language design <br/>

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
                    {/*TODO: update nour's url*/}
                    Nour <a href={"----"}>----</a> <br/>
                    Ben <a href={"https://vyrz.dev"}>vyrz.dev</a> <br/>
                    Luke <a href={"https://lukeormiston.com"}>lukeormiston.com</a> <br/>
                    Mark <a href={"https://marksoftwaredev.com/"}>marksoftwaredev.com/</a> <br/>
                </div>
            </div>
        </div>
    )
}