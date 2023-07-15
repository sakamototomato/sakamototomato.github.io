import { Seasons } from ".."
import gsap from 'gsap'
import { simple3Vector } from "../../utils/simple3Vector"


// show below things after an while
export const excludedNames = [
    'road',
    'road_path', 'road_path003', 'road_path002', 'road_path001',
    'road_lamp', 'road_flower_pot',
    'road_flower', "road_flower001", 'road_mail_box'] as string[]

export const secondView = (seasons: Seasons, onComplete: () => void) => {
    const background = seasons.world.background

    if (!seasons.world.room || !background) return
    const { room, roomChildren } = seasons.world.room
    const camera = seasons.camera.orthographicCamera
    const tl = gsap.timeline()

    // part should be shown later
    const roomChildrenKeys = Object.keys(roomChildren).reverse()

    tl.to(".intro-text .animatedis", {
        yPercent: 100,
        stagger: 0.05,
        ease: "back.in(1.7)",
    }, "fadeout")

        .to(".scroll-arrow", {
            opacity: 0,
            y: -10,
            delay: 0.3
        }, "same")
        .to(roomChildren.loading_cube.rotation, {
            y: Math.PI + Math.PI / 4
        }, "same")
        .to(camera.position, {
            y: 2, z: 15,
            duration: 1.5
        }, "same")
        .to(room.position, {
            z: 3, y: 0.05, duration: 1.5
        }, "same")
        .to(background.planeInner.scale, {
            y: 1, duration: 2
        }, "same")
        .to(roomChildren.room.scale, {
            ...simple3Vector(1),
        }, "same")
        .to(roomChildren.loading_cube.scale, {
            x: 0, y: 0, z: 0,
        }, "same")
        .to(roomChildren.table_board.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_table")
        .to(roomChildren.table_drawer.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_table")
        .to(roomChildren.border_leg.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_table")
        .to(roomChildren.monitor_shelf.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_table")
        .to(roomChildren.multiple_drawer.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_table")
        .to(roomChildren.monitor_sceen.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_table").to(roomChildren.rustbin.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_table").to(roomChildren.chiar_leg.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_table")
        .to(roomChildren.tank_base.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_fish_tabk")
        .to(roomChildren.fish_tank.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_fish_tabk")
        .to(roomChildren.fish.scale, {
            ...simple3Vector(1),
            duration: 0.5,
            onComplete: () => seasons.world.room?.setAnimation()
        }, "show_room_fish_tabk")
        .to(roomChildren.chair.rotation, {
            y: 2 * 3 * Math.PI,
            duration: 2.5,
        }, "show_room_chiar")
        .from(roomChildren.chair.position, {
            y: 10,
            duration: 0.5,
        }, "show_room_chiar")
        .to(roomChildren.chair.scale, {
            ...simple3Vector(1),
            duration: 0.5,
        }, "show_room_chiar")


    roomChildrenKeys.forEach(key => {
        if (key == "loading_cube" || excludedNames.includes(key) || roomChildren[key].scale.x == 1) return

        tl.to(roomChildren[key].scale, {
            ...simple3Vector(1),
        }, "show_room_rest_" + "key")
    })




    const animaTexts = document.querySelectorAll(".scroll-start .animatedis")

    tl.fromTo(animaTexts, { yPercent: 0 }, {
        yPercent: -100,
        stagger: 0.07,
        ease: "back.out(1.7)",
        duration: 0.8

    }, "show_text")
        .to(".scroll-arrow", {
            opacity: 1,
            onComplete
        }, "show_text")
}
