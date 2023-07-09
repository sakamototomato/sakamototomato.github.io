import './loader.scss'
import { FC } from 'react'
export const Loader: FC = () => {
    return (
        <div className="preloader">
            <div className="preloader-wrapper">
                <div className="loading">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    )
}
