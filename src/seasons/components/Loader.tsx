import { FC } from 'react'
import './loader.scss'
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
