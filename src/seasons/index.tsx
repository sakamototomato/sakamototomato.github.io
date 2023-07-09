import * as three from 'three'
import { ViewSizes } from './sizes'
import { Camera } from './camera'
import { Renderer } from './renderer'
import { Time } from './time'
import { SeasonManager } from './seasonManager'
import { Resources } from './resources'
import { World } from './world/world'
import { EEvent } from './types/events'
import { FC, useEffect } from 'react'
import './index.scss'
export class Seasons {
    static instance: Seasons
    canvas!: HTMLElement
    scene!: three.Scene
    viewSizes!: ViewSizes
    camera!: Camera
    renderer!: Renderer
    time!: Time
    seasonManager!: SeasonManager
    resources!: Resources
    world!: World
    constructor() {
        if (Seasons.instance) return Seasons.instance

        Seasons.instance = this

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.canvas = document.querySelector('canvas.seasons')!
        this.scene = new three.Scene()
        this.viewSizes = new ViewSizes()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.time = new Time()
        this.seasonManager = new SeasonManager()

        this.resources = new Resources()
        this.world = new World()

        this.time.on(EEvent.time_clock, () => this.update())
        this.viewSizes.on(EEvent.resize, () => this.resize())
    }
    resize() {
        this.camera.resize()
        this.renderer.resize()
        this.world.resize()
    }
    update() {
        this.camera.update()
        this.renderer.update()
        this.world.update()
    }
}

export const SeasonsFC: FC = () => {
    useEffect(() => {
        new Seasons()
    }, [])
    return (
        <>
            <div asscroll-container="asscroll-container">
                <div className="asscroll">
                    <h3 className="intro-text animatedis">
                        关于 Sakamoto Tomato 的一切...
                    </h3>

                    <i className="scroll-arrow"></i>
                    <section className="section first-move">
                        <div className="section__inner">
                            <h2 className="section__title">Name</h2>
                            <p className="section__desc">
                                Sakamoto
                                取自《日常》中的Sakamoto猫先生，房间里面的电脑上显示的是其“主人”东云博士
                                <br />
                                Tomato
                                即西红柿，应该是从电影《小森林》里边儿得来的，因为仅仅出于欢喜，并不是什么很著名的台词和场景，所以这里使用的是“应该”，说到底我也不确定。
                                <br />
                                “西红柿是世界上最好的东西,
                                如果有更好的话，那一定是冰镇西红柿罐头”。
                            </p>
                        </div>
                    </section>

                    <section className="section second-move">
                        <div className="section__inner">
                            <h2 className="section__title">About</h2>
                            <p className="section__desc">
                                页面源于
                                <a href="https://bokoko33.me/">
                                    https://bokoko33.me
                                </a>
                                , 说不上是借鉴，
                                只是简单的模仿，建模部分原有的打算是学习建造其他类型的小场景，并已经在blender完成，可惜短时间学习Blender属实是依葫芦画瓢，在拷贝大量不明所以的Shader过后，项目导出不符合预期了各种各样的问题,暂且放弃重头搭建更为简单的场景（
                                <a href="https://www.bilibili.com/video/BV1KW4y1H7KH/?spm_id_from=333.880.my_history.page.click&vd_source=117e7920b2aa0ef90f83446a1bac7e4f">
                                    AndrewWoan
                                </a>
                                /
                                <a href="https://www.youtube.com/watch?v=rxTb9ys834w&ab_channel=AndrewWoan">
                                    外网
                                </a>
                                ），
                                但由于原场景关于雪景的主题，在改编代码时联想创建四季的主题页面，自然类型命名部分为Seasons
                                而非Expeirence，此外也留下了一些TODO，根据经验人士“不要过早优化”的先进开发理念，
                                这部分内容的更新暂且搁置，优先页面基础内容的完成度。
                            </p>
                        </div>
                    </section>

                    <section className="section third-move">
                        <div className="section__inner">
                            <h2 className="section__title">Contact</h2>
                            <p className="section__desc">
                                如果有什么感兴趣的地方欢迎和我联系:
                                <a type="email">13436274780@163.com</a>
                                <br />&<br />
                                <a href="https://github.com/sakamototomato/sakamototomato.github.io">
                                    Github
                                </a>
                                <br />
                                虽然并非自己的创作，不过我也希望能够制作出这样漂亮的作品。
                            </p>
                        </div>
                    </section>

                    <section className="section fourth-move">
                        <div className="section__inner">
                            <h2 className="section__title">Final</h2>
                            <p className="section__desc">
                                感谢能够看到最后，再见！
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
