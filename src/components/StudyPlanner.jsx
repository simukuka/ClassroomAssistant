import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Badge, ProgressBar } from "react-bootstrap";

export default function StudyPlanner({ username }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");

  // Load tasks for this user
  useEffect(() => {
    if (!username) return;
    const saved = localStorage.getItem(`${username}-tasks`);
    if (saved) setTasks(JSON.parse(saved));
  }, [username]);

  // Save tasks whenever they change
  useEffect(() => {
    if (!username) return;
    localStorage.setItem(`${username}-tasks`, JSON.stringify(tasks));
  }, [tasks, username]);

  const addTask = () => {
    if (!title || !date) return;
    const newTask = { id: Date.now(), title, date, subject, completed: false };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDate("");
    setSubject("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const groupedTasks = {
    Today: tasks.filter((t) => t.date === today),
    Tomorrow: tasks.filter((t) => t.date === tomorrow),
    Upcoming: tasks.filter((t) => t.date > tomorrow),
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const subjectColors = ["primary", "success", "info", "warning", "danger"];

  return (
    <div>
      <h2 className="mb-4">📅 Study Planner</h2>

      {/* Progress */}
      <Card className="mb-3 p-3 shadow-sm">
        <h5>Progress</h5>
        <ProgressBar now={progress} label={`${progress}%`} />
      </Card>

      {/* Form */}
      <Card className="mb-4 p-3 shadow-sm">
        <Form>
          <Row className="g-2">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Subject (optional)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Button variant="primary" className="w-100" onClick={addTask}>
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Task Groups */}
      {Object.entries(groupedTasks).map(([group, items]) => (
        <div key={group} className="mb-4">
          <h4>{group}</h4>
          {items.length === 0 && <p className="text-muted">No tasks.</p>}
          <Row className="g-3">
            {items.map((t) => (
              <Col md={6} key={t.id}>
                <Card className={`shadow-sm ${t.completed ? "border-success" : ""}`}>
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <Card.Title className={t.completed ? "text-decoration-line-through" : ""}>
                        {t.title}
                      </Card.Title>
                      <Card.Text className="mb-1">
                        Date: <strong>{t.date}</strong>{" "}
                        {t.subject && (
                          <Badge
                            bg={subjectColors[t.subject.length % subjectColors.length]}
                          >
                            {t.subject}
                          </Badge>
                        )}
                      </Card.Text>
                      {t.completed && <Badge bg="success">Completed</Badge>}
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <Button
                        size="sm"
                        variant={t.completed ? "secondary" : "success"}
                        onClick={() => toggleComplete(t.id)}
                      >
                        {t.completed ? "Undo" : "Done"}
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteTask(t.id)}
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
      ))}
    </div>
  );
}
