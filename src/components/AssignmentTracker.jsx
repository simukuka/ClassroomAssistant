import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Badge } from "react-bootstrap";

export default function AssignmentTracker({ username }) {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Load saved assignments for this user
  useEffect(() => {
    if (!username) return;
    const saved = localStorage.getItem(`${username}-assignments`);
    if (saved) setAssignments(JSON.parse(saved));
  }, [username]);

  // Save assignments whenever they change
  useEffect(() => {
    if (!username) return;
    localStorage.setItem(`${username}-assignments`, JSON.stringify(assignments));
  }, [assignments, username]);

  // Add new assignment
  const addAssignment = () => {
    if (!title || !dueDate) return;
    const newAssignment = { id: Date.now(), title, dueDate, completed: false };
    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setDueDate("");
  };

  // Toggle completed status
  const toggleComplete = (id) => {
    setAssignments(
      assignments.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      )
    );
  };

  // Delete assignment
  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <div>
      <h2 className="mb-4">📚 Assignment Tracker</h2>

      {/* Form */}
      <Card className="mb-4 p-3 shadow-sm">
        <Form>
          <Row className="g-2">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Assignment Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Button variant="primary" className="w-100" onClick={addAssignment}>
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Assignment List */}
      <Row className="g-3">
        {assignments.length === 0 && (
          <p className="text-muted">No assignments yet.</p>
        )}
        {assignments.map((a) => (
          <Col md={6} key={a.id}>
            <Card
              className={`shadow-sm ${a.completed ? "border-success" : ""}`}
            >
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title
                    className={a.completed ? "text-decoration-line-through" : ""}
                  >
                    {a.title}
                  </Card.Title>
                  <Card.Text>
                    Due: <strong>{a.dueDate}</strong>{" "}
                    {a.completed && <Badge bg="success">Completed</Badge>}
                  </Card.Text>
                </div>
                <div className="d-flex flex-column gap-2">
                  <Button
                    size="sm"
                    variant={a.completed ? "secondary" : "success"}
                    onClick={() => toggleComplete(a.id)}
                  >
                    {a.completed ? "Undo" : "Done"}
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteAssignment(a.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
