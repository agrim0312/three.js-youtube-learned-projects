import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { BufferAttribute } from 'three'

//texture
const loader = new THREE.TextureLoader()
const cross = loader.load('./stars-png-634.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5,32,32);
const particles = new THREE.BufferGeometry;
const particlescnt = 5000;
const pararray = new Float32Array(particlescnt*3);

for (let i=0;i<particlescnt*3;i++){
    pararray[i] = (Math.random()-0.5)*(5*Math.random())
}

particles.setAttribute('position',new THREE.BufferAttribute(pararray,3))

// Materials

const material = new THREE.PointsMaterial({
    size:0.001,
})

const particlesmaterial = new THREE.PointsMaterial({
    size:0.02,
    map:cross,
    transparent:true,
})
// Mesh
const sphere = new THREE.Points(geometry,material)
const particle = new THREE.Points(particles,particlesmaterial)
scene.add(sphere,particle)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//mouse

document.addEventListener('mousemove',animatemouse)
let mouseX=0
let mouseY=0

function animatemouse(event){
    mouseX = event.clientX
    mouseY = event.clientY
}
/**
 * Animate
 */

const clock = new THREE.Clock()


const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.z = .5 * elapsedTime
    sphere.rotation.x = .5 * elapsedTime
    sphere.rotation.y = .5 * elapsedTime

    particle.rotation.y = mouseX * (elapsedTime*0.000008)
    particle.rotation.x = mouseY * (elapsedTime*0.000008)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()