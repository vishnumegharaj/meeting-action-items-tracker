import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Loader } from 'lucide-react';
import { api } from '../api';

export default function NewMeeting() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter meeting transcript content');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await api.createTranscript(
        title || 'Untitled Meeting',
        content
      );
      
      if (result.error) {
        setError(result.error);
      } else {
        navigate(`/transcript/${result.id}`);
      }
    } catch (err) {
      setError('Failed to process transcript. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const exampleTranscript = `Team Meeting - January 15, 2026

John: Good morning everyone. Let's start with the project updates.

Sarah: I've completed the design mockups. John, can you review them by Friday?

John: Sure, I'll review the mockups by end of week. Also, Mike, can you set up the staging environment?

Mike: Yes, I'll have the staging environment ready by Wednesday. Sarah, once John approves the designs, can you send them to the client?

Sarah: Absolutely. I'll send the final designs to the client once approved. Also, we need to schedule a follow-up meeting for next Monday.

John: Good point. Sarah, please schedule that meeting for 2 PM next Monday.

Mike: I'll also prepare the technical documentation by Thursday.

Sarah: Perfect. And I'll follow up with the marketing team tomorrow about the launch timeline.`;

  const loadExample = () => {
    setTitle('Team Project Meeting');
    setContent(exampleTranscript);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Process New Meeting</h1>
          <p className="text-sm text-gray-600 mt-1">Paste your meeting transcript to extract action items</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 space-y-6">
            {/* Meeting Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Title (optional)
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Weekly Team Sync, Q1 Planning Meeting"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>

            {/* Meeting Transcript */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Meeting Transcript *
                </label>
                <button
                  type="button"
                  onClick={loadExample}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Load Example
                </button>
              </div>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your meeting transcript here...&#10;&#10;Example:&#10;John: Sarah, can you send the report by Friday?&#10;Sarah: Yes, I'll send it by Friday. Mike will review it before that.&#10;Mike: I'll review the report by Thursday."
                rows={16}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-mono text-sm"
                required
              />
              <p className="mt-2 text-sm text-gray-600">
                Paste the text from your meeting notes, recorded transcript, or any meeting documentation.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Tips for best results:</h3>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Include who said what (e.g., "John: I'll handle this")</li>
                <li>Mention due dates or timeframes when available</li>
                <li>The AI will automatically identify tasks, owners, and deadlines</li>
                <li>You can edit, add, or remove items after extraction</li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Processing transcript...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Process Meeting Transcript
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
