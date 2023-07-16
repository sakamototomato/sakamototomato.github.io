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


            this.orthographicCamera = new three.OrthographicCamera(
                (-viewSizes.aspectRatio * viewSizes.frustumSize) / 2,
                (viewSizes.aspectRatio * viewSizes.frustumSize) / 2,
                viewSizes.frustumSize / 2,
                -viewSizes.frustumSize / 2,
                -100,
                100
            )
            this.initOrthographicCamera()
        }
        // init Controller
        {
            this.controls = new OrbitControls(
                this.orthographicCamera,
                canvas
            )
            this.controls.enableDamping = true;
            this.controls.enableZoom = false;
        }
        scene.add(this.perspectiveCamera)
        scene.add(this.orthographicCamera)
        this.controls.enableRotate = true

        this.resize()
    }

    public initPerspectiveCamera() {
        const distanceRatio = 1
        this.perspectiveCamera.position.y = 12 / distanceRatio
        this.perspectiveCamera.position.z = 6 / distanceRatio

    }

    public initOrthographicCamera() {
        const distanceRatio = .2
        this.orthographicCamera.zoom = 1.5
        this.orthographicCamera.position.y = 1 / distanceRatio
        this.orthographicCamera.position.z = 4 / distanceRatio
        this.orthographicCamera.rotateY(Math.PI / 2)
        // this.orthographicCamera.lookAt(0, 0, 0)
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
        this.orthographicCamera.updateProjectionMatrix()
        this.controls.update()
    }
}
