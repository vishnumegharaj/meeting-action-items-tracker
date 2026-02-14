import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Edit2, Trash2, Plus, Calendar, User, FileText } from 'lucide-react';
import { api } from '../api';

export default function TranscriptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, open, done
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ task: '', owner: '', due_date: '' });

  useEffect(() => {
    loadTranscript();
  }, [id]);

  const loadTranscript = async () => {
    try {
      const data = await api.getTranscript(id);
      setTranscript(data);
    } catch (error) {
      console.error('Error loading transcript:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (item) => {
    const newStatus = item.status === 'open' ? 'done' : 'open';
    await api.updateActionItem(item.id, { status: newStatus });
    loadTranscript();
  };

  const deleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this action item?')) {
      await api.deleteActionItem(itemId);
      loadTranscript();
    }
  };

  const startEdit = (item) => {
    setEditingItem({ ...item });
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  const saveEdit = async () => {
    await api.updateActionItem(editingItem.id, {
      task: editingItem.task,
      owner: editingItem.owner,
      due_date: editingItem.due_date
    });
    setEditingItem(null);
    loadTranscript();
  };

  const addNewItem = async () => {
    if (!newItem.task.trim()) return;
    
    await api.createActionItem(
      id,
      newItem.task,
      newItem.owner || null,
      newItem.due_date || null
    );
    
    setNewItem({ task: '', owner: '', due_date: '' });
    setShowAddForm(false);
    loadTranscript();
  };

  const filteredItems = transcript?.actionItems?.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  }) || [];

  const openCount = transcript?.actionItems?.filter(item => item.status === 'open').length || 0;
  const doneCount = transcript?.actionItems?.filter(item => item.status === 'done').length || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 mt-4">Loading transcript...</p>
        </div>
      </div>
    );
  }

  if (!transcript) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Transcript not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{transcript.title}</h1>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(transcript.created_at).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <span className="font-medium text-blue-900">{openCount} Open</span>
              </div>
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <span className="font-medium text-green-900">{doneCount} Done</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transcript Content */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-8">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-gray-600" />
                  Original Transcript
                </h2>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <p className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                  {transcript.content}
                </p>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {/* Filter Tabs */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">Action Items</h2>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'all' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All ({transcript.actionItems?.length || 0})
                  </button>
                  <button
                    onClick={() => setFilter('open')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'open' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Open ({openCount})
                  </button>
                  <button
                    onClick={() => setFilter('done')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'done' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Done ({doneCount})
                  </button>
                </div>
              </div>

              {/* Add New Item Form */}
              {showAddForm && (
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Task description"
                      value={newItem.task}
                      onChange={(e) => setNewItem({ ...newItem, task: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Owner (optional)"
                        value={newItem.owner}
                        onChange={(e) => setNewItem({ ...newItem, owner: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Due date (optional)"
                        value={newItem.due_date}
                        onChange={(e) => setNewItem({ ...newItem, due_date: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={addNewItem}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowAddForm(false);
                          setNewItem({ task: '', owner: '', due_date: '' });
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="divide-y divide-gray-100">
                {filteredItems.length === 0 ? (
                  <div className="p-12 text-center">
                    <Circle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No {filter !== 'all' ? filter : ''} action items</p>
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                      {editingItem?.id === item.id ? (
                        // Edit Mode
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editingItem.task}
                            onChange={(e) => setEditingItem({ ...editingItem, task: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={editingItem.owner || ''}
                              onChange={(e) => setEditingItem({ ...editingItem, owner: e.target.value })}
                              placeholder="Owner"
                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            <input
                              type="text"
                              value={editingItem.due_date || ''}
                              onChange={(e) => setEditingItem({ ...editingItem, due_date: e.target.value })}
                              placeholder="Due date"
                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEdit}
                              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div className="flex items-start space-x-3">
                          <button
                            onClick={() => toggleStatus(item)}
                            className="flex-shrink-0 mt-0.5"
                          >
                            {item.status === 'done' ? (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-400 hover:text-indigo-600" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${
                              item.status === 'done' ? 'text-gray-500 line-through' : 'text-gray-900'
                            }`}>
                              {item.task}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              {item.owner && (
                                <span className="flex items-center text-xs text-gray-600">
                                  <User className="w-3.5 h-3.5 mr-1" />
                                  {item.owner}
                                </span>
                              )}
                              {item.due_date && (
                                <span className="flex items-center text-xs text-gray-600">
                                  <Calendar className="w-3.5 h-3.5 mr-1" />
                                  {item.due_date}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <button
                              onClick={() => startEdit(item)}
                              className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
