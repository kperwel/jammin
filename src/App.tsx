import { useRef, useState } from "react";
import { Canvas, MeshProps } from "@react-three/fiber";
import { Mesh } from "three";
import { CameraControlSetup } from "./modules/CameraControlSetup";
import { DebugToolsSetup } from "./modules/DebugToolsSetup";
import { CameraSetup } from "./modules/CameraSetup";
import { InputControlSetup } from "./modules/InputControlSetup";

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
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />

      {/* Global Modules Setup */}
      <InputControlSetup />
      <DebugToolsSetup />
      <CameraSetup />
      <CameraControlSetup />
    </Canvas>
  );
}

export default App;
