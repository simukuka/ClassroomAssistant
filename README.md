# 📚 Classroom Assistant

A modern, full-stack web application designed to help students manage their academic life. Features include assignment tracking, study planning, and AI-powered lecture note summarization.

## ✨ Features

### 📘 Assignment Tracker
- Add, edit, and delete assignments
- Track due dates with visual indicators
- Mark assignments as completed
- Automatic sorting (overdue items first)
- Color-coded badges for overdue, due today, and completed items
- Relative date formatting (e.g., "in 2 days", "yesterday")

### 📅 Study Planner
- Create and manage study tasks
- Organize tasks by date (Today, Tomorrow, Upcoming)
- Subject categorization with color-coded badges
- Progress tracking with visual progress bar
- Task completion management

### 📝 Lecture Notes Summarizer
- **Summary Mode**: Get concise summaries of lecture notes
- **Explanation Mode**: Get detailed explanations of complex concepts
- File upload support (text files)
- Real-time processing with loading indicators
- Copy results to clipboard

### 🔐 User Management
- Simple login system (demo mode)
- Persistent data storage per user
- User-specific assignment and task tracking

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Bootstrap** - UI components
- **Chart.js** - Data visualization (for future enhancements)

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Ollama** - Local AI model integration (Llama2)
- **Multer** - File upload handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Ollama** - [Download here](https://ollama.ai/)

### Setting up Ollama

1. Install Ollama from [ollama.ai](https://ollama.ai/)
2. Pull the Llama2 model:
   ```bash
   ollama pull llama2
   ```
3. Verify Ollama is running:
   ```bash
   ollama list
   ```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd classRoomAssistance
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=8000
NODE_ENV=development
OLLAMA_API_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama2
MAX_FILE_SIZE=20971520
ALLOWED_FILE_TYPES=txt,pdf,doc,docx
```

Start the backend server:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:8000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd classroom-assistant
npm install
```

Create a `.env` file in the `classroom-assistant` directory:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Classroom Assistant
VITE_APP_VERSION=1.0.0
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### 4. Access the Application

Open your browser and navigate to:
- Frontend: `http://localhost:5173`
- Backend Health Check: `http://localhost:8000/health`

## 📁 Project Structure

```
classRoomAssistance/
├── classroom-assistant/     # Frontend React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── AssignmentTracker.jsx
│   │   │   ├── StudyPlanner.jsx
│   │   │   └── LectureSummarizer.jsx
│   │   ├── services/        # API service layer
│   │   │   └── api.js
│   │   ├── utils/          # Utility functions
│   │   │   ├── dateUtils.js
│   │   │   ├── notifications.js
│   │   │   └── storage.js
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/                  # Backend Express server
    ├── server.js           # Main server file
    ├── aiService.js        # AI integration service
    └── package.json
```

## 🔧 Configuration

### Environment Variables

#### Backend (`server/.env`)
- `PORT` - Server port (default: 8000)
- `OLLAMA_API_URL` - Ollama API endpoint
- `OLLAMA_MODEL` - AI model name (default: llama2)
- `MAX_FILE_SIZE` - Maximum file upload size in bytes
- `ALLOWED_FILE_TYPES` - Comma-separated list of allowed file types

#### Frontend (`classroom-assistant/.env`)
- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version

## 🎨 Features in Detail

### Assignment Tracker
- **Smart Sorting**: Assignments are automatically sorted with:
  - Incomplete assignments first
  - Overdue items at the top
  - Sorted by due date
- **Visual Indicators**:
  - 🔴 Red border for overdue assignments
  - 🟡 Yellow border for assignments due today
  - 🟢 Green border for completed assignments
- **Date Formatting**: Human-readable dates with relative time indicators

### Study Planner
- **Task Grouping**: Tasks are automatically grouped into:
  - Today
  - Tomorrow
  - Upcoming
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Subject Tags**: Color-coded badges for different subjects

### Lecture Notes
- **Dual Modes**:
  - Summary: Condenses long notes into key points
  - Explanation: Breaks down complex concepts
- **File Support**: Upload text files for processing
- **Error Handling**: Clear error messages for connection issues

## 🔒 Security Notes

⚠️ **Important**: This is a demo application. The current authentication system is **not secure** for production use:

- Passwords are not properly hashed
- No backend authentication
- Data is stored in browser localStorage
- No HTTPS enforcement

For production use, implement:
- Proper password hashing (bcrypt)
- JWT or session-based authentication
- Backend user management
- Database storage instead of localStorage
- HTTPS/SSL certificates

## 🐛 Troubleshooting

### Ollama Connection Issues
If you see "Cannot connect to AI service":
1. Verify Ollama is running: `ollama list`
2. Check if the model is installed: `ollama pull llama2`
3. Verify the API URL in your `.env` file

### Port Already in Use
If port 8000 or 5173 is already in use:
- Change `PORT` in `server/.env`
- Update `VITE_API_URL` in `classroom-assistant/.env` accordingly
- Vite will automatically use the next available port

### CORS Errors
If you see CORS errors:
- Ensure the backend server is running
- Check that `VITE_API_URL` matches the backend URL
- Verify CORS is enabled in `server.js`

## 🚀 Building for Production

### Frontend
```bash
cd classroom-assistant
npm run build
```

The production build will be in `classroom-assistant/dist/`

### Backend
The backend is ready for production. Consider:
- Setting `NODE_ENV=production`
- Using a process manager like PM2
- Setting up proper logging
- Implementing rate limiting

## 📝 API Endpoints

### `GET /health`
Health check endpoint
- **Response**: `{ success: true, message: "Server is running", timestamp: "..." }`

### `POST /notes`
Process notes for summary or explanation
- **Body**:
  ```json
  {
    "notes": "Your text here...",
    "action": "summary" | "explain"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "action": "summary",
      "result": "Generated summary..."
    }
  }
  ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai/) for local AI model hosting
- [React Bootstrap](https://react-bootstrap.github.io/) for UI components
- [Vite](https://vitejs.dev/) for the excellent development experience

---

**Made with ❤️ for students everywhere**

