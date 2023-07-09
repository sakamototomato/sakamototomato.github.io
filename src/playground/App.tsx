import { useEffect } from 'react'
import { gsap } from 'gsap'
import './app.scss'

export const mv = {
    isActive: true,
    isMoving: false,
}

const pageScrollFromMv = () => {
    if (mv.isMoving) return
    mv.isMoving = true
    const tl = gsap.timeline()
    tl.to('.mv', {
        y: '-5%',
        duration: 1,
        height: 0,
        opacity: 0,
    }).fromTo(
        '.content',
        { opacity: 0, y: '100vh', height: 'auto' },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'ease.in',
            onComplete: () => {
                mv.isMoving = false
                mv.isActive = false
            },
        }
    )
}

const pageScrollFromContent = () => {
    if (mv.isMoving) return
    mv.isMoving = true
    const tl = gsap.timeline()
    tl.to('.content', {
        y: '100vh',
        opacity: 0,
        height: 0,
        duration: 1,
        ease: 'back.out',
    }).fromTo(
        '.mv',
        { opacity: 0, top: 0, height: '100vh' },
        {
            opacity: 1,
            duration: 1,
            ease: 'back.in',
            onComplete: () => {
                mv.isMoving = false
                mv.isActive = true
            },
        }
    )
}
const handleOnePageScrollKey = (e: React.KeyboardEvent<Element>) => {
    if (e.repeat) return

    const key = e.key
    if (mv.isActive && key === 'ArrowDown') pageScrollFromMv()
    else if (!mv.isActive && key === 'ArrowUp') pageScrollFromContent()
}
const handleWheelPageScroll = (e: WheelEvent) => {
    const delta = e.deltaY
    if (mv.isActive && delta > 0) {
        pageScrollFromMv()
    } else if (!mv.isActive && delta < 0) {
        pageScrollFromContent()
    }
}

let prevTouchY = 0
const touchRatio = 10
const setFirstTouchY = (e: TouchEvent) => {
    prevTouchY = e.touches[0].clientY
}
const handleTouchMovePageScroll = (e: TouchEvent) => {
    const touchY = e.touches[0].clientY
    const delta = touchY - prevTouchY
    if (mv.isActive && delta < -touchRatio) {
        pageScrollFromMv()
    } else if (!mv.isActive && delta > touchRatio) {
        pageScrollFromContent()
    }
    prevTouchY = touchY
}

const initMvContent = () => {
    const observerEl = document.querySelector('.observe-point')
    if (!observerEl) return
    const callback: IntersectionObserverCallback = (_entries) => {
        _entries.forEach((entry) => {
            if (entry.isIntersecting) {
                window.addEventListener('wheel', handleWheelPageScroll)

                // touch
                window.addEventListener('touchstart', setFirstTouchY)
                window.addEventListener('touchmove', handleTouchMovePageScroll)

                window.addEventListener(
                    'keydown',
                    handleOnePageScrollKey as never
                )
            } else {
                window.removeEventListener('wheel', handleWheelPageScroll)
                window.removeEventListener('touchstart', setFirstTouchY)

                window.removeEventListener(
                    'touchmove',
                    handleTouchMovePageScroll
                )

                window.removeEventListener(
                    'keydown',
                    handleOnePageScrollKey as never
                )
            }
        })
    }
    const observer = new IntersectionObserver(callback)
    observer.observe(observerEl)
}
const initMv = () => {
    const mvTimeLine = gsap.timeline({ onComplete: initMvContent })

    mvTimeLine
        .fromTo(
            '.mv-title',
            { opacity: 0 },
            { opacity: 1, ease: 'sine', duration: 1, delay: 1 }
        )
        .fromTo(
            '.mv-sub-title',
            { opacity: 0 },
            { opacity: 1, ease: 'sine', duration: 1 }
        )
}

function App() {
    useEffect(() => {
        initMv()
    }, [])

    return (
        <>
            <canvas className="seasons"></canvas>
            <div className="mv">
                <h1 className="mv-title">Sakamoto Tomato</h1>
                <h3 className="mv-sub-title">...关于坂本西红柿的一切</h3>
            </div>
            <div className="content">
                <div className="observe-point"></div>
            </div>
        </>
    )
}

export default App
