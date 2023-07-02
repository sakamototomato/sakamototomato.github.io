import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Seasons } from '..'
import { Group, Object3D } from 'three'
import * as three from 'three'

export class Room{
    roomGLTF: GLTF
    lerp: { current: number; target: number; ease: number }
    room: Group
    roomChildren: Record<string, Object3D>
    mixer: three.AnimationMixer
    rotation: number
    seasons: Seasons
    constructor() {
        this.seasons = new Seasons()
        const {resources} = this.seasons

        this.roomGLTF = resources.items.room
        this.room = this.roomGLTF.scene
        this.roomChildren = {}
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.9,
        }
        this.rotation = 0

        this.setModel() // initilize models's basic information

        this.mixer = new three.AnimationMixer(this.room)
        this.setAnimation()

        this.onMouseMove()
    }
    onMouseMove() {
        const {canvas} = this.seasons

        canvas.addEventListener('mousemove', (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth
            this.lerp.target = this.rotation * 0.1
        })
    }
    setAnimation() {
        // initialize animation here
    }
    setModel() {
        const {scene} = this.seasons

        this.room.children.forEach((child) => {
            child.castShadow = true
            child.receiveShadow = true
            if (child.type === 'Group') {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true
                    groupChild.receiveShadow = true
                })
            }

            // modifier of models
            switch (child.name) {
                case 'ra':
                    break
                default:
                    break
            }

            child.scale.set(0, 0, 0)
            this.roomChildren[child.name.toLocaleLowerCase()] = child

            scene.add(this.room)
            this.room.scale.set(0.11, 0.11, 0.11)
        })
    }

    update() {
        const {time} = this.seasons

        const { current, target, ease } = this.lerp
        this.lerp.current = gsap.utils.interpolate(current, target, ease)
        this.room.rotation.y = this.lerp.current
        this.mixer.update(time.delta * 0.001)
    }
}
