import { EventEmitter } from 'events'
import { EEvent } from './types/events'

export class Time extends EventEmitter {
    start: number
    current: number
    elapsed: number
    delta: number
    constructor() {
        super()
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        this.update()
    }
    update() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = currentTime - this.start
        this.emit(EEvent.time_clock)
        window.requestAnimationFrame(() => this.update())
    }
}
