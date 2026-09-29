import { useRef, Suspense } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';

interface Heritage3DViewerProps {
  imageSrc: string;
}

function Sphere({ imageSrc }: { imageSrc: string }) {
  const texture = useLoader(THREE.TextureLoader, imageSrc);
  const meshRef = useRef<THREE.Mesh>(null);

  // Slowly rotate the sphere if we want an auto-pan effect
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Heritage3DViewer({ imageSrc }: Heritage3DViewerProps) {
  return (
    <div className="w-full h-full relative cursor-move">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={-0.5}
          minDistance={10}
          maxDistance={400}
        />
        <Suspense fallback={null}>
          <Sphere imageSrc={imageSrc} />
          <Preload all />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black/60 backdrop-blur-md rounded-full text-white text-sm pointer-events-none z-10 flex flex-col items-center gap-1">
        <span className="font-bold tracking-wider">360° EXPLORATION</span>
        <span className="text-xs text-cream/70">Drag to look around • Scroll to zoom</span>
      </div>
    </div>
  );
}
