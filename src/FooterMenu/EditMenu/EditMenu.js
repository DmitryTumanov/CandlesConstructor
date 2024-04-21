import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem, MDBIcon, MDBBtn
} from 'mdb-react-ui-kit';
import {useCallback, useMemo, useState} from "react";
import './EditMenu.css';
import {colorsConfig, defaultCandleColor, defaultCandleItemColor} from "../../Config/constants";

function EditMenu({candle, rerenderCandles}) {
    //todo: use useMemo
    const selectedCandleItem = candle.items.find((x) => x.isSelected);
    const getSelectedCandleItem = useCallback(() => candle.items.find((x) => x.isSelected), [candle]);
    const isEditModeForSpecificItem = useMemo(() => !!selectedCandleItem, [selectedCandleItem]);

    const resetItemSelection = useCallback(() => {
        candle.items.forEach((y) => y.isSelected = false);
    }, [candle]);

    const exitEditMode = useCallback(() => {
        resetItemSelection();
        candle.isEditMode = false;
        rerenderCandles();
    }, [resetItemSelection, candle, rerenderCandles]);

    const addCandleItem = useCallback((itemType) => () => {
        resetItemSelection();
        candle.items.push({
            type: itemType,
            isSelected: true,
            isRotated: false,
            color: defaultCandleItemColor
        });
        rerenderCandles();
    }, [resetItemSelection, candle, rerenderCandles]);

    const removeCandleItem = useCallback(() => {
        candle.items = candle.items.filter((x) => !x.isSelected);
        rerenderCandles();
    }, [candle, rerenderCandles]);

    const rotateCandleItem = useCallback(() => {
        const selectedCandleItem = getSelectedCandleItem();
        if (selectedCandleItem) {
            selectedCandleItem.isRotated = !selectedCandleItem.isRotated;
            rerenderCandles();
        }
    }, [getSelectedCandleItem, rerenderCandles]);

    const changeItemColor = useCallback((color) => () => {
        const selectedCandleItem = getSelectedCandleItem();
        if (selectedCandleItem) {
            selectedCandleItem.color = color;
            rerenderCandles();
        }
    }, [getSelectedCandleItem, rerenderCandles]);

    const colorItems = useMemo(() => Object.keys(colorsConfig).map((x) => {
        const color = colorsConfig[x].color;
        return (
            <MDBDropdownItem
                key={x}
                link
                childTag='button'
                style={{...colorsConfig[x]}}
                onClick={changeItemColor(color)}
            >
                {color === getSelectedCandleItem()?.color ? (<MDBIcon fas icon='check' size='md'/>) : null}{x}
            </MDBDropdownItem>
        );
    }), [changeItemColor, getSelectedCandleItem]);

    return (
        <MDBRow>
            <MDBCol md='3' sm='3' size='3'>
                <MDBDropdown dropup>
                    <MDBDropdownToggle className='btn-light btn-rounded'>
                        <MDBIcon fab icon='plus' size='lg'/>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(1)}>Arc</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(2)}>Big
                            Cylinder</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(3)}>Cylinder</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(4)}>Flower</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(5)}>Gear</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(6)}>Hemisphere</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(7)}>Ribbed
                            Cylinder</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(8)}>Ribbed
                            Frustum</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(9)}>Ribbed
                            Hemisphere</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(10)}>Ribbed
                            Sphere</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(11)}>Ribbed
                            Square</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(12)}>Ring</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(13)}>Small
                            Cilynder</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(14)}>Sphere</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(15)}>Ufo</MDBDropdownItem>
                        <MDBDropdownItem link childTag='button' onClick={addCandleItem(16)}>Volumetric
                            Flower</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBCol>
            <MDBCol md='2' sm='2' size='2'>
                <MDBBtn className='btn-light btn-rounded' disabled={!isEditModeForSpecificItem}
                        onClick={removeCandleItem}>
                    <MDBIcon fas icon="trash"/>
                </MDBBtn>
            </MDBCol>
            <MDBCol md='2' sm='2' size='2'>
                <MDBBtn className='btn-light btn-rounded' disabled={!isEditModeForSpecificItem}
                        onClick={rotateCandleItem}>
                    <MDBIcon fas icon="sync"/>
                </MDBBtn>
            </MDBCol>
            <MDBCol md='2' sm='2' size='2'>
                <MDBDropdown dropup>
                    <MDBDropdownToggle className='btn-light btn-rounded' disabled={!isEditModeForSpecificItem}>
                        <MDBIcon fas icon="brush"/>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className='colors-dropdown'>
                        {colorItems}
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBCol>
            <MDBCol md='3' sm='3' size='3'>
                <MDBBtn onClick={exitEditMode} className='btn-light btn-rounded'>
                    <MDBIcon fas icon="angle-left"/>
                </MDBBtn>
            </MDBCol>
        </MDBRow>
    );
}

export default EditMenu;