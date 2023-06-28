import { useEffect } from 'react'
import { gsap } from 'gsap'
import './app.scss'

const mv = {
    isActive: true,
    isMoving: false,
}

const pageScrollFromMv = () => {
    if (mv.isMoving) return
    mv.isMoving = true
    const tl = gsap.timeline()
    tl.to('.mv', {
        y: '-5%',
        duration: 0.95,
        opacity: 0,
    })
        .to('.mv', {
            height: 0,
            duration: 0.05,
            ease: 'power3.out',
        })
        .to('.content', {
            height: '100vh',
            duration: 2,
            ease: 'power3.in',
            onComplete: () => {
                mv.isMoving = false
                mv.isActive = false
            },
        })
}

const pageScrollFromContent = () => {
    if (mv.isMoving) return
    mv.isMoving = true
    const tl = gsap.timeline()
    tl.to('.content', {
        height: 0,
        duration: 1,
        ease: 'back.out',
    }).fromTo(
        '.mv',
        {
            height: '100vh',
            opacity: 0,
            duration: 0.05,
        },
        {
            opacity: 1,
            duration: 0.95,
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
                    handleOnePageScrollKey as any
                )
            } else {
                window.removeEventListener('wheel', handleWheelPageScroll)
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
            <div className="mv">
                <h1 className="mv-title">Saka Tomato</h1>
                <h3 className="mv-sub-title">...关于坂本西红柿的一切</h3>
            </div>
            <div className="content">
                <div className="observe-point"></div>
                <section className="section">
                    <div className="section__inner">
                        <h2 className="section__title">見出し1</h2>
                        <p className="section__desc">
                            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
                        </p>{' '}
                    </div>
                </section>
                <section className="section">
                    <div className="section__inner">
                        <h2 className="section__title">見出し2</h2>
                        <p className="section__desc">
                            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
                        </p>
                    </div>
                </section>
                <section className="section">
                    <div className="section__inner">
                        <h2 className="section__title">見出し3</h2>
                        <p className="section__desc">
                            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
                        </p>
                    </div>
                </section>
                <section className="section">
                    <div className="section__inner">
                        <h2 className="section__title">見出し4</h2>
                        <p className="section__desc">
                            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default App
