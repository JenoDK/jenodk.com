const fs = require('fs');
const path = require('path');

// Try to use pdf-parse if available, otherwise fallback
async function extractPDFText() {
  try {
    const pdfParse = require('pdf-parse');
    const pdfBuffer = fs.readFileSync(path.join(__dirname, 'public/cv/CV_EN.pdf'));
    const data = await pdfParse(pdfBuffer);
    console.log(data.text);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('pdf-parse not found. Please install it with: npm install pdf-parse');
      process.exit(1);
    } else {
      console.error('Error extracting PDF:', error.message);
      process.exit(1);
    }
  }
}

extractPDFText();

