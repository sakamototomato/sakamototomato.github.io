import { Seasons } from ".."
import gsap from "gsap"
import { simple3Vector } from "../../utils/simple3Vector"
import { excludedNames } from "./secondView"

export const scrollPageAnimation = (seasons: Seasons) => {
    const { world, viewSizes } = seasons
    if (!world.room || !world.background) return

    const { room, roomChildren } = world.room
    const camera = seasons.camera.orthographicCamera
    const { circle1, circle2, circle3 } = world.background
    // new animation flow
    const scrollTrigger = {
        markers: false, // for testing locally
        scrub: 0.3,
        invalidateOnRefresh: true,
        start: "top top",
        end: "bottom bottom",
        onselectstart: () => {
            console.log("sss")
        },
        onended: () => {
            console.log("eeeee")
        }
    }

    const mm = gsap.matchMedia()
    mm.add({
        isDesktop: '(min-width: 969px)',
        isMobile: "(max-width: 968px)",
    }, context => {
        const isDesktop = context.conditions?.isDesktop
        const isMobile = context.conditions?.isMobile
        console.log("isMobile", isMobile, context)
        if (isDesktop) {

            // TODO: too manay animation here are needed
        } else if (isMobile) {
            // TODO: too manay animation here are needed

        }

        // All devices
        // Before viewing details
        // const moveStart = gsap.timeline({

        //     scrollTrigger: {
        //         trigger: ".scroll-start",
        //         ...scrollTrigger
        //     }
        // })
        // moveStart.to(room.position, {
        //     x: () => viewSizes.width * 0.5 / 1000,
        // })


        // first section: introduction
        const firstMoveTime = gsap.timeline({
            scrollTrigger: {
                trigger: ".first-move",
                ...scrollTrigger,
            }
        })
        firstMoveTime.add([
            gsap.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,
            }),
            gsap.to(".first-move .section_scrollbar", { y: 0 }),
            gsap.to(".first-move .section__inner", {
                borderBottomRightRadius: '0%',
                borderTopRightRadius: '0%',
            }),
            gsap.to(circle1.scale, {
                ...simple3Vector(5)
            })

        ])


        // second section: fish tank at this moment
        const secondMove = gsap.timeline({
            scrollTrigger: {
                trigger: ".second-move",
                ...scrollTrigger,

            }
        })
        secondMove.add([
            gsap.to(room.position, {
                x: () => -viewSizes.width * 0.6 / 1000,
            }),
            gsap.to(".second-move .section_scrollbar", { y: 0 }),
            gsap.to(".second-move .section__inner", {
                borderTopLeftRadius: '0%',
                borderBottomLeftRadius: '0%',
            }),
            gsap.to(circle2.scale, {
                ...simple3Vector(5)
            }),
            gsap.to(roomChildren.road.scale, {
                ...simple3Vector(1),
            }),
            gsap.to(excludedNames.map((key) => roomChildren[key].scale), {
                ...simple3Vector(1)
            }),
            gsap.to(camera.position, {

            }),
            gsap.fromTo(roomChildren.road.position, {
                z: 0,
            }, {
                z: -6.556597709655762,
            })
        ])



        // third section: Contact
        const thirdMove = gsap.timeline({
            scrollTrigger: {
                trigger: ".third-move",
                ...scrollTrigger
            }
        })
        thirdMove.add([
            gsap.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,
            }),
            gsap.to(".third-move .section_scrollbar", { y: 0 }),
            gsap.to(".third-move .section__inner", {
                borderBottomRightRadius: '0%',
                borderTopRightRadius: '0%',
            }),
            gsap.to(circle3.scale, {
                ...simple3Vector(5)
            }),

        ])


        // fourth section: Final
        const fourthMove = gsap.timeline({
            scrollTrigger: {
                trigger: ".fourth-move",
                ...scrollTrigger,
            }
        })
        fourthMove.add([
            gsap.to(room.position, {
                x: () => -viewSizes.width * 0.6 / 1000,
            }),
            gsap.to(".fourth-move .section_scrollbar", { y: 0 }),
            gsap.to(".fourth-move .section__inner", {
                borderTopLeftRadius: '0%',
            }),
            gsap.to(room.scale, {
                ...simple3Vector(0.15)
            })

        ])

    })

    return mm
}

