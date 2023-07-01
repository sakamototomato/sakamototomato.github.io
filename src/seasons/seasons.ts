import three from 'three'
import { ViewSizes } from './sizes'
import { Camera } from './camera'
import { Renderer } from './renderer'
import { Time } from './time'
import { SeasonManager } from './seasonManager'
import { Resources } from './resources'
import { World } from './world/world'
import { EEvent } from './types/events'

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

        this.time.on(EEvent.update, this.update)
        this.time.on(EEvent.resize, this.resize)
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
