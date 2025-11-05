import React, { useState, useEffect } from "react";
import { Container, Row, Col, Navbar, Nav, Card, Button } from "react-bootstrap";
import AssignmentTracker from "./components/AssignmentTracker";
import StudyPlanner from "./components/StudyPlanner";
import Login from "./Login";
import "./App.css";

// Temporary placeholder
function LectureSummarizer() {
  return <div>Lecture Summarizer Coming Soon...</div>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState(null);
  const [user, setUser] = useState(null);

  // load saved username on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) setUser(savedUser);
  }, []);

  // handle login + logout
  const handleLogin = (username) => setUser(username);
  const handleLogout = () => {
    setUser(null);
    setActiveTab(null);
    // optionally keep username in localStorage to prefill login
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const modules = [
    {
      key: "assignments",
      title: "Assignment Tracker",
      icon: "📘",
      description: "Keep track of your assignments and deadlines.",
      component: <AssignmentTracker username={user} />,
    },
    {
      key: "planner",
      title: "Study Planner",
      icon: "📅",
      description: "Organize your study schedule efficiently.",
      component: <StudyPlanner username={user} />,
    },
    {
      key: "summarizer",
      title: "Lecture Summarizer",
      icon: "📝",
      description: "Summarize and digest complex lecture material.",
      component: <LectureSummarizer />,
    },
  ];

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Container fluid className="vh-100 bg-light p-0">
      <Navbar bg="white" expand="lg" className="shadow-sm px-4">
        <Navbar.Brand href="#">Classroom Assistant</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <span className="me-3 text-muted">{user}</span>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar>

      <Container className="pt-4">
        {/* Dashboard */}
        {!activeTab && (
          <>
            <Row className="mb-4">
              <Col>
                <h2>Dashboard</h2>
                <small className="text-muted">{today}</small>
              </Col>
            </Row>

            <Row className="g-4">
              {modules.map((mod) => (
                <Col md={4} key={mod.key}>
                  <Card
                    className={`shadow-sm h-100 text-center p-3 hover-shadow module-card ${mod.key}`}
                    onClick={() => setActiveTab(mod.key)}
                    style={{ cursor: "pointer" }}
                  >
                    <div style={{ fontSize: "2rem" }}>{mod.icon}</div>
                    <Card.Body>
                      <Card.Title>{mod.title}</Card.Title>
                      <Card.Text>{mod.description}</Card.Text>
                      <Button variant="primary" onClick={() => setActiveTab(mod.key)}>
                        Go
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Modules (keep mounted for state persistence) */}
        {modules.map((mod) => (
          <div
            key={mod.key}
            className="mt-4 fade show"
            style={{ display: activeTab === mod.key ? "block" : "none" }}
          >
            {activeTab === mod.key && (
              <Button variant="secondary" onClick={() => setActiveTab(null)} className="mb-3">
                ← Back to Dashboard
              </Button>
            )}
            {mod.component}
          </div>
        ))}
      </Container>
    </Container>
  );
}
