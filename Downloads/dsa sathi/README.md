# LoanPilot CRM — Complete DSA Loan CRM

**LoanPilot CRM** ("Manage Leads. Close Loans. Grow Faster.") is a production-ready DSA Loan CRM web application inspired by the functionality, information architecture, UI patterns, responsiveness, and user flows of DSASathi.

---

## 🌟 Key Features

1. **Public Marketing & Sales Suite**:
   - SaaS Landing Page with sticky navigation, hero preview, metrics counters, loan types grid, problem breakdown, Before/After comparison, pricing calculator with Monthly/Annual toggle, client testimonials, and FAQ accordion.
   - Banker Scheme Submission Portal (`/scheme-master/submit`) & Public Bank Scheme Catalog (`/schemes`).
   - Registration (`/register`), Login (`/login`), Password Reset (`/forgot-password`), and 4-Step Onboarding Wizard (`/onboarding`).

2. **Role-Based Access Control (RBAC)**:
   - Pre-seeded 7 demo accounts for instant testing (Password for all: `password123`):
     - **Admin / Owner**: `admin@loanpilot.in`
     - **Sales Agent**: `agent@loanpilot.in`
     - **Operations**: `ops@loanpilot.in`
     - **Finance**: `finance@loanpilot.in`
     - **HR Manager**: `hr@loanpilot.in`
     - **Sub-DSA Partner**: `partner@loanpilot.in`
     - **Banker**: `banker@loanpilot.in`

3. **Core CRM Modules**:
   - **Dashboard (`/dashboard`)**: KPI Cards, Lead Funnel, Monthly Disbursement chart, Product donut, Live activity feed.
   - **Leads Directory (`/leads`, `/leads/[id]`)**: Full CRUD, Table/Kanban views, search, filters, CSV export/import, lead activity log, call launcher, WhatsApp launcher.
   - **Loan Applications (`/applications`, `/applications/[id]`)**: Pipeline stages (`Draft` → `Login` → `Processing` → `Query Raised` → `Sanctioned` → `Disbursed`), bank TAT, sanction tracker.
   - **Bank Directory (`/banks`)**: Bank codes, ROI ranges, processing fee slabs, RM contacts.
   - **Commission Payout Engine (`/commissions`)**: Slab-based pay-ins, partner splits (70%), agent incentives, GST (18%), TDS (5%), interactive calculator.
   - **Sub-DSA Partner Network (`/partners`, `/partners/[id]`)**: Referral profiles & earnings.
   - **Document Vault (`/documents`)**: Folder organization, category tags (KYC, PAN, Aadhaar, ITR), simulated S3 presigned URLs.
   - **Tasks & Calls (`/tasks`, `/calls`)**: Task calendar, call log history with outcomes.
   - **WhatsApp Integration Module (`/whatsapp`)**: Message templates & broadcast log.
   - **Financial Accounting (`/accounting`)**: Receivables, payables, expenses, net profit ledger.
   - **HR & Payroll (`/hr`)**: Employee profiles, check-in attendance, salary slips.
   - **Reports & BI (`/reports`)**: Lead source ROI & bank sanction analytics.
   - **AI Loan Assistant (`/ai-assistant`)**: Natural language chat interface.
   - **Notifications & Settings (`/notifications`, `/settings`)**: Alert bell & RBAC matrix.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router) & React 19 / TypeScript
- **Styling**: Tailwind CSS & Lucide React Icons
- **Database**: SQLite via Prisma ORM (Zero-dependency local execution)
- **Charts**: Recharts
- **Validation**: Zod
- **Auth**: JWT & bcryptjs password hashing

---

## 🚀 Setup & Execution Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="loanpilot-dsa-crm-super-secret-key-2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Generate & Push Database Schema
```bash
npx prisma db push
```

### 4. Seed Realistic Demo Data
Seeds 50+ leads, 20+ applications, 8+ banks, 10+ partners, employees, documents, tasks, and 7 role demo accounts:
```bash
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production
```bash
npm run build
npm start
```
