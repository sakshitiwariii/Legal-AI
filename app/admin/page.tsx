"use client"

import DocumentIngestor from "@/components/DocumentIngestor"

export default function AdminPage() {
  return (
    <div className="page active" id="page-admin">
      <div className="admin-panel">
        <div className="admin-head">
          <div className="admin-title">Admin Panel</div>
          <div className="admin-subtitle">Manage knowledge base and system settings</div>
        </div>

        <div className="admin-content">
          <div className="admin-section">
            <h2>📚 Document Management</h2>
            <DocumentIngestor />
          </div>

          <div className="admin-section">
            <h2>📊 System Status</h2>
            <div className="status-cards">
              <div className="status-card">
                <div className="status-icon">🗄️</div>
                <div className="status-info">
                  <div className="status-title">Vector Database</div>
                  <div className="status-value">Pinecone Active</div>
                </div>
              </div>

              <div className="status-card">
                <div className="status-icon">🤖</div>
                <div className="status-info">
                  <div className="status-title">AI Model</div>
                  <div className="status-value">GPT-4 + RAG</div>
                </div>
              </div>

              <div className="status-card">
                <div className="status-icon">📄</div>
                <div className="status-info">
                  <div className="status-title">Documents</div>
                  <div className="status-value">6 Indexed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}