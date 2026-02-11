import { useState, useMemo, useCallback } from 'react';
import { generateTextReport, generateJSONReport, generateCSVReport } from '../utils/reportUtils';
import './ReportGenerator.css';

function ReportGenerator({ cases }) {
  const [reportFormat, setReportFormat] = useState('text');
  const [includeClosedCases, setIncludeClosedCases] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredCases = useMemo(() => {
    let filtered = cases;

    if (!includeClosedCases) {
      filtered = filtered.filter(c => c.status === 'open');
    }

    if (filterSeverity !== 'all') {
      filtered = filtered.filter(c => c.severity === filterSeverity);
    }

    return filtered;
  }, [cases, includeClosedCases, filterSeverity]);

  const handleGenerateReport = useCallback(() => {
    if (filteredCases.length === 0) {
      alert('No cases match the selected filters');
      return;
    }

    let reportContent;
    let filename;
    let mimeType;

    switch (reportFormat) {
      case 'json':
        reportContent = generateJSONReport(filteredCases);
        filename = `faddt-report-${Date.now()}.json`;
        mimeType = 'application/json';
        break;
      case 'csv':
        reportContent = generateCSVReport(filteredCases);
        filename = `faddt-report-${Date.now()}.csv`;
        mimeType = 'text/csv';
        break;
      default:
        reportContent = generateTextReport(filteredCases);
        filename = `faddt-report-${Date.now()}.txt`;
        mimeType = 'text/plain';
    }

    // Create and download the file
    const blob = new Blob([reportContent], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    
    // Delay URL revocation to ensure download completes
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
  }, [filteredCases, reportFormat]);

  const stats = useMemo(() => ({
    total: cases.length,
    open: cases.filter(c => c.status === 'open').length,
    closed: cases.filter(c => c.status === 'closed').length,
    critical: cases.filter(c => c.severity === 'critical').length,
    high: cases.filter(c => c.severity === 'high').length,
    medium: cases.filter(c => c.severity === 'medium').length,
    low: cases.filter(c => c.severity === 'low').length,
  }), [cases]);

  return (
    <div className="report-generator">
      <h2>Generate Statutory Report</h2>

      <div className="stats-section">
        <h3>Case Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Cases</div>
          </div>
          <div className="stat-card open">
            <div className="stat-value">{stats.open}</div>
            <div className="stat-label">Open</div>
          </div>
          <div className="stat-card closed">
            <div className="stat-value">{stats.closed}</div>
            <div className="stat-label">Closed</div>
          </div>
          <div className="stat-card critical">
            <div className="stat-value">{stats.critical}</div>
            <div className="stat-label">Critical</div>
          </div>
          <div className="stat-card high">
            <div className="stat-value">{stats.high}</div>
            <div className="stat-label">High</div>
          </div>
          <div className="stat-card medium">
            <div className="stat-value">{stats.medium}</div>
            <div className="stat-label">Medium</div>
          </div>
          <div className="stat-card low">
            <div className="stat-value">{stats.low}</div>
            <div className="stat-label">Low</div>
          </div>
        </div>
      </div>

      <div className="report-options">
        <h3>Report Options</h3>
        
        <div className="option-group">
          <label htmlFor="reportFormat">Report Format</label>
          <select
            id="reportFormat"
            value={reportFormat}
            onChange={(e) => setReportFormat(e.target.value)}
          >
            <option value="text">Plain Text</option>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        <div className="option-group">
          <label htmlFor="filterSeverity">Filter by Severity</label>
          <select
            id="filterSeverity"
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical Only</option>
            <option value="high">High Only</option>
            <option value="medium">Medium Only</option>
            <option value="low">Low Only</option>
          </select>
        </div>

        <div className="option-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={includeClosedCases}
              onChange={(e) => setIncludeClosedCases(e.target.checked)}
            />
            Include Closed Cases
          </label>
        </div>
      </div>

      <div className="report-preview">
        <h3>Report Preview</h3>
        <p>
          This report will include <strong>{filteredCases.length}</strong> case(s)
          {filterSeverity !== 'all' && ` with ${filterSeverity} severity`}
          {!includeClosedCases && ' (open cases only)'}.
        </p>
      </div>

      <div className="report-actions">
        <button 
          onClick={handleGenerateReport}
          className="btn-generate"
          disabled={filteredCases.length === 0}
        >
          📥 Generate & Download Report
        </button>
      </div>

      {cases.length === 0 && (
        <div className="empty-message">
          <p>No audit cases available. Create some cases first to generate reports.</p>
        </div>
      )}
    </div>
  );
}

export default ReportGenerator;
