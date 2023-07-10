import { Seasons } from '..'
import ASScroll from '@ashthornton/asscroll'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Object3D } from "three"
export class Controls {
    asscroll?: ASScroll
    seasons: Seasons
    lampLight?: Object3D;
    constructor() {
        this.seasons = new Seasons()
        const { world } = this.seasons

        world.room?.room.children?.forEach((child) => {
            if (child.name === "lamp_light") {
                this.lampLight = child
            }
        })

        // 向 GSAP 内核注册插件可确保两者无缝协作，还可以防止构建工具/捆绑器中的树抖动问题。您只需注册一次插件即可使用
        gsap.registerPlugin(ScrollTrigger)


        document.querySelector("body")!.style.overflow = "visible"

        this.asscroll = this.setSmoothScroll()

        this.setScrollTrigger()
    }
    setScrollTrigger() {
        const { world, viewSizes } = this.seasons

        const room = world.room?.room
        if (!room || !world.background) return
        // const { circle1, circle2 } = world.background

        // new animation flow
        const scrollTrigger = {
            markers: false,
            scrub: 0.5,
            invalidateOnRefresh: true,
        }
        const mm = gsap.matchMedia()

        mm.add('(min-width: 969px)', () => {

            const moveStart = gsap.timeline({
                scrollTrigger: {
                    trigger: ".scroll-start",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            moveStart.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,
                duration: 1,
            })
            const firstMoveTime = gsap.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            firstMoveTime.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,

            })
            const secondMove = gsap.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            secondMove.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,

            })


            // TODO: too manay animation here are needed
        })
    }
    setSmoothScroll() {
        const asscroll = new ASScroll({
            ease: 0.19,
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
                    '.gsap-marker-start, .gsap-marker-end, .asscroll'
                ),
            })
        })
        return asscroll
    }
}
