import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";  
import axios from "axios";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useRedirect } from "../../hooks/useRedirect";

import { Form, Button, Image, Col, Row, Alert, Container } from "react-bootstrap";

const SignUpForm = () => {
  
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const history = useHistory();

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };



  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              value={username}
              placeholder="username"
              onChange={handleChange}
              name="username" />
          </Form.Group>
          {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control 
                className={styles.Input}
                type="password"
                value={password1}
                placeholder="Password"
                onChange={handleChange}
                name="password1" />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control 
                className={styles.Input}
                type="password"
                value={password2}
                placeholder="Confirm Password"
                onChange={handleChange}
                name="password2" />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
              
              <Button 
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit">
                Sign Up
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
              ))}
            </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://res.cloudinary.com/ddigiimwd/image/upload/v1686727085/pixel-art-gb2f9ae164_1280_s1thi6.png"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;