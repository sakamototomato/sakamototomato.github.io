import { EventEmitter } from 'events'
import { Seasons } from '.'
import { Renderer } from './renderer'

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { EEvent } from './types/events'
enum EModelType {
    'glbModel',
}

export class Resources extends EventEmitter {
    seasons: Seasons
    renderer: Renderer
    assets: { name: string; type: EModelType; path: string }[]
    items: Record<string, GLTF>
    queueNum: number
    loadedNum: number
    loaders: { gltfLoader: GLTFLoader; dracoLoader: DRACOLoader }
    constructor() {
        super()
        this.seasons = new Seasons()
        this.renderer = this.seasons.renderer

        this.assets = [
            {
                name: 'room',
                type: EModelType.glbModel,
                path: '/room.glb',
            },
        ]

        this.items = {}
        this.queueNum = this.assets.length
        this.loadedNum = 0

        this.loaders = {
            gltfLoader: new GLTFLoader(),
            dracoLoader: new DRACOLoader(),
        }

        this.setLoaders()
        this.load()
    }

    setLoaders() {
        this.loaders.dracoLoader.setDecoderPath('/draco/')
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    load() {
        for (const asset of this.assets) {
            if (asset.type === EModelType.glbModel) {
                this.loaders.gltfLoader.load(asset.path, (gltf) => {
                    this.singleAssetLoaded(asset, gltf)
                })
            }
        }
    }

    singleAssetLoaded(asset: (typeof this.assets)[0], item: GLTF) {
        this.items[asset.name] = item
        this.loadedNum++
        console.log('loading')
        if (this.loadedNum === this.queueNum) {
            console.log('all loaded')
            this.emit(EEvent.all_resources_loaded)
        }
    }
}
