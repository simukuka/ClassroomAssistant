import { useState } from "react";
import { Container, Row, Col, Button, Nav, Card } from "react-bootstrap";
import AssignmentTracker from "./components/AssignmentTracker";
import StudyPlanner from "./components/StudyPlanner";

export default function App() {
  const [activeTab, setActiveTab] = useState("assignments");

  return (
    <Container fluid className="bg-light vh-100">
      <Row className="h-100">
        {/* Sidebar */}
        <Col md={3} className="bg-white shadow p-4 d-flex flex-column">
          <h2 className="text-primary mb-4 text-center">Classroom Assistant</h2>
          <Nav className="flex-column">
            <Nav.Link
              active={activeTab === "assignments"}
              onClick={() => setActiveTab("assignments")}
            >
              📘 Assignment Tracker
            </Nav.Link>
            <Nav.Link
              active={activeTab === "planner"}
              onClick={() => setActiveTab("planner")}
            >
              📅 Study Planner
            </Nav.Link>
            <Nav.Link
              active={activeTab === "summarizer"}
              onClick={() => setActiveTab("summarizer")}
            >
              📝 Lecture Summarizer
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4 overflow-auto">
          {activeTab === "assignments" && <AssignmentTracker />}
          {activeTab === "planner" && <StudyPlanner />}
          {activeTab === "planner" && (
            <Card>
              <Card.Body>
                <Card.Title>Study Planner</Card.Title>
                <Card.Text>Organize your study schedule visually and easily.</Card.Text>
              </Card.Body>
            </Card>
          )}

          {activeTab === "summarizer" && (
            <Card>
              <Card.Body>
                <Card.Title>Lecture Summarizer</Card.Title>
                <Card.Text>Summarize and digest complex lecture material.</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}