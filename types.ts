
export interface CaseStudy {
  id: string;
  title: string;
  context: string;
  impact: string;
  tech: string[];
  color: string;
  visualData?: number[];
}

export interface SkillModule {
  title: string;
  icon: string;
  tech: string[];
  tagline: string;
  focus: string;
  color: string;
}

export interface AuditResult {
  vulnerability: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  remediation: string;
  status: 'DETECTED' | 'PATCHED';
}
