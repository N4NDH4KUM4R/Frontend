import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Form,
  FormGroup,
  Button,
  FormCheck,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "This field must only contain letters"),
  email: Yup.string()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Invalid email address"
    )
    .required("Email is required"),
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
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [initialFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        // "http://localhost:3000/register",
        "https://mathankumar-msc.onrender.com/register",
        values
      );
      console.log(response.data);
      setSubmitSuccess(true);
      // alert("success");
      resetForm({ values: initialFormValues });
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
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
        isSubmitting,
      }) => (
        <Container
          fluid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Form noValidate onSubmit={handleSubmit}>
            <h1 className="text-center text-primary">Register</h1>

            <Row className="justify-content-center" style={{ minWidth: "50%" }}>
              <FormGroup>
                <Form.Label>
                  Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={touched.name && Boolean(errors.name)}
                  disabled={isSubmitting}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.name ? errors.name : " "}
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <Form.Label>
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  isInvalid={touched.email && Boolean(errors.email)}
                  disabled={isSubmitting}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.email ? errors.email : " "}
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <Form.Label>
                  Password <span className="text-danger">*</span>
                </Form.Label>
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
                    disabled={isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {touched.password ? errors.password : " "}
                  </Form.Control.Feedback>
                </div>
                <FormCheck
                  type="checkbox"
                  label={showPassword ? "Hide Password" : "Show Password"}
                  onChange={() => setShowPassword(!showPassword)}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>
                  Confirm Password <span className="text-danger">*</span>
                </Form.Label>
                <div className="password-input">
                  <Form.Control
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    isInvalid={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    disabled={isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {touched.confirmPassword ? errors.confirmPassword : " "}
                  </Form.Control.Feedback>
                </div>
              </FormGroup>
              <Button
                variant="contained"
                size="lg"
                style={{ marginTop: "35px" }}
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white"
              >
                Register
              </Button>
              <p>
                Already have an account? <Link to="/">Login</Link>
              </p>
              {submitSuccess && (
                <div className="alert alert-success mt-3">
                  Form submitted successfully
                </div>
              )}
            </Row>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default SignUp;
