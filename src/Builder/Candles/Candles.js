import CandleModel from './CandleModel';

function Candles(props) {
    const {candles} = props;
    const step = 1;
    let rightX = (candles.length - 1) * step / 2;
    let candleModels = candles.map((x, i) => {
        const position = [(rightX - (step * i)) * -1, 0, 0];
        return (<CandleModel key={i} position={position} scale={[1, 1, 1]} isSelected={x.isSelected} candle={x} {...props}></CandleModel>);
    });

    return (
        <mesh>
            {candleModels}
        </mesh>
    );
}

export default Candles;