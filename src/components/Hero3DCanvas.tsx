import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import heroStatue from '../assets/hero-statue.png';

interface Hero3DCanvasProps {
  mouseX: number;
  mouseY: number;
}

const checkWebglSupported = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
};

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ mouseX, mouseY }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable] = useState(checkWebglSupported);

  useEffect(() => {
    if (!webglAvailable) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 200;
    const height = container.clientHeight || 200;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let sculptureGroup: THREE.Group;
    let marbleMaterial: THREE.MeshStandardMaterial;
    let pedestalMaterial: THREE.MeshStandardMaterial;
    let geometries: THREE.BufferGeometry[] = [];

    try {
      // 1. Scene & Camera Setup (Tight, focused framing)
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
      camera.position.set(0, 0.1, 3.6);

      // 2. High-Performance Alpha-Enabled WebGL Renderer
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      container.appendChild(renderer.domElement);

      // 3. Soft Studio Lighting (Restrained, neutral, elegant)
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfff8f0, 2.2);
      keyLight.position.set(2.5, 3.5, 2.5);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xdbe6f5, 1.2);
      fillLight.position.set(-2.5, 1.2, 2);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
      rimLight.position.set(0, 3, -2.5);
      scene.add(rimLight);

      // 4. Refined Sculptural Thinker Bust Group
      sculptureGroup = new THREE.Group();

      // Soft Marble PBR Material (Refined warm stone tone)
      marbleMaterial = new THREE.MeshStandardMaterial({
        color: 0xf6f3eb,
        roughness: 0.38,
        metalness: 0.04,
        flatShading: false,
      });

      pedestalMaterial = new THREE.MeshStandardMaterial({
        color: 0xede9e0,
        roughness: 0.48,
        metalness: 0.03,
      });

      // Head / Cranium
      const headGeo = new THREE.SphereGeometry(0.48, 32, 32);
      headGeo.scale(1, 1.16, 1.04);
      geometries.push(headGeo);
      const head = new THREE.Mesh(headGeo, marbleMaterial);
      head.position.set(0, 0.48, 0);
      sculptureGroup.add(head);

      // Brow Arch
      const browGeo = new THREE.BoxGeometry(0.5, 0.13, 0.2);
      geometries.push(browGeo);
      const brow = new THREE.Mesh(browGeo, marbleMaterial);
      brow.position.set(0, 0.62, 0.38);
      brow.rotation.x = -0.15;
      sculptureGroup.add(brow);

      // Classical Beard volume
      const beardGeo = new THREE.ConeGeometry(0.36, 0.55, 20);
      beardGeo.rotateX(Math.PI);
      geometries.push(beardGeo);
      const beard = new THREE.Mesh(beardGeo, marbleMaterial);
      beard.position.set(0, 0.17, 0.25);
      sculptureGroup.add(beard);

      // Nose
      const noseGeo = new THREE.ConeGeometry(0.09, 0.28, 16);
      geometries.push(noseGeo);
      const nose = new THREE.Mesh(noseGeo, marbleMaterial);
      nose.position.set(0, 0.48, 0.46);
      nose.rotation.x = 0.2;
      sculptureGroup.add(nose);

      // Thoughtful Arm touching chin
      const armGeo = new THREE.CylinderGeometry(0.12, 0.17, 0.72, 18);
      geometries.push(armGeo);
      const arm = new THREE.Mesh(armGeo, marbleMaterial);
      arm.position.set(0.23, -0.05, 0.29);
      arm.rotation.z = -0.55;
      arm.rotation.x = 0.4;
      sculptureGroup.add(arm);

      const handGeo = new THREE.SphereGeometry(0.15, 18, 18);
      handGeo.scale(1, 1.25, 0.75);
      geometries.push(handGeo);
      const hand = new THREE.Mesh(handGeo, marbleMaterial);
      hand.position.set(0.04, 0.21, 0.4);
      sculptureGroup.add(hand);

      // Torso & Shoulders
      const torsoGeo = new THREE.CylinderGeometry(0.55, 0.76, 0.82, 28);
      torsoGeo.scale(1.15, 1, 0.85);
      geometries.push(torsoGeo);
      const torso = new THREE.Mesh(torsoGeo, marbleMaterial);
      torso.position.set(0, -0.34, 0);
      sculptureGroup.add(torso);

      // Toga Cowl
      const drapeGeo = new THREE.TorusGeometry(0.59, 0.14, 16, 32, Math.PI * 1.15);
      drapeGeo.rotateZ(Math.PI * 0.1);
      geometries.push(drapeGeo);
      const drape = new THREE.Mesh(drapeGeo, marbleMaterial);
      drape.position.set(-0.08, -0.19, 0.17);
      sculptureGroup.add(drape);

      // Pedestal
      const baseGeo = new THREE.CylinderGeometry(0.4, 0.48, 0.17, 28);
      geometries.push(baseGeo);
      const base = new THREE.Mesh(baseGeo, pedestalMaterial);
      base.position.set(0, -0.78, 0);
      sculptureGroup.add(base);

      sculptureGroup.position.set(0, -0.04, 0);
      sculptureGroup.scale.set(0.8, 0.8, 0.8);
      scene.add(sculptureGroup);
    } catch (e) {
      console.warn('WebGL initialization fallback triggered:', e);
      return;
    }

    // 5. Subtle Damped Rotation (Max X: ±3° / 0.05 rad, Max Y: ±5° / 0.08 rad)
    let animationFrameId: number;
    const startTime = performance.now();

    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    const render = () => {
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Subtle mouse tracking (±5 degrees max)
      targetRotY = (mouseX / 300) * 0.08;
      targetRotX = (mouseY / 300) * 0.05;

      currentRotY += (targetRotY - currentRotY) * 0.04;
      currentRotX += (targetRotX - currentRotX) * 0.04;

      if (sculptureGroup) {
        sculptureGroup.rotation.y = currentRotY + Math.sin(elapsedTime * 0.35) * 0.012;
        sculptureGroup.rotation.x = currentRotX + Math.cos(elapsedTime * 0.3) * 0.008;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

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
      if (marbleMaterial) marbleMaterial.dispose();
      if (pedestalMaterial) pedestalMaterial.dispose();
      geometries.forEach((g) => g.dispose());
    };
  }, [mouseX, mouseY, webglAvailable]);

  if (!webglAvailable) {
    return (
      <div className="w-full h-full flex items-center justify-center mix-blend-multiply pointer-events-none">
        <img 
          src={heroStatue} 
          alt="Artistic Thinker Sculpture Cutout" 
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center relative pointer-events-none"
    />
  );
};
