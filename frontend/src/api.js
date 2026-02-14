const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  // Health check
  async checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },

  // Transcripts
  async getTranscripts() {
    const response = await fetch(`${API_BASE_URL}/transcripts`);
    return response.json();
  },

  async getTranscript(id) {
    const response = await fetch(`${API_BASE_URL}/transcripts/${id}`);
    return response.json();
  },

  async createTranscript(title, content) {
    const response = await fetch(`${API_BASE_URL}/transcripts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    return response.json();
  },

  async deleteTranscript(id) {
    const response = await fetch(`${API_BASE_URL}/transcripts/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Action Items
  async createActionItem(transcriptId, task, owner, dueDate) {
    const response = await fetch(`${API_BASE_URL}/action-items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        transcript_id: transcriptId, 
        task, 
        owner, 
        due_date: dueDate 
      })
    });
    return response.json();
  },

  async updateActionItem(id, updates) {
    const response = await fetch(`${API_BASE_URL}/action-items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  async deleteActionItem(id) {
    const response = await fetch(`${API_BASE_URL}/action-items/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};
