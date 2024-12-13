import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBIcon,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useMemo } from "react";
import { collorPalettes } from "../../Config/constants";

function RandomColorSelector({ isTogleActive, changeColor }) {
  const collorItems = useMemo(
    () =>
      Object.keys(collorPalettes).map((x) => {
        const palleteCollors = collorPalettes[x].colors.map((color) => {
          return (
            <MDBCol
              md="4"
              sm="4"
              size="4"
              style={{
                backgroundColor: color.color,
              }}
            >
              <br></br>
            </MDBCol>
          );
        });
        return (
          <MDBDropdownItem
            key={x}
            link
            childTag="button"
            onClick={changeColor(collorPalettes[x].colors)}
          >
            <MDBRow>{palleteCollors}</MDBRow>
          </MDBDropdownItem>
        );
      }),
    [changeColor]
  );

  return (
    <MDBDropdown dropright>
      <MDBDropdownToggle
        className="btn-light btn-rounded"
        disabled={!isTogleActive}
      >
        Palette
      </MDBDropdownToggle>
      <MDBDropdownMenu className="colors-dropdown">
        {collorItems}
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}

export default RandomColorSelector;
