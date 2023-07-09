import { FC } from 'react'

export const SeasonsFC: FC = () => {
    return (
        <>
            <div asscroll-container="asscroll-container">
                <div className="asscroll">
                    <section className="section first-move">
                        <div className="section__inner">
                            <h2 className="section__title">Spring</h2>
                            <p className="section__desc">春雨贵如油</p>
                        </div>
                    </section>

                    <section className="section second-move">
                        <div className="section__inner">
                            <h2 className="section__title">Summer</h2>
                            <p className="section__desc">映日荷花别样红</p>
                        </div>
                    </section>

                    <section className="section third-move">
                        <div className="section__inner">
                            <h2 className="section__title">秋</h2>
                            <p className="section__desc">霜叶红于二月花</p>
                        </div>
                    </section>

                    <section className="section fourth-move">
                        <div className="section__inner">
                            <h2 className="section__title">冬</h2>
                            <p className="section__desc">风雪夜归人</p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
