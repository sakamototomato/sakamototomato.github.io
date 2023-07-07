import { PerspectiveCamera } from 'three'
import { Seasons } from '.'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as three from 'three'

export class Camera {
    public perspectiveCamera: PerspectiveCamera
    public orthographicCamera: three.OrthographicCamera
    public controls: OrbitControls
    seasons: Seasons
    constructor() {
        this.seasons = new Seasons()
        const { scene, viewSizes, canvas } = this.seasons
        // init cameras
        {
            this.perspectiveCamera = new three.PerspectiveCamera(
                75,
                viewSizes.aspectRatio,
                0.1,
                100
            )
            this.initPerspectiveCamera()
            scene.add(this.perspectiveCamera)

            this.orthographicCamera = new three.OrthographicCamera(
                (-viewSizes.aspectRatio * viewSizes.frustumSize) / 2,
                (viewSizes.aspectRatio * viewSizes.frustumSize) / 2,
                viewSizes.frustumSize / 2,
                -viewSizes.frustumSize / 2,
                -50,
                50
            )
            this.initOrthographicCamera()
            scene.add(this.orthographicCamera)
        }
        // init Controller
        {
            this.controls = new OrbitControls(
                this.perspectiveCamera,
                canvas
            )
        }
    }

    public initPerspectiveCamera() {
        const distanceRatio = 0.7
        this.perspectiveCamera.position.y = 3.8 / distanceRatio
        this.perspectiveCamera.position.x = 3 / distanceRatio
        this.perspectiveCamera.position.z = 3 / distanceRatio
    }

    public initOrthographicCamera() {
        this.orthographicCamera.position.y = 6
        this.orthographicCamera.position.z = 10
        this.orthographicCamera.position.x = 10
        this.orthographicCamera.rotation.x = -Math.PI / 4
    }

    public resize() {
        const { viewSizes, } = this.seasons

        this.perspectiveCamera.aspect = viewSizes.aspectRatio
        this.perspectiveCamera.updateProjectionMatrix()

        this.orthographicCamera.left =
            (-viewSizes.aspectRatio * viewSizes.frustumSize) / 2
        this.orthographicCamera.right = -this.orthographicCamera.left
        this.orthographicCamera.top = viewSizes.frustumSize / 2
        this.orthographicCamera.bottom = -this.orthographicCamera.top
        this.orthographicCamera.updateProjectionMatrix()
    }

    public update() {
        this.controls.update()
    }
}
