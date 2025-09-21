import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Scene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // transparent background ✅

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.32);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha ✅
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // Load Bottle Model
    const loader = new GLTFLoader();
    let bottle;
    loader.load("/bottle/wine_bottle.glb", (gltf) => {
      bottle = gltf.scene;
      bottle.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.map.encoding = THREE.sRGBEncoding;
          child.material.needsUpdate = true;
          child.material.envMapIntensity = 1.2;
        }
      });
      bottle.position.set(0, -0.14, 0);
      scene.add(bottle);
    });

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (bottle) {
        bottle.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        background: "transparent", // CSS transparent ✅
      }}
    />
  );
}
