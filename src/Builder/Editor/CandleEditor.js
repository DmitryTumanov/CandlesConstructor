import { useEffect } from "react";
import CandleModel from "../Candles/CandleModel";
import { useThree } from "@react-three/fiber";
function CandleEditor(props) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(-2, 3, -2);
    camera.lookAt(0, 0, 0);
  }, []);
  const { candles, updateCandles } = props;
  const candle = candles.find((x) => x.isEditMode);

  return (
    <mesh>
      <CandleModel
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        candle={candle}
        {...props}
      ></CandleModel>
    </mesh>
  );
}

export default CandleEditor;
