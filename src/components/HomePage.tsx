import '../styles/index.css'
import React from "react";

export function HomePage() {
    return (
        <div className='ForeGround'>
            <div className='hero'>
                <div className='top'>
                    <CardColumn className='SideColumn'>
                        <TextCard>
                            <p className='ContactText'>
                                CONTACT INFO: <br/>
                                email <br/>
                                discord <br/>
                                other <br/>
                            </p>
                        </TextCard>
                        <TextCard>
                            <p className='PalsText'>
                                pals
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
