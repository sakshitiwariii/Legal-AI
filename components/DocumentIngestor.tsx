"use client"

import { useState } from "react"

export default function DocumentIngestor() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState("")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadStatus("Processing document...")

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('indexName', 'legal-docs')

      const response = await fetch('/api/ingest', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadStatus(`✅ Document ingested successfully! ${result.chunks} chunks created.`)
      } else {
        setUploadStatus(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setUploadStatus("❌ Failed to upload document")
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="document-ingestor">
      <h3>📄 Ingest Legal Documents</h3>
      <p>Upload PDF documents to add them to the knowledge base</p>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        disabled={isUploading}
        className="file-input"
      />

      {isUploading && <div className="loading">⏳ Processing...</div>}
      {uploadStatus && <div className="status">{uploadStatus}</div>}

      <div className="supported-docs">
        <h4>📚 Supported Documents:</h4>
        <ul>
          <li>Constitution of India</li>
          <li>BNSS 2023</li>
          <li>BNS 2023</li>
          <li>Consumer Protection Act 2019</li>
          <li>RTI Act 2005</li>
          <li>PWDVA 2005</li>
        </ul>
      </div>
    </div>
  )
}