import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbAll, dbGet, dbRun } from './database.js';
import { extractActionItems, checkLLMHealth } from './llmService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Check database
    const dbCheck = await dbGet('SELECT 1 as result');
    
    // Check LLM
    const llmCheck = await checkLLMHealth();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        backend: {
          status: 'healthy',
          uptime: process.uptime()
        },
        database: {
          status: dbCheck ? 'healthy' : 'unhealthy'
        },
        llm: llmCheck
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// Get all transcripts (last 5, most recent first)
app.get('/api/transcripts', async (req, res) => {
  try {
    const transcripts = await dbAll(`
      SELECT id, title, content, created_at,
             (SELECT COUNT(*) FROM action_items WHERE transcript_id = transcripts.id) as action_count
      FROM transcripts
      ORDER BY created_at DESC
      LIMIT 5
    `);
    
    res.json(transcripts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single transcript with action items
app.get('/api/transcripts/:id', async (req, res) => {
  try {
    const transcript = await dbGet('SELECT * FROM transcripts WHERE id = ?', [req.params.id]);
    
    if (!transcript) {
      return res.status(404).json({ error: 'Transcript not found' });
    }
    
    const actionItems = await dbAll(
      'SELECT * FROM action_items WHERE transcript_id = ? ORDER BY created_at DESC',
      [req.params.id]
    );
    
    res.json({
      ...transcript,
      actionItems
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new transcript and extract action items
app.post('/api/transcripts', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Transcript content is required' });
    }
    
    // Insert transcript
    const result = await dbRun(
      'INSERT INTO transcripts (title, content) VALUES (?, ?)',
      [title || 'Untitled Meeting', content]
    );
    const transcriptId = result.lastID;
    
    // Extract action items using LLM
    const { success, actionItems, error } = await extractActionItems(content);
    
    if (!success) {
      return res.status(500).json({ 
        error: 'Failed to extract action items',
        details: error,
        transcriptId 
      });
    }
    
    // Insert action items
    const insertedItems = [];
    for (const item of actionItems) {
      const itemResult = await dbRun(
        'INSERT INTO action_items (transcript_id, task, owner, due_date) VALUES (?, ?, ?, ?)',
        [transcriptId, item.task, item.owner || null, item.due_date || null]
      );
      insertedItems.push({
        id: itemResult.lastID,
        transcript_id: transcriptId,
        task: item.task,
        owner: item.owner || null,
        due_date: item.due_date || null,
        status: 'open'
      });
    }
    
    res.json({
      id: transcriptId,
      title: title || 'Untitled Meeting',
      content,
      actionItems: insertedItems
    });
  } catch (error) {
    console.error('Error creating transcript:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all action items for a transcript
app.get('/api/transcripts/:id/items', async (req, res) => {
  try {
    const items = await dbAll(
      'SELECT * FROM action_items WHERE transcript_id = ? ORDER BY created_at DESC',
      [req.params.id]
    );
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new action item manually
app.post('/api/action-items', async (req, res) => {
  try {
    const { transcript_id, task, owner, due_date } = req.body;
    
    if (!transcript_id || !task) {
      return res.status(400).json({ error: 'transcript_id and task are required' });
    }
    
    const result = await dbRun(
      'INSERT INTO action_items (transcript_id, task, owner, due_date) VALUES (?, ?, ?, ?)',
      [transcript_id, task, owner || null, due_date || null]
    );
    
    const newItem = await dbGet('SELECT * FROM action_items WHERE id = ?', [result.lastID]);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an action item
app.put('/api/action-items/:id', async (req, res) => {
  try {
    const { task, owner, due_date, status } = req.body;
    
    await dbRun(
      `UPDATE action_items 
       SET task = COALESCE(?, task),
           owner = COALESCE(?, owner),
           due_date = COALESCE(?, due_date),
           status = COALESCE(?, status)
       WHERE id = ?`,
      [task, owner, due_date, status, req.params.id]
    );
    
    const updated = await dbGet('SELECT * FROM action_items WHERE id = ?', [req.params.id]);
    
    if (!updated) {
      return res.status(404).json({ error: 'Action item not found' });
    }
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an action item
app.delete('/api/action-items/:id', async (req, res) => {
  try {
    const result = await dbRun('DELETE FROM action_items WHERE id = ?', [req.params.id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Action item not found' });
    }
    
    res.json({ message: 'Action item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transcript (cascade deletes action items)
app.delete('/api/transcripts/:id', async (req, res) => {
  try {
    const result = await dbRun('DELETE FROM transcripts WHERE id = ?', [req.params.id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Transcript not found' });
    }
    
    res.json({ message: 'Transcript deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
