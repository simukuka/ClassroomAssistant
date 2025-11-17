# Classroom Assistant - Backend

This is the Express.js backend server for the Classroom Assistant application.

See the main [README.md](../README.md) for complete setup instructions.

## Quick Start

```bash
npm install
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
PORT=8000
NODE_ENV=development
OLLAMA_API_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama2
MAX_FILE_SIZE=20971520
ALLOWED_FILE_TYPES=txt,pdf,doc,docx
```

## Prerequisites

- Node.js v18+
- Ollama installed and running
- Llama2 model pulled: `ollama pull llama2`

## API Endpoints

- `GET /health` - Health check
- `POST /notes` - Process notes (summary/explain)

See the main README for detailed API documentation.

