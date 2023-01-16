import { OrbitControls } from "@react-three/drei";
import { Vector3, Vector3Tuple } from "three";
import { create } from "zustand";
interface CameraControlStore {
  isActive: boolean;
  enable: () => void;
  disable: () => void;
}

export const useCameraControlStore = create<CameraControlStore>((set) => ({
  isActive: true,
  enable: () => set({ isActive: true }),
  disable: () => set({ isActive: false }),
}));

export function CameraControlSetup() {
  const isActive = useCameraControlStore((state) => state.isActive);
  return isActive ? (
    <OrbitControls
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 4}
      // minAzimuthAngle={Math.PI / 4}
      // maxAzimuthAngle={Math.PI / 4}
      // enableZoom={false}
    />
  ) : null;
}
