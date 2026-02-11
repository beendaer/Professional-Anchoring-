export function generateTextReport(cases) {
  const timestamp = new Date().toISOString();
  const reportLines = [];
  
  reportLines.push('='.repeat(80));
  reportLines.push('FORENSIC AUDIT & DECEPTION DETECTION TOOLKIT (FADDT) - AUDIT REPORT');
  reportLines.push('='.repeat(80));
  reportLines.push(`Generated: ${timestamp}`);
  reportLines.push(`Total Cases: ${cases.length}`);
  reportLines.push('='.repeat(80));
  reportLines.push('');

  cases.forEach((caseItem, index) => {
    reportLines.push('');
    reportLines.push(`CASE #${index + 1}`);
    reportLines.push('-'.repeat(80));
    reportLines.push(`Title: ${caseItem.title}`);
    reportLines.push(`Type: ${caseItem.caseType}`);
    reportLines.push(`Severity: ${caseItem.severity.toUpperCase()}`);
    reportLines.push(`Status: ${caseItem.status}`);
    reportLines.push(`Created: ${new Date(caseItem.createdAt).toLocaleString()}`);
    
    if (caseItem.retailer) {
      reportLines.push(`Retailer: ${caseItem.retailer}`);
    }
    
    if (caseItem.location) {
      reportLines.push(`Location: ${caseItem.location}`);
    }
    
    reportLines.push('');
    reportLines.push(`Description:\n${caseItem.description}`);
    
    if (caseItem.expectedSpecs) {
      reportLines.push('');
      reportLines.push(`Expected Specifications:\n${caseItem.expectedSpecs}`);
    }
    
    if (caseItem.actualSpecs) {
      reportLines.push('');
      reportLines.push(`Actual Specifications:\n${caseItem.actualSpecs}`);
    }

    if (caseItem.failureTimeline) {
      reportLines.push('');
      reportLines.push(`Structural Failure Timeline:\n${caseItem.failureTimeline}`);
    }

    if (caseItem.aclSections?.length) {
      reportLines.push('');
      reportLines.push(`ACL Statutory Mapping:\nSections ${caseItem.aclSections.join(', ')}`);
    }
    
    if (caseItem.evidence) {
      reportLines.push('');
      reportLines.push(`Evidence:\n${caseItem.evidence}`);
    }

    if (caseItem.aiResponse) {
      reportLines.push('');
      reportLines.push(`AI Response:\n${caseItem.aiResponse}`);
    }

    if (caseItem.deceptionPattern && caseItem.deceptionPattern !== 'none') {
      reportLines.push('');
      reportLines.push(`Deception Pattern:\n${caseItem.deceptionPattern.replace(/-/g, ' ')}`);
    }

    if (caseItem.intentionality) {
      reportLines.push('');
      reportLines.push(`Intentionality Assessment:\n${caseItem.intentionality.replace(/-/g, ' ')}`);
    }
    
    if (caseItem.notes) {
      reportLines.push('');
      reportLines.push(`Additional Notes:\n${caseItem.notes}`);
    }
    
    reportLines.push('-'.repeat(80));
  });

  reportLines.push('');
  reportLines.push('='.repeat(80));
  reportLines.push('END OF REPORT');
  reportLines.push('='.repeat(80));

  return reportLines.join('\n');
}

export function generateJSONReport(cases) {
  const report = {
    generatedAt: new Date().toISOString(),
    totalCases: cases.length,
    version: '2.0.8',
    tool: 'Forensic Audit & Deception Detection Toolkit (FADDT)',
    cases: cases.map(c => ({
      id: c.id,
      title: c.title,
      type: c.caseType,
      severity: c.severity,
      status: c.status,
      createdAt: c.createdAt,
      retailer: c.retailer || null,
      location: c.location || null,
      description: c.description,
      expectedSpecs: c.expectedSpecs || null,
      actualSpecs: c.actualSpecs || null,
      failureTimeline: c.failureTimeline || null,
      aclSections: c.aclSections || [],
      evidence: c.evidence || null,
      aiResponse: c.aiResponse || null,
      deceptionPattern: c.deceptionPattern || null,
      intentionality: c.intentionality || null,
      notes: c.notes || null
    }))
  };

  return JSON.stringify(report, null, 2);
}

export function generateCSVReport(cases) {
  const headers = [
    'ID',
    'Title',
    'Type',
    'Severity',
    'Status',
    'Created',
    'Retailer',
    'Location',
    'Description',
    'Expected Specs',
    'Actual Specs',
    'Failure Timeline',
    'ACL Sections',
    'Evidence',
    'AI Response',
    'Deception Pattern',
    'Intentionality',
    'Notes'
  ];

  let csv = headers.join(',') + '\n';

  cases.forEach(c => {
    const row = [
      c.id,
      escapeCSV(c.title),
      c.caseType,
      c.severity,
      c.status,
      new Date(c.createdAt).toISOString(),
      escapeCSV(c.retailer || ''),
      escapeCSV(c.location || ''),
      escapeCSV(c.description),
      escapeCSV(c.expectedSpecs || ''),
      escapeCSV(c.actualSpecs || ''),
      escapeCSV(c.failureTimeline || ''),
      escapeCSV(Array.isArray(c.aclSections) ? c.aclSections.join(' | ') : ''),
      escapeCSV(c.evidence || ''),
      escapeCSV(c.aiResponse || ''),
      escapeCSV(c.deceptionPattern || ''),
      escapeCSV(c.intentionality || ''),
      escapeCSV(c.notes || '')
    ];
    csv += row.join(',') + '\n';
  });

  return csv;
}

function escapeCSV(str) {
  if (!str) return '';
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}
