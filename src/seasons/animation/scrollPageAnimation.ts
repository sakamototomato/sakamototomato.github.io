import { Seasons } from ".."
import gsap from "gsap"
import { simple3Vector } from "../../utils/simple3Vector"
import { excludedNames } from "./secondView"

export const scrollPageAnimation = (seasons: Seasons) => {
    const { world, viewSizes } = seasons
    if (!world.room || !world.background) return

    const { room, roomChildren } = world.room
    // const camera = seasons.camera.orthographicCamera
    const { circle1, circle2, circle3 } = world.background
    // new animation flow
    const scrollTrigger = {
        markers: false, // for testing locally
        scrub: 1.2,
        invalidateOnRefresh: true,
        start: "top bottom",
        end: "bottom top"
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
        let stepName = ""
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
        stepName = "first-move"
        const firstMoveTime = gsap.timeline({
            scrollTrigger: {
                trigger: ".first-move",

                ...scrollTrigger
            }
        })
        firstMoveTime.to(room.position, {
            x: () => viewSizes.width * 0.5 / 1000,
        }, stepName)
            .to(".first-move .section_scrollbar", { y: 0 }, stepName)
            .fromTo(".first-move .section__inner", {
                borderTopRightRadius: '50%',
                borderBottomRightRadius: '50%',
            }, {
                borderBottomRightRadius: '0%',
                borderTopRightRadius: '0%',
            }, stepName).to(circle1.scale, {
                ...simple3Vector(5)
            }, stepName)


        // second section: fish tank at this moment
        stepName = "second-move"
        const secondMove = gsap.timeline({
            scrollTrigger: {
                trigger: ".second-move",

                ...scrollTrigger
            }
        })
        secondMove.to(room.position, {
            x: () => -viewSizes.width * 0.6 / 1000,
        }, ".second-move")
            .to(".second-move .section_scrollbar", { y: 0 }, stepName)
            .fromTo(".second-move .section__inner", {
                borderBottomLeftRadius: '50%',
                borderTopLeftRadius: '50%',
            }, {
                borderBottomLeftRadius: '0%',
                borderTopLeftRadius: '0%',
            }, stepName).to(circle2.scale, {
                ...simple3Vector(5)
            }, stepName)



        // third section: Contact
        stepName = "third-move"
        const thirdMove = gsap.timeline({
            scrollTrigger: {
                trigger: ".third-move",
                ...scrollTrigger
            }
        })
        thirdMove.to(room.position, {
            x: () => viewSizes.width * 0.5 / 1000,
        }, "third-move")
            .to(".third-move .section_scrollbar", { y: 0 }, stepName)

            .fromTo(".third-move .section__inner", {
                borderTopRightRadius: '50%',
                borderBottomRightRadius: '50%',
            }, {
                borderBottomRightRadius: '0%',
                borderTopRightRadius: '0%',
            }, stepName).to(circle3.scale, {
                ...simple3Vector(5)
            }, stepName)
        excludedNames.forEach((key) => {
            console.log("key", key)

            thirdMove.to(roomChildren[key].scale, {
                ...simple3Vector(1)
            }, stepName + key)
        })


        // fourth section: Final
        stepName = "fourth-name"
        const fourthMove = gsap.timeline({
            scrollTrigger: {
                trigger: ".fourth-move",
                ...scrollTrigger
            }
        })
        fourthMove.to(room.position, {
            x: () => -viewSizes.width * 0.6 / 1000,
        }, "fourth-move")
            .to(".fourth-move .section_scrollbar", { y: 0 }, stepName)
            .fromTo(".fourth-move .section__inner", {
                borderBottomLeftRadius: '50%',
                borderTopLeftRadius: '50%',
            }, {
                borderBottomLeftRadius: '0%',
                borderTopLeftRadius: '0%',
            }, "fourth-move").to(room.scale, {
                ...simple3Vector(0.15)
            }, stepName)


    })

    return mm
}

