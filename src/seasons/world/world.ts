import { PreLoader } from '../preLoader'
import { Seasons } from '..'
import { EEvent } from '../types/events'
import { Background } from './background'
import { Controls } from './controls'
import { Environment } from './environment'
import { Room } from './room'

export class World {
    environment?: Environment
    room?: Room
    background?: Background
    controls?: Controls
    preLoader?: PreLoader
    seasons: Seasons
    constructor() {
        this.seasons = new Seasons()

        const {resources} = this.seasons

        resources.on(EEvent.all_resources_loaded, () => {
            this.environment = new Environment()
            this.room = new Room()
            this.background = new Background()

            this.controls = new Controls()
            this.preLoader = new PreLoader()
        })

    }
    resize() {
        // TODO: resize
    }
    update() {
      this.room?.update(); 
    }
}
