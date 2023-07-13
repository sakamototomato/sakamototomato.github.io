import { Seasons } from '..'
import * as three from 'three'

export class Background {
    plane: three.Mesh<three.PlaneGeometry, three.MeshStandardMaterial>
    circleMaterial2: three.MeshStandardMaterial
    circleGeometry: three.CircleGeometry
    circleMaterial1: three.MeshStandardMaterial
    circleMaterial3: three.MeshStandardMaterial
    circle1: three.Mesh<three.CircleGeometry, three.MeshStandardMaterial>
    circle2: three.Mesh<three.CircleGeometry, three.MeshStandardMaterial>
    circle3: three.Mesh<three.CircleGeometry, three.MeshStandardMaterial>
    seasons: Seasons
    planeInner: three.Mesh<three.PlaneGeometry, three.MeshStandardMaterial>
    constructor() {
        this.seasons = new Seasons()
        const geometry = new three.PlaneGeometry(100, 100)
        const material = new three.MeshStandardMaterial({
            color: 0xfaf4ea,

            side: three.DoubleSide,
        })
        this.plane = new three.Mesh(geometry, material)
        this.planeInner = new three.Mesh(new three.PlaneGeometry(100, 100), new three.MeshStandardMaterial({
            color: 0x708bf4,
            side: three.DoubleSide,
        }))

        this.setBackground()

        this.circleGeometry = new three.CircleGeometry(4, 32)
        this.circleMaterial1 = new three.MeshStandardMaterial({
            color: 0x9cf19b,
            side: three.BackSide,
        })
        this.circleMaterial2 = new three.MeshStandardMaterial({
            color: 0x87A2FB,
            side: three.DoubleSide
        })
        this.circleMaterial3 = new three.MeshStandardMaterial({
            color: 0x7BDDB5,
            side: three.DoubleSide
        })
        this.circle1 = new three.Mesh(this.circleGeometry, this.circleMaterial1)
        this.circle2 = new three.Mesh(this.circleGeometry, this.circleMaterial2)
        this.circle3 = new three.Mesh(this.circleGeometry, this.circleMaterial3)

        this.setCircle()
    }
    setCircle() {
        const { scene } = this.seasons

        this.circle1.scale.set(0, 0, 0)
        this.circle2.scale.set(0, 0, 0)
        this.circle3.scale.set(0, 0, 0)
        this.circle1.position.y = 0.002
        this.circle2.position.y = 0.003
        this.circle3.position.y = 0.004
        this.circle1.rotation.x =
            this.circle2.rotation.x =
            this.circle3.rotation.x =
            Math.PI / 2
        this.circle1.receiveShadow =
            this.circle2.receiveShadow =
            this.circle3.receiveShadow =
            true
        scene.add(this.circle1)
        scene.add(this.circle2)
        scene.add(this.circle3)
    }
    setBackground() {
        const { scene } = this.seasons

        this.plane.rotation.x = Math.PI / 2
        this.plane.receiveShadow = true
        this.plane.position.y = -0.001

        scene.add(this.plane)
        this.planeInner.receiveShadow = true
        this.planeInner.rotation.x = Math.PI / 2
        this.planeInner.position.y = 0.001
        this.planeInner.scale.y = 0.12
        scene.add(this.planeInner)

    }
}
