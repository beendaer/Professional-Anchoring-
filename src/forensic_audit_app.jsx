import { useState, useCallback } from 'react';
import AuditCaseForm from './components/AuditCaseForm';
import AuditCaseList from './components/AuditCaseList';
import ReportGenerator from './components/ReportGenerator';
import './App.css';

const generateCaseId = () => {
  if (typeof crypto === 'undefined') {
    throw new Error('Crypto API is not available in this environment.');
  }
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  if (!crypto.getRandomValues) {
    throw new Error('crypto.getRandomValues is not supported in this environment.');
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hexBytes = Array.from(bytes, byte => byte.toString(16).padStart(2, '0'));
  return [
    hexBytes.slice(0, 4).join(''),
    hexBytes.slice(4, 6).join(''),
    hexBytes.slice(6, 8).join(''),
    hexBytes.slice(8, 10).join(''),
    hexBytes.slice(10, 16).join('')
  ].join('-');
};

function ForensicAuditApp() {
  const [auditCases, setAuditCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState('list');

  const addAuditCase = useCallback((newCase) => {
    const caseWithId = {
      ...newCase,
      id: generateCaseId(),
      createdAt: new Date().toISOString(),
      status: 'open'
    };
    setAuditCases(prev => [...prev, caseWithId]);
    setActiveTab('list');
  }, []);

  const updateAuditCase = useCallback((id, updates) => {
    setAuditCases(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  }, []);

  const deleteAuditCase = useCallback((id) => {
    setAuditCases(prev => prev.filter(c => c.id !== id));
    setSelectedCase(prev => prev?.id === id ? null : prev);
  }, []);

  return (
    <div className="forensic-audit-app">
      <header className="app-header">
        <h1>🔍 Forensic Audit & Deception Detection Toolkit (FADDT)</h1>
        <p className="subtitle">Audit Toolkit for Hardware Lifecycle Mismatch & Algorithmic Deception</p>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'list' ? 'active' : ''}
          onClick={() => setActiveTab('list')}
        >
          📋 Structural Failure Log ({auditCases.length})
        </button>
        <button 
          className={activeTab === 'new' ? 'active' : ''}
          onClick={() => setActiveTab('new')}
        >
          🧭 Forensic Unit
        </button>
        <button 
          className={activeTab === 'report' ? 'active' : ''}
          onClick={() => setActiveTab('report')}
        >
          📊 Statutory Report
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
        <p>FADDT v2.0.8 | MIT License | Justin / Forensic Unit</p>
      </footer>
    </div>
  );
}

export default ForensicAuditApp;
