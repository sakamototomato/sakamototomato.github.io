import three from 'three'
import { Seasons } from './seasons'

export class Renderer extends Seasons {
    private webGLRenderer: three.WebGLRenderer // name conflicted with base class
    constructor() {
        super()
        this.webGLRenderer = new three.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        })

        this.setRenderer()
    }

    public setRenderer() {
        this.webGLRenderer.outputColorSpace = three.SRGBColorSpace
        this.webGLRenderer.toneMapping = three.ReinhardToneMapping // 色调映射;
        this.webGLRenderer.toneMappingExposure = 2
        this.webGLRenderer.shadowMap.enabled = true
        this.webGLRenderer.shadowMap.type = three.PCFSoftShadowMap // 定义阴影贴图类型;
        this.resize()
    }
    public resize() {
        this.webGLRenderer.setSize(this.viewSizes.width, this.viewSizes.height)
        this.webGLRenderer.setPixelRatio(this.viewSizes.pixelRatio)
    }
    public update() {
        this.webGLRenderer.render(this.scene, this.camera.OrthographicCamera)
    }
}
