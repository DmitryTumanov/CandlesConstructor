import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Builder from './Builder/Builder';
import OrderCart from './OrderCart/OrderCart';
import FooterMenu from './FooterMenu/FooterMenu';
import {useState} from 'react';
import {candleItemsMap} from './Config/constants';
import OrderButton from './OrderCart/OrderButton';
import {useLoader} from '@react-three/fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

function App() {
    const [candles, updateCandles] = useState([]);
    const preloadModels = Object.keys(candleItemsMap).map((x) => candleItemsMap[x]);
    useLoader.preload(GLTFLoader, preloadModels);

    return (
        <div>
            <Builder candles={candles} updateCandles={updateCandles}></Builder>
            {/*<OrderCart candles={candles}></OrderCart>*/}
            <FooterMenu candles={candles} updateCandles={updateCandles}></FooterMenu>
        </div>
    );
}

export default App;
