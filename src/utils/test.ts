import * as THREE from "three"
import { Seasons } from "../seasons"


export const activateTest = (seasons: Seasons) => {
    const axes = new THREE.AxesHelper(300)
    seasons.scene.add(axes)
    // document.querySelector("canvas")!.style.zIndex = 9999999999
}
