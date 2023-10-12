import React, { useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full Name must only contain letters"),
  sonOrHusbandName: Yup.string()
    .required("Son/Husband Name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain letters"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  mobileNumber: Yup.string()
    .required("Mobile is required")
    .matches(/^[0-9]{10}$/, "Mobile number must contain 10 digits"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  maritalStatus: Yup.string().required("Marital Status is required"),
  aadharNumber: Yup.string()
    .required("Aadhar Number is required")
    .matches(/^[0-9]{12}$/, "Invalid Aadhar number format"),
  bloodGroup: Yup.string().required("Blood Group is required"),
});

const UserDetails = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleLogout = () => {
    window.location.replace("/");
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "https://mathankumar-msc.onrender.com/userdetails",
        values
      );
      console.log(response);
      if (response.data.msg === "user form submitted") {
        setSubmitSuccess(true);
        // alert("success");
        resetForm();
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        sonOrHusbandName: "",
        gender: "",
        email: "",
        mobileNumber: "",
        dob: "",
        maritalStatus: "",
        aadharNumber: "",
        bloodGroup: "",
      }}
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
          fluid
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <Form onSubmit={handleSubmit} className="w-100">
            <h3 className="mt-2  infoTitle text-center text-primary">
              User Details Form
            </h3>
            <Row className="mb-2 ms-lg-3 d-flex justify-content-evenly">
              <Col
                className="mb-3"
                sm={12}
                md={4}
                lg={4}
                xl={4}
                controlid="validationFormikUsername"
              >
                <Form.Label htmlFor="fullname" className="mb-0">
                  Full Name <span className="text-danger"> *</span>
                </Form.Label>
                <InputGroup hasValidation>
                  <Field
                    id="fullname"
                    type="text"
                    name="fullName"
                    as={Form.Control}
                    isInvalid={touched.fullName && !!errors.fullName}
                  />
                  <ErrorMessage
                    name="fullName"
                    component={Form.Control.Feedback}
                    type="invalid"
                  />
                </InputGroup>
              </Col>

              <Col
                className="mb-3 "
                sm={12}
                md={4}
                lg={4}
                xl={4}
                controlid="validationFormikGuardianName"
              >
                <Form.Label htmlFor="guardinName" className="mb-0 text-break">
                  Father/Husband Name <span className="text-danger"> *</span>
                </Form.Label>

                <InputGroup hasValidation>
                  <Field
                    id="guardinName"
                    type="text"
                    name="sonOrHusbandName"
                    as={Form.Control}
                    isInvalid={
                      touched.sonOrHusbandName && !!errors.sonOrHusbandName
                    }
                  />
                  <ErrorMessage
                    name="sonOrHusbandName"
                    component={Form.Control.Feedback}
                    type="invalid"
                  />
                </InputGroup>
              </Col>

              <Col
                sm={12}
                md={4}
                lg={4}
                xl={4}
                className="mb-3  mb-lg-2"
                controlid="validationFormikGender"
              >
                <Form.Label htmlFor="gender" className="mb-0">
                  Gender<span className="text-danger"> *</span>
                </Form.Label>

                <InputGroup hasValidation>
                  <Field
                    id="gender"
                    as={Form.Select}
                    name="gender"
                    isInvalid={touched.gender && !!errors.gender}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Others">Others</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component={Form.Control.Feedback}
                    type="invalid"
                    // style={{ zIndex: 10, marginTop: "40px" }}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className="mb-4 ms-lg-3 d-flex justify-content-evenly">
              <Col
                className="mb-3 "
                sm={12}
                md={4}
                lg={4}
                xl={4}
                controlid="validationFormikEmail"
              >
                <Form.Label htmlFor="email" className="mb-0">
                  Email<span className="text-danger"> *</span>
                </Form.Label>

                <InputGroup hasValidation>
                  <Field
                    id="email"
                    type="email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    as={Form.Control}
                    placeholder="you@wesom.com"
                    isInvalid={touched.email && !!errors.email}
                  />
                  <ErrorMessage
                    name="email"
                    component={Form.Control.Feedback}
                    type="invalid"
                  />
                </InputGroup>
              </Col>

              <Col
                className="mb-3 "
                sm={12}
                md={4}
                lg={4}
                xl={4}
                controlid="validationFormikMobile"
              >
                <Form.Label htmlFor="mobile" className="mb-0">
                  Mobile<span className="text-danger"> *</span>
                </Form.Label>

                <InputGroup hasValidation>
                  <Field
                    id="mobile"
                    aria-describedby="inputGroupPrepend"
                    name="mobileNumber"
                    as={Form.Control}
                    isInvalid={touched.mobileNumber && !!errors.mobileNumber}
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="invalid-feedback"
                  />
                </InputGroup>
              </Col>

              <Col
                className="mb-3 "
                sm={12}
                md={4}
                lg={4}
                xl={4}
                controlid="validationFormikDOB"
              >
                <Form.Label htmlFor="dob" className="mb-0">
                  Date Of Birth<span className="text-danger"> *</span>
                </Form.Label>

                <InputGroup hasValidation>
                  <Field
                    id="dob"
                    type="date"
                    aria-describedby="inputGroupPrepend"
                    name="dob"
                    as={Form.Control}
                    isInvalid={touched.dob && !!errors.dob}
                  />
                  <ErrorMessage
                    name="dob"
                    component={Form.Control.Feedback}
                    type="invalid"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className="mb-3 ms-lg-3 d-flex justify-content-evenly">
              <Col
                className="mb-3 "
                sm={12}
                md={4}
                lg={4}
                xl={4}
                controlid="validationFormikmaritalStatus"
              >
                <Form.Label htmlFor="maritalStatus" className="mb-0">
                  Marital Status<span className="text-danger"> *</span>
                </Form.Label>

                <InputGroup hasValidation>
                  <Field
                    id="maritalStatus"
                    as={Form.Select}
                    name="maritalStatus"
                    isInvalid={touched.maritalStatus && !!errors.maritalStatus}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Divorced">Divorced</option>
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="widowed">Widowed</option>
                  </Field>
                  <ErrorMessage
                    name="maritalStatus"
                    component={Form.Control.Feedback}
                    type="invalid"
                    // style={{ zIndex: 10, marginTop: "40px" }}
                  />
                </InputGroup>
              </Col>

              <Col
                className="mb-3"
                sm={12}
                md={4}
                lg={4}
                xl={4}
                controlid="validationFormikAadhar"
              >
                <Form.Label htmlFor="aadhar" className="mb-0">
                  Aadhar Number<span className="text-danger"> *</span>
                </Form.Label>

                <InputGroup hasValidation>
                  <Field
                    id="aadhar"
                    type="text"
                    name="aadharNumber"
                    as={Form.Control}
                    isInvalid={touched.aadharNumber && !!errors.aadharNumber}
                  />
                  <ErrorMessage
                    name="aadharNumber"
                    component="div"
                    className="invalid-feedback"
                  />
                </InputGroup>
              </Col>

              <Col
                className="mb-3"
                sm={12}
                md={4}
                lg={4}
                xl={4}
                controlid="validationFormikBloodgroup"
              >
                <Form.Label htmlFor="bloodG" className="mb-0">
                  Blood Group<span className="text-danger"> *</span>
                </Form.Label>

                <InputGroup hasValidation>
                  <Field
                    id="bloodG"
                    as={Form.Select}
                    name="bloodGroup"
                    isInvalid={touched.bloodGroup && !!errors.bloodGroup}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Field>
                  <ErrorMessage
                    name="bloodGroup"
                    component={Form.Control.Feedback}
                    type="invalid"
                    // style={{ zIndex: 10, marginTop: "40px" }}
                  />
                </InputGroup>
              </Col>
            </Row>

            <Button
              className="m-3  infoTitle w-100 "
              type="submit"
              variant="primary"
            >
              Submit
            </Button>

            {/* logout */}
            <Button
              className="m-3  bg-secondary w-100 border-secondary"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </Button>
            {/* alert message */}
            {submitSuccess && (
              <div className="alert alert-success mt-3">
                Form submitted successfully
              </div>
            )}
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default UserDetails;
