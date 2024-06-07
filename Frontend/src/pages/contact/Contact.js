import React, { useState } from "react";
import "./contact.css";
import phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import location from "../../assets/location.svg";
import linkedin from "../../assets/linkedin.svg";
import facebook from "../../assets/facebook.svg";
import Button from "../../components/Button/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://montaser-backend-3fpi.vercel.app/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        setEmail("");
        setMessage("");
        setName("");
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <div className="contact">
      <div className="contactWrapper1">
        <Row>
          <Col lg={6} md={12}>
            <div className="contactWrapper2">
              <Col lg={12} md={3} sm={6}>
                <div>
                  <h1>Get in touch!</h1>
                  <p>
                    Find up the form and out team will get back to you within 24
                    hours.
                  </p>
                </div>
              </Col>
              <Col lg={12} md={3} sm={6}>
                <div className="contactIcons_container">
                  <div className="contactIcons">
                    <img src={phone} width={25}></img>
                    <div>-----</div>
                  </div>
                  <div className="contactIcons">
                    <img src={Email} width={25}></img>
                    <div>info@io-tool.com</div>
                  </div>
                  <div className="contactIcons">
                    <img src={location} width={25}></img>
                    <div>Amman,Jordan</div>
                  </div>
                </div>
              </Col>
              <Col lg={12} md={3} sm={6}>
                <div className="contactIcons_container2">
                  <div className="contactIcons1">
                    <img src={linkedin} width={30}></img>
                  </div>
                  <div className="contactIcons1">
                    <img src={facebook} width={30}></img>
                  </div>
                </div>
              </Col>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="contactWrapper3">
              <form onSubmit={handleSubmit}>
                <div className="contactWrapper4">
                  <div className="contactWrapper5">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleNameChange}
                      value={name}
                    />
                  </div>
                  <div className="contactWrapper5">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleEmailChange}
                      value={email}
                    />
                  </div>
                  <div className="contactWrapper5">
                    <label>Message</label>
                    <textarea onChange={handleMessageChange} value={message} />
                  </div>
                </div>
                <br></br>
                <Button title={"Send"} type={"submit"} />
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Contact;
