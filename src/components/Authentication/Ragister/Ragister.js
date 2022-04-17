import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
    useCreateUserWithEmailAndPassword,
    useSendEmailVerification, useUpdateProfile
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";

const Ragister = () => {
  let errorElement;
  // use react firebase hoock
  const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  const [updateProfile] = useUpdateProfile(auth);
  //reference for input data
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passRef = useRef("");
  const navigate = useNavigate();
  //click handeler
  const fromSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const pass = passRef.current.value;
    await createUserWithEmailAndPassword(email, pass);
    await sendEmailVerification();
    alert("Sent email");
    await updateProfile({ displayName:name });
    alert("Updated profile");
    navigate("/home");
  };
  if (emailError) {
    errorElement = <p>Error: {emailError.message}</p>;
  }
  return (
    <div className="container my-5">
      <h1 className="text-center">Ragister here</h1>
      <hr />
      <>
        <div className="w-50 mx-auto">
          <Form onSubmit={fromSubmit} className="custom-padding">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                ref={nameRef}
                type="text"
                placeholder="name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                ref={passRef}
                type="Password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <div className="text-end">
              <p>
                Allready have an account.{" "}
                <span onClick={() => navigate("/login")}>login here</span>
              </p>
            </div>
            {errorElement}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </>
    </div>
  );
};

export default Ragister;
