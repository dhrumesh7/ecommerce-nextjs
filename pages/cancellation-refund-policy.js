import { ContainerStyled } from "../components/Styled";


export default function CancellationRefundPolicy() {

    return (<ContainerStyled>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5%", marginBottom: "5%", flexDirection: "column", textAlign: "center", }}>
            <h2 style={{ fontSize: "30px", fontWeight: 300 }}>Cancellation & Refund Policy</h2>
            <p style={{ fontSize: "17px", fontWeight: 200 }}>Last updated on May 21st 2023</p>
            <div style={{ lineHeight: "40px", fontSize: "15px", fontWeight: 300, textAlign: "left", marginLeft: "15%", marginRight: "15%" }}>
                <p style={{ marginTop: "15px", fontWeight: 500  }}>Arya Silk Mills believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>
                <ul style={{lineHeight: "35px"}}>
                    <li>Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
                    <li>Arya Silk Mills does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>
                    <li>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 7 days of receipt of the products.</li>
                    <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>
                    <li>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>
                    <li>In case of any Refunds approved by the Arya Silk Mills, it’ll take 6-8 days for the refund to be processed to the end customer.</li>

                </ul>
                <p style={{ marginTop: "15px" }}>We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time</p>
            </div>

        </div>
    </ContainerStyled>)
}