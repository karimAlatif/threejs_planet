import "./index.css";
import React, { Component } from "react";
import * as THREE from "three";
import Orbitcontrols from "three-orbitcontrols";
class Scene extends Component {
  componentDidMount() {
    this.initScene();
  }
  initScene () {
    this.camera =null;
    this.scene = null;
    this.renderer = null;
    this.orbitControls = null;

    this.container = document.getElementById("WebGL-output");
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.loadingManager = null;
    this.RESOURCES_LOADED = false;

    this.loadingScreen = {//EmptyScene
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(60, this.width / this.height, 1, 2000)
    };

    this.Shaders = {
      earth: {
        uniforms: {
          texture1: { type: "t", value: null },
          power : {value:3.0}
        },
        vertexShader: [
          "varying vec3 vNormal;",
          "varying vec2 vUv;",
          "void main() {",
          "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
          "vNormal = normalize( normalMatrix * normal );",
          "vUv = uv;",
          "}"
        ].join("\n"),
        fragmentShader: [
          "uniform sampler2D texture1;",
          "uniform float power;",
          "varying vec3 vNormal;",
          "varying vec2 vUv;",
          "void main() {",
          "vec3 diffuse = texture2D( texture1, vUv ).xyz;",
          "float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );",
          "vec3 atmosphere = vec3( 10, 10, 10 ) * pow( intensity, power);",
          "gl_FragColor = vec4( diffuse + atmosphere, 1.0 );",
          "}"
        ].join("\n")
      },
      atmosphere: {
        uniforms: {},
        vertexShader: [
          "varying vec3 vNormal;",
          "void main() {",
          "vNormal = normalize( normalMatrix * normal );",
          "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
          "}"
        ].join("\n"),
        fragmentShader: [
          "varying vec3 vNormal;",
          "void main() {",
          "float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );",
          "gl_FragColor = vec4( 2, 2, 2, 2 ) * intensity;",
          "}"
        ].join("\n")
      }
    };

    this.alpha = 0;
    this.intensityPowerKey = null;

    //Start create the environment
    this.initEnvironment();
    window.addEventListener( 'resize', (e) => {
      if(!this.renderer)
        return
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

    }, false );

    this.animate();
  }
  initEnvironment () {
    // Init scene
    this.scene = new THREE.Scene();

    // Create a loading screen
    this.loadingManager = new THREE.LoadingManager();
    this.loadingManager.onProgress = function() {};
    this.loadingManager.onLoad = () => {
        this.RESOURCES_LOADED = true;
    };

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);

    // Init camera and perspective
    this.camera = new THREE.PerspectiveCamera(65, this.width / this.height, 1, 2000);
    this.camera.position.x = 0;
    this.camera.position.y = 300;
    this.camera.position.z = 400;
    this.camera.lookAt(this.scene.position);

   // Orbitcontrols
    this.orbitControls = new Orbitcontrols(this.camera, this.renderer.domElement);
    this.orbitControls.enablePan = false;
    this.orbitControls.autoRotate = true;
    this.orbitControls.autoRotateSpeed = 0.2;
    this.orbitControls.enableZoom = false;
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.15; // friction factor
    this.orbitControls.rotateSpeed = 0.1; // mouse sensitivity

   // Lights
    let ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.position.set(-10, 15, 500);
    this.scene.add(ambientLight);

    let pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-10, 15, 500);
    this.scene.add(pointLight);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-10, 15, 500);
    this.scene.add(spotLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(-10, 15, 500);
    this.scene.add(directionalLight);

   // Texture
   let backgroundLoader = new THREE.CubeTextureLoader(this.loadingManager);
   let planetTexture = require("./assets/imgs/planets/world.jpg");
   let backgroundTexture = require("./assets/imgs/planets/stars.jpg");

   // Load planet texture /w atmosphere
   var geometry = new THREE.SphereGeometry(210, 256, 256);

   let earthShader = this.Shaders["earth"];
   let atmoShader = this.Shaders["atmosphere"];

   let e_uniforms = THREE.UniformsUtils.clone(earthShader.uniforms);
   let a_uniforms = THREE.UniformsUtils.clone(atmoShader.uniforms);

   e_uniforms["texture1"].value = THREE.ImageUtils.loadTexture(planetTexture);
   this.intensityPowerKey = e_uniforms["power"];

  let material = new THREE.ShaderMaterial({
     uniforms: e_uniforms,
     vertexShader: earthShader.vertexShader,
     fragmentShader: earthShader.fragmentShader
   });

   let earthmesh = new THREE.Mesh(geometry, material);
   this.scene.add(earthmesh);

   //Create atmoSphere mesh
   material = new THREE.ShaderMaterial({
    uniforms: a_uniforms,
    vertexShader: atmoShader.vertexShader,
    fragmentShader: atmoShader.fragmentShader,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
   });

   let atmoMesh = new THREE.Mesh(geometry, material);
   atmoMesh.scale.set(1.2, 1.2, 1.2);
   this.scene.add(atmoMesh);

   // Load background texture (cube)
   backgroundLoader.load(
     [
       backgroundTexture,
       backgroundTexture,
       backgroundTexture,
       backgroundTexture,
       backgroundTexture,
       backgroundTexture
     ],
      (texture) => {
        console.log("reacdy ",texture)
       this.scene.background = texture;
     }
   );
  }
  animate () {
    if (this.RESOURCES_LOADED === false) {
      requestAnimationFrame(()=> this.animate());
      this.renderer.render(this.loadingScreen.scene, this.loadingScreen.camera);
      return;
    }
    requestAnimationFrame(()=> this.animate());
    this.orbitControls.update(); 
    this.renderScene();
  }
  renderScene () {
    this.alpha += 0.07;
    this.intensityPowerKey.value = 5.5 + Math.cos(this.alpha) * -1 + -1;        
    this.scene.rotation.y += 0.001;
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return <div id="WebGL-output" />;
  }
}

export default Scene;
