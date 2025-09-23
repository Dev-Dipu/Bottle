import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ImageWobble({ src }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Load texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load(src);

    const uniforms = {
      time: { value: 0 },
      tex: { value: texture },
      lightDirection: { value: new THREE.Vector3(0.5, 1.0, 0.8) }, // light angle
    };

    // ShaderMaterial with your shaders
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        void main() {
          vUv = uv;

          vec3 pos = position;

          // Cloth waving effect
          pos.z += sin(pos.x * 2.0 + time * 1.5) * 0.08;
          pos.z += cos(pos.y * 3.0 + time * 1.2) * 0.05;
          pos.y += sin(pos.x * 1.2 + time) * 0.03;

          vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
          vWorldPos = worldPosition.xyz;

          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D tex;
        uniform vec3 lightDirection;

        varying vec2 vUv;
        varying vec3 vWorldPos;

        void main() {
          // Recompute normals
          vec3 dx = dFdx(vWorldPos);
          vec3 dy = dFdy(vWorldPos);
          vec3 normal = normalize(cross(dx, dy));

          vec3 light = normalize(lightDirection);
          vec3 viewDir = normalize(-vWorldPos);

          // Texture color
          vec3 baseColor = texture2D(tex, vUv).rgb;

          // Diffuse lighting
          float diff = max(dot(normal, light), 0.0);

          // Very soft specular
          vec3 reflectDir = reflect(-light, normal);
          float spec = pow(max(dot(viewDir, reflectDir), 0.0), 10.0);
          spec *= 0.08;

          // Subtle fresnel
          float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.0) * 0.05;

          vec3 finalColor =
            baseColor * (0.6 + diff * 0.4) +
            vec3(1.0) * spec +
            baseColor * fresnel;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    const geo = new THREE.PlaneGeometry(2, 2, 100, 100); // higher segments for smooth wobble
    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [src]);

  return <div ref={mountRef} className="w-full h-full" />;
}
