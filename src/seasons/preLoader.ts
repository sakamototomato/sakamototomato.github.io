import { EventEmitter } from 'events'
import { Seasons } from '.'
import { convertDivToSpans } from '../utils/convertDivToSpans'
import { firstView } from './animation/firstView'
import { secondView } from './animation/secondView'
import { EEvent } from './types/events'
export class PreLoader extends EventEmitter {
    seasons: Seasons
    nextFlag: boolean | undefined

    // below are related to element events, I don't care too much about their types
    // see https://codepen.io/walkmind/pen/MWqrrdz to test page scroll
    scrollOnceEvent: any
    touchStart: any
    touchMove: any
    initialY: any
    constructor() {
        super()
        this.seasons = new Seasons()
        this.setAssets()
        firstView(this.seasons, () => this.prepareSecondView())
    }
    setAssets() {
        const elements = document.querySelectorAll<HTMLElement>(".animated-text");
        convertDivToSpans(elements)
    }

    loadSecondView() {
        if (!this.nextFlag) return
        this.nextFlag = false

        const world = this.seasons.world
        if (!world.room) return
        secondView(this.seasons, () => this.emit(EEvent.is_scroll_active))

    }

    prepareSecondView(): void | null {
        this.nextFlag = true
        this.scrollOnceEvent = this.onScroll.bind(this)
        this.touchStart = this.onTouch.bind(this)
        this.touchMove = this.onTouchMove.bind(this)
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    onScroll(e: any) {
        if (e.deltaY > 0) {

            this.removeEventListener();

            this.loadSecondView();

        }
    }
    onTouchMove(e: any) {
        const currentY = e.touches[0].clientY;
        const differnce = this.initialY - currentY;
        if (differnce > 0) {
            this.removeEventListener();
            this.loadSecondView();
        }
        this.initialY = null;
    }
    onTouch(e: any) {
        this.initialY = e.touches[0].clientY;
    }
    removeEventListener() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }
}
