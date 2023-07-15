import { FC, useCallback } from 'react'
import { Seasons } from '..'
import './sunAndMoon.scss'
interface IProps {
    seasons: Seasons
}
export const SunAndMoon: FC<IProps> = ({ seasons }) => {
    const toggle = useCallback(() => {
        seasons.world.environment?.toggle()
        document.querySelector('.sun-and-moon')?.classList.toggle('sun')
        document.querySelector('.sun-and-moon')?.classList.toggle('moon')
    }, [seasons])
    return (
        <div className="sun-and-moon sun" onClick={toggle}>
            <i className="icon"></i>
        </div>
    )
}
