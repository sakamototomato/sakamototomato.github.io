import { EventEmitter } from 'events'
import { Seasons } from '.'
import { convertDivToSpans } from '../utils/convertDivToSpans'
import { firstView } from './animation/firstView'
import { secondView } from './animation/secondView'
import { EEvent } from './types/events'
// import { activateTest } from '../utils/test'
import { getVariables } from '../utils/deviceVariables'
export class PreLoader extends EventEmitter {
    seasons: Seasons
    isIntroDone: boolean | undefined // "Sakamoto Tomato"
    isRoomPageActive: boolean | undefined // after room is shown completely

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
        // activateTest(this.seasons)
    }
    setAssets() {
        const elements = document.querySelectorAll<HTMLElement>(".animated-text");
        convertDivToSpans(elements)
        this.modifyRoomOnMobile()
    }

    loadSecondView() {
        if (!this.isIntroDone) return
        this.isIntroDone = false

        const world = this.seasons.world
        if (!world.room) return
        secondView(this.seasons, () => {
            this.emit(EEvent.is_scroll_active)
            this.isRoomPageActive = true
            this.removeEventListener()
        })

    }

    prepareSecondView(): void | null {
        this.isIntroDone = true
        this.scrollOnceEvent = this.onScroll.bind(this)
        this.touchStart = this.onTouch.bind(this)
        this.touchMove = this.onTouchMove.bind(this)
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    onScroll(e: any) {
        if (e.deltaY > 0) {
            this.loadSecondView();

        }
    }
    onTouchMove(e: any) {
        const currentY = e.touches[0].clientY;
        const differnce = this.initialY - currentY;

        if (differnce > 0) {
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

    modifyRoomOnMobile() {
        if (!this.seasons.world.room) return
        const { room, roomChildren } = this.seasons.world.room
        const { roomScale, cubeScale } = getVariables(this.seasons)
        room?.scale.set(roomScale, roomScale, roomScale)
        roomChildren.loading_cube.scale.set(cubeScale, cubeScale, cubeScale)
    }
}
