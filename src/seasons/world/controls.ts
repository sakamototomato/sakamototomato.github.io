import { Seasons } from '..'
import ASScroll from '@ashthornton/asscroll'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Object3D } from "three"
import { scrollPageAnimation } from '../animation/scrollPageAnimation';
export class Controls {
    asscroll?: ASScroll
    seasons: Seasons
    lampLight?: Object3D;
    constructor() {
        this.seasons = new Seasons()

        // 向 GSAP 内核注册插件可确保两者无缝协作，还可以防止构建工具/捆绑器中的树抖动问题。您只需注册一次插件即可使用
        gsap.registerPlugin(ScrollTrigger)
        // FIXME: Do not know why mobile has such issues
        if (this.seasons.viewSizes.device === "mobile") {
            document.querySelector("html")!.style.overflow = "visible"

        }
        document.querySelector("body")!.style.overflow = "visible"
        this.asscroll = this.setSmoothScroll()
        scrollPageAnimation(this.seasons)
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
                if (arguments.length) {
                    asscroll.currentPos = value || 0
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
            pinType: "fixed"
        })

        asscroll.on('update', ScrollTrigger.update)
        ScrollTrigger.addEventListener('refresh', asscroll.resize)


        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(".asscroll")
            });


        })
        return asscroll
    }

}
