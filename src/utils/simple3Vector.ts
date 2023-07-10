import * as THREE from "three"

export const simple3Vector = (n = 1) => {
    return new THREE.Vector3(n, n, n)
}