import './Builder.css';
import {Canvas} from "@react-three/fiber";
import Candles from './Candles/Candles';
import {AccumulativeShadows, Environment, OrbitControls, RandomizedLight, SoftShadows} from "@react-three/drei";
import CandleEditor from "./Editor/CandleEditor";
import {EffectComposer, Outline, Selection} from "@react-three/postprocessing";
import {candleSelectionColor} from "../Config/constants";
import {useCallback} from "react";

function Builder(props) {
    const {candles, updateCandles} = props;
    const isEditMode = candles.some(x => x.isEditMode);
    const cameraDistanceMax = isEditMode ? 4 : 6;
    const cameraDistanceMin = isEditMode ? 2 : 4;
    const groupPosition = isEditMode ? [0, -0.8, 0] : [0, -0.4, 0];

    return (
        <div className="builder-container">
            <Canvas shadows camera={{position: [-4.5, 1.5, 4], fov: 75}}>
                <SoftShadows size={20} focus={2} samples={20}/>
                <ambientLight intensity={1}/>
                <directionalLight castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}>
                    <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]}/>
                </directionalLight>
                <group position={groupPosition}>
                    <Selection>
                        <EffectComposer multisampling={1} autoClear={false}>
                            <Outline blur visibleEdgeColor={candleSelectionColor} edgeStrength={10} width={400}/>
                        </EffectComposer>
                        {!isEditMode && <Candles {...props}></Candles>}
                        {isEditMode && <CandleEditor {...props}></CandleEditor>}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                            <planeGeometry args={[100, 100]}/>
                            <shadowMaterial transparent opacity={0.3}/>
                        </mesh>
                    </Selection>
                </group>
                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} minDistance={cameraDistanceMin}
                               maxDistance={cameraDistanceMax}/>
            </Canvas>
        </div>
    );
}

export default Builder;