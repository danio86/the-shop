import React, { useState } from "react";
// import styles from "../../styles/Post.module.css";
import styles from "../../styles/Properties.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router";
import ImageCreateForm from "../images/ImageCreateForm";

const Property = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    inquiries_count,
    prospectivebuyer_count,
    prospectivebuyer_id,
    // sales_count,
    // sales_id,
    title,
    description,
    price,
    status,
    location,
    size,
    image,
    pictures,
    updated_at,
    propertyPage,
  } = props;


  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/properties/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/properties/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

//   const [sold, setSold] = useState(sales_id);
//   const [soldCount, setSoldCount] = useState(sales_count);


  const [interested, setInterested] = useState(prospectivebuyer_id);
  const [count, setCount] = useState(prospectivebuyer_count);

  const handleIamInterested = async () => {
    try {
      const { data } = await axiosRes.post("/prospectivebuyers/", { property: id });
      setInterested(data.id);
      setCount(count + 1);
    } catch (err) {
      console.log(err, 'no one is interested in this property');
    }
  };

//   const storeIcon = <i className={`fas fa-store ${styles.Heart}`} />


//   const handleSales = async () => {
//     try {
//       const { data } = await axiosRes.post("/sales/", { property: id });
//       setSold(data.id);
//       setSoldCount(soldCount + 1);
//       <span style={{ color: "red" }}>storeIcon</span>

//     //   setSoldCount("Sold"); // Change salesCount text to "Sold"
//     } catch (err) {
//       console.log(err, 'it is still availible');
//     }
//   };

  

    // Maintain a state to track the color of the store icon
    // const [storeIconColor, setStoreIconColor] = useState("white");

    // const handleSales = async () => {
    //   if (is_owner) {
    //     try {
    //       const { data } = await axiosRes.post("/sales/", { property: id });
    //       setSold(data.id);
    //       setSoldCount("Sold");
    //       setSoldCount(soldCount + 1);
    //       setStoreIconColor("red"); // Change the color of the store icon to red
    //     } catch (err) {
    //       console.log(err, 'it is still available');
    //     }
    //   }
    // };


  

  const handleNotInterestedAnymore = async () => {
    try {
      await axiosRes.delete(`/prospectivebuyers/${interested}/`);
      setInterested(null);
      setCount(count - 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={`${styles.Properties} ${props.className}`}>
      <Card.Body className={styles.AddProp}>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && propertyPage &&  (<MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />)}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/property/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body className={styles.AddProp}>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        {size && <Card.Text>{size} m²</Card.Text>}
        {location && <Card.Text>{location}</Card.Text>}
        {price && <Card.Text>{price} €</Card.Text>}
        {status && (
          <Card.Text style={{ color: status === "Sold" ? "red" : "green" }}>
            {status}
          </Card.Text>
        )}
        
        <Link to={`/pictures/${id}`}>
          More Images
          <Card.Img style={{ color: "white" }} src={pictures} />
        </Link>
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : interested ? (
            <span onClick={handleNotInterestedAnymore}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleIamInterested}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
            
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like prperties!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {count}
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