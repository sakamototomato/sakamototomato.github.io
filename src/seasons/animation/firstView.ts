import { Seasons } from ".."
import gsap from 'gsap'
import { getVariables } from "../../utils/deviceVariables"
import { simple3Vector } from "../../utils/simple3Vector"
export const firstView = (seasons: Seasons, onComplete: () => void) => {
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
    const { cubeScale, cubeOffset } = getVariables(seasons)
    tl.fromTo(roomChildren?.loading_cube.scale, {
        ...simple3Vector(0),
    }, {
        x: cubeScale, y: cubeScale, z: cubeScale, duration: 1,
        delay: 0.2,
        ease: "back.out(2.5)",
    }).fromTo(roomChildren?.loading_cube.position, {
        x: -2, z: -2
    }, {
        x: -0.3 + cubeOffset, z: -0.3 + cubeOffset,
        ease: 'power1.out',
        duration: 0.7,
    }, "show").to(roomChildren?.loading_cube.rotation, {
        y: - 4 * Math.PI / 2, duration: 1.5
    }, "show").to(".intro-text .animatedis", {
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