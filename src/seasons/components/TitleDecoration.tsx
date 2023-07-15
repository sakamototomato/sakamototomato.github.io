import { FC, ReactNode } from 'react'
import './titleDecoration.scss'
interface IProps {
    title: ReactNode
}
export const TitleDecoration: FC<IProps> = (props) => {
    return (
        <div className="title-decoration">
            <i className="frame"></i>
            <h2 className="section__title"> {props?.title}</h2>
        </div>
    )
}
