import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBIcon,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { useMemo, useCallback } from "react";
import { colorsConfig } from "../../Config/constants";

function ColorSelector({ changeColor, getSelectedCandleItem, isTogleActive }) {
  const colorItems = useMemo(
    () =>
      Object.keys(colorsConfig).map((x) => {
        const color = colorsConfig[x].color;
        return (
          <MDBDropdownItem
            key={x}
            link
            childTag="button"
            style={{ ...colorsConfig[x] }}
            onClick={changeColor(color, x)}
          >
            {getSelectedCandleItem &&
            color === getSelectedCandleItem()?.color ? (
              <MDBIcon fas icon="check" size="md" />
            ) : null}
            {x}
          </MDBDropdownItem>
        );
      }),
    [changeColor, getSelectedCandleItem]
  );

  return (
    <MDBDropdown dropright>
      <MDBDropdownToggle
        className="btn-light btn-rounded"
        disabled={!isTogleActive}
      >
        One collor
      </MDBDropdownToggle>
      <MDBDropdownMenu className="colors-dropdown">
        {colorItems}
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}

export default ColorSelector;
