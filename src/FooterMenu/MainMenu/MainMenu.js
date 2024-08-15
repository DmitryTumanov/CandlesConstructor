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
import ColorSelector from "../MenuComponents/ColorSelector";

function MainMenu({ candles, rerenderCandles }) {
  const [closeDropdowns, setCloseDropdowns] = useState(false);
  const selectedIndex = candles.findIndex((x) => x.isSelected);
  const isEditModeForSpecificItem = selectedIndex >= 0;

  const getSelectedCandle = useCallback(() => {
    return candles.find((x) => x.isSelected);
  }, [candles]);

  const resetItemSelection = useCallback(() => {
    candles.forEach((x) => (x.isSelected = false));
  }, [candles]);

  const checkCandleCount = useCallback(() => {
    return candles.length < maxCandles;
  }, [candles]);

  const addNewCandle = useCallback(
    (x) => {
      resetItemSelection();
      if (!checkCandleCount()) return;
      const assembledCandle = { ...assembledCandlesMap[x] };
      candles.push(assembledCandle);
      rerenderCandles();
    },
    [candles, rerenderCandles, resetItemSelection, checkCandleCount]
  );

  const deleteCandle = useCallback(() => {
    candles.splice(selectedIndex, 1);
    rerenderCandles();
  }, [candles, rerenderCandles, selectedIndex]);

  const openEditMode = useCallback(() => {
    candles[selectedIndex].isEditMode = true;
    rerenderCandles();
  }, [candles, rerenderCandles, selectedIndex]);

  const isColorCanBeChanged = useMemo(() => {
    const candle = getSelectedCandle();
    return !!candle && candle.items.length > 0;
  }, [getSelectedCandle]);

  const changeItemsColor = useCallback(
    (color, colorName) => () => {
      const selectedCandle = getSelectedCandle();
      if (isColorCanBeChanged) {
        selectedCandle.items.forEach((item) => {
          item.color = color;
          item.colorName = colorName;
        });
        rerenderCandles();
      }
    },
    [rerenderCandles, getSelectedCandle]
  );

  const assembledCandles = useMemo(() =>
    Object.keys(assembledCandlesMap)
      .slice(1)
      .map((x) => {
        return (
          <MDBDropdownItem
            link
            childTag="button"
            onClick={() => addNewCandle(x)}
          >
            {x}
          </MDBDropdownItem>
        );
      })
  );

  return (
    <MDBRow>
      <MDBCol md="3" sm="3" size="3">
        <MDBDropdown
          onClose={() => setCloseDropdowns(false)}
          dropup
          style={{ height: "100%" }}
        >
          <MDBDropdownToggle
            disabled={!checkCandleCount()}
            className="btn-light btn-rounded"
            style={{ height: "100%" }}
          >
            <MDBIcon fab icon="plus" size="lg" />
          </MDBDropdownToggle>
          <MDBDropdownMenu className="dropdown-menu" wrapper>
            <MDBDropdownItem
              link
              onClick={() => addNewCandle("Default candle")}
            >
              Add empty candle
            </MDBDropdownItem>
            <MDBDropdownItem preventCloseOnClick={!closeDropdowns}>
              <MDBDropdown
                onClose={() => setCloseDropdowns(!closeDropdowns)}
                dropright
                dropup
              >
                <MDBDropdownToggle className="btn-light">
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
      <MDBCol md="3" sm="3" size="3">
        <ColorSelector
          changeColor={changeItemsColor}
          isTogleActive={isColorCanBeChanged}
        />
      </MDBCol>
      <MDBCol md="3" sm="3" size="3">
        <MDBBtn
          className="btn-light btn-rounded"
          disabled={!isEditModeForSpecificItem}
          onClick={openEditMode}
        >
          <MDBIcon fas icon="pen" />
        </MDBBtn>
      </MDBCol>
      <MDBCol md="3" sm="3" size="3">
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
