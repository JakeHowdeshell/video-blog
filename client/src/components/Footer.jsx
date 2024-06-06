/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerWrapper">
        <div className="description">
          <p>Video storage for all of your video needs.</p>
        </div>
        <div className="contact">
          <p>
            For any inquiries, reach out to us at through{" "}
            <a href="#">
              <FontAwesomeIcon icon={faEnvelope} size="xl" />
            </a>{" "}
            or{" "}
            <a href="#">
              <FontAwesomeIcon icon={faPhone} size="xl" />
              (512)-GR8-VIDS
            </a>
            .
          </p>
        </div>
        <div className="social-media">
          <p>
            Follow us on{" "}
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </a>{" "}
            or{" "}
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} size="xl" />
            </a>{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}
