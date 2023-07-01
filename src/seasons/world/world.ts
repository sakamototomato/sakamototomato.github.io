import { PreLoader } from '../preLoader'
import { Seasons } from '../seasons'
import { EEvent } from '../types/events'
import { Background } from './background'
import { Controls } from './controls'
import { Environment } from './environment'
import { Room } from './room'

export class World extends Seasons {
    environment?: Environment
    room?: Room
    background?: Background
    controls?: Controls
    preLoader?: PreLoader
    constructor() {
        super()
        this.resources.on(EEvent.all_resources_loaded, () => {
            this.environment = new Environment()
            this.room = new Room()
            this.background = new Background()

            this.controls = new Controls()
            this.preLoader = new PreLoader()
        })
    }
}
