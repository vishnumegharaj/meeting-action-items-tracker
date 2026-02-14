import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Server, Database, Cpu } from 'lucide-react';
import { api } from '../api';

export default function Status() {
  const navigate = useNavigate();
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.checkHealth();
      setHealth(data);
    } catch (err) {
      setError('Failed to connect to backend');
      console.error('Health check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'healthy') {
      return <CheckCircle className="w-6 h-6 text-green-600" />;
    } else if (status === 'unhealthy') {
      return <XCircle className="w-6 h-6 text-red-600" />;
    } else {
      return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    if (status === 'healthy') return 'bg-green-100 text-green-800 border-green-200';
    if (status === 'unhealthy') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
          <h1 className="text-2xl font-bold text-gray-900">System Status</h1>
          <p className="text-sm text-gray-600 mt-1">Monitor the health of all system components</p>
        </div>
      </div>

      {/* Status Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-gray-600 mt-4">Checking system health...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center">
              <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Failed</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={checkHealth}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Overall Status */}
            <div className={`rounded-xl shadow-sm border p-6 mb-6 ${getStatusColor(health?.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(health?.status)}
                  <div>
                    <h2 className="text-lg font-bold">
                      System {health?.status === 'healthy' ? 'Operational' : 'Issues Detected'}
                    </h2>
                    <p className="text-sm opacity-90">
                      Last checked: {new Date(health?.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={checkHealth}
                  className="px-4 py-2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-lg transition-colors text-sm font-medium"
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* Service Status Cards */}
            <div className="space-y-4">
              {/* Backend Service */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <Server className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Backend Server</h3>
                      <p className="text-sm text-gray-600 mb-3">Express.js API server</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span className={`font-medium ${
                            health?.services?.backend?.status === 'healthy' 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {health?.services?.backend?.status || 'unknown'}
                          </span>
                        </div>
                        {health?.services?.backend?.uptime && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Uptime:</span>
                            <span className="font-medium text-gray-900">
                              {Math.floor(health.services.backend.uptime / 60)} minutes
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {getStatusIcon(health?.services?.backend?.status)}
                </div>
              </div>

              {/* Database */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Database className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Database</h3>
                      <p className="text-sm text-gray-600 mb-3">SQLite local database</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span className={`font-medium ${
                            health?.services?.database?.status === 'healthy' 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {health?.services?.database?.status || 'unknown'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {getStatusIcon(health?.services?.database?.status)}
                </div>
              </div>

              {/* LLM Service */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Cpu className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">LLM Service</h3>
                      <p className="text-sm text-gray-600 mb-3">AI model for action item extraction</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span className={`font-medium ${
                            health?.services?.llm?.status === 'healthy' 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {health?.services?.llm?.status || 'unknown'}
                          </span>
                        </div>
                        {health?.services?.llm?.provider && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Provider:</span>
                            <span className="font-medium text-gray-900">
                              {health.services.llm.provider}
                            </span>
                          </div>
                        )}
                        {health?.services?.llm?.model && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Model:</span>
                            <span className="font-medium text-gray-900">
                              {health.services.llm.model}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {getStatusIcon(health?.services?.llm?.status)}
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-medium text-blue-900 mb-2">About System Health</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• The backend server handles all API requests and coordinates between services</li>
                <li>• The database stores meeting transcripts and action items locally</li>
                <li>• The LLM service uses AI to automatically extract action items from transcripts</li>
                <li>• All services must be healthy for the application to function properly</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
