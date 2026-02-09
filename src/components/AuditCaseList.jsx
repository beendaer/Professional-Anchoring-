import './AuditCaseList.css';

function AuditCaseList({ cases, onSelectCase, onUpdateCase, onDeleteCase, selectedCase }) {
  const getCaseTypeLabel = (type) => {
    const labels = {
      'hardware-mismatch': '🖥️ Hardware Mismatch',
      'ai-deception': '🤖 AI Deception',
      'false-advertising': '📢 False Advertising',
      'spec-fraud': '⚠️ Spec Fraud',
      'other': '📌 Other'
    };
    return labels[type] || type;
  };

  const getSeverityClass = (severity) => {
    return `severity-${severity}`;
  };

  const toggleCaseStatus = (caseItem) => {
    const newStatus = caseItem.status === 'open' ? 'closed' : 'open';
    onUpdateCase(caseItem.id, { status: newStatus });
  };

  if (cases.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Audit Cases Yet</h2>
        <p>Click "New Case" to create your first audit case.</p>
      </div>
    );
  }

  return (
    <div className="audit-case-list">
      <h2>Audit Cases ({cases.length})</h2>
      
      <div className="cases-grid">
        {cases.map((caseItem) => (
          <div 
            key={caseItem.id} 
            className={`case-card ${selectedCase?.id === caseItem.id ? 'selected' : ''} ${caseItem.status}`}
            onClick={() => onSelectCase(caseItem)}
          >
            <div className="case-header">
              <h3>{caseItem.title}</h3>
              <span className={`severity-badge ${getSeverityClass(caseItem.severity)}`}>
                {caseItem.severity}
              </span>
            </div>

            <div className="case-meta">
              <span className="case-type">{getCaseTypeLabel(caseItem.caseType)}</span>
              <span className="case-status">{caseItem.status}</span>
            </div>

            {caseItem.retailer && (
              <div className="case-detail">
                <strong>Retailer:</strong> {caseItem.retailer}
              </div>
            )}

            {caseItem.location && (
              <div className="case-detail">
                <strong>Location:</strong> {caseItem.location}
              </div>
            )}

            <div className="case-description">
              {caseItem.description.substring(0, 150)}
              {caseItem.description.length > 150 ? '...' : ''}
            </div>

            <div className="case-footer">
              <small>Created: {new Date(caseItem.createdAt).toLocaleDateString()}</small>
              <div className="case-actions">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCaseStatus(caseItem);
                  }}
                  className="btn-status"
                >
                  {caseItem.status === 'open' ? 'Close' : 'Reopen'}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this case?')) {
                      onDeleteCase(caseItem.id);
                    }
                  }}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCase && (
        <div className="case-details">
          <h3>Case Details</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <strong>Title:</strong>
              <p>{selectedCase.title}</p>
            </div>
            <div className="detail-item">
              <strong>Type:</strong>
              <p>{getCaseTypeLabel(selectedCase.caseType)}</p>
            </div>
            <div className="detail-item">
              <strong>Severity:</strong>
              <p className={getSeverityClass(selectedCase.severity)}>{selectedCase.severity}</p>
            </div>
            <div className="detail-item">
              <strong>Status:</strong>
              <p>{selectedCase.status}</p>
            </div>
            {selectedCase.retailer && (
              <div className="detail-item">
                <strong>Retailer:</strong>
                <p>{selectedCase.retailer}</p>
              </div>
            )}
            {selectedCase.location && (
              <div className="detail-item">
                <strong>Location:</strong>
                <p>{selectedCase.location}</p>
              </div>
            )}
            <div className="detail-item full-width">
              <strong>Description:</strong>
              <p>{selectedCase.description}</p>
            </div>
            {selectedCase.expectedSpecs && (
              <div className="detail-item full-width">
                <strong>Expected Specifications:</strong>
                <p>{selectedCase.expectedSpecs}</p>
              </div>
            )}
            {selectedCase.actualSpecs && (
              <div className="detail-item full-width">
                <strong>Actual Specifications:</strong>
                <p>{selectedCase.actualSpecs}</p>
              </div>
            )}
            {selectedCase.evidence && (
              <div className="detail-item full-width">
                <strong>Evidence:</strong>
                <p>{selectedCase.evidence}</p>
              </div>
            )}
            {selectedCase.notes && (
              <div className="detail-item full-width">
                <strong>Notes:</strong>
                <p>{selectedCase.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AuditCaseList;
