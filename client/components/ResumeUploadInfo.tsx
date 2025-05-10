import React from 'react';
import { Alert, Box, Typography, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface ResumeUploadInfoProps {
  variant?: 'brief' | 'detailed';
}

/**
 * Component that provides information about supported resume formats and troubleshooting tips
 */
export default function ResumeUploadInfo({ variant = 'brief' }: ResumeUploadInfoProps) {
  if (variant === 'brief') {
    return (
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mb: 2 }}
      >
        <Typography variant="body2">
          For best results, use <strong>DOCX</strong> or text-based PDF files. Scanned PDFs may not work properly.
        </Typography>
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>
        Supported Resume Formats
      </Typography>
      
      <Typography variant="body2" paragraph>
        Our system works best with the following file types:
      </Typography>
      
      <Box component="ul" sx={{ pl: 2 }}>
        <Typography component="li" variant="body2">
          <strong>Microsoft Word (.docx)</strong> - Best option for analysis
        </Typography>
        <Typography component="li" variant="body2">
          <strong>Text-based PDFs</strong> - PDFs created from digital sources
        </Typography>
        <Typography component="li" variant="body2">
          <strong>Plain Text (.txt)</strong> - Simple but effective
        </Typography>
      </Box>
      
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Having problems?
      </Typography>
      
      <Box component="ul" sx={{ pl: 2 }}>
        <Typography component="li" variant="body2">
          Copy and paste your resume text directly into the editor
        </Typography>
        <Typography component="li" variant="body2">
          Ensure PDFs aren't password protected or contain only scanned images
        </Typography>
        <Typography component="li" variant="body2">
          Remove any special formatting or symbols that might cause issues
        </Typography>
      </Box>
    </Paper>
  );
}
