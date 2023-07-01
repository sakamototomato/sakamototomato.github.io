import { EventEmitter } from 'events'
import { Seasons } from './seasons'

export class PreLoader extends EventEmitter {
    seasons: Seasons
    constructor() {
        super()
        this.seasons = new Seasons()
        this.load()
    }
    load() {
        const tl = gsap.timeline()
        const mm = gsap.matchMedia()

        const room = this.seasons.world.room
        if (!room) return
        room.room.children.forEach((child) => {
            if (child.name === 'cube') {
                mm.add('(min-width: 969px)', () => {
                    tl.to(child.position, {
                        x: 0.6576335430145264,
                        y: 1.3361244201660156,
                        z: -18.75898551940918,
                        duration: 0.8,
                    })
                        .to(
                            child.scale,
                            {
                                x: 1,
                                y: 1,
                                z: 1,
                            },
                            0
                        )
                        .to(
                            child.scale,
                            {
                                x: 0,
                                y: 0,
                                z: 0,
                            },
                            0
                        ) // 这里的 0 表示同时开始
                        .eventCallback('onComplete', this.homeLoading)
                })
            }
        })
    }
    homeLoading() {
        const world = this.seasons.world
        const room = world.room
        if (!room) return

        const tl = gsap.timeline()
        const mm = gsap.matchMedia()

        const excludedNames = ['xxx'] //TODO: show them later
        mm.add('(min-width: 969px)', () => {
            const roomChildrenKeys = Object.keys(room.roomChildren).reverse()
            for (const key of roomChildrenKeys) {
                if (excludedNames.includes(key)) continue
                tl.to(room.roomChildren[key].scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.25,
                })
            }
        })
    }
}
