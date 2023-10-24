import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/ImageCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes, axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { useRef } from "react";

import Upload from "../../assets/upload.png";

function ImageCreateForm(props) {

  const imageInput = useRef(null);
  const { property, setProperty, setImages, profileImage, profile_id } = props;
  // const [pictures, setPicture] = useState("");
  const [pictures, setPictures] = useState({ results: [] });

  const handleChange = (event) => {
    setPictures({ results: [event.target.files[0]] });
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("property", property);
    formData.append("picture", pictures.results[0]);
    try {
      const { data } = await axiosReq.post("/pictures/", formData);
      setPictures((prevPictures) => ({ results: [data, ...prevPictures.results] }));
    } catch (err) {
      console.error(err.stack);
      alert('Failed to upload picture. Please try again later.');
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>

      <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    width={20}
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
            

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleSubmit}
                ref={imageInput}
              />


        {/* <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control

            className={styles.imageInput}
            src={Upload}
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </InputGroup> */}
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        // disabled={!pictures.trim()}
        disabled={!pictures.results.length}
        type="submit"
      >
        add picture
      </button>
    </Form>
  );
}

export default ImageCreateForm;