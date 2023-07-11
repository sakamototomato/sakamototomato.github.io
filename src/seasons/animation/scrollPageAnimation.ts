import { Seasons } from ".."
import gsap from "gsap"

export const scrollPageAnimation = (seasons: Seasons) => {
    const { world, viewSizes } = seasons
    const room = world.room?.room
    if (!room || !world.background) return
    // new animation flow
    const scrollTrigger = {
        markers: false,
        scrub: 0.5,
        invalidateOnRefresh: true,
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
            const moveStart = gsap.timeline({
                scrollTrigger: {
                    trigger: ".scroll-start",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            moveStart.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,
                duration: 1,
            })
            const firstMoveTime = gsap.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            firstMoveTime.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,

            })
            const secondMove = gsap.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            secondMove.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,

            })


            // TODO: too manay animation here are needed
        } else if (isMobile) {
            const moveStart = gsap.timeline({
                scrollTrigger: {
                    trigger: ".scroll-start",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            moveStart.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,
                duration: 1,
            })
            const firstMoveTime = gsap.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            firstMoveTime.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,

            })
            const secondMove = gsap.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            secondMove.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,

            })
        }

        {
            // common
            const moveStart = gsap.timeline({
                scrollTrigger: {
                    trigger: ".scroll-start",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            moveStart.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,
                duration: 1,
            })
            const firstMoveTime = gsap.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            firstMoveTime.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,

            })
            const secondMove = gsap.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    ...scrollTrigger
                }
            })
            secondMove.to(room.position, {
                x: () => viewSizes.width * 0.5 / 1000,

            })
        }
    })



    return mm
}