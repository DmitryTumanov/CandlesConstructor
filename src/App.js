import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Builder from './Builder/Builder';
import OrderCart from './OrderCart/OrderCart';
import FooterMenu from './FooterMenu/FooterMenu';
import {useCallback, useEffect, useState} from 'react';

function App() {
    const storage = getCurrentStorage();
    const [candles, updateCandles] = useState([]);

    useEffect(() => {
        if ((!candles || !candles.length) && storage) {
            const cached = JSON.parse(storage.getItem("candles"));
            if (!!cached && cached.length > 0) {
                updateCandles(cached);
            }
        }
    }, [candles, storage]);

    const updateCandlesCache = useCallback(() => {
        if (storage) {
            storage.setItem("candles", JSON.stringify(candles));
            updateCandles([...candles]);
        }
    }, [candles, updateCandles, storage]);

    return (
        <div>
            <Builder candles={candles} updateCandles={updateCandlesCache}></Builder>
            <OrderCart candles={candles}></OrderCart>
            <FooterMenu candles={candles} updateCandles={updateCandlesCache}></FooterMenu>
        </div>
    );
}

function getCurrentStorage() {
    switch (process.env.REACT_APP_CACHE_TYPE) {
        case 'local':
            return localStorage;
        case 'session':
            return sessionStorage;
        case 'none':
        default:
            return null;
    }
}

export default App;
