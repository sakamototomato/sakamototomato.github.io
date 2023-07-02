import  { PerspectiveCamera } from 'three'
import { Seasons } from '.'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as three from 'three'

export class Camera   {
    public perspectiveCamera: PerspectiveCamera
    public OrthographicCamera: three.OrthographicCamera
    public controls: OrbitControls
    seasons: Seasons
    constructor() {
        this.seasons = new Seasons()
        const {scene, viewSizes, canvas} = this.seasons
        // init cameras
        {
            this.perspectiveCamera = new three.PerspectiveCamera(
                75,
                viewSizes.aspectRatio,
                0.1,
                100
            )
            scene.add(this.perspectiveCamera)

            this.OrthographicCamera = new three.OrthographicCamera(
                (-viewSizes.aspectRatio * viewSizes.frustumSize) / 2,
                (viewSizes.aspectRatio * viewSizes.frustumSize) / 2,
                viewSizes.frustumSize / 2,
                -viewSizes.frustumSize / 2,
                -50,
                50
            )
            scene.add(this.OrthographicCamera)
        }
        // init Controller
        {
            this.controls = new OrbitControls(
                this.perspectiveCamera,
              canvas
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
        const {viewSizes, } = this.seasons

        this.perspectiveCamera.aspect = viewSizes.aspectRatio
        this.perspectiveCamera.updateProjectionMatrix()

        this.OrthographicCamera.left =
            (-viewSizes.aspectRatio * viewSizes.frustumSize) / 2
        this.OrthographicCamera.right = -this.OrthographicCamera.left
        this.OrthographicCamera.top = viewSizes.frustumSize / 2
        this.OrthographicCamera.bottom = -this.OrthographicCamera.top
        this.OrthographicCamera.updateProjectionMatrix()
    }

    public update() {
        this.controls.update()
    }
}
