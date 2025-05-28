import { AnalysisData } from "@/types/analysis";

let jsPDF: any;
let autoTable: any;

// Dynamic imports that only execute on the client
if (typeof window !== 'undefined') {
  // Use a dynamic import with Promise to load the modules only in browser
  import('jspdf').then(module => {
    jsPDF = module.default;
  });
  import('jspdf-autotable').then(module => {
    autoTable = module.default;
  });
}

export async function downloadReportPDF(resumeId: string, analysis: AnalysisData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;
  const lh = 16;
  let y = margin;

  try {
    // === COVER PAGE ===
    doc.setFontSize(24);
    doc.setTextColor(50, 50, 150);
    doc.text("Resume Analysis Report", margin, y);
    y += lh * 2;

    // Resume ID and date
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Resume ID: ${resumeId}`, margin, y);
    y += lh;
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
    y += lh * 2;
    
    // Executive Summary
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 150);
    doc.text("Executive Summary", margin, y);
    y += lh * 1.2;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const summaryText = analysis.executiveSummary || analysis.overview || 
                       "This resume analysis evaluates key factors including content quality, ATS optimization, formatting, and industry alignment.";
    
    const splitSummary = doc.splitTextToSize(summaryText, doc.internal.pageSize.width - margin * 2);
    splitSummary.forEach((line: string) => {
      if (y > doc.internal.pageSize.height - margin) {
        doc.addPage(); y = margin;
      }
      doc.text(line, margin, y); y += lh;
    });
    
    y += lh;

    // Overall Score display with graphic element
    doc.setFillColor(220, 220, 240);
    doc.roundedRect(margin, y, doc.internal.pageSize.width - margin * 2, 80, 5, 5, "F");
    y += 20;
    
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 150);
    doc.text("Overall Resume Score", doc.internal.pageSize.width / 2, y, { align: "center" });
    y += lh * 1.5;
    
    doc.setFontSize(28);
    doc.setTextColor(50, 50, 150);
    const score = analysis.overallScore || 0;
    doc.text(`${score}%`, doc.internal.pageSize.width / 2, y, { align: "center" });
    y += lh;
    
    // Performance rating text
    doc.setFontSize(12);
    let ratingText = "Needs Improvement";
    if (score >= 90) ratingText = "Excellent";
    else if (score >= 80) ratingText = "Very Good";
    else if (score >= 70) ratingText = "Good";
    else if (score >= 60) ratingText = "Above Average";
    else if (score >= 50) ratingText = "Average";
    
    doc.text(ratingText, doc.internal.pageSize.width / 2, y, { align: "center" });
    y += 30;


    // === DETAILED SCORES PAGE ===
    doc.addPage();
    y = margin;
    
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 150);
    doc.text("Detailed Performance Scores", margin, y);
    y += lh * 1.5;

    // Score breakdown table
    autoTable(doc, {
      startY: y,
      head: [["Metric", "Score", "Rating"]],
      body: [
        ["Overall", analysis.overallScore || 0, getRating(analysis.overallScore || 0)],
        ["Content", analysis.contentScore || 0, getRating(analysis.contentScore || 0)],
        ["ATS Optimization", analysis.atsOptimizationScore || 0, getRating(analysis.atsOptimizationScore || 0)],
        ["Formatting", analysis.formattingScore || 0, getRating(analysis.formattingScore || 0)],
        ["Industry Alignment", analysis.industryAlignmentScore || 0, getRating(analysis.industryAlignmentScore || 0)],
        ["Skills", analysis.skillsScore || 0, getRating(analysis.skillsScore || 0)],
        ["Grammar", analysis.grammarScore || 0, getRating(analysis.grammarScore || 0)],
        ["Clarity", analysis.clarityScore || 0, getRating(analysis.clarityScore || 0)],
      ],
      theme: "grid",
      headStyles: { fillColor: [80, 80, 200] },
      margin: { left: margin, right: margin },
    });
    y = (doc as any).lastAutoTable.finalY + lh;

    // Section scores if available
    if (analysis.sectionScores && Object.keys(analysis.sectionScores).length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(50, 50, 150);
      doc.text("Section Scores", margin, y);
      y += lh;
      
      const sectionData = Object.entries(analysis.sectionScores)
        .map(([section, score]) => [formatSectionName(section), score ?? 0, getRating(score ?? 0)])
        .sort((a, b) => (b[1] as number) - (a[1] as number)); // Sort by score descending
      
      autoTable(doc, {
        startY: y,
        head: [["Section", "Score", "Rating"]],
        body: sectionData,
        theme: "grid",
        headStyles: { fillColor: [100, 100, 200] },
        margin: { left: margin, right: margin },
      });
      y = (doc as any).lastAutoTable.finalY + lh;
    }


    // === CONTENT QUALITY ANALYSIS ===
    doc.addPage();
    y = margin;
    
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 150);
    doc.text("Content Quality Analysis", margin, y);
    y += lh * 1.5;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // Content quality section
    if (analysis.contentQuality) {
      const contentQualityLines = doc.splitTextToSize(
        analysis.contentQuality,
        doc.internal.pageSize.width - margin * 2
      );
    contentQualityLines.forEach((line: string) => {
        if (y > doc.internal.pageSize.height - margin) {
            doc.addPage(); y = margin;
        }
        doc.text(line, margin, y); y += lh;
    });
    }
    
    y += lh;
    
    // ATS Compatibility section
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 150);
    doc.text("ATS Compatibility", margin, y);
    y += lh * 1.2;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    if (analysis.atsCompatibility) {
      const atsLines = doc.splitTextToSize(
        analysis.atsCompatibility,
        doc.internal.pageSize.width - margin * 2
      );
    atsLines.forEach((line: string) => {
      if (y > doc.internal.pageSize.height - margin) {
        doc.addPage(); y = margin;
      }
      doc.text(line, margin, y); y += lh;
    });
    }
    
    // If we need a new page for the next sections
    if (y > doc.internal.pageSize.height - margin * 3) {
      doc.addPage(); y = margin;
    }
    
    y += lh;
    
    // Industry Fit section
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 150);
    doc.text("Industry Fit", margin, y);
    y += lh * 1.2;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    if (analysis.industryFit) {
      const industryLines = doc.splitTextToSize(
        analysis.industryFit,
        doc.internal.pageSize.width - margin * 2
      );
      industryLines.forEach((line:string) => {
        if (y > doc.internal.pageSize.height - margin) {
          doc.addPage(); y = margin;
        }
        doc.text(line, margin, y); y += lh;
      });
    }


    // === SKILLS & FORMATTING ===
    doc.addPage();
    y = margin;
    
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 150);
    doc.text("Skills Analysis", margin, y);
    y += lh * 1.5;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    if (analysis.skillsAnalysis) {
      const skillsLines = doc.splitTextToSize(
        analysis.skillsAnalysis,
        doc.internal.pageSize.width - margin * 2
      );
      skillsLines.forEach((line:string) => {
        if (y > doc.internal.pageSize.height - margin) {
          doc.addPage(); y = margin;
        }
        doc.text(line, margin, y); y += lh;
      });
    }
    
    // AI Generated Skills if available
    if (analysis.aiSkills && analysis.aiSkills.length > 0) {
      y += lh;
      doc.setFontSize(14);
      doc.setTextColor(50, 50, 150);
      doc.text("Recommended Skills", margin, y);
      y += lh;
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      analysis.aiSkills.forEach(skill => {
        if (y > doc.internal.pageSize.height - margin) {
          doc.addPage(); y = margin;
        }
        doc.text(`• ${skill}`, margin, y); y += lh;
      });
    }
    
    // If we need a new page for formatting
    if (y > doc.internal.pageSize.height - margin * 3) {
      doc.addPage(); y = margin;
    } else {
      y += lh * 2;
    }
    
    // Formatting section
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 150);
    doc.text("Formatting Analysis", margin, y);
    y += lh * 1.2;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    if (analysis.formattingReview) {
      const formattingLines = doc.splitTextToSize(
        analysis.formattingReview,
        doc.internal.pageSize.width - margin * 2
      );
      formattingLines.forEach((line:string)=> {
        if (y > doc.internal.pageSize.height - margin) {
          doc.addPage(); y = margin;
        }
        doc.text(line, margin, y); y += lh;
      });
    }


    // === ISSUES TO ADDRESS ===
    doc.addPage();
    y = margin;
    
    doc.setFontSize(16);
    doc.setTextColor(180, 50, 50);
    doc.text("Key Issues to Address", margin, y);
    y += lh * 1.5;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    if (!analysis.issues || Object.keys(analysis.issues).length === 0) {
      doc.text("No significant issues found in your resume.", margin, y);
      y += lh;
    } else {
      // Create a table of issue counts by category and severity
      const issueCategories = Object.entries(analysis.issues);
      const tableData = [];
      
      for (const [category, issues] of issueCategories) {
        if (!issues || issues.length === 0) continue;
        
        // Count issues by severity
        const severityCounts: { [key: string]: number } = {};
        issues.forEach(issue => {
          const severity = issue.severity || 'medium';
          severityCounts[severity] = (severityCounts[severity] || 0) + 1;
        });
        
        // Add row for this category
        tableData.push([
          formatCategoryName(category), 
          issues.length,
          severityCounts.critical || 0,
          severityCounts.high || 0,
          severityCounts.medium || 0,
          severityCounts.low || 0
        ]);
      }
      
      if (tableData.length > 0) {
        autoTable(doc, {
          startY: y,
          head: [["Category", "Total", "Critical", "High", "Medium", "Low"]],
          body: tableData,
          theme: "grid",
          headStyles: { fillColor: [180, 80, 80] },
          margin: { left: margin, right: margin },
        });
        y = (doc as any).lastAutoTable.finalY + lh;
      }
      
      // Now list the most important issues (critical and high severity)
      y += lh;
      doc.setFontSize(14);
      doc.setTextColor(180, 50, 50);
      doc.text("Critical Issues", margin, y);
      y += lh;
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      let criticalFound = false;
      
      // List critical issues first
      for (const [category, issues] of Object.entries(analysis.issues)) {
        if (!issues) continue;
        
        const criticalIssues = issues.filter(i => i.severity === 'critical');
        if (criticalIssues.length > 0) {
          criticalFound = true;
          criticalIssues.forEach(issue => {
            if (y > doc.internal.pageSize.height - margin) {
              doc.addPage(); y = margin;
            }
            doc.setTextColor(150, 50, 50);
            doc.text(`${formatCategoryName(category)}:`, margin, y); 
            y += lh;
            
            doc.setTextColor(0, 0, 0);
            const issueLines = doc.splitTextToSize(
              issue.text,
              doc.internal.pageSize.width - margin * 2 - 20
            );
            issueLines.forEach((line:string) => {
              doc.text(line, margin + 20, y); 
              y += lh;
            });
            
            if (issue.suggestion) {
              doc.setTextColor(0, 100, 0);
              doc.text("Suggestion:", margin + 20, y); 
              y += lh;
              
              doc.setTextColor(0, 0, 0);
              const suggLines = doc.splitTextToSize(
                issue.suggestion,
                doc.internal.pageSize.width - margin * 2 - 40
              );
              suggLines.forEach((line:string) => {
                doc.text(line, margin + 40, y); 
                y += lh;
              });
            }
            
            y += lh/2;
          });
        }
      }
      
      if (!criticalFound) {
        doc.text("No critical issues found.", margin, y);
        y += lh;
      }
    }


    // === IMPROVEMENT SUGGESTIONS ===
    doc.addPage();
    y = margin;
    
    doc.setFontSize(16);
    doc.setTextColor(50, 100, 50);
    doc.text("Improvement Suggestions", margin, y);
    y += lh * 1.5;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // General improvement suggestions
    if (analysis.improvementSuggestions) {
      const improvementLines = doc.splitTextToSize(
        analysis.improvementSuggestions,
        doc.internal.pageSize.width - margin * 2
      );
      improvementLines.forEach((line:string) => {
        if (y > doc.internal.pageSize.height - margin) {
          doc.addPage(); y = margin;
        }
        doc.text(line, margin, y); y += lh;
      });
      y += lh;
    }
    
    // AI-generated improvements
    if (analysis.aiBulletPoints && analysis.aiBulletPoints.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(50, 100, 50);
      doc.text("Recommended Bullet Points", margin, y);
      y += lh;
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      analysis.aiBulletPoints.forEach(point => {
        if (y > doc.internal.pageSize.height - margin) {
          doc.addPage(); y = margin;
        }
        const bulletLines = doc.splitTextToSize(
          `• ${point}`, 
          doc.internal.pageSize.width - margin * 2 - 10
        );
        bulletLines.forEach((line:string) => {
          doc.text(line, margin + 10, y);
          y += lh;
        });
      });
      y += lh;
    }
    
    // AI-generated achievements
    if (analysis.aiAchievements && analysis.aiAchievements.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(50, 100, 50);
      doc.text("Recommended Achievements", margin, y);
      y += lh;
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      analysis.aiAchievements.forEach(achievement => {
        if (y > doc.internal.pageSize.height - margin) {
          doc.addPage(); y = margin;
        }
        const achievementLines = doc.splitTextToSize(
          `• ${achievement}`,
          doc.internal.pageSize.width - margin * 2 - 10
        );
        achievementLines.forEach((line:string) => {
          doc.text(line, margin + 10, y);
          y += lh;
        });
      });
    }
    
    // Position-specific suggestions if available
    if (analysis.positionedSuggestions && analysis.positionedSuggestions.length > 0) {
      doc.addPage();
      y = margin;
      
      doc.setFontSize(16);
      doc.setTextColor(50, 100, 50);
      doc.text("Specific Improvement Suggestions", margin, y);
      y += lh * 1.5;
      
      // Group suggestions by section
      const sectionGroups: Record<string, typeof analysis.positionedSuggestions> = {};
      
      analysis.positionedSuggestions.forEach(sugg => {
        const section = sugg.sectionType || sugg.position?.sectionTitle || 'General';
        if (!sectionGroups[section]) {
          sectionGroups[section] = [];
        }
        sectionGroups[section].push(sugg);
      });
      
      // Output each section's suggestions
      for (const [section, suggestions] of Object.entries(sectionGroups)) {
        if (y > doc.internal.pageSize.height - margin * 3) {
          doc.addPage();
          y = margin;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(50, 100, 50);
        doc.text(formatSectionName(section), margin, y);
        y += lh;
        
        suggestions.forEach((sugg, i) => {
          if (y > doc.internal.pageSize.height - margin * 4) {
            doc.addPage();
            y = margin;
          }
          
          // Original text
          doc.setFontSize(11);
          doc.setTextColor(180, 50, 50);
          doc.text(`Original:`, margin, y); y += lh;
          
          doc.setTextColor(0, 0, 0);
          const originalText = sugg.original || sugg.position?.textSnippet || '';
          const originalLines = doc.splitTextToSize(
            originalText,
            doc.internal.pageSize.width - margin * 2 - 20
          );
          originalLines.forEach((line:string)=> {
            doc.text(line, margin + 20, y); y += lh;
          });
          
          // Improved version
          doc.setTextColor(0, 120, 0);
          doc.text(`Improved:`, margin, y); y += lh;
          
          doc.setTextColor(0, 0, 0);
          const improvedText = sugg.improved || sugg.suggestion || '';
          const improvedLines = doc.splitTextToSize(
            improvedText,
            doc.internal.pageSize.width - margin * 2 - 20
          );
          improvedLines.forEach((line:string) => {
            doc.text(line, margin + 20, y); y += lh;
          });
          
          // Reasoning if available
          if (sugg.reasoning) {
            doc.setTextColor(100, 100, 100);
            doc.text(`Reasoning:`, margin, y); y += lh;
            
            doc.setTextColor(100, 100, 100);
            const reasoningLines = doc.splitTextToSize(
              sugg.reasoning,
              doc.internal.pageSize.width - margin * 2 - 20
            );
            reasoningLines.forEach((line:string) => {
              doc.text(line, margin + 20, y); y += lh;
            });
          }
          
          y += lh/2;
        });
        
        y += lh;
      }
    }
    
    // Add footer to all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `CV Genie Analysis - Page ${i} of ${pageCount}`, 
        doc.internal.pageSize.width / 2, 
        doc.internal.pageSize.height - 20, 
        { align: 'center' }
      );
    }

    doc.save("resume-analysis-report.pdf");
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("There was an error generating the PDF report. Please try again.");
  }
}

// Helper functions
function getRating(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 60) return "Above Average";
  if (score >= 50) return "Average";
  if (score >= 40) return "Below Average";
  if (score >= 30) return "Needs Work";
  return "Poor";
}

function formatSectionName(section: string): string {
  section = section.charAt(0).toUpperCase() + section.slice(1);
  return section.replace(/([A-Z])/g, ' $1').trim();
}

function formatCategoryName(category: string): string {
  switch (category.toLowerCase()) {
    case 'ats': return 'ATS Compatibility';
    case 'grammar': return 'Grammar & Spelling';
    case 'format': return 'Formatting';
    case 'content': return 'Content Quality';
    default: return category.charAt(0).toUpperCase() + category.slice(1);
  }
}
