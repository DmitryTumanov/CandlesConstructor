import './OrderCart.css';
import {useState} from "react";
import {
    MDBBtn, MDBIcon, MDBListGroup, MDBListGroupItem,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle, MDBSwitch
} from "mdb-react-ui-kit";
import {candleItemsMap, colorsConfig, defaultCandleItemColorName} from "../Config/constants";

function OrderCart({candles}) {
    const [open, setOpen] = useState(false);
    const [isGroupedItems, setIsGroupedItems] = useState(true);

    const toggleOpen = () => setOpen(!open);
    
    const itemSortFn = (a, b) => {
        return candleItemsMap[Number(a)].name > candleItemsMap[Number(b)].name ? 1 : -1;
    };

    const getOrderItems = () => {
        return candles.map((x, i) => {
            const subItems = x.items.sort((a, b) => itemSortFn(a.type, b.type)).map((y, j) => {
                return (
                    <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                        <div className='ms-4 me-auto'>
                            <div>{j + 1}. {candleItemsMap[Number(y.type)].name}</div>
                        </div>
                        <span className="badge rounded-pill" style={{...colorsConfig[y.colorName]}}>
                            {y.colorName}
                        </span>
                    </MDBListGroupItem>
                );
            });
            return (
                <>
                    <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                        <div className='ms-2 me-auto'>
                            <div className='fw-bold'>{i + 1}. Usual candle</div>
                        </div>
                        <span className="badge rounded-pill" style={{...colorsConfig[defaultCandleItemColorName]}}>
                            {defaultCandleItemColorName}
                        </span>
                    </MDBListGroupItem>
                    {subItems}
                </>
            );
        })
    };

    const getGroupedItems = () => {
        const allItems = {};

        for (let i = 0; i < candles.length; i++) {
            const items = candles[i].items;

            for (let j = 0; j < items.length; j++) {
                allItems[items[j].type] = !!allItems[items[j].type] ? allItems[items[j].type] + 1 : 1;
            }
        }

        return (
            <>
                <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                    <div className='ms-2 me-auto'>
                        <div className='fw-bold'>1. Usual candle</div>
                    </div>
                    <span className="badge rounded-pill badge-light">
                        {candles.length}
                    </span>
                </MDBListGroupItem>
                {Object.keys(allItems).sort(itemSortFn).map((x, i) => {
                    return (
                        <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                            <div className='ms-4 me-auto'>
                                <div>{i + 1}. {candleItemsMap[Number(x)].name}</div>
                            </div>
                            <span className="badge rounded-pill badge-light">
                                {allItems[x]}
                            </span>
                        </MDBListGroupItem>
                    );
                })}
            </>
        );
    }

    return (
        <>
            <MDBBtn className='toggle' onClick={toggleOpen}>
                <MDBIcon fas icon='shopping-cart' size='lg'/>
            </MDBBtn>
            <MDBModal open={open} onClose={() => setOpen(false)} tabIndex='-1'>
                <MDBModalDialog centered scrollable>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>
                                Your order
                            </MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBSwitch label='Group items by type' defaultChecked={isGroupedItems}
                                       onClick={() => setIsGroupedItems(!isGroupedItems)}/>
                            <br/>
                            <MDBListGroup light>
                                {isGroupedItems ? getGroupedItems() : getOrderItems()}
                            </MDBListGroup>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn className='btn-light btn-rounded success'>
                                Order Now
                                <MDBIcon fas icon='shopping-cart' size='md'/>
                            </MDBBtn>
                            <MDBBtn className='btn-light btn-rounded' onClick={toggleOpen}>
                                No, thanks
                                <MDBIcon fas icon='close' size='md'/>
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default OrderCart;