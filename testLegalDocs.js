import fs from 'fs';

// Load and parse the sampleLegalDocs.json file
const data = fs.readFileSync('./sampleLegalDocs.json', 'utf8');
const documents = JSON.parse(data);

// Print each legal document in a formatted way
documents.forEach((doc, index) => {
  console.log(`\n📄 Document ${index + 1}:`);
  console.log(`📌 Title: ${doc.title}`);
  console.log(`📂 Type: ${doc.type}`);
  console.log(`📝 Summary: ${doc.summary}`);
  console.log(`🔑 Key Clauses: ${doc.keyClauses.join(', ')}`);
});
