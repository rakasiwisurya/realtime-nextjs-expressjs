import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      await axios.post("/api/register", form);
      setIsSubmitted(false);
      router.push("/login");
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
      if (error.response) toast.error(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
      <Card className="shadow" style={{ width: "18rem" }}>
        <Card.Body>
          <div className="text-center p-3 border border-1 mb-3 rounded-pill">
            <h1 className="fs-4 fw-bold text-primary">Nutech Integrasi</h1>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="name" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="email" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="mb-3">
              Already have an accout ?{" "}
              <Link href="/login">
                <a>click here</a>
              </Link>
            </div>

            <Button type="submit" variant="primary" className="w-100" disabled={isSubmitted}>
              {isSubmitted && (
                <Spinner animation="border" size="sm" variant="light" className="me-2" />
              )}
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
