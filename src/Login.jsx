import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "./Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      // save username persistently
      localStorage.setItem("username", username);

      // simple password storage for demo purposes (not secure)
      localStorage.setItem(`${username}-password`, password);

      onLogin(username);
    } else {
      alert("please enter both username and password.");
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card shadow-sm">
        <Card.Body>
          <h3 className="mb-4 text-primary fw-bold">Classroom Assistant</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-login">
              Login / Create Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
