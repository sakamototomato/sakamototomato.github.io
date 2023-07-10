import { Seasons } from ".."
import gsap from 'gsap'
export const firstView = (seasons: Seasons, onComplete: () => void) => {
    const { device } = seasons.viewSizes
    const tl = gsap.timeline()

    const room = seasons.world.room

    if (!room) return

    const { roomChildren } = room;
    tl.to(".preloader", {
        delay: 1,
        onComplete: () => {
            document.querySelector(".preloader")?.classList.add("hidden")
        }
    })
    let scale = 1
    if (device === "desktop") {
        scale = 0.5
        tl.to(roomChildren?.loading_cube.scale, {
            x: scale, y: scale, z: scale, duration: 1,
            ease: "back.out(2.5)",
        }).fromTo(roomChildren?.loading_cube.position, {
            x: -2, z: -2
        }, {
            x: -.8, z: -0.8,
            ease: 'power1.out',
            duration: 0.7,
        }, "show").to(roomChildren?.loading_cube.rotation, {
            y: - 4 * Math.PI / 2, duration: 1.5
        }, "show")
    } else {
        scale = 0.2
    }

    tl.to(".intro-text .animatedis", {
        yPercent: -100,
        stagger: 0.05,
        ease: "back.out(1.7)",
    })
        // TODO: show view of operation here
        .to(".scroll-arrow", {
            y: 10,
            opacity: 1,
            onComplete
        })
}