import { PerspectiveCamera } from "@react-three/drei";

export function CameraSetup() {
  return (
    <>
      {/* <OrthographicCamera makeDefault ref={camera} position={[10, 10, 10]} zoom={50} /> */}
      <PerspectiveCamera
        makeDefault
        name="FBO Camera"
        position={[10, 10, 10]}
      />
    </>
  );
}
