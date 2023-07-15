import * as THREE from "three"
import { Seasons } from "../seasons"
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

export const activateTest = (seasons: Seasons) => {
    return
    const axes = new THREE.AxesHelper(300)
    seasons.scene.add(axes)
    // document.querySelector("canvas")!.style.zIndex = 9999999999

    if (seasons.world.room) {
        const { roomChildren } = seasons.world.room!

        const gui = new GUI({ width: 310 });
        gui.add(roomChildren.road.position, "x", -100, 100, 0.1)
        gui.add(roomChildren.road.position, "z", -100, 100, 0.1)


        // gui.add(seasons.world.environment?.sunLight.color, "r", 0, 1, 0.001)
        // gui.add(seasons.world.environment?.sunLight.color, "g", 0, 1, 0.001)
        // gui.add(seasons.world.environment?.sunLight.color, "b", 0, 1, 0.001)

        gui.add(seasons.camera.orthographicCamera.position, "x", -10, 10, 0.1)
        gui.add(seasons.camera.orthographicCamera.position, "y", -10, 10, 0.1)
        gui.add(seasons.camera.orthographicCamera.position, "z", -10, 10, 0.1)


    }
}
