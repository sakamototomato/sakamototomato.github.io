import * as THREE from "three"

export const simple3Vector = (n = 1) => {
    return new THREE.Vector3(n, n, n)
}

export const simple3Array = (n = 1) => {
    return [n, n, n] as const
}