import styles from "../../styles/Inquiry.module.css";
import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Inquiry = (props) => {
    const {
      owner,
      profile_id,
      profile_image,
      updated_at,
      content,
    } = props;


    return (
        <div>
          <hr />
          <Media>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} />
            </Link>
            <Media.Body className="align-self-center ml-2">
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{updated_at}</span>
              <p>{content}</p>
            </Media.Body>
          </Media>
        </div>
      );
    };

export default Inquiry