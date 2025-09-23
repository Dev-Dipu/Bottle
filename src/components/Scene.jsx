import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";

export default function Scene() {
  const mountRef = useRef(null);
  const bottleRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.32);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(2, 6, 8);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xf03a52, 2);
    rimLight.position.set(-4, 4, -6);
    rimLight.color.setHSL(0, 1, 0.7);
    scene.add(rimLight);

    // Controls disable
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;

    // Load Bottle
    const loader = new GLTFLoader();
    loader.load("/bottle/wine_bottle.glb", (gltf) => {
      const bottle = gltf.scene;
      bottle.position.set(0, -0.15, 0);
      bottle.rotation.z = Math.PI / -25;
      bottle.scale.set(1.08, 1.08, 1.08);
      scene.add(bottle);
      bottleRef.current = bottle;
    });

    // Clock for animation
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      if (bottleRef.current) {
        const t = clock.getElapsedTime();

        // Floating effect
        bottleRef.current.position.y = -0.15 + Math.sin(t * 1.5) * 0.01;

        // Continuous rotation (slow)
        bottleRef.current.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Bottle rotation listener (optional extra GSAP rotation)
    const handleBottleRotate = (e) => {
      if (bottleRef.current) {
        gsap.to(bottleRef.current.rotation, {
          z: Math.PI / -25 + e.detail, // small offset
          duration: 1.2,
          ease: "power3.inOut",
        });
      }
    };
    window.addEventListener("bottleRotate", handleBottleRotate);

    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("bottleRotate", handleBottleRotate);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-screen fixed top-0 left-0"
      style={{ background: "transparent" }}
    />
  );
}
