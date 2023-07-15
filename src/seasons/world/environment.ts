import { Seasons } from '..'
import * as three from 'three'
import { gsap } from 'gsap'

export class Environment {
    sunLight: three.DirectionalLight
    ambientLight: three.AmbientLight
    seasons: Seasons
    currentEnv: "day" | "night"
    constructor() {
        this.seasons = new Seasons()
        this.sunLight = new three.DirectionalLight(0xffffff, 3)
        this.ambientLight = new three.AmbientLight(0xffffff, 1)
        const { scene } = this.seasons
        this.setSunlight()
        this.currentEnv = "day"

        scene.add(this.sunLight)
        scene.add(this.ambientLight)
    }

    toggle() {

        if (this.currentEnv === "night") {
            this.setSunlight()
        } else {
            this.setNightLight()
        }
    }

    private setSunlight() {
        const toggleEle = document.querySelector("#root");
        toggleEle?.classList.add("light-theme")
        toggleEle?.classList.remove("dark-theme")

        this.currentEnv = "day"
        this.sunLight.castShadow = true
        // 用来计算该平行光产生的阴影;
        this.sunLight.shadow.camera.far = 20
        // 一个Vector2定义阴影贴图的宽度和高度。
        this.sunLight.shadow.mapSize.set(1024, 1024)
        // 定义用于查询阴影贴图的位置沿对象法线的偏移量。默认值为 0。增加此值可用于减少阴影痤疮
        // 尤其是在光线以浅角度照射到几何体的大场景中。代价是阴影可能会出现扭曲
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-2, 5, 3)
        const tl = gsap.timeline()
        tl.to(this.sunLight.color, {
            r: 255 / 255,
            g: 255 / 255,
            b: 255 / 255,
        }, 0).to(this.sunLight, {
            intensity: 3
        }, 0).to(this.ambientLight, {
            r: 255 / 255,
            g: 255 / 255,
            b: 255 / 255,
        }, 0).to(this.ambientLight, {
            intensity: 0.3
        }, 0)
    }

    private setNightLight() {
        const toggleEle = document.querySelector("#root");
        toggleEle?.classList.toggle("dark-theme")
        toggleEle?.classList.remove("light-theme")

        this.currentEnv = "night"

        const tl = gsap.timeline()
        tl.to(this.sunLight.color, {
            r: 0.069,
            g: 0.052,
            b: 0.069,
        }, 0).to(this.sunLight, {
            intensity: 10
        }, 0).to(this.ambientLight, {
            r: 0.043137254901960784,
            g: 0.03529411764705882,
            b: 0.06274509803921569,
        }, 0).to(this.ambientLight, {
            intensity: 0.05
        }, 0)
    }

    // TODO: Below are not available
    /*
     switchModel(season: ESeason) {
         switch (season) {
             case ESeason.spring:
                 this.switchToSpring()
                 break
             case ESeason.winter:
                 this.switchToWinter()
                 break
             default:
                 break
         }
     }
     switchToSpring() {
         gsap.to(this.sunLight.color, {
             r: 255 / 255,
             g: 255 / 255,
             b: 255 / 255,
         })
         gsap.to(this.ambientLight.color, {
             r: 255 / 255,
             g: 255 / 255,
             b: 255 / 255,
         })
         gsap.to(this.sunLight, {
             intensity: 3,
         })
         gsap.to(this.ambientLight, {
             intensity: 1,
         })
     }
     switchToWinter() {
         gsap.to(this.sunLight.color, {
             r: 0.17254901960784313,
             g: 0.23137254901960785,
             b: 0.6862745098039216,
         })
         gsap.to(this.ambientLight.color, {
             r: 0.17254901960784313,
             g: 0.23137254901960785,
             b: 0.6862745098039216,
         })
         gsap.to(this.sunLight, {
             intensity: 0.8,
         })
         gsap.to(this.ambientLight, {
             intensity: 0.8,
         })
     }
     */
}
