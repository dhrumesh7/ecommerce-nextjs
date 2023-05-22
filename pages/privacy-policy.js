import { ContainerStyled } from "../components/Styled";


export default function PrivacyPolicy() {

    return (<ContainerStyled>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5%", marginBottom: "5%", flexDirection: "column", textAlign: "center", }}>
            <h2 style={{ fontSize: "30px", fontWeight: 300 }}>Privacy Policy</h2>
            <p style={{ fontSize: "17px", fontWeight: 200 }}>Last updated on May 21st 2023</p>
            <div style={{ lineHeight: "40px", fontSize: "15px", fontWeight: 300, textAlign: "left", marginLeft: "15%", marginRight: "15%" }}>
                <p style={{ marginTop: "15px" }}>This privacy policy sets out how Arya Silk Mills uses and protects any information that you give Arya Silk Mills when you use this website.</p>
                <p style={{ marginTop: "15px" }}>Arya Silk Mills is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, and then you can be assured that it will only be used in accordance with this privacy statement.</p>
                <p style={{ marginTop: "15px", fontWeight: 500 }}>We may collect the following information:</p>
                <ul style={{lineHeight: "35px"}}>
                    <li>Name</li>
                    <li>Contact information including email address</li>
                    <li>Demographic information such as postcode, preferences and interests</li>
                    <li>Other information relevant to customer surveys and/or offers</li>
                </ul>
                <p style={{ marginTop: "15px", fontWeight: 500  }}>What we do with the information we gather</p>
                <p style={{ marginTop: "10px" }}>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
                <ul style={{lineHeight: "35px"}}>
                    <li>Internal record keeping.</li>
                    <li>We may use the information to improve our products and services.</li>
                    <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
                    <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</li>
                </ul>
                <p style={{ marginTop: "10px" }}>We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in suitable measures.</p>
                <p style={{ marginTop: "15px", fontWeight: 500  }}>How we use cookies</p>
                <p style={{ marginTop: "10px" }}>A cookie is a small file which asks permission to be placed on your {`computer's`} hard drive. Once you agree, the file is added and the cookie helps analyses web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
                <p style={{ marginTop: "10px" }}>We use traffic log cookies to identify which pages are being used. This helps us analyses data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
                <p style={{ marginTop: "10px" }}>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
                <p style={{ marginTop: "10px" }}>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>
                <p style={{ marginTop: "15px", fontWeight: 500  }}>Controlling your personal information</p>
                <p style={{ marginTop: "10px" }}>You may choose to restrict the collection or use of your personal information in the following ways:</p>
                <ul style={{lineHeight: "35px"}}>
                    <li>whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
                    <li>if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at aryasilkmills@gmail.com</li>
                </ul>
                <p style={{ marginTop: "10px" }}>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</p>
                <p style={{ marginTop: "10px" }}>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.</p>

            </div>

        </div>
    </ContainerStyled>)
}