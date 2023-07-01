import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Seasons } from '../seasons'

export class Room extends Seasons {
    roomGLTF: GLTF
    constructor() {
        super()
        this.roomGLTF = this.resources.items.room
        this.room = this.roomGLTF.scene
        this.roomChildren = {}
        this.lerp = {}
    }
}
