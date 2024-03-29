<template>
  <!-- WELCOME MESSAGE IF LOGGED IN -->
  <div class="container" v-if="uid.length > 0">
    <div class="row mb-5">
      <div id='personname'> Welcome, {{fullName}}! 👋🏼</div>
    </div>
  </div> 

  <!-- SINGAPORE ISLAND -->
  <div class="mx-auto about-fadeup island">
    <Renderer
      ref="renderer"
      alpha antialias orbit-ctrl
      resize="window">
      <Camera
        ref="camera"
        :fov="55"
        :position="{x:0, y:600, z:1600 }" />
      <Scene
        ref="scene">
        <AmbientLight
          color="white"
          :intensity=".8"
        />
        <DirectionalLight
          ref="dirLight"
          color="white"
          :position="{ x: -1, y: 1.75, z: 1 }"
          :intensity="1"
        />
        <PointLight
          ref="pointLight"
        ></PointLight>
      </Scene>
    </Renderer>

    <!-- LABELS AND POINTS IN THE MAP -->
    <div class="point point-0">
      <div class="label label-central" id="central">
        Central
        <div class="text">Click to filter Central location.</div>
      </div>
    </div>

    <div class="point point-1">
      <div class="label label-north" id="north">
        North
        <div class="text">Click to filter North location.</div>
      </div>
    </div>

    <div class="point point-2">
      <div class="label label-east" id="east">
        East
        <div class="text">Click to filter East location.</div>
      </div>
    </div>

    <div class="point point-3">
      <div class="label label-west" id="west">
        West
        <div class="text">Click to filter West location.</div>
      </div>
    </div>

    <div class="point point-4">
      <div class="label label-reset" id="reset">
        Reset
        <div class="text">Click to reset filter.</div>
      </div>
    </div>
        
    </div>

    <div class="container mt-5">
      <div class="row d-flex align-content-center justify-content-center">
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button @click="activeTab = 'EventsButton'" class="btn" id="events">EVENTS</button>
        </div>
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button @click="activeTab = 'PublicButton'" class="btn" id="public">PUBLIC JIOS</button>
        </div>
        <div class="col-sm-3 col-4 d-flex align-content-center justify-content-center">
          <button @click="activeTab = 'PrivateButton'" class="btn" id="private">PRIVATE JIOS</button>
        </div>
      </div>
    </div>

    <div class="container" style="display:flex; justify-content:space-between;"></div>

    <span>
      <EventsButton v-if="activeTab === 'EventsButton'" :data="filterchoice"/>
      <PublicButton v-if="activeTab === 'PublicButton'"/> 
      <PrivateButton v-if="activeTab === 'PrivateButton'"/>
    </span>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from 'three/examples/jsm/objects/Sky'
import { Water } from 'three/examples/jsm/objects/Water'
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import Animations from '@/assets/animation'
import sourceData from '../data.json'
import EventsButton from './EventsButton.vue'
import PublicButton from './PublicButton.vue'
import PrivateButton from './PrivateButton.vue'
import {getuserid, getdata} from '../utils/index.js'
import { onMounted } from 'vue'

export default {
  name:'App',
  title: 'BOJIO – Homepage',
  components: {
  EventsButton, PublicButton, PrivateButton
  },

  data(){
    return {
      sceneReady: false,
      loadingProcess: 0,
      events: sourceData.events,
      length: 9, 
      uid: localStorage.getItem("uid"),
      activeTab : 'EventsButton',
      fullname: '',
      districtcode:{
        'North': [25,26,27,28],
        'Central': [21,11,10,9,8,7,6,5,4,3,2,1],
        'East': [20,19,18,17,16,15,14,13,12],
        'West': [22,23,24]
      },
      sgdistrictcode:{ 
        'North': [72,73,77,78,75,76,79,80],
        'Central': [1,2,3,4,5,6,7,8,14,15,16,9,10,11,12,13,17,18,19,20,21,22,23,24,25,26,27,28,29,30,58,59],
        'East': [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,81,51,52,53,54,55,82,56,57],
        'West': [60,61,62,63,64,65,66,67,68,69,70,71]
      },
      selectedlocation: '',
      usefilter: false,
      currentIntersection: null,
      clicked: false,
      count: 0,
      filterchoice: '',
    }
  },
  methods: {
    loadMore() {
      if (this.length >= this.events.length) {
        return
      }
      this.length = this.length + 9;   
    },
    updatefullname() { 
      this.fullname = localStorage.getItem('fullname')  
      let nameSplit = this.fullname.split(" ")
      let firstName = nameSplit[0]
      let lastName = nameSplit[1]
      firstName = firstName[0].toUpperCase() + firstName.slice(1,firstName.length)
      lastName = lastName[0].toUpperCase() + lastName.slice(1,lastName.length)
      this.fullname = firstName + ' ' + lastName
    }
  },
  computed: {
    eventsloaded() {
      return this.events.slice(0, this.length);
    },

    fullName(){
      return this.fullname
    }
  },
  mounted() {
    if (this.$route.params.idx) {
      if (this.$route.params.idx == 'events') {
        this.activeTab = ''
      } else {
        this.activeTab = 'PublicButton'
      }
    }
    const clock = new THREE.Clock();
    const raycaster = new THREE.Raycaster()
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const renderer = this.$refs.renderer.renderer;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const scene = this.$refs.scene.scene;
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);
    const skyUniforms = sky.material.uniforms;
    skyUniforms['turbidity'].value = 20;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;
    const sun = new THREE.Vector3();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const phi = THREE.MathUtils.degToRad(88);
    const theta = THREE.MathUtils.degToRad(180);
    sun.setFromSphericalCoords(1, phi, theta);
    sky.material.uniforms['sunPosition'].value.copy(sun);
    scene.environment = pmremGenerator.fromScene(sky).texture;

    const pointLight = this.$refs.pointLight.light
    pointLight.color.setHSL(.995, .5, .9);
    pointLight.position.set(0, 45, -2000);
    const textureLoader = new THREE.TextureLoader();
    const textureFlare0 = textureLoader.load('Model/lensflare0.png');
    const textureFlare1 = textureLoader.load('Model/lensflare1.png');
    
    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement( textureFlare0, 600, 0, pointLight.color));
    lensflare.addElement(new LensflareElement( textureFlare1, 60, .6));
    lensflare.addElement(new LensflareElement( textureFlare1, 70, .7));
    lensflare.addElement(new LensflareElement( textureFlare1, 120, .9));
    lensflare.addElement(new LensflareElement( textureFlare1, 70, 1));
    pointLight.add(lensflare);
    scene.add(pointLight);

    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('Model/waternormals.jpg',  texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x0072ff,
      distortionScale: 4,
      fog: scene.fog !== undefined
    });
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();
    water.rotation.x = - Math.PI / 2;
    scene.add(water)

    const camera = this.$refs.camera.camera;
    // console.log(camera)

    const manager = new THREE.LoadingManager();
    manager.onProgress = async(url, loaded, total) => {
      if (Math.floor(loaded / total * 100) === 100) {
        this.loadingProcess = Math.floor(loaded / total * 100);
        console.log(`Island is loaded at: ${this.loadingProcess}%`);
        Animations.animateCamera(camera, orbitCtrl, { x: 0, y: 40, z: 140 }, { x: 5, y: -10, z: 0 }, 4000, () => {
          this.sceneReady = true;
        });
      } else {
        this.loadingProcess = Math.floor(loaded / total * 100);
        console.log(`Island is last loaded at: ${this.loadingProcess}%`);
        this.sceneReady = false;
      }
    };

    const loader = new GLTFLoader(manager);
    loader.load('Model/finalised_map.gltf', mesh => {
      mesh.scene.traverse(child => {
        if (child.isMesh) {
          child.material.metalness = .4;
          child.material.roughness = .6;
        }
      })
      mesh.scene.position.set(0, -2, 0);
      mesh.scene.scale.set(33, 33, 33);
      scene.add(mesh.scene);
    })

    const dirLight = this.$refs.dirLight.light;
    dirLight.color.setHSL(.1, 1, .95);
    dirLight.position.multiplyScalar(30);
    const orbitCtrl = this.$refs.renderer.three.cameraCtrl
    orbitCtrl.enableZoom = false;
    orbitCtrl.target.set(0, 0, 0);
    orbitCtrl.enableDamping = true;
    orbitCtrl.enablePan = false;
    orbitCtrl.maxPolarAngle = 1.5;
    orbitCtrl.minDistance = 50;
    orbitCtrl.maxDistance = 1200;

    const points = [
      {
        position: new THREE.Vector3(15, 35, 0),
        element: document.querySelector('.point-0')
      },
      {
        position: new THREE.Vector3(-10, 8, 24),
        element: document.querySelector('.point-1')
      },
      {
        position: new THREE.Vector3(30, 10, 70),
        element: document.querySelector('.point-2')
      },
      {
        position: new THREE.Vector3(-15, 30, -20),
        element: document.querySelector('.point-3')
      },
      {
      position: new THREE.Vector3(-20, 10, 70),
        element: document.querySelector('.point-4')
      },
    ];

    for (const point of points) {
        if (point.element.classList.contains('visible')) {
          point.element.classList.remove('visible');
      }
    }

    document.querySelectorAll('.point').forEach(item => {
      item.addEventListener('click', event => {
        let className = event.target.classList[event.target.classList.length - 1];
        // console.log(className);
        switch(className) {
          case 'label-west':
            this.filterchoice = 'West'
            document.getElementById('west').classList.add('clicked')
            document.getElementById('north').classList.remove('clicked')
            document.getElementById('east').classList.remove('clicked')
            document.getElementById('central').classList.remove('clicked')
            break;
          
          case 'label-north':
            this.filterchoice = 'North'
            document.getElementById('west').classList.remove('clicked')
            document.getElementById('north').classList.add('clicked')
            document.getElementById('east').classList.remove('clicked')
            document.getElementById('central').classList.remove('clicked')
            break;

          case 'label-central':
            this.filterchoice = 'Central'
            document.getElementById('west').classList.remove('clicked')
            document.getElementById('north').classList.remove('clicked')
            document.getElementById('east').classList.remove('clicked')
            document.getElementById('central').classList.add('clicked')
            break

          case 'label-east':
            this.filterchoice = 'East'
            document.getElementById('west').classList.remove('clicked')
            document.getElementById('north').classList.remove('clicked')
            document.getElementById('east').classList.add('clicked')
            document.getElementById('central').classList.remove('clicked')
            break

          case 'label-reset':
            this.filterchoice = 'All'
            document.getElementById('west').classList.remove('clicked')
            document.getElementById('north').classList.remove('clicked')
            document.getElementById('east').classList.remove('clicked')
            document.getElementById('central').classList.remove('clicked')
            break
        }
      }, false);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      water.material.uniforms['time'].value += 1.0 / 60.0;
      orbitCtrl && orbitCtrl.update();
      const delta = clock.getDelta();
      this.mixers && this.mixers.forEach(item => {
        item.update(delta);
    });

    const timer = Date.now() * 0.0005;
    TWEEN && TWEEN.update();
    camera && (camera.position.y += Math.sin(timer) * .05);

    if (this.sceneReady == true) {
      for (const point of points) {
        const screenPosition = point.position.clone();
        screenPosition.project(camera);
        raycaster.setFromCamera(screenPosition, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length === 0) {
          point.element.classList.add('visible');
        } else {
          const intersectionDistance = intersects[0].distance;
          const pointDistance = point.position.distanceTo(camera.position);
          intersectionDistance < pointDistance ? point.element.classList.remove('visible') : point.element.classList.add('visible');
        }
          const translateX = screenPosition.x * sizes.width * 0.5;
          const translateY = - screenPosition.y * sizes.height * 0.5;
          point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
        }
      }
      renderer.render(scene, camera);
    }
    animate()
  },
  created() {
    getuserid().then((value)=>{
      // console.log('my value in created' + value);
      this.uid = value
      localStorage.setItem('uid', value)
    })
    // console.log(localStorage.getItem('uid'));
    getdata().then((value) => { 
      this.fullname = value
      this.updatefullname()
    })
  },
}
</script>