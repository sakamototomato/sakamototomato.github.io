import * as three from 'three'
import { Seasons } from '.'

export class Renderer  {
    private webGLRenderer: three.WebGLRenderer // name conflicted with base class
    seasons: Seasons
    constructor() {
        this.seasons = new Seasons()
        this.webGLRenderer = new three.WebGLRenderer({
            canvas: this.seasons.canvas,
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
        const {viewSizes} = this.seasons
        this.webGLRenderer.setSize(viewSizes.width, viewSizes.height)
        this.webGLRenderer.setPixelRatio(viewSizes.pixelRatio)
    }
    public update() {
        const {scene, camera} = this.seasons
        this.webGLRenderer.render(scene, camera.perspectiveCamera)
    }
}
