import { Seasons } from '../seasons'
import { EEvent } from '../types/events'
import { Environment } from './environment'

export class World extends Seasons {
    environment?: Environment
    constructor() {
        super()
        this.resources.on(EEvent.all_resources_loaded, () => {
            this.environment = new Environment()
        })
    }
}
