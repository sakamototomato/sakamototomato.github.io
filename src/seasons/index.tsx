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
import "./index.scss"
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
    useEffect(()=> {
         new Seasons();
    }, [])
    return  <>
          <div asscroll-container="asscroll-container">

        <div className='asscroll'>
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
  
}