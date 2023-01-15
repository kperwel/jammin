import { Grid } from "@react-three/drei";

export function DebugToolsSetup() {
  return (
    <>
      <Grid
        cellColor="white"
        args={[100, 100]}
        infiniteGrid
        sectionSize={5}
        sectionColor={0xff0000}
        fadeDistance={30}
        fadeStrength={0.8}
      />
      <axesHelper />
    </>
  );
}
