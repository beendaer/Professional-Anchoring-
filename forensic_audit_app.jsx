const metadata = require("./package.json");

const createForensicAudit = () => {
  const mismatches = [];
  const deceptionPatterns = [];

  return {
    metadata,
    mismatches,
    deceptionPatterns,
    recordMismatch: (entry) => mismatches.push(entry),
    recordDeceptionPattern: (entry) => deceptionPatterns.push(entry)
  };
};

module.exports = {
  createForensicAudit,
  metadata
};
