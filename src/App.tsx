import { useEffect, useRef, useState } from "react";
import { Canvas, MeshProps } from "@react-three/fiber";
import { Camera, Mesh, Vector3 } from "three";
import {
  ArcballControls,
  Grid,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";

function DebugTools() {
  return (
    <>
      <Grid
        cellColor="white"
        args={[100, 100]}
        infiniteGrid
        sectionSize={5}
        sectionColor={0xFF0000}
        fadeDistance={30}
        fadeStrength={0.8}
      />
      <axesHelper />
      {/* <ArcballControls /> */}
      <OrbitControls
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 4}
        // minAzimuthAngle={Math.PI / 4}
        // maxAzimuthAngle={Math.PI / 4}
        enableZoom={false}
      />
    </>
  );
}
function Box(props: MeshProps) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh | null>(null);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function App() {
  const camera = useRef<Camera | null>(null);

  useEffect(() => {
    if (camera.current) {
      camera.current.lookAt(new Vector3(0, 0, 0));
    }
  }, [camera]);

  return (
    <Canvas>
      <PerspectiveCamera ref={camera} makeDefault name="FBO Camera" position={[10, 10, 10]} />
      {/* <OrthographicCamera makeDefault ref={camera} position={[10, 10, 10]} zoom={50} /> */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <DebugTools />
    </Canvas>
  );
}

export default App;
