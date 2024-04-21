import {useCallback} from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from "mdb-react-ui-kit";

function MainMenu({candles, rerenderCandles}) {
    const selectedIndex = candles.findIndex((x) => x.isSelected);
    const isEditModeForSpecificItem = selectedIndex >= 0;
    
    const resetItemSelection = useCallback(() => {
        candles.forEach((x) => x.isSelected = false);
    }, [candles]);

    const addNewCandle = useCallback(() => {
        resetItemSelection();
        candles.push({isSelected: true, isEditMode: false, items: []});
        rerenderCandles();
    }, [candles, rerenderCandles, resetItemSelection]);
    
    const deleteCandle = useCallback(() => {
        candles.splice(selectedIndex, 1);
        rerenderCandles();
    }, [candles, rerenderCandles, selectedIndex]);
    
    const openEditMode = useCallback(() => {
        candles[selectedIndex].isEditMode = true;
        rerenderCandles();
    },[candles, rerenderCandles, selectedIndex]);

    return (
        <MDBRow>
            <MDBCol md='4' sm='4' size='4'>
                <MDBBtn className='btn-light btn-rounded' onClick={addNewCandle}>
                    <MDBIcon fas icon="plus"/>
                </MDBBtn>
            </MDBCol>
            <MDBCol md='4' sm='4' size='4'>
                <MDBBtn className='btn-light btn-rounded' disabled={!isEditModeForSpecificItem} onClick={openEditMode}>
                    <MDBIcon fas icon="pen"/>
                </MDBBtn>
            </MDBCol>
            <MDBCol md='4' sm='4' size='4'>
                <MDBBtn className='btn-light btn-rounded' disabled={!isEditModeForSpecificItem} onClick={deleteCandle}>
                    <MDBIcon fas icon="trash"/>
                </MDBBtn>
            </MDBCol>
        </MDBRow>
    );
}

export default MainMenu;