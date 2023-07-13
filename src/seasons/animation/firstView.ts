import { Seasons } from ".."
import gsap from 'gsap'
import { getVariables } from "../../utils/deviceVariables"
import { simple3Vector } from "../../utils/simple3Vector"
export const firstView = (seasons: Seasons, onComplete: () => void) => {
    const tl = gsap.timeline()

    const room = seasons.world.room

    const camera = seasons.camera

    if (!room) return

    const { roomChildren } = room;
    tl.to(".preloader", {
        onComplete: () => {
            document.querySelector(".preloader")?.classList.add("hidden")
        }
    })
    const { cubeScale, cubeOffset } = getVariables(seasons)

    tl

        .fromTo(roomChildren?.loading_cube.scale, {
            ...simple3Vector(0),
        }, {
            x: cubeScale, y: cubeScale, z: cubeScale, duration: 1,
            ease: "back.out(2.5)",
        }, "show_room").to(roomChildren?.loading_cube.position, {
            z: 1.3 + cubeOffset,
            x: 1.3 + cubeOffset,
            ease: 'power1.out',
            duration: 0.7,
        }, "show_room").to(roomChildren?.loading_cube.rotation, {
            y: - 8 * Math.PI / 4, duration: 1.5
        }, "show_room").to(".intro-text .animatedis", {
            yPercent: -100,
            stagger: 0.05,
            ease: "back.out(1.7)",
        }).from(camera.orthographicCamera.position, {
            y: 10,
        }, "show_room")
        // TODO: show view of operation here
        .to(".scroll-arrow", {
            y: 10,
            opacity: 1,
            onComplete
        })
}