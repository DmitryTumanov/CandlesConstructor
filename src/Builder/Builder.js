import "./Builder.css";
import Orbit from "./CanvasComponents/Orbit";
import { Canvas } from "@react-three/fiber";
import Candles from "./Candles/Candles";
import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  SoftShadows,
} from "@react-three/drei";
import CandleEditor from "./Editor/CandleEditor";
import {
  EffectComposer,
  Outline,
  Selection,
} from "@react-three/postprocessing";
import { candleSelectionColor } from "../Config/constants";
import { useCallback } from "react";

function Builder(props) {
  const { candles, updateCandles } = props;
  const isEditMode = candles.some((x) => x.isEditMode);
  const cameraDistanceMax = isEditMode ? 4 : 6;
  const cameraDistanceMin = isEditMode ? 2 : 4;
  const groupPosition = isEditMode ? [0, -0.8, 0] : [0, -0.4, 0];

  return (
    <div className="builder-container">
      <Canvas
        shadows
        camera={{ position: [-3, 5, 0], fov: 75, near: 0.5, far: 50 }}
      >
        <SoftShadows size={20} focus={2} samples={20} />
        <ambientLight intensity={1} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1.5}
          shadow-mapSize={1024}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, -10, 10, 0.1, 50]}
          />
        </directionalLight>
        <group position={groupPosition}>
          <Selection>
            <EffectComposer multisampling={1} autoClear={false}>
              <Outline
                blur
                visibleEdgeColor={candleSelectionColor}
                edgeStrength={8}
                width={800}
              />
            </EffectComposer>
            {!isEditMode && <Candles {...props}></Candles>}
            {isEditMode && <CandleEditor {...props}></CandleEditor>}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0, 0]}
              receiveShadow
            >
              <planeGeometry args={[100, 100]} />
              <shadowMaterial transparent opacity={0.3} />
            </mesh>
          </Selection>
        </group>
        <Orbit
          distanceMax={cameraDistanceMax}
          distanceMin={cameraDistanceMin}
        />
      </Canvas>
    </div>
  );
}

export default Builder;
