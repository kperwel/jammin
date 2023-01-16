import { useRef, useState } from "react";
import { Canvas, MeshProps } from "@react-three/fiber";
import { Mesh } from "three";
import { CameraControlSetup } from "./modules/CameraControlSetup";
import { DebugToolsSetup } from "./modules/DebugToolsSetup";
import { CameraSetup } from "./modules/CameraSetup";
import { InputControlSetup } from "./modules/InputControlSetup";
import { Pawn, TYPE } from "./components/Pawn";
import { Draggable, DragSurface } from "./components/Draggable";

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <DragSurface>
        <Draggable>
          <Pawn position={[0, 0, 0]} type={TYPE.PERSON} color={0xffffff} />
        </Draggable>

        <Draggable>
          <Pawn position={[0, 0, 0]} type={TYPE.ITEM} color={0xff0000} />
        </Draggable>
      </DragSurface>
      {/* Global Modules Setup */}
      <InputControlSetup />
      <DebugToolsSetup />
      <CameraSetup />
      <CameraControlSetup />
    </Canvas>
  );
}

export default App;
