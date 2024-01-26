import '../styles/index.css'
import React from "react";

export function HomePage() {
    return (
        <div className='ForeGround'>
            <div className='EmptySpace'></div>
            <div className='ColumnContainer'>
                <CardColumn className='MainColumn'>
                    <TextCard>
                        <h1 className='TitleText'>
                            ANDREI IULIU GHITA
                        </h1>
                    </TextCard>
                    <TextCard>
                        <p className='MainText'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aspernatur blanditiis distinctio
                            dolores eligendi est fuga illum ipsam modi nulla officiis praesentium quidem repellendus vel voluptas
                            voluptatem voluptates voluptatum! Exercitationem?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aspernatur blanditiis distinctio
                            dolores eligendi est fuga illum ipsam modi nulla officiis praesentium quidem repellendus vel voluptas
                            voluptatem voluptates voluptatum! Exercitationem?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aspernatur blanditiis distinctio
                            dolores eligendi est fuga illum ipsam modi nulla officiis praesentium quidem repellendus vel voluptas
                            voluptatem voluptates voluptatum! Exercitationem?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aspernatur blanditiis distinctio
                            dolores eligendi est fuga illum ipsam modi nulla officiis praesentium quidem repellendus vel voluptas
                            voluptatem voluptates voluptatum! Exercitationem?
                        </p>
                    </TextCard>
                </CardColumn>
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
