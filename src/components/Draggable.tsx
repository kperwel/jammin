import { animated, useSpring } from "@react-spring/three";
import { Plane } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Vector3Tuple } from "three";
import { create } from "zustand";
import { useCameraControlStore } from "../modules/CameraControlSetup";

interface DraggablePropsType {
  children: React.ReactNode;
}

interface DragSurfacePropTypes {
  children: React.ReactNode;
}

type Callback = (position: Vector3Tuple) => void;

interface DragStore {
  onMouseMove: Callback | null;
  setOnMouseMove: (onMouseMove: Callback | null) => void;
}

export const useDragStore = create<DragStore>((set) => ({
  onMouseMove: null,
  setOnMouseMove: (onMouseMove) => set({ onMouseMove }),
}));

export function DragSurface({ children }: DragSurfacePropTypes) {
  const snap = false;
  const lastMouseMove = useRef([0, 0, 0] as Vector3Tuple);
  const [enableCameraControl, disableCameraControl] = useCameraControlStore(
    (state) => [state.enable, state.disable]
  );
  const [onMouseMove, setOnMouseMove] = useDragStore((state) => [
    state.onMouseMove,
    state.setOnMouseMove,
  ]);
  const onPointerMove = ({ point }: ThreeEvent<PointerEvent>) => {
    const position: Vector3Tuple = [point.x, point.y, point.z];
    lastMouseMove.current = position;
    onMouseMove?.(position);
  };

  const onPointerUp = () => {
    if (snap) {
      onMouseMove?.([
        Math.round(lastMouseMove.current[0] / 5) * 5,
        Math.round(lastMouseMove.current[1] / 5) * 5,
        Math.round(lastMouseMove.current[2] / 5) * 5,
      ]);
    }
    setOnMouseMove(null);
  };

  useEffect(() => {
    if (onMouseMove === null) {
      enableCameraControl();
    } else {
      disableCameraControl();
    }
  }, [onMouseMove]);

  return (
    <>
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        visible={false}
      />
      {children}
    </>
  );
}

function Draggable({ children }: DraggablePropsType) {
  const [onMouseMove, setOnMouseMove] = useDragStore((state) => [
    state.onMouseMove,
    state.setOnMouseMove,
  ]);
  const [enableCameraControl, disableCameraControl] = useCameraControlStore(
    (state) => [state.enable, state.disable]
  );

  const [props, api] = useSpring(() => ({
    position: [0, 0, 0] as Vector3Tuple,
  }));

  const callback = useCallback(
    (position: Vector3Tuple) => {
      api.set({ position });
    },
    [api]
  );

  //   const isDragging = onMouseMove === callback;
  const onPointerDown = () => {
    setOnMouseMove(callback);
  };

  // Bind it to a component
  return (
    <animated.group {...props} onPointerDown={onPointerDown}>
      {children}
    </animated.group>
  );
  //   return <PivotControls>{children}</PivotControls>;
}
const MemoizedDraggable = memo(Draggable);
export { MemoizedDraggable as Draggable };
