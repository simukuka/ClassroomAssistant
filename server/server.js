import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { generateSummary, generateExplanation } from './aiService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }
});
 
//Make uploaded middleware available to routes
app.locals.upload = upload;

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Notes processing endpoint
app.post('/notes', async (req, res) => {
    try {
        const { notes, action } = req.body;

        // Input validation
        if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: "Please provide some notes to process"
            });
        }

        if (!action || typeof action !== 'string') {
            return res.status(400).json({
                success: false,
                error: "Please specify your action (summary or explain)"
            });
        }

        if (!['summary', 'explain'].includes(action.toLowerCase())) {
            return res.status(400).json({
                success: false,
                error: "Invalid action. Use 'summary' or 'explain'."
            });
        }

        // Check input length (prevent abuse)
        const maxLength = 50000; // 50k characters
        if (notes.length > maxLength) {
            return res.status(400).json({
                success: false,
                error: `Notes too long. Maximum ${maxLength} characters allowed.`
            });
        }

        let result;
        const actionLower = action.toLowerCase();

        if (actionLower === 'summary') {
            result = await generateSummary(notes);
        } else if (actionLower === 'explain') {
            result = await generateExplanation(notes);
        }

        res.json({ 
            success: true,
            data: {
                action: actionLower,
                result: result
            }
        });
    } catch (error) {
        console.error('Error processing notes:', error);
        res.status(500).json({ 
            success: false,
            error: error.message || 'An error occurred while processing your request'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
