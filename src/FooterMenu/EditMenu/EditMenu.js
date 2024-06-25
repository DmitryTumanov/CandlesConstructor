import {
    MDBRow,
    MDBCol,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem, MDBIcon, MDBBtn
} from 'mdb-react-ui-kit';
import {useCallback, useMemo} from "react";
import './EditMenu.css';
import {candleItemsMap, colorsConfig, defaultCandleItemColor, defaultCandleItemColorName} from "../../Config/constants";

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
            color: defaultCandleItemColor,
            colorName: defaultCandleItemColorName
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

    const changeItemColor = useCallback((color, colorName) => () => {
        const selectedCandleItem = getSelectedCandleItem();
        if (selectedCandleItem) {
            selectedCandleItem.color = color;
            selectedCandleItem.colorName = colorName;
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
                onClick={changeItemColor(color, x)}
            >
                {color === getSelectedCandleItem()?.color ? (<MDBIcon fas icon='check' size='md'/>) : null}{x}
            </MDBDropdownItem>
        );
    }), [changeItemColor, getSelectedCandleItem]);

    const candleItems = useMemo(() => Object.keys(candleItemsMap).slice(1).map((x) => {
        return (
            <MDBDropdownItem link childTag='button' onClick={addCandleItem(x)}>
                {candleItemsMap[x].name}
            </MDBDropdownItem>
        );
    }), [addCandleItem]);

    return (
        <MDBRow>
            <MDBCol md='3' sm='3' size='3'>
                <MDBDropdown dropup>
                    <MDBDropdownToggle className='btn-light btn-rounded'>
                        <MDBIcon fab icon='plus' size='lg'/>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        {candleItems}
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