import React, { useEffect } from 'react';
import * as THREE from 'three';

const BackgroundCanvas = (props: any) => {
  let scene: any,
    camera: any,
    renderer: any,
    container: any,
    aspect,
    fov,
    plane,
    far,
    mouseX: any,
    mouseY: any,
    windowHalfX: any,
    windowHalfY: any,
    geometry,
    starStuff,
    materialOptions,
    stars;

  useEffect(() => {
    init();
    animate();
  }, [])

  function init() {
    const loginDom = document.getElementById("back_dom");
    if (loginDom) {
      container = document.createElement(`div`);
      loginDom.appendChild(container)
      container.id = 'background_canvas';
      container.style.position = 'absolute';
      container.style.top = '0';
      container.style.left = '0';
      container.style.zIndex = '99';
      container.style.background = 'linear-gradient(-190deg, #4A4EA4 65%, #E884A1)';
    }

    mouseX = 0;
    mouseY = 0;

    aspect = window.innerWidth / window.innerHeight;
    fov = 40;
    plane = 1;
    far = 800;

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera = new THREE.PerspectiveCamera(
      fov,
      aspect,
      plane,
      far
    );

    camera.position.z = far / 2;

    // scene = new THREE.Scene({ antialias: true });
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1b1b1b, 0.0001);

    starForge();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onMouseMove, false);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (-mouseY - camera.position.y) * 0.005;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function starForge() {
    var amount = 45000;
    geometry = new THREE.SphereGeometry(1000, 100, 50);

    materialOptions = {
      color: new THREE.Color(0xffffff),
      size: 1.1,
      // transparency: true,
      opacity: 0.8
    };

    starStuff = new THREE.PointsMaterial(materialOptions);


    for (var i = 0; i < amount; i++) {
      var item = new THREE.Vector3();
      item.x = Math.random() * 2000 - 1000;
      item.y = Math.random() * 2000 - 1000;
      item.z = Math.random() * 2000 - 1000;

      geometry.vertices.push(item);
    }

    stars = new THREE.Points(geometry, starStuff);
    scene.add(stars);
  }

  function onMouseMove(e: any) {
    mouseX = e.clientX - windowHalfX;
    mouseY = e.clientY - windowHalfY;
  }
  return (
    <div>

    </div>
  )
}

export default BackgroundCanvas