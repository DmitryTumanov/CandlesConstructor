import CandleModel from "../Candles/CandleModel";

function CandleEditor(props) {
    const {candles, updateCandles} = props;
    const candle = candles.find((x) => x.isEditMode);

    return (
        <mesh>
            <CandleModel position={[0, 0, 0]} scale={[1, 1, 1]} candle={candle} {...props}></CandleModel>
        </mesh>
    );
}

export default CandleEditor;