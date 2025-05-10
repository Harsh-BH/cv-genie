import React from 'react';

/**
 * Component that provides guidance on resume uploads and supported formats
 */
export const UploadGuidance: React.FC = () => {
  return (
    <div className="bg-indigo-50 p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium text-indigo-800 mb-2">Upload Tips</h3>
      <p className="text-sm text-gray-700 mb-3">
        For best results when uploading your resume:
      </p>
      <ul className="list-disc pl-5 text-sm text-gray-700">
        <li className="mb-1">Upload <strong>text-based PDFs</strong> rather than scanned images</li>
        <li className="mb-1"><strong>Word (.docx) files</strong> typically work well</li>
        <li className="mb-1">Remove any <strong>password protection</strong> from your files</li>
        <li className="mb-1">If you encounter issues, try <strong>copy-pasting your resume text</strong> directly</li>
      </ul>
      <div className="mt-3 text-sm text-indigo-700">
        Having troubles? Try our direct text input option instead of file upload.
      </div>
    </div>
  );
};

export default UploadGuidance;
