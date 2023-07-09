import { Seasons } from ".."
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"
import gsap from 'gsap'
export const secondView = (seasons: Seasons) => {
    if (!seasons.world.room) return
    const { room, roomChildren } = seasons.world.room
    const { camera } = seasons
    const tl = gsap.timeline()
    const mm = gsap.matchMedia()


    const gui = new GUI()

    gui.add(camera.orthographicCamera.position, "y", -100, 1001)

    gui.add(camera.orthographicCamera.position, "x", -100, 1001)
    gui.add(camera.orthographicCamera.position, "z", -100, 100)
    gui.add(room.rotation, "x", -10, 10)

    tl.to(".intro-text .animatedis", {
        yPercent: 100,
        stagger: 0.05,
        ease: "back.in(1.7)",
    }, "fadeout")

        .to(".scroll-arrow", {
            opacity: 0,
            y: -10
        })
        .to(roomChildren.loading_cube.rotation, {
            y: Math.PI + Math.PI / 4
        }, "same")
        .to(room.position, {
            z: 0.5, y: 0.3
        }, "same")
        .to(room.rotation, {
            x: - 2 * Math.PI / 7
        }, "same")
        .to(roomChildren.room.scale, {
            x: 0.8, y: 0.8, z: 0.8
        }, "same")
        .to(roomChildren.loading_cube.scale, {
            x: 0, y: 0, z: 0,
        }, "show_room")

    // part should be shown later
    const excludedNames = ['road_flower001', 'road_flower', 'road_path', 'road_path003', 'road_path002', 'road_path001', 'road_lamp001', 'road', 'road_flower_pot', 'road_mail_box']
    mm.add('(min-width: 969px)', () => {
        const roomChildrenKeys = Object.keys(roomChildren).reverse()
        for (const key of roomChildrenKeys) {
            console.log("key", key)

            if (key == "loading_cube" || excludedNames.includes(key)) continue
            // const scale = 1
            // tl.to(roomChildren[key].scale, {
            //     x: scale,
            //     y: scale,
            //     z: scale,
            //     ease: 'power1.out',
            // }, "same")
            //     .to(roomChildren.loading_cube?.rotation, {
            //         y: 2 * Math.PI + 3 * Math.PI / 4
            //     })
        }
    })
}