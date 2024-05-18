import '../styles/homePage.css'
import React from "react";

export function HomePage() {
    return (
        <div className='ForeGround'>
            <div className='hero'>
                <div className='top'>
                    <CardColumn className='SideColumn'>
                        <TextCard>
                            <p className='ContactText'>
                                CONTACT: <br/>
                                andrei.ghita2002@gmail.com <br/>
                                <a href={"https://github.com/AndreiGhita2002"}>github.com/AndreiGhita2002</a> <br/>
                            </p>
                        </TextCard>
                        <TextCard>
                            <p className='PalsText'>
                                Fraser <a href={"https://frasermiller.dev"}>frasermiller.dev</a> <br/>
                                Nour <a href={"https://nourl.dev"}>nourl.dev</a> <br/>
                                Ben <a href={"https://vyrz.dev"}>vyrz.dev</a> <br/>
                                Luke <a href={"https://lukeormiston.com"}>lukeormiston.com</a> <br/>
                            </p>
                        </TextCard>
                    </CardColumn>
                </div>
                <div className='bottom'>
                    <TextCard>
                        <h1 className='TitleText'>
                            ANDREI IULIU GHITA
                        </h1>
                    </TextCard>
                </div>
            </div>
            <div className="content">
                <TextCard>
                    <p className='MainText'>
                        hi <br/>
                        i'm a 3rd year compsci student. <br/>
                        i like graphics programming, data science, and (sometimes) web development. <br/>
                    </p>
                </TextCard>
            </div>
        </div>
    )
}


interface CardColumnProps {
    children?: React.ReactNode,
    className?: string,
}

export function CardColumn({children, className}: CardColumnProps) {
    let cn = 'CardColumn'
    if (className) {
        cn += ' ' + className
    }
    return(
        <div className={cn}>
            {children}
        </div>
    )
}


interface TextCardProps {
    children?: React.ReactNode
}

export function TextCard({children}: TextCardProps) {
    return (
        <div className='TextCard'>
            {children}
        </div>
    )
}
