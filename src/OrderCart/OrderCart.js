import './OrderCart.css';
import {useState} from "react";
import {
    MDBBtn, MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";

function OrderCart({candles}){
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!open);
    
    return (
        <>
            <MDBBtn className='toggle' onClick={toggleOpen}>
                <MDBIcon fas icon='shopping-cart' size='lg'/>
            </MDBBtn>
            <MDBModal open={open} onClose={() => setOpen(false)} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>
                                Your order
                            </MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <ul className="list-group list-group-flush" id="bucket-list">
                            </ul>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn className='btn-light btn-rounded success'>
                                Order Now
                                <MDBIcon fas icon='shopping-cart' size='md'/>
                            </MDBBtn>
                            <MDBBtn  className='btn-light btn-rounded' onClick={toggleOpen}>
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