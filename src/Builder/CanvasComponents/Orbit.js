import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { MDBSwitch } from "mdb-react-ui-kit";
import { useRef } from "react";

function Orbit(props) {
  const { maxDistance, minDistance } = props;
  const orbitCamera = useRef();
  useThree(({ camera }) => {
    orbitCamera.current = camera;
  });

  return (
    <OrbitControls
      camera={orbitCamera.current}
      enableRotate
      enablePan={false}
      enableDamping
      autoRotateSpeed={5}
      maxDistance={maxDistance}
      minDistance={minDistance}
    />
  );
}

export default Orbit;
