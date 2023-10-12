import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Container, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Inside your component

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]+/, "Password must contain at least one number.")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must contain at least one special character."
    ),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const url = "https://mathankumar-msc.onrender.com/login";
    const result = await axios.post(url, values);

    console.log(result);
    console.log(result.data);

    if (result.data.err === "invalid email") {
      alert("invalid email");
    } else if (result.data.err === "invalid password") {
      alert("invalid password");
    } else {
      // window.location = "/userdetails";
      navigate("/userdetails", { replace: true });
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Row className="justify-content-center" style={{ minWidth: "100%" }}>
            <Col lg={4} md={6} sm={12}>
              <h1 className="text-center text-primary">Login</h1>
              <Form noValidate onSubmit={handleSubmit}>
                <FormGroup>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    isInvalid={touched.email && Boolean(errors.email)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {touched.email ? errors.email : ""}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Password</Form.Label>
                  <div className="password-input">
                    <Form.Control
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && Boolean(errors.password)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.password ? errors.password : ""}
                    </Form.Control.Feedback>
                  </div>
                  <Form.Check
                    type="checkbox"
                    label={showPassword ? "Hide Password" : "Show Password"}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </FormGroup>
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
};

export default Login;
