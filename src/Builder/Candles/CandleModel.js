import {useRef, useState, Suspense, useCallback, useEffect} from 'react';
import {Outlines, useGLTF} from '@react-three/drei';
import * as THREE from 'three'
import CandleItemModel from "./CandleItemModel";
import {Select} from "@react-three/postprocessing";
import {defaultCandleColor} from "../../Config/constants";

function CandleModel(props) {
    const {isSelected, candle, candles, position, updateCandles} = props;
    const {nodes, materials} = useGLTF('simple_candle/candle.glb');
    const positionRef = useRef(position);
    positionRef.current = [...position];
    const material = {...materials['']};
    material.emissive = new THREE.Color(defaultCandleColor);

    const openEditMode = useCallback(() => {
        candle.isEditMode = true;
        updateCandles([...candles]);
    }, [candles]);

    const selectCandle = useCallback((e) => {
        e.stopPropagation();
        candles.forEach((x) => x.isSelected = x === candle ? !x.isSelected : false);
        updateCandles([...candles]);
    }, [candles]);

    const deselectCandle = useCallback(() => {
        candle.isSelected = false;
        updateCandles([...candles]);
    }, [candles]);

    const items = candle.items.map((x, i) => {
        return (<CandleItemModel key={i} item={x} ref={positionRef} doubleClickEvent={openEditMode}
                                 {...props}></CandleItemModel>);
    });

    return (
        <Select enabled={isSelected && !candle.isEditMode} onClick={selectCandle} onPointerMissed={deselectCandle}>
            <mesh {...props} castShadow receiveShadow onDoubleClick={openEditMode} geometry={nodes.Circle.geometry}>
                <meshStandardMaterial {...material}/>
            </mesh>
            {items}
        </Select>
    );
}

export default CandleModel;