import { useState } from 'react';
import AuditCaseForm from './components/AuditCaseForm';
import AuditCaseList from './components/AuditCaseList';
import ReportGenerator from './components/ReportGenerator';
import './App.css';

function ForensicAuditApp() {
  const [auditCases, setAuditCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState('list');

  const addAuditCase = (newCase) => {
    const caseWithId = {
      ...newCase,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'open'
    };
    setAuditCases([...auditCases, caseWithId]);
    setActiveTab('list');
  };

  const updateAuditCase = (id, updates) => {
    setAuditCases(auditCases.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  const deleteAuditCase = (id) => {
    setAuditCases(auditCases.filter(c => c.id !== id));
    if (selectedCase?.id === id) {
      setSelectedCase(null);
    }
  };

  return (
    <div className="forensic-audit-app">
      <header className="app-header">
        <h1>🔍 Forensic Deception Detector</h1>
        <p className="subtitle">Professional Tool for Hardware Mismatch & AI Deception Documentation</p>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'list' ? 'active' : ''}
          onClick={() => setActiveTab('list')}
        >
          📋 Audit Cases ({auditCases.length})
        </button>
        <button 
          className={activeTab === 'new' ? 'active' : ''}
          onClick={() => setActiveTab('new')}
        >
          ➕ New Case
        </button>
        <button 
          className={activeTab === 'report' ? 'active' : ''}
          onClick={() => setActiveTab('report')}
        >
          📊 Generate Report
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'list' && (
          <AuditCaseList 
            cases={auditCases}
            onSelectCase={setSelectedCase}
            onUpdateCase={updateAuditCase}
            onDeleteCase={deleteAuditCase}
            selectedCase={selectedCase}
          />
        )}
        
        {activeTab === 'new' && (
          <AuditCaseForm onSubmit={addAuditCase} />
        )}
        
        {activeTab === 'report' && (
          <ReportGenerator cases={auditCases} />
        )}
      </main>

      <footer className="app-footer">
        <p>Forensic Deception Detector v2.0.8 | MIT License | Justin / Forensic Unit</p>
      </footer>
    </div>
  );
}

export default ForensicAuditApp;
