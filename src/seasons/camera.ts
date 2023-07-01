import three, { PerspectiveCamera } from 'three'
import { Seasons } from './seasons'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export class Camera extends Seasons {
    public perspectiveCamera: PerspectiveCamera
    public OrthographicCamera: three.OrthographicCamera
    public controls: OrbitControls
    constructor() {
        super()

        // init cameras
        {
            this.perspectiveCamera = new three.PerspectiveCamera(
                75,
                this.viewSizes.aspectRatio,
                0.1,
                100
            )
            this.scene.add(this.perspectiveCamera)

            this.OrthographicCamera = new three.OrthographicCamera(
                (-this.viewSizes.aspectRatio * this.viewSizes.frustumSize) / 2,
                (this.viewSizes.aspectRatio * this.viewSizes.frustumSize) / 2,
                this.viewSizes.frustumSize / 2,
                -this.viewSizes.frustumSize / 2,
                -50,
                50
            )
            this.scene.add(this.OrthographicCamera)
        }
        // init Controller
        {
            this.controls = new OrbitControls(
                this.perspectiveCamera,
                this.canvas
            )
            this.controls.enableDamping = true
            this.controls.dampingFactor = 0.3
            this.controls.enableZoom = false
        }
    }

    public initPerspectiveCamera() {
        this.perspectiveCamera.position.y = 3.5
        this.perspectiveCamera.position.x = 0.5
        this.perspectiveCamera.position.z = 3
    }

    public initOrthographicCamera() {
        this.OrthographicCamera.position.y = 6
        this.OrthographicCamera.position.z = 10
        this.OrthographicCamera.rotation.x = -Math.PI / 6
    }

    public resize() {
        this.perspectiveCamera.aspect = this.viewSizes.aspectRatio
        this.perspectiveCamera.updateProjectionMatrix()

        this.OrthographicCamera.left =
            (-this.viewSizes.aspectRatio * this.viewSizes.frustumSize) / 2
        this.OrthographicCamera.right = -this.OrthographicCamera.left
        this.OrthographicCamera.top = this.viewSizes.frustumSize / 2
        this.OrthographicCamera.bottom = -this.OrthographicCamera.top
        this.OrthographicCamera.updateProjectionMatrix()
    }

    public update() {
        this.controls.update()
    }
}
