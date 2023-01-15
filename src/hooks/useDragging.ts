import { Vector2 } from "@react-three/fiber";
import { useCallback, useMemo, useState } from "react";
import { useCameraControlStore } from "../modules/CameraControlSetup";

interface Dragging {
  start: () => void;
  stop: () => void;
}

type onDragged = (start: Vector2, end: Vector2, distance: Vector2) => void

export function useDragging(onDragged: onDragged): Dragging {
  const enableCameraMovement = useCameraControlStore((state) => state.enable);
  const disableCameraMovement = useCameraControlStore((state) => state.disable);
  const [isDragging, setIsDragging] = useState(false);

  const start = useCallback(() => {
    setIsDragging(true);
    disableCameraMovement();
  }, []);

  const stop = useCallback(() => {
    setIsDragging(true);
    enableCameraMovement();
  }, []);

  return useMemo(() => ({ start, stop }), [start, stop]);
}
