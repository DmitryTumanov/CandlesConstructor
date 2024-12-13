import { useCallback, useMemo, useState } from "react";
import "./MainMenu.css";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import { maxCandles, assembledCandlesMap } from "../../Config/constants";

function MainMenu({ candles, rerenderCandles }) {
  const [closeDropdowns, setCloseDropdowns] = useState(false);
  const selectedIndex = candles.findIndex((x) => x.isSelected);
  const isEditModeForSpecificItem = selectedIndex >= 0;

  const resetItemSelection = useCallback(() => {
    candles.forEach((x) => (x.isSelected = false));
  }, [candles]);

  const checkCandleCount = useCallback(() => {
    return candles.length < maxCandles;
  }, [candles]);

  const addNewCandle = useCallback(() => {
    resetItemSelection();
    if (!checkCandleCount()) return;
    candles.push({ isSelected: true, isEditMode: false, items: [] });
    rerenderCandles();
  }, [candles, rerenderCandles, resetItemSelection, checkCandleCount]);

  const deleteCandle = useCallback(() => {
    candles.splice(selectedIndex, 1);
    rerenderCandles();
  }, [candles, rerenderCandles, selectedIndex]);

  const openEditMode = useCallback(() => {
    candles[selectedIndex].isEditMode = true;
    rerenderCandles();
  }, [candles, rerenderCandles, selectedIndex]);

  const addAssembledCandle = useCallback(
    (x) => {
      resetItemSelection();
      if (!checkCandleCount()) return;
      const items = assembledCandlesMap[x].items;
      const candleItems = items.map((x) => {
        return {
          type: x.item,
          isSelected: false,
          isRotated: x.isRotated,
          color: x.color.color,
          colorName: x.colorName,
        };
      });
      candles.push({ isSelected: true, isEditMode: false, items: candleItems });
      rerenderCandles();
    },
    [candles, rerenderCandles, resetItemSelection]
  );

  const assembledCandles = useMemo(() =>
    Object.keys(assembledCandlesMap).map((x) => {
      return (
        <MDBDropdownItem
          link
          childTag="button"
          onClick={() => addAssembledCandle(x)}
        >
          {assembledCandlesMap[x].name}
        </MDBDropdownItem>
      );
    })
  );

  return (
    <MDBRow>
      <MDBCol md="4" sm="4" size="4">
        <MDBDropdown onClose={() => setCloseDropdowns(false)} dropup>
          <MDBDropdownToggle
            disabled={!checkCandleCount()}
            className="btn-light btn-rounded"
          >
            <MDBIcon fab icon="plus" size="lg" />
          </MDBDropdownToggle>
          <MDBDropdownMenu className="dropdown-menu" wrapper>
            <MDBDropdownItem link onClick={addNewCandle}>
              Add empty candle
            </MDBDropdownItem>
            <MDBDropdownItem preventCloseOnClick={!closeDropdowns}>
              <MDBDropdown
                onClose={() => setCloseDropdowns(!closeDropdowns)}
                dropright
                dropup
              >
                <MDBDropdownToggle
                  style={{ width: "100%", height: "100%" }}
                  className="btn-light"
                >
                  Add assembled candle
                </MDBDropdownToggle>
                <MDBDropdownMenu style={{ minWidth: "8rem" }}>
                  {assembledCandles}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBCol>
      <MDBCol md="4" sm="4" size="4">
        <MDBBtn
          className="btn-light btn-rounded"
          disabled={!isEditModeForSpecificItem}
          onClick={openEditMode}
        >
          <MDBIcon fas icon="pen" />
        </MDBBtn>
      </MDBCol>
      <MDBCol md="4" sm="4" size="4">
        <MDBBtn
          className="btn-light btn-rounded"
          disabled={!isEditModeForSpecificItem}
          onClick={deleteCandle}
        >
          <MDBIcon fas icon="trash" />
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
}

export default MainMenu;
