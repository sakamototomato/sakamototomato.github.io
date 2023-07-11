import { Seasons } from "../seasons";

export const getVariables = (seasons: Seasons) => {
    const { device, height } = seasons.viewSizes
    let roomScale = 0.17 // room
    let cubeScale = 0.5 // loading_cube
    let cubeOffset = - height / 1000 / 4
    if (device === "mobile") {
        roomScale = .1 // room

        cubeScale = 0.85 // loading_cube
        cubeOffset = height / 1000 / 2
    }


    console.log(seasons.viewSizes)
    return {
        roomScale, cubeScale, cubeOffset
    }
}
