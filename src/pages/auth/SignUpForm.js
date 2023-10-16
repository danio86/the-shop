import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
// import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });
    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});
    // to display error

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
          ...signUpData,
          [event.target.name]: event.target.value,
        });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // prevents refresh
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData)
            // post and change values
            history.push('/signin');
        } catch(e){
            setErrors(e.response?.data);
            //if response is defined throw error
            //if not looking for data + no error
        }
    }


  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit= { handleSubmit }>
            {/* <Form.Group controlId="formBasicEmail"> */}
            <Form.Group controlId="username">
                {/* <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" /> */}
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control 
                    className={styles.Input} 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    value={username}
                    onChange={handleChange} />
            </Form.Group>
            {errors.username?.map((message, idx) => (
                //errors. is from Alert bootstrap component
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control 
                    className={styles.Input} 
                    type="password" 
                    placeholder="Password" 
                    name="password1" 
                    value={password1} 
                    onChange={handleChange} />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control 
                    className={styles.Input} 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="password2" 
                    value={password2}
                    onChange={handleChange} />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}


            <Button className={styles.Submit} variant="primary" type="submit">
                Sign Up
            </Button>
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
            // "https://cdn.pixabay.com/photo/2022/06/25/18/55/pixel-art-7284052_1280.png"
            "https://res.cloudinary.com/ddigiimwd/image/upload/v1686727085/pixel-art-gb2f9ae164_1280_s1thi6.png"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;