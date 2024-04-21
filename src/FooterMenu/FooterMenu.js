import './FooterMenu.css';
import MainMenu from "./MainMenu/MainMenu";
import EditMenu from "./EditMenu/EditMenu";
import {MDBContainer, MDBFooter} from "mdb-react-ui-kit";
import {useCallback, useMemo} from "react";

function FooterMenu({candles, updateCandles}) {
    const editableCandle = useMemo(() => candles.find((x) => x.isEditMode), [candles]);
    const rerenderCandles = useCallback(() => updateCandles([...candles]), [updateCandles, candles]);

    return (
        <MDBFooter className='footer'>
            <MDBContainer>
                {!editableCandle 
                    ? <MainMenu candles={candles} rerenderCandles={rerenderCandles}/> 
                    : <EditMenu candle={editableCandle} rerenderCandles={rerenderCandles}/>
                }
            </MDBContainer>
            <div className="footer-copyright text-center py-3">© 2024 Copyright:
                <a href="https://www.instagram.com/kropli.zor/" target="_blank"> KROPLI ZOR</a>
            </div>
        </MDBFooter>
    );
}

export default FooterMenu;