import { useRef, useState } from "react";
import { Canvas, MeshProps } from "@react-three/fiber";
import { Mesh } from "three";
import { CameraControlSetup } from "./modules/CameraControlSetup";
import { DebugToolsSetup } from "./modules/DebugToolsSetup";
import { CameraSetup } from "./modules/CameraSetup";
import { InputControlSetup } from "./modules/InputControlSetup";
import { Pawn, TYPE } from "./components/Pawn";

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Pawn position={[0, 0, 2]} type={TYPE.PERSON} color={0xffffff} />
      <Pawn position={[2, 0, 0]} type={TYPE.ITEM} color={0xff0000} />

      {/* Global Modules Setup */}
      <InputControlSetup />
      <DebugToolsSetup />
      <CameraSetup />
      <CameraControlSetup />
    </Canvas>
  );
}

export default App;
