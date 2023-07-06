import { EventEmitter } from 'events'
import { Seasons } from '.'
import { gsap } from 'gsap'
import * as three from "three"
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
        const axes = new three.AxesHelper(300)
        this.seasons.scene.add(axes)
        if (!room) return

        room.room.children.forEach((child) => {
            if (child.name === 'loading_cube') {
                mm.add('(min-width: 969px)', () => {

                    const oringinScale = 10 * 3
                    const targetScale = 1

                    tl
                        .to(
                            child.scale,
                            {
                                x: oringinScale,
                                y: oringinScale,
                                z: oringinScale,
                                duration: 0.5,
                                yoyoEase: true
                            },
                        )
                        .to(
                            child.scale,
                            {
                                x: targetScale,
                                y: targetScale,
                                z: targetScale,
                            },
                        )
                        .eventCallback('onComplete', () => this.homeLoading())
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

        // part should be shown later
        const excludedNames = ['road_flower001', 'road_flower', 'road_path', 'road_path003', 'road_path002', 'road_path001', 'road_lamp001', 'road', 'road_flower_pot', 'road_mail_box']
        mm.add('(min-width: 969px)', () => {
            const roomChildrenKeys = Object.keys(room.roomChildren).reverse()
            for (const key of roomChildrenKeys) {
                if (excludedNames.includes(key)) continue
                const scale = 2
                tl.to(room.roomChildren[key].scale, {
                    x: scale,
                    y: scale,
                    z: scale,
                    duration: 0.35,
                })
            }
        })
    }
}
