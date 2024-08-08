import CandleModel from "./CandleModel";
import { maxRows, maxCandlesInRow } from "../../Config/constants";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function Candles(props) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(-3, 5, -3);
    camera.lookAt(0, 0, 0);
  }, []);
  const { candles } = props;
  const step = 1;
  let spacesBetweenCandlesX =
    candles.length <= maxCandlesInRow
      ? candles.length - 1
      : maxCandlesInRow - 1;
  let rightX = (spacesBetweenCandlesX * step) / 2;
  let spacesBetweenCandlesZ = Math.floor(
    (candles.length - 1) / maxCandlesInRow
  );
  let rightZ = (spacesBetweenCandlesZ * step) / 2;

  let candleModels = candles.map((x, i) => {
    const position = [
      (rightX - step * (i % maxCandlesInRow)) * -1,
      0,
      (rightZ - step * Math.floor(i / maxCandlesInRow)) * -1,
    ];
    return (
      <CandleModel
        key={i}
        position={position}
        scale={[1, 1, 1]}
        isSelected={x.isSelected}
        candle={x}
        {...props}
      ></CandleModel>
    );
  });

  return <mesh>{candleModels}</mesh>;
}

export default Candles;
