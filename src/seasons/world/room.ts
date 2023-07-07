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
        this.roomChildren = {}
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.9,
        }
        this.rotation = 0

        this.setModel() // initilize models's basic information
        console.log("this.roo===", this.room)
        this.mixer = new three.AnimationMixer(this.room)
        console.log("this.roo===", this.room)

        this.setAnimation()

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
            console.log("child.name", child.name, child)

            if (child.type === 'Group') {
                child as three.Group

                child.children.forEach((groupChild: { castShadow: boolean; receiveShadow: boolean }) => {
                    groupChild.castShadow = true
                    groupChild.receiveShadow = true
                })

                switch (child.name) {
                    case "loading_cube":
                        console.log("==")
                        child.position.set(0, 0.1, 0)
                        child.rotation.y = Math.PI / 4
                        break;

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
        const scale = 0.26
        this.room.scale.set(scale, scale, scale)
        this.room.rotateY(110)
        scene.add(this.room)

    }

    update() {
        const { time } = this.seasons

        const { current, target, ease } = this.lerp
        this.lerp.current = gsap.utils.interpolate(current, target, ease)
        this.room.rotation.y = this.lerp.current
        this.mixer.update(time.delta * 0.001)
    }

}
