import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface ResumeUploadInfoProps {
  variant?: 'brief' | 'detailed';
}

/**
 * Component that provides information about supported resume formats and troubleshooting tips
 */
export default function ResumeUploadInfo({ variant = 'brief' }: ResumeUploadInfoProps) {
  if (variant === 'brief') {
    return (
      <div className="flex items-center p-4 mb-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
        <InformationCircleIcon className="h-5 w-5 text-blue-400 mr-2" />
        <p className="text-sm text-gray-700">
          For best results, use <strong>DOCX</strong> or text-based PDF files. Scanned PDFs may not work properly.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-2">
        Supported Resume Formats
      </h3>
      
      <p className="text-sm text-gray-600 mb-3">
        Our system works best with the following file types:
      </p>
      
      <ul className="list-disc pl-5 mb-4">
        <li className="text-sm text-gray-700 mb-1">
          <strong>Microsoft Word (.docx)</strong> - Best option for analysis
        </li>
        <li className="text-sm text-gray-700 mb-1">
          <strong>Text-based PDFs</strong> - PDFs created from digital sources
        </li>
        <li className="text-sm text-gray-700 mb-1">
          <strong>Plain Text (.txt)</strong> - Simple but effective
        </li>
      </ul>
      
      <h4 className="text-md font-medium mt-4 mb-2">
        Having problems?
      </h4>
      
      <ul className="list-disc pl-5">
        <li className="text-sm text-gray-700 mb-1">
          Copy and paste your resume text directly into the editor
        </li>
        <li className="text-sm text-gray-700 mb-1">
          Ensure PDFs aren't password protected or contain only scanned images
        </li>
        <li className="text-sm text-gray-700 mb-1">
          Remove any special formatting or symbols that might cause issues
        </li>
      </ul>
    </div>
  );
}