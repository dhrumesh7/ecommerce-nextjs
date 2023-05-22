import { ContainerStyled } from "../components/Styled";


export default function ShippingDeliveryPolicy() {

    return (<ContainerStyled>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5%", marginBottom: "5%", flexDirection: "column", textAlign: "center", }}>
            <h2 style={{ fontSize: "30px", fontWeight: 300 }}>Shipping & Delivery Policy</h2>
            <p style={{ fontSize: "17px", fontWeight: 200 }}>Last updated on May 21st 2023</p>
            <div style={{ lineHeight: "40px", fontSize: "15px", fontWeight: 300, textAlign: "left", marginLeft: "15%", marginRight: "15%" }}>
                <p style={{ marginTop: "15px" }}>For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only. Orders are shipped within 8+ days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms. Arya Silk Mills is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 8+ days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation. Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration. For any issues in utilizing our services you may contact our helpdesk on 7016022603 or aryasilkmills@gmail.com</p>
            </div>
        </div>
    </ContainerStyled>)
}