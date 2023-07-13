import { Seasons } from ".."
import gsap from "gsap"
import { simple3Vector } from "../../utils/simple3Vector"

export const scrollPageAnimation = (seasons: Seasons) => {
    const { world, viewSizes } = seasons
    const room = world.room?.room
    // const camera = seasons.camera.orthographicCamera
    if (!room || !world.background) return
    const { circle1, circle2, circle3 } = world.background
    // new animation flow
    const scrollTrigger = {
        markers: false, // for testing locally
        scrub: 0.8,
        invalidateOnRefresh: true,
        start: "top top",
        end: "bottom bottom"
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
        const moveStart = gsap.timeline({

            scrollTrigger: {
                trigger: ".scroll-start",
                ...scrollTrigger
            }
        })
        moveStart.to(room.position, {
            x: () => viewSizes.width * 0.5 / 1000,
        }).to(circle1.scale, {
            ...simple3Vector(5)
        })

        const firstMoveTime = gsap.timeline({
            scrollTrigger: {
                trigger: ".first-move",

                ...scrollTrigger
            }
        })
        firstMoveTime.to(room.position, {
            x: () => viewSizes.width * 0.5 / 1000,
        }, "first-move").to(".first-move .section_scrollbar", {
            y: 0
        }, "first-move").to(circle2.scale, {
            ...simple3Vector(5)
        }, "first-move")


        const secondMove = gsap.timeline({
            scrollTrigger: {
                trigger: ".second-move",

                ...scrollTrigger
            }
        })
        secondMove.to(room.position, {
            x: () => -viewSizes.width * 0.6 / 1000,
        }, ".second-move").to(".second-move .section_scrollbar", {
            y: 0
        }, ".second-move").to(circle3.scale, {
            ...simple3Vector(5)
        }, ".second-move")



        const thirdMove = gsap.timeline({
            scrollTrigger: {
                trigger: ".third-move",
                ...scrollTrigger
            }
        })
        thirdMove.to(room.position, {
            x: () => viewSizes.width * 0.5 / 1000,
        }, "third-move").to(".third-move .section_scrollbar", {
            y: 0
        }, "third-move")

        const fourthMove = gsap.timeline({
            scrollTrigger: {
                trigger: ".fourth-move",
                ...scrollTrigger
            }
        })
        fourthMove.to(room.position, {
            x: () => -viewSizes.width * 0.6 / 1000,
        }, "fourth-move").to(".fourth-move .section_scrollbar", {
            y: 0
        }, "fourth-move").to(room.scale, {
            ...simple3Vector(0.15)
        }

        )


    })



    return mm
}