export function generateTextReport(cases) {
  const timestamp = new Date().toISOString();
  let report = '';
  
  report += '='.repeat(80) + '\n';
  report += 'FORENSIC DECEPTION DETECTOR - AUDIT REPORT\n';
  report += '='.repeat(80) + '\n';
  report += `Generated: ${timestamp}\n`;
  report += `Total Cases: ${cases.length}\n`;
  report += '='.repeat(80) + '\n\n';

  cases.forEach((caseItem, index) => {
    report += `\nCASE #${index + 1}\n`;
    report += '-'.repeat(80) + '\n';
    report += `Title: ${caseItem.title}\n`;
    report += `Type: ${caseItem.caseType}\n`;
    report += `Severity: ${caseItem.severity.toUpperCase()}\n`;
    report += `Status: ${caseItem.status}\n`;
    report += `Created: ${new Date(caseItem.createdAt).toLocaleString()}\n`;
    
    if (caseItem.retailer) {
      report += `Retailer: ${caseItem.retailer}\n`;
    }
    
    if (caseItem.location) {
      report += `Location: ${caseItem.location}\n`;
    }
    
    report += `\nDescription:\n${caseItem.description}\n`;
    
    if (caseItem.expectedSpecs) {
      report += `\nExpected Specifications:\n${caseItem.expectedSpecs}\n`;
    }
    
    if (caseItem.actualSpecs) {
      report += `\nActual Specifications:\n${caseItem.actualSpecs}\n`;
    }
    
    if (caseItem.evidence) {
      report += `\nEvidence:\n${caseItem.evidence}\n`;
    }
    
    if (caseItem.notes) {
      report += `\nAdditional Notes:\n${caseItem.notes}\n`;
    }
    
    report += '-'.repeat(80) + '\n';
  });

  report += '\n' + '='.repeat(80) + '\n';
  report += 'END OF REPORT\n';
  report += '='.repeat(80) + '\n';

  return report;
}

export function generateJSONReport(cases) {
  const report = {
    generatedAt: new Date().toISOString(),
    totalCases: cases.length,
    version: '2.0.8',
    tool: 'Forensic Deception Detector',
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
      evidence: c.evidence || null,
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
    'Evidence',
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
      escapeCSV(c.evidence || ''),
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
