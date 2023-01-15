import { animated, useSpring } from "@react-spring/three";
import { Plane } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3Tuple } from "three";
import { create } from "zustand";
import { useCameraControlStore } from "../modules/CameraControlSetup";

interface DraggablePropsType {
  children: React.ReactNode;
}

interface DragSurfacePropTypes {
  children: React.ReactNode;
}

interface DragStore {
  position: Vector3Tuple;
  setPosition: (position: Vector3Tuple) => void;
}

export const useDragStore = create<DragStore>((set) => ({
  position: [0, 0, 0],
  setPosition: (position) => set({ position }),
}));

export function DragSurface({ children }: DragSurfacePropTypes) {
  const setPosition = useDragStore((state) => state.setPosition);
  const onPointerMove = ({ point }: ThreeEvent<PointerEvent>) => {
    setPosition([point.x, point.y, point.z]);
  };
  return (
    <>
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerMove={onPointerMove}
      />
      {children}
    </>
  );
}

export function Draggable({ children }: DraggablePropsType) {
  const [enableCameraControl, disableCameraControl] = useCameraControlStore(
    (state) => [state.enable, state.disable]
  );
  const [isDragging, setIsDragging] = useState(false);
  const [props, api] = useSpring(() => ({
    position: [0, 0, 0] as Vector3Tuple,
  }));

  useEffect(() => {
    return useDragStore.subscribe(({ position }) => {
      if (isDragging) {
        disableCameraControl();
        api.set({ position });
      }
      enableCameraControl();
    });
  }, [isDragging]);

  const onPointerDown = () => {
    setIsDragging(true);
  };
  const onPointerUp = () => {
    setIsDragging(false);
  };

  // Bind it to a component
  return (
    <animated.group
      {...props}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {children}
    </animated.group>
  );
  //   return <PivotControls>{children}</PivotControls>;
}
