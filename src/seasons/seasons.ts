import three from 'three'
import { ViewSizes } from './sizes'
import { Camera } from './camera'
import { Renderer } from './renderer'
import { Time } from './time'
import { SeasonManager } from './seasonManager'
import { Resources } from './resources'

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
    }
}
