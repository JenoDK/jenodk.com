# Compare CV Markdown to PDF

Compare the `CURRENT_CV.md` file with `public/cv/CV_EN.pdf` and list differences in a structured format.

## Instructions

When this command is invoked, you should:

1. **Read both files:**
   - Read the markdown content from `CURRENT_CV.md`
   - Extract text content from the PDF file at `public/cv/CV_EN.pdf` (you may need to use tools or ask the user to provide the PDF text if direct PDF reading isn't available)

2. **Parse sections from both files:**
   - For markdown: Extract sections based on markdown headings (## and ###)
   - For PDF: Identify sections based on common CV section names (Summary, Experience, Education, Projects, Skills, Languages, Hobbies, etc.)

3. **Compare the sections:**
   - Match sections by name (normalize section names for comparison - remove special characters, convert to uppercase)
   - For each matched section, compare the content
   - Normalize text for comparison (remove extra whitespace, normalize line breaks)

4. **Generate a structured report with the following categories:**
   - ✅ **Identical sections**: Sections that match exactly (after normalization)
   - ⚠️ **Sections with differences**: Sections that exist in both but have different content (show previews of differences)
   - 📝 **Sections only in markdown**: Sections present in CURRENT_CV.md but not in the PDF
   - 📄 **Sections only in PDF**: Sections present in the PDF but not in CURRENT_CV.md

5. **Format the output:**
   - Present the results in a clear, structured format
   - For sections with differences, show a preview of both versions (first 200 characters or so)
   - Include a summary at the end with counts for each category

## Output Format

The comparison should be presented as:

```
================================================================================
CV COMPARISON REPORT
================================================================================

Markdown: CURRENT_CV.md
PDF: public/cv/CV_EN.pdf

================================================================================
RESULTS
================================================================================

✅ IDENTICAL SECTIONS (X):
  • Section Name 1
  • Section Name 2

⚠️  SECTIONS WITH DIFFERENCES (X):
  • Section Name
    Markdown preview: [first 200 chars]...
    PDF preview: [first 200 chars]...

📝 SECTIONS ONLY IN MARKDOWN (X):
  • Section Name

📄 SECTIONS ONLY IN PDF (X):
  • Section Name

================================================================================
Summary: X identical, X different, X only in MD, X only in PDF
================================================================================
```

## Notes

- Be flexible with section name matching (e.g., "Experience" should match "EXPERIENCE" or "Experience")
- Ignore minor formatting differences (extra spaces, line breaks)
- Focus on content differences, not formatting
- If PDF text extraction is not directly possible, ask the user to provide the PDF text or use available tools
