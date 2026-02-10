import { useState } from 'react';
import './AuditCaseForm.css';

function AuditCaseForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    caseType: 'hardware-mismatch',
    description: '',
    location: '',
    retailer: '',
    expectedSpecs: '',
    actualSpecs: '',
    failureTimeline: '',
    aclSections: [],
    evidence: '',
    aiResponse: '',
    deceptionPattern: 'none',
    intentionality: 'undetermined',
    severity: 'medium',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAclToggle = (section) => {
    setFormData(prev => {
      const nextSections = prev.aclSections.includes(section)
        ? prev.aclSections.filter(item => item !== section)
        : [...prev.aclSections, section];
      return {
        ...prev,
        aclSections: nextSections
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill in at least the title and description');
      return;
    }
    onSubmit(formData);
    setFormData({
      title: '',
      caseType: 'hardware-mismatch',
      description: '',
      location: '',
      retailer: '',
      expectedSpecs: '',
      actualSpecs: '',
      failureTimeline: '',
      aclSections: [],
      evidence: '',
      aiResponse: '',
      deceptionPattern: 'none',
      intentionality: 'undetermined',
      severity: 'medium',
      notes: ''
    });
  };

  return (
    <div className="audit-case-form">
      <h2>Forensic Unit Intake</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Case Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Brief description of the case"
          />
        </div>

        <div className="form-group">
          <label htmlFor="caseType">Case Type</label>
          <select
            id="caseType"
            name="caseType"
            value={formData.caseType}
            onChange={handleChange}
          >
            <option value="hardware-mismatch">Hardware Lifecycle Mismatch</option>
            <option value="ai-deception">Algorithmic Deception</option>
            <option value="false-advertising">False Advertising</option>
            <option value="spec-fraud">Specification Fraud</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="severity">Severity Level</label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="retailer">Retailer/Vendor</label>
          <input
            type="text"
            id="retailer"
            name="retailer"
            value={formData.retailer}
            onChange={handleChange}
            placeholder="Name of the retailer or vendor"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Store location or website URL"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Case Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Detailed description of the issue"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expectedSpecs">Expected Specifications</label>
          <textarea
            id="expectedSpecs"
            name="expectedSpecs"
            value={formData.expectedSpecs}
            onChange={handleChange}
            rows="3"
            placeholder="What specifications were advertised or expected?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="actualSpecs">Actual Specifications</label>
          <textarea
            id="actualSpecs"
            name="actualSpecs"
            value={formData.actualSpecs}
            onChange={handleChange}
            rows="3"
            placeholder="What were the actual specifications discovered?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="failureTimeline">Structural Failure Timeline</label>
          <textarea
            id="failureTimeline"
            name="failureTimeline"
            value={formData.failureTimeline}
            onChange={handleChange}
            rows="3"
            placeholder="Document outage windows, duration, and recurrence (e.g., 8-hour failure loop)"
          />
        </div>

        <div className="form-group">
          <label>ACL Statutory Mapping</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.aclSections.includes('54')}
                onChange={() => handleAclToggle('54')}
              />
              Section 54 (acceptable quality)
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.aclSections.includes('56')}
                onChange={() => handleAclToggle('56')}
              />
              Section 56 (due care and skill)
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.aclSections.includes('18')}
                onChange={() => handleAclToggle('18')}
              />
              Section 18 (misleading/deceptive)
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="evidence">Evidence</label>
          <textarea
            id="evidence"
            name="evidence"
            value={formData.evidence}
            onChange={handleChange}
            rows="3"
            placeholder="List evidence: screenshots, receipts, serial numbers, etc."
          />
        </div>

        <div className="form-group">
          <label htmlFor="aiResponse">AI Response (Deception Scanner Input)</label>
          <textarea
            id="aiResponse"
            name="aiResponse"
            value={formData.aiResponse}
            onChange={handleChange}
            rows="3"
            placeholder="Paste AI-generated responses to evaluate for deception patterns"
          />
        </div>

        <div className="form-group">
          <label htmlFor="deceptionPattern">Deception Pattern</label>
          <select
            id="deceptionPattern"
            name="deceptionPattern"
            value={formData.deceptionPattern}
            onChange={handleChange}
          >
            <option value="none">Not Assessed</option>
            <option value="facade-of-competence">Facade of Competence</option>
            <option value="stochastic-parroting">Stochastic Parroting</option>
            <option value="safety-hedging">Safety Hedging</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="intentionality">Intentionality Assessment</label>
          <select
            id="intentionality"
            name="intentionality"
            value={formData.intentionality}
            onChange={handleChange}
          >
            <option value="undetermined">Undetermined</option>
            <option value="suspected">Suspected Intentional</option>
            <option value="likely-intentional">Likely Intentional</option>
            <option value="unintentional">Likely Unintentional</option>
            <option value="not-applicable">Not Applicable</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Any additional information or observations"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Audit Case
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuditCaseForm;
