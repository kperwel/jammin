import { OrbitControls } from "@react-three/drei";

export function CameraControlSetup() {
  return (
    <OrbitControls
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 4}
      // minAzimuthAngle={Math.PI / 4}
      // maxAzimuthAngle={Math.PI / 4}
      enableZoom={false}
    />
  );
}
