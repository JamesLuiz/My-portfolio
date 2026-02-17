
import React from 'react';
import { Server, Shield, Hexagon } from 'lucide-react';
import { SkillModule, CaseStudy } from './types';

export const THEME = {
  void: '#050505',
  gunmetal: '#121212',
  electricBlue: '#3B82F6',
  ethereumGold: '#F59E0B',
  signalRed: '#EF4444',
  postgresBlue: '#336791',
};

export const SKILL_MODULES: SkillModule[] = [
  {
    title: "High-Performance Backend",
    icon: "Server",
    tech: ["Node.js", "NestJS", "TypeScript", "Microservices"],
    focus: "PostgreSQL (2M+ records, complex indexing)",
    tagline: "Handling 100K+ daily transactions with 99.9% uptime.",
    color: THEME.electricBlue,
  },
  {
    title: "Blockchain Engineering",
    icon: "Hexagon",
    tech: ["Solidity", "Hardhat", "Web3.js", "Cross-chain Bridges"],
    focus: "Stablecoins, AMMs, and DeFi Liquidity",
    tagline: "Architecting decentralized financial ecosystems.",
    color: THEME.ethereumGold,
  },
  {
    title: "Security & Research",
    icon: "Shield",
    tech: ["Auditing", "PenTesting", "Risk Remediation"],
    focus: "Critical Vulnerability Detection",
    tagline: "Reduced risk scores by 40%. I break it before the hackers do.",
    color: THEME.signalRed,
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "jamforte",
    title: "The Scalability Engine (JamForte)",
    context: "Ride-hailing Occupancy Tax System for high-traffic municipal regions.",
    impact: "Scaled from 1 to 10 nodes, handling 100K+ daily transactions with PostgreSQL optimization.",
    tech: ["Node.js", "AWS Serverless", "PostgreSQL"],
    color: THEME.electricBlue,
    visualData: [10, 25, 45, 60, 85, 95, 120]
  },
  {
    id: "streal",
    title: "The DeFi Protocol (Streal Network)",
    context: "Collateral-Backed Stablecoin Architecture with multi-chain support.",
    impact: "Supported 50K+ active users; reduced gas costs by 30% through assembly optimization.",
    tech: ["Solidity", "Smart Contracts", "Cross-chain Pipelines"],
    color: THEME.ethereumGold,
    visualData: [30, 40, 35, 50, 65, 80, 75]
  },
  {
    id: "aqua",
    title: "The Security Audit (Aqua Protocol)",
    context: "Lending & Borrowing Protocol security assessment.",
    impact: "Identified and remediated 5 critical vulnerabilities; secured 10K+ monthly NFT transactions.",
    tech: ["Security Auditing", "Penetration Testing"],
    color: THEME.signalRed,
    visualData: [100, 80, 60, 40, 20, 5, 0]
  }
];
