import express from 'express';
import cors from 'cors';

import multer from 'multer';
import { generateSummary, generateExplanation } from './aiService.js';


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }
});
 
//Make uploaded middleware available to routes
app.locals.upload = upload;

//Endpoint to test file upload
app.post('/notes', async (req, res) => {
    try {
        const { notes, action } = req.body;

        if (!notes || notes.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: "Please provide some notes to process"
            });
        }
        if (!action){
            return res.status(400).json({
                success: false,
                error: "Please specify your action ( summary or explain )"
            });
        }

        let result;

        if (action === 'summary') {
            result = await generateSummary(notes);
        } else if (action === 'explain') {
            result = await generateExplanation(notes);
        } else {
            return res.status(400).json({
                success: false,
                error: "Invalid action. Use 'summary' or 'explain'."
            });
        }

        res.json({ 
            success: true,
            data:{
                action: action,
                result: result
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
        success: false,
        error: error.message 
        });
    }
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
