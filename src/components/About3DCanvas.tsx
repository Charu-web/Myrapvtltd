import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const checkWebglSupported = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
};

export const About3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable] = useState(checkWebglSupported);

  useEffect(() => {
    if (!webglAvailable) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 240;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let mesh: THREE.Mesh;
    let wireMesh: THREE.Mesh;
    let geometry: THREE.IcosahedronGeometry;
    let material: THREE.MeshStandardMaterial;
    let wireGeo: THREE.IcosahedronGeometry;
    let wireMat: THREE.MeshBasicMaterial;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
      camera.position.set(0, 0, 3.6);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0x2b4b7c, 2.5);
      keyLight.position.set(3, 3, 2);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffeedd, 1.5);
      fillLight.position.set(-2, -2, 2);
      scene.add(fillLight);

      // Smooth Icosahedron Geometric sculpture
      geometry = new THREE.IcosahedronGeometry(0.9, 1);
      material = new THREE.MeshStandardMaterial({
        color: 0xf5f3ee,
        roughness: 0.35,
        metalness: 0.15,
        wireframe: false,
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Subtle outer wireframe cage
      wireGeo = new THREE.IcosahedronGeometry(1.15, 0);
      wireMat = new THREE.MeshBasicMaterial({
        color: 0x2b4b7c,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      wireMesh = new THREE.Mesh(wireGeo, wireMat);
      scene.add(wireMesh);
    } catch (e) {
      console.warn('About3DCanvas WebGL fallback:', e);
      return;
    }

    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      const time = (performance.now() - startTime) * 0.001;
      if (mesh) {
        mesh.rotation.x = time * 0.25;
        mesh.rotation.y = time * 0.35;
        mesh.position.y = Math.sin(time * 0.9) * 0.08;
      }

      if (wireMesh) {
        wireMesh.rotation.x = -time * 0.18;
        wireMesh.rotation.y = -time * 0.22;
        wireMesh.position.y = Math.sin(time * 0.9) * 0.08;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (wireGeo) wireGeo.dispose();
      if (wireMat) wireMat.dispose();
    };
  }, [webglAvailable]);

  if (!webglAvailable) return null;

  return (
    <div 
      ref={containerRef} 
      className="w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center pointer-events-none"
    />
  );
};
