import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
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
      await axios.post("/api/login", form);
      setIsSubmitted(false);
      router.push("/");
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
      console.error(error);
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
              Don't have an accout ?{" "}
              <Link href="/register">
                <a>click here</a>
              </Link>
            </div>

            <Button type="submit" variant="primary" className="w-100" disabled={isSubmitted}>
              {isSubmitted && (
                <Spinner variant="light" animation="border" size="sm" className="me-2" />
              )}
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
