import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/ImageCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ImageCreateForm(props) {
  const { property, setProperty, setImages, profileImage, profile_id } = props;
  const [pictures, setPicture] = useState("");

  const handleChange = (event) => {
    setPicture(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/pictures/", {
        pictures,
        property,
      });
      setPicture((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
    //   setProperty((prevPost) => ({
    //     results: [
    //       {
    //         ...prevPost.results[0],
    //         comments_count: prevPost.results[0].comments_count + 1,
    //       },
    //     ],
    //   }));
    setPicture("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control

            className={styles.imageInput}
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!pictures.trim()}
        type="submit"
      >
        add picture
      </button>
    </Form>
  );
}

export default ImageCreateForm;