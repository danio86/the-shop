import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router";

import Alert from "react-bootstrap/Alert";
import Upload from "../../assets/upload.png";

import styles from "../../styles/PropertyCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

function PropertyCreateForm() {
  const [errors, setErrors] = useState({});

  // const [propertyData, setPropertyData] = useState({
  //   title: "",
  //   description: "",
  //   image: "",
  //   price:"",
  //   size:"",
  //   num_rooms:"",
  //   location:"",

  // });

  const [propertyData, setPropertyData] = useState({
    title: "test",
    description: "test",
    image: "",
    price: 10000.00, // Set an initial value or leave it empty as per your requirements
    size: 100,
    num_rooms: 3,
    location: "Dublin",
    status: "Available",
    property_type: "Loft",
    num_interests: 0
  });

  const { title, description, image, price, size, num_rooms, location, status, property_type, num_interests } = propertyData;

  const history = useHistory();
  const imageInput = useRef(null);

  const handleChange = (event) => {
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPropertyData({
        ...propertyData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("num_rooms", num_rooms);
    formData.append("status", status);
    formData.append("property_type", property_type);
    formData.append("num_interests", num_interests);
    formData.append("location", location);
    formData.append("image", imageInput.current.files[0]);



    try {
      const { data } = await axiosReq.post("/properties/", formData);
      history.push(`/properties/${data.id}`);
    } catch (err) {
      console.log(err);
      console.log(err.response)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

{/* // const { title, description, image, price, size, num_rooms, location, status, property_type, num_interests } = propertyData; */}
      <Form.Group>
        <Form.Label>Interested person</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="num_interests"
          value={num_interests}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      
      
      
      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="property_type"
          value={property_type}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      
      
      
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="status"
          value={status}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}



      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="location"
          value={location}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Number of rooms</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="num_rooms"
          value={num_rooms}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}


      <Form.Group>
        <Form.Label>Size</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="size"
          value={size}
          onChange={handleChange}
        />
        </Form.Group>
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}


    {/* <Form.Group>
      <Form.Label>Price</Form.Label>
      <Form.Control
        as="textarea"
        rows={6}
        name="price"
        value={price}
        onChange={handleChange}
    />
    </Form.Group>
    {errors?.content?.map((message, idx) => (
      <Alert variant="warning" key={idx}>
        {message}
      </Alert>
    ))} */}

    <Form.Group>
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="number" // Use the appropriate input type for decimal values
        name="price"
        step="0.01" // Specify the step attribute for decimal places
        value={price}
        onChange={handleChange}
      />
    </Form.Group>
    {errors?.price?.map((message, idx) => (
      <Alert variant="warning" key={idx}>
        {message}
      </Alert>
    ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
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
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PropertyCreateForm;