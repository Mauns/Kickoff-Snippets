
/* ——————————————————————————————————
GLTF import w/ Draco
GLTF compression in Blender will be by draco
—————————————————————————————————— */

/*——————————————————————————————————————
DOCUMENTATION

GLTF -> https://threejs.org/docs/index.html?q=draco#examples/en/loaders/GLTFLoader
DRACO -> https://threejs.org/docs/index.html?q=draco#examples/en/loaders/DRACOLoader
——————————————————————————————————————*/

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

/*——————————————————————————————————————
Loader Class for single meshes
——————————————————————————————————————*/

const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
    .setDecoderPath('./draco/')
loader.setDRACOLoader(dracoLoader)

/*——————————————————————————————————————
Expected Object

const skull = new Model({
  name: 'skull',
  file: './models/skull.glb',
  scene: scene,
  placeOnLoad: true,
})
——————————————————————————————————————*/

class Model {
    constructor(obj) {
        this.name = obj.name
        this.file = obj.file
        this.scene = obj.scene
        this.placeOnLoad = obj.placeOnLoad

        /*——————————————————————————————————————
        Files needed -> https://github.com/mrdoob/three.js/tree/dev/examples/js/libs/draco
        - draco_decoder.wasm
        - draco_wasm_wrapper.js
        ——————————————————————————————————————*/

        this.loader = new GLTFLoader()
        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath( './draco/' ) // In static folder
        this.loader.setDRACOLoader( this.dracoLoader )

        this.init()
    }

    init() {
        this.loader().load(this.file, (response) => {

            /*——————————————————————————————————————
            Original Mesh
            ——————————————————————————————————————*/
            this.mesh = response.scene.children[0]

        })
    }

    add() {
        if (this.placeOnLoad) {
            this.scene.add(this.mesh)
        }
    }

    remove() {
        this.scene.remove(this.mesh)
    }
}