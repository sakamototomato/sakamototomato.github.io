import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Seasons } from '..'
import { Object3D } from 'three'
import * as three from 'three'
import gsap from "gsap"
export class Room {
    roomGLTF: GLTF
    lerp: { current: number; target: number; ease: number }
    room: three.Group
    roomChildren: Record<string, Object3D>
    mixer: three.AnimationMixer
    rotation: number
    seasons: Seasons
    constructor() {
        this.seasons = new Seasons()
        const { resources } = this.seasons

        this.roomGLTF = resources.items.room
        this.room = this.roomGLTF.scene
        this.room.position.x = 0
        this.room.position.z = 0
        this.roomChildren = {}
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.9,
        }
        this.rotation = 0

        this.setModel() // initilize models's basic information
        this.mixer = new three.AnimationMixer(this.room)


        this.onMouseMove()
    }
    onMouseMove() {
        const { canvas } = this.seasons

        canvas.addEventListener('mousemove', (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth
            this.lerp.target = this.rotation * 0.1
        })
    }
    setAnimation() {
        // initialize animation here
        this.mixer.clipAction(this.roomGLTF.animations?.[0])?.play()
    }
    setModel() {
        const { scene } = this.seasons
        const children = this.room.children as Array<three.Group | three.Mesh>
        children.forEach((child: three.Group | three.Mesh) => {
            child.castShadow = true
            child.receiveShadow = true

            if (child.type === 'Group') {
                child as three.Group

                child.children.forEach((groupChild: { castShadow: boolean; receiveShadow: boolean }) => {
                    groupChild.castShadow = true
                    groupChild.receiveShadow = true
                })
                switch (child.name) {

                    case "road_lamp001":
                        {
                            const width = 0.5;
                            const intensity = 3;
                            const light = new three.PointLight(0xffffff, intensity, width);
                            const targetPosition = child.position.clone().add(new three.Vector3(0, -1, 0));
                            light.position.set(targetPosition.x, targetPosition.y, targetPosition.z)
                            this.room.add(light);
                        }
                        break;

                    case "road_lamp001 ":
                        {
                            const width = 0.5;
                            const intensity = 3;
                            const light = new three.PointLight(0xffffff, intensity, width);
                            const targetPosition = child.position.clone().add(new three.Vector3(0, -1, 0));
                            light.position.set(targetPosition.x, targetPosition.y, targetPosition.z)
                            this.room.add(light);
                        }
                        break;
                    default:
                        break
                }

            }


            if (child.type == "Mesh") {
                // modifier of models
                switch (child.name) {
                    case 'fish_tank':
                        (child as three.Mesh).material = new three.MeshPhysicalMaterial({
                            roughness: 0,
                            color: 0x549dd2,
                            ior: 3,
                            opacity: 0.3,
                            transparent: true
                        });
                        break


                    default:
                        break
                }
            }

            const scale = 0
            child.scale.set(scale, scale, scale)

            this.roomChildren[child.name.toLocaleLowerCase()] = child

        })
        this.room.castShadow = true
        this.room.receiveShadow = true
        // this.room.visible = true
        const scale = 0.17
        this.room.position.y = 0
        this.room.rotation.set(0, 11 * Math.PI / 4, 0)
        this.room.scale.set(scale, scale, scale)
        scene.add(this.room)

    }
    clockTick() {
        const room = this.seasons.world.room
        if (!room) return
        const { roomChildren } = room
        const time = (() => new Date())()
        roomChildren.hour_hand.rotation.z = (time.getHours() / 12) * Math.PI * 2
        roomChildren.minute_hand.rotation.z = (time.getMinutes() / 60) * Math.PI * 2
        roomChildren.second_hand.rotation.z = (time.getSeconds() / 60) * Math.PI * 2
    }

    update() {
        const { time } = this.seasons
        this.clockTick()
        const { current, target, ease } = this.lerp
        this.lerp.current = gsap.utils.interpolate(current, target, ease)
        // this.room.rotation.y = this.lerp.current + this.room.rotation.y
        this.mixer.update(time.delta * 0.001)
    }

}
