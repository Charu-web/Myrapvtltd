import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  companyUrl: z.string().optional(),
  legalName: z.string().min(2, 'Legal/Billing name is required'),
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const leadSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  phone: z.string().min(10, '10-digit phone number is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  city: z.string().optional(),
  loanType: z.string().min(1, 'Select a loan type'),
  amount: z.number().min(10000, 'Loan amount must be at least ₹10,000'),
  source: z.string().min(1, 'Lead source is required'),
  assignedToId: z.string().optional(),
  notes: z.string().optional(),
});

export const applicationSchema = z.object({
  leadId: z.string().min(1, 'Lead is required'),
  bankId: z.string().min(1, 'Bank is required'),
  loanType: z.string().min(1, 'Loan type is required'),
  amount: z.number().min(10000, 'Amount must be at least ₹10,000'),
  tenure: z.number().min(6, 'Tenure in months is required'),
  roi: z.number().min(1, 'ROI is required'),
  assignedEmployeeId: z.string().optional(),
  partnerId: z.string().optional(),
});

export const schemeMasterSchema = z.object({
  bankName: z.string().min(2, 'Bank name is required'),
  branch: z.string().optional(),
  schemeName: z.string().min(2, 'Scheme name is required'),
  product: z.string().min(1, 'Select product type'),
  states: z.string().min(1, 'Applicable states are required'),
  minAmount: z.number().min(10000),
  maxAmount: z.number().min(10000),
  minROI: z.number(),
  maxROI: z.number(),
  cibilScore: z.number(),
  foir: z.number(),
  minVintage: z.number(),
  usps: z.string().optional(),
  rmContact: z.string().optional(),
});
