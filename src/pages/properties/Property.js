
import React from "react";
// import styles from "../../styles/Post.module.css";
import styles from "../../styles/Properties.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

const Property = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    inquiries_count,
    prospectivebuyer_count,
    prospectivebuyer_id,
    title,
    description,
    image,
    updated_at,
    propertyPage,
    setProperty,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;


  const handleIamInterested = async () => {
    try {
      const { data } = await axiosRes.post("/prospectivebuyers/", { property: id });
      setProperty((prevProperty) => ({
        ...prevProperty,
        results: prevProperty.results.map((property) => {
          return property.id === id
            ? { ...property, prospectivebuyer_count: property.prospectivebuyer_count + 1, prospectivebuyer_id: data.id }
            : property;
        }),
      }));
    } catch (err) {
      console.log(err, 'no one is interested in this property');
    }
  };


  const handleNotInterestedAnymore = async () => {
    try {
      await axiosRes.delete(`/prospectivebuyers/${prospectivebuyer_id}/`);
      setProperty((prevProperty) => ({
        ...prevProperty,
        results: prevProperty.results.map((property) => {
          return property.id === id
            ? { ...property, prospectivebuyer_count: property.prospectivebuyer_count - 1, prospectivebuyer_id: null }
            : property;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Properties}>
      <Card.Body className={styles.AddProp}>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && propertyPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/property/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body className={styles.AddProp}>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : prospectivebuyer_id ? (
            <span onClick={handleNotInterestedAnymore}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleIamInterested}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {prospectivebuyer_count}
          <Link to={`/property/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {inquiries_count}
        </div>
      </Card.Body>
    </Card>
  )
}

export default Property