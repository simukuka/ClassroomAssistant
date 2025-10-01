import { useState } from "react";
import { Container, Row, Col, Navbar, Nav, Card, Button } from "react-bootstrap";
import AssignmentTracker from "./components/AssignmentTracker";
import StudyPlanner from "./components/StudyPlanner";
import "./App.css"; // Make sure this imports the CSS below

// Temporary placeholder
function LectureSummarizer() {
  return <div>Lecture Summarizer Coming Soon...</div>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState(null); // null = dashboard

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
      component: <AssignmentTracker />,
    },
    {
      key: "planner",
      title: "Study Planner",
      icon: "📅",
      description: "Organize your study schedule efficiently.",
      component: <StudyPlanner />,
    },
    {
      key: "summarizer",
      title: "Lecture Summarizer",
      icon: "📝",
      description: "Summarize and digest complex lecture material.",
      component: <LectureSummarizer />,
    },
  ];

  return (
    <Container fluid className="vh-100 bg-light p-0">
      {/* Top Navbar */}
      <Navbar bg="white" expand="lg" className="shadow-sm px-4">
        <Navbar.Brand href="#">Classroom Assistant</Navbar.Brand>
        <Nav className="ms-auto">
          {modules.map((mod) => (
            <Nav.Link
              key={mod.key}
              active={activeTab === mod.key}
              onClick={() => setActiveTab(mod.key)}
              style={{
                borderBottom: activeTab === mod.key ? "2px solid #0d6efd" : "none",
                transition: "border-bottom 0.3s",
              }}
            >
              {mod.title}
            </Nav.Link>
          ))}
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

        {/* Active Module */}
        {activeTab && (
          <div className="mt-4 fade show">
            <Button variant="secondary" onClick={() => setActiveTab(null)} className="mb-3">
              ← Back to Dashboard
            </Button>
            {modules.find((mod) => mod.key === activeTab)?.component}
          </div>
        )}
      </Container>
    </Container>
  );
}