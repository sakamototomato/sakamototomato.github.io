import { Seasons } from '..'
import * as three from 'three'

export class Background{
    geometry: three.PlaneGeometry
    material: three.MeshStandardMaterial
    plane: three.Mesh<three.PlaneGeometry, three.MeshStandardMaterial>
    circleMaterial2: three.MeshStandardMaterial
    circleGeometry: three.CircleGeometry
    circleMaterial1: three.MeshStandardMaterial
    circleMaterial3: three.MeshStandardMaterial
    circle1: three.Mesh<three.CircleGeometry, three.MeshStandardMaterial>
    circle2: three.Mesh<three.CircleGeometry, three.MeshStandardMaterial>
    circle3: three.Mesh<three.CircleGeometry, three.MeshStandardMaterial>
    seasons: Seasons
    constructor() {
        this.seasons = new Seasons()
        this.geometry = new three.PlaneGeometry(100, 100)
        this.material = new three.MeshStandardMaterial({
            color: 0xffffff,
            side: three.BackSide,
        })
        this.plane = new three.Mesh(this.geometry, this.material)

        this.setBackground()

        this.circleGeometry = new three.CircleGeometry(2, 32)
        this.circleMaterial1 = new three.MeshStandardMaterial({
            color: 0xe5a1aa,
            side: three.BackSide,
        })
        this.circleMaterial2 = new three.MeshStandardMaterial({
            color: 0xe5a1aa,
            side: three.BackSide,
        })
        this.circleMaterial3 = new three.MeshStandardMaterial({
            color: 0xe5a1aa,
            side: three.BackSide,
        })
        this.circle1 = new three.Mesh(this.circleGeometry, this.circleMaterial1)
        this.circle2 = new three.Mesh(this.circleGeometry, this.circleMaterial1)
        this.circle3 = new three.Mesh(this.circleGeometry, this.circleMaterial1)

        this.setCircle()
    }
    setCircle() {
        const {scene} = this.seasons

        this.circle1.scale.set(0, 0, 0)
        this.circle2.scale.set(0, 0, 0)
        this.circle3.scale.set(0, 0, 0)
        this.circle1.position.y = -0.29
        this.circle2.position.y = -0.28
        this.circle2.position.x = 2
        this.circle3.position.y = -0.27
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
        const {scene} = this.seasons

        this.plane.rotation.x = Math.PI / 2
        this.plane.position.y = -0.3
        this.plane.receiveShadow = true
        scene.add(this.plane)
    }
}
