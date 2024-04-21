import {useRef, useState, Suspense, forwardRef, useCallback} from 'react';
import {Outlines, useGLTF} from '@react-three/drei';
import * as THREE from 'three'
import {useFrame, useLoader} from "@react-three/fiber";
import {candleItemsMap} from "../../Config/constants";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {MeshStandardMaterial} from "three";
import {Select} from "@react-three/postprocessing";

const CandleItemModel = forwardRef(function (props, ref) {
    const {item, scale, candle, candles, updateCandles} = props;
    const {nodes, materials} = useLoader(GLTFLoader, candleItemsMap[item.type]);
    const itemMesh = getItemMesh(nodes);
    const meshHeight = itemMesh.geometry.boundingBox.max.y - itemMesh.geometry.boundingBox.min.y;
    const rotation = [0, 0, item.isRotated ? Math.PI : 0];
    const material = {...materials['']};
    let newPosition = [...ref.current];

    material.emissive = new THREE.Color(item.color);
    ref.current[1] += meshHeight * scale[1];
    if (item.isRotated) {
        newPosition = [...ref.current];
    }

    const selectItem = useCallback(() => {
        candle.items.forEach((x) => x.isSelected = x === item ? !x.isSelected : false);
        updateCandles([...candles]);
    }, [candles]);

    const deselectItem = useCallback(() => {
        item.isSelected = false;
        updateCandles([...candles]);
    }, [candles]);

    return (
        <Select enabled={(item.isSelected && candle.isEditMode) || (candle.isSelected && !candle.isEditMode)}
                onClick={selectItem} onPointerMissed={deselectItem}>
            <mesh castShadow receiveShadow position={newPosition} scale={scale} rotation={rotation}
                  geometry={itemMesh.geometry}>
                <meshStandardMaterial {...material}/>
            </mesh>
        </Select>
    );

    function getItemMesh(node) {
        const keys = Object.keys(node);

        for (let i = 0; i < keys.length; i++) {
            if (node[keys[i]].type === 'Mesh') {
                return node[keys[i]];
            }
        }

        return null;
    }
})

export default CandleItemModel;