import { Seasons } from '..'
import ASScroll from '@ashthornton/asscroll'

export class Controls {
    asscroll?: ASScroll
    seasons: Seasons
    constructor() {
        this.seasons = new Seasons()
        const {world} = this.seasons
        
        world.room?.room.children?.forEach((child) => {
            console.log('controls-child', child)
        })

        // 向 GSAP 内核注册插件可确保两者无缝协作，还可以防止构建工具/捆绑器中的树抖动问题。您只需注册一次插件即可使用
        gsap.registerPlugin(ScrollTrigger)
        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            this.asscroll = this.setSmoothScroll()
        }
        this.setScrollTrigger()
    }
    setScrollTrigger() {
        const {world, viewSizes} = this.seasons

        const room = world.room?.room
        if (!room || !world.background) return
        const { circle1, circle2 } = world.background

        // new animation flow
        const scrollTrigger = {
            markers: false,
            scrub: 0.5,
            invalidateOnRefresh: true,
        }
        const tl = gsap.timeline()
        const mm = gsap.matchMedia()

        mm.add('(min-width: 969px)', () => {
            tl.to(room.position, {
                x: () => viewSizes.width * 0.0013,
                duration: 1,
                scrollTrigger: {
                    trigger: '.first-move',
                    start: 'top top',
                    end: 'bottom bottom',
                    ...scrollTrigger,
                },
            })
                // circle 1
                .to(circle1.scale, {
                    x: 10,
                    y: 10,
                    z: 10,
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        ...scrollTrigger,
                    },
                })

            tl.to(room.scale, {
                x: 0.4,
                y: 0.4,
                z: 0.4,
                duration: 1,
                scrollTrigger: {
                    trigger: '.second-move',
                    start: 'top top',
                    end: 'bottom bottom',
                    ...scrollTrigger,
                },
            }).to(circle2.scale, {
                x: 10,
                y: 10,
                z: 10,
                duration: 1,
                scrollTrigger: {
                    trigger: '.second-move',
                    start: 'top top',
                    end: 'bottom bottom',
                    ...scrollTrigger,
                },
            })
            // TODO: too manay animation here are needed
        })
    }
    setSmoothScroll() {
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        })
        gsap.ticker.add(asscroll.update)
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        })

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length && value) {
                    asscroll.currentPos = value
                    return
                }
                return asscroll.currentPos
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                }
            },
            fixedMarkers: true,
        })
        asscroll.on('update', ScrollTrigger.update)
        ScrollTrigger.addEventListener('refresh', asscroll.resize)

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    '.gsap-marker-start, .gsap-marker-end, [asscroll]'
                ),
            })
        })
        return asscroll
    }
}
