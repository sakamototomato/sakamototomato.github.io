import { EventEmitter } from 'events'
import { EEvent } from './types/events'

export class ViewSizes extends EventEmitter {
    frustumSize: number
    width: number
    height: number
    aspectRatio: number
    pixelRatio: number
    device: "mobile" | "desktop"
    constructor() {
        super()
        this.frustumSize = 5
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.aspectRatio = this.width / this.height
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        if (this.width < 969) {
            this.device = "mobile"
        } else {
            this.device = "desktop"
        }

        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.aspectRatio = this.width / this.height
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.emit(EEvent.resize)
        })
    }
}
