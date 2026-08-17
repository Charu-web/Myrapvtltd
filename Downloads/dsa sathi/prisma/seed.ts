import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting LoanPilot CRM database seeding...');

  // 1. Create Default Organization
  const org = await prisma.organization.upsert({
    where: { code: 'LOANPILOT-ORG-01' },
    update: {},
    create: {
      name: 'LoanPilot Capital & Financial Services',
      code: 'LOANPILOT-ORG-01',
      url: 'https://loanpilot.in',
      legalName: 'LoanPilot India Private Limited',
      email: 'contact@loanpilot.in',
      phone: '+91 98765 43210',
      address: 'Suite 402, DLF Cyber City, Phase III, Gurugram, Haryana - 122002',
    },
  });

  const passwordHash = await bcrypt.hash('password123', 10);

  // 2. Create Role Demo Accounts
  const usersData = [
    {
      email: 'admin@loanpilot.in',
      fullName: 'Vikramaditya Sharma',
      phone: '+91 98100 11223',
      role: 'ADMIN',
    },
    {
      email: 'agent@loanpilot.in',
      fullName: 'Rahul Verma',
      phone: '+91 98200 22334',
      role: 'SALES_AGENT',
    },
    {
      email: 'ops@loanpilot.in',
      fullName: 'Priya Sundaram',
      phone: '+91 98300 33445',
      role: 'OPERATIONS',
    },
    {
      email: 'finance@loanpilot.in',
      fullName: 'Amitabh Choudhury',
      phone: '+91 98400 44556',
      role: 'FINANCE',
    },
    {
      email: 'hr@loanpilot.in',
      fullName: 'Ananya Deshmukh',
      phone: '+91 98500 55667',
      role: 'HR',
    },
    {
      email: 'partner@loanpilot.in',
      fullName: 'Suresh Kumar (Apex Financial Services)',
      phone: '+91 98600 66778',
      role: 'PARTNER',
    },
    {
      email: 'banker@loanpilot.in',
      fullName: 'Rohan Mehta (SBI Credit Officer)',
      phone: '+91 98700 77889',
      role: 'BANKER',
    },
  ];

  const createdUsers: Record<string, any> = {};

  for (const u of usersData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { password: passwordHash, role: u.role, fullName: u.fullName },
      create: {
        organizationId: org.id,
        email: u.email,
        password: passwordHash,
        fullName: u.fullName,
        phone: u.phone,
        role: u.role,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      },
    });
    createdUsers[u.role] = user;
  }

  console.log('✅ Demo Users Seeded (Password for all: password123)');

  // 3. Create Banks
  const banksData = [
    { name: 'State Bank of India (SBI)', code: 'SBI', minROI: 8.4, maxROI: 10.5, processingFee: '0.35% + GST', averageTAT: 4, rmName: 'Rajesh Sen', rmPhone: '+91 98111 00011', rmEmail: 'rm.sbi@loanpilot.in' },
    { name: 'HDFC Bank', code: 'HDFC', minROI: 8.5, maxROI: 12.5, processingFee: '0.50% + GST', averageTAT: 3, rmName: 'Kavita Menon', rmPhone: '+91 98111 00022', rmEmail: 'rm.hdfc@loanpilot.in' },
    { name: 'ICICI Bank', code: 'ICICI', minROI: 8.65, maxROI: 13.0, processingFee: '0.40% + GST', averageTAT: 3, rmName: 'Sunil Saxena', rmPhone: '+91 98111 00033', rmEmail: 'rm.icici@loanpilot.in' },
    { name: 'Axis Bank', code: 'AXIS', minROI: 8.75, maxROI: 13.5, processingFee: '0.50% + GST', averageTAT: 4, rmName: 'Neha Kapoor', rmPhone: '+91 98111 00044', rmEmail: 'rm.axis@loanpilot.in' },
    { name: 'Kotak Mahindra Bank', code: 'KOTAK', minROI: 8.7, maxROI: 14.0, processingFee: '0.50% + GST', averageTAT: 3, rmName: 'Varun Joshi', rmPhone: '+91 98111 00055', rmEmail: 'rm.kotak@loanpilot.in' },
    { name: 'Bajaj Finserv', code: 'BAJAJ', minROI: 11.5, maxROI: 18.0, processingFee: '1.50% + GST', averageTAT: 2, rmName: 'Deepak Rao', rmPhone: '+91 98111 00066', rmEmail: 'rm.bajaj@loanpilot.in' },
    { name: 'IndusInd Bank', code: 'INDUS', minROI: 9.2, maxROI: 15.0, processingFee: '0.75% + GST', averageTAT: 4, rmName: 'Manish Bhatia', rmPhone: '+91 98111 00077', rmEmail: 'rm.indus@loanpilot.in' },
    { name: 'Yes Bank', code: 'YES', minROI: 9.5, maxROI: 16.0, processingFee: '1.00% + GST', averageTAT: 4, rmName: 'Pooja Agarwal', rmPhone: '+91 98111 00088', rmEmail: 'rm.yes@loanpilot.in' },
  ];

  const createdBanks: any[] = [];
  for (const b of banksData) {
    const bank = await prisma.bank.create({
      data: {
        organizationId: org.id,
        name: b.name,
        code: b.code,
        minROI: b.minROI,
        maxROI: b.maxROI,
        processingFee: b.processingFee,
        averageTAT: b.averageTAT,
        rmName: b.rmName,
        rmPhone: b.rmPhone,
        rmEmail: b.rmEmail,
      },
    });
    createdBanks.push(bank);
  }

  console.log('✅ Banks Seeded');

  // 4. Create Partners / Sub-DSAs
  const partnersData = [
    { name: 'Apex Financial Services', partnerCode: 'PTR-101', type: 'Sub-DSA', phone: '+91 98999 11111', email: 'suresh@apexfin.in', city: 'Delhi NCR', commissionRate: 70, userId: createdUsers.PARTNER.id },
    { name: 'Zenith Wealth Advisors', partnerCode: 'PTR-102', type: 'Referral Partner', phone: '+91 98999 22222', email: 'contact@zenithwealth.in', city: 'Mumbai', commissionRate: 50 },
    { name: 'Metro Finance Connect', partnerCode: 'PTR-103', type: 'Connector', phone: '+91 98999 33333', email: 'support@metroconnect.in', city: 'Bengaluru', commissionRate: 60 },
    { name: 'Capital Direct Hub', partnerCode: 'PTR-104', type: 'Franchise', phone: '+91 98999 44444', email: 'info@capitaldirect.in', city: 'Ahmedabad', commissionRate: 75 },
    { name: 'Shree Finance Solutions', partnerCode: 'PTR-105', type: 'Sub-DSA', phone: '+91 98999 55555', email: 'shreefin@gmail.com', city: 'Pune', commissionRate: 70 },
  ];

  const createdPartners: any[] = [];
  for (const p of partnersData) {
    const partner = await prisma.partner.create({
      data: {
        organizationId: org.id,
        name: p.name,
        partnerCode: p.partnerCode,
        type: p.type,
        phone: p.phone,
        email: p.email,
        city: p.city,
        commissionRate: p.commissionRate,
        userId: p.userId,
      },
    });
    createdPartners.push(partner);
  }

  console.log('✅ Partners Seeded');

  // 5. Create Commission Schemes
  const commSchemes = [
    { name: 'Standard Home Loan Scheme', loanType: 'Home Loan', payInPercent: 1.2, partnerSplitPercent: 70, employeeIncentivePercent: 5 },
    { name: 'Personal Loan High-Margin', loanType: 'Personal Loan', payInPercent: 2.5, partnerSplitPercent: 65, employeeIncentivePercent: 8 },
    { name: 'Business Loan Prime', loanType: 'Business Loan', payInPercent: 2.0, partnerSplitPercent: 70, employeeIncentivePercent: 6 },
    { name: 'LAP Express Scheme', loanType: 'Loan Against Property', payInPercent: 1.5, partnerSplitPercent: 72, employeeIncentivePercent: 5 },
  ];

  for (const cs of commSchemes) {
    await prisma.commissionScheme.create({
      data: {
        organizationId: org.id,
        name: cs.name,
        loanType: cs.loanType,
        payInPercent: cs.payInPercent,
        partnerSplitPercent: cs.partnerSplitPercent,
        employeeIncentivePercent: cs.employeeIncentivePercent,
      },
    });
  }

  // 6. Seed 50+ Realistic Leads & 20+ Loan Applications
  const loanTypes = ['Home Loan', 'Personal Loan', 'Business Loan', 'Loan Against Property', 'Car Loan', 'Education Loan', 'Gold Loan', 'MSME Loan'];
  const sources = ['Website', 'Referral', 'Partner', 'Cold Call', 'Facebook Ads', 'Google Search', 'Walk-in'];
  const leadStatuses = ['New', 'Contacted', 'Interested', 'Documents Pending', 'Application Started', 'Login', 'Sanctioned', 'Disbursed', 'Rejected', 'Lost'];

  const customerNames = [
    'Rajesh Kumar', 'Anita Sharma', 'Siddharth Varma', 'Meera Nair', 'Pankaj Gupta',
    'Arjun Reddy', 'Kavya Singhania', 'Rohan Das', 'Deepika Padukone', 'Venkatesh Rao',
    'Sunita Agarwal', 'Alok Pandey', 'Tarun Gill', 'Bhavna Chawla', 'Ketan Shah',
    'Nitin Goyal', 'Sonal Trivedi', 'Vijay Malhotra', 'Aakash Ambani', 'Priyanka Chopra',
    'Manish Saxena', 'Ritu Maheshwari', 'Gaurav Sen', 'Swati Deshpande', 'Harish Chandra',
    'Preeti Zinta', 'Karan Johar', 'Narendra Solanki', 'Dinesh Karthik', 'Smriti Mandhana',
    'Ravindra Jadeja', 'Shilpa Shetty', 'Anil Kapoor', 'Juhi Chawla', 'Sunil Gavaskar',
    'Virender Sehwag', 'Kapil Dev', 'Sachin Ramesh', 'Sourav Ganguly', 'Rahul Dravid',
    'VVS Laxman', 'Zaheer Khan', 'Yuvraj Singh', 'Harbhajan Singh', 'Gautam Gambhir',
    'Ashish Nehra', 'Mahendra Singh', 'Rohit Sharma', 'Virat Kohli', 'Jasprit Bumrah'
  ];

  const createdLeads: any[] = [];
  const agentUser = createdUsers.SALES_AGENT;

  for (let i = 0; i < customerNames.length; i++) {
    const name = customerNames[i];
    const loanType = loanTypes[i % loanTypes.length];
    const source = sources[i % sources.length];
    const status = leadStatuses[i % leadStatuses.length];
    const amount = Math.round((200000 + (i * 450000)) / 50000) * 50000;
    const leadNum = 1001 + i;

    const lead = await prisma.lead.create({
      data: {
        organizationId: org.id,
        leadId: `LP-LD-${leadNum}`,
        customerName: name,
        phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
        city: ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad', 'Ahmedabad', 'Jaipur'][i % 7],
        loanType,
        amount,
        source,
        status,
        assignedToId: agentUser.id,
        nextFollowUp: new Date(Date.now() + (i % 5) * 86400000),
        notes: `Customer is looking for fast processing for ${loanType}. Pre-approved salary slip attached.`,
      },
    });

    createdLeads.push(lead);

    // Create activity
    await prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        type: 'STATUS_CHANGE',
        title: `Lead Status set to ${status}`,
        details: `Initial entry recorded from source ${source}.`,
      },
    });
  }

  console.log('✅ 50+ Leads Seeded');

  // Create Applications for Disbursed / Sanctioned / Login leads
  const appsToCreate = createdLeads.filter(l => ['Login', 'Sanctioned', 'Disbursed', 'Application Started'].includes(l.status));
  
  const createdApps: any[] = [];
  let appCounter = 101;

  for (let i = 0; i < Math.min(appsToCreate.length, 25); i++) {
    const lead = appsToCreate[i];
    const bank = createdBanks[i % createdBanks.length];
    const partner = createdPartners[i % createdPartners.length];
    const appStatus = lead.status === 'Application Started' ? 'Login' : lead.status;
    const disAmt = appStatus === 'Disbursed' ? lead.amount : null;
    const sancAmt = ['Sanctioned', 'Disbursed'].includes(appStatus) ? lead.amount : null;

    const app = await prisma.loanApplication.create({
      data: {
        organizationId: org.id,
        applicationNumber: `LP-APP-2026-${appCounter++}`,
        leadId: lead.id,
        bankId: bank.id,
        loanType: lead.loanType,
        amount: lead.amount,
        tenure: 240,
        roi: bank.minROI + 0.5,
        assignedEmployeeId: agentUser.id,
        partnerId: partner.id,
        status: appStatus,
        sanctionedAmount: sancAmt,
        disbursedAmount: disAmt,
        loginDate: new Date(Date.now() - 10 * 86400000),
        sanctionDate: ['Sanctioned', 'Disbursed'].includes(appStatus) ? new Date(Date.now() - 5 * 86400000) : null,
        disbursementDate: appStatus === 'Disbursed' ? new Date(Date.now() - 2 * 86400000) : null,
        tatDays: 4,
      },
    });

    createdApps.push(app);

    // If Disbursed, create Commission record
    if (appStatus === 'Disbursed') {
      const payInPct = 1.5;
      const totalPayIn = (lead.amount * payInPct) / 100;
      const partnerPayout = (totalPayIn * partner.commissionRate) / 100;
      const agentIncentive = (totalPayIn * 5) / 100;
      const gstAmount = totalPayIn * 0.18;
      const tdsAmount = totalPayIn * 0.05;
      const netPayout = totalPayIn - tdsAmount;

      const comm = await prisma.commission.create({
        data: {
          applicationId: app.id,
          leadId: lead.id,
          disbursedAmount: lead.amount,
          payInPercent: payInPct,
          totalPayIn,
          partnerPayout,
          employeeIncentive: agentIncentive,
          gstAmount,
          tdsAmount,
          netPayout,
          status: 'Approved',
          referenceNo: `PAY-REC-${1000 + i}`,
        },
      });

      // Create ledger transaction
      await prisma.commissionTransaction.create({
        data: {
          commissionId: comm.id,
          amount: totalPayIn,
          type: 'PAY_IN',
          recipient: bank.name,
          referenceNo: `BANK-TXN-${5000 + i}`,
          status: 'Completed',
        },
      });
    }
  }

  console.log('✅ 20+ Applications & Commissions Seeded');

  // 7. Seed Documents
  for (let i = 0; i < 15; i++) {
    const lead = createdLeads[i];
    await prisma.document.create({
      data: {
        organizationId: org.id,
        name: `${lead.customerName}_PAN_Card.pdf`,
        type: 'PAN',
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileSize: '1.4 MB',
        status: 'Verified',
        leadId: lead.id,
      },
    });
    await prisma.document.create({
      data: {
        organizationId: org.id,
        name: `${lead.customerName}_Aadhaar_Front_Back.pdf`,
        type: 'Aadhaar',
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileSize: '2.1 MB',
        status: 'Verified',
        leadId: lead.id,
      },
    });
  }

  // 8. Seed Tasks
  for (let i = 0; i < 10; i++) {
    const lead = createdLeads[i];
    await prisma.task.create({
      data: {
        organizationId: org.id,
        title: `Collect salary slips for ${lead.customerName}`,
        description: `Customer agreed to share 6 months bank statement by tomorrow.`,
        priority: i % 2 === 0 ? 'High' : 'Medium',
        status: i % 3 === 0 ? 'Completed' : 'Pending',
        dueDate: new Date(Date.now() + (i + 1) * 86400000),
        assignedToId: agentUser.id,
        leadId: lead.id,
      },
    });
  }

  // 9. Seed Call Logs & WhatsApp Messages
  for (let i = 0; i < 10; i++) {
    const lead = createdLeads[i];
    await prisma.call.create({
      data: {
        leadId: lead.id,
        callerId: agentUser.id,
        callType: 'Outbound',
        duration: 180,
        result: 'Interested',
        notes: `Explained interest rates and processing fee slab. Customer requested digital list of required docs.`,
      },
    });

    await prisma.message.create({
      data: {
        leadId: lead.id,
        senderId: agentUser.id,
        channel: 'WhatsApp',
        content: `Hi ${lead.customerName}, thanks for connecting with LoanPilot! Here is your document checklist: 1. PAN, 2. Aadhaar, 3. 6 Months Bank Statement.`,
        status: 'Delivered',
      },
    });
  }

  // 10. Seed HR & Employees
  const emp = await prisma.employee.create({
    data: {
      organizationId: org.id,
      empCode: 'EMP-201',
      userId: agentUser.id,
      department: 'Sales',
      designation: 'Senior Loan Relationship Manager',
      salary: 55000,
      targetAmount: 10000000,
      achievedAmount: 7800000,
    },
  });

  await prisma.attendance.create({
    data: {
      employeeId: emp.id,
      status: 'Present',
      checkIn: '09:15 AM',
      checkOut: '06:45 PM',
      location: 'DLF Cyber City Office, Gurugram',
    },
  });

  // 11. Seed Bank Schemes (for Public Scheme Catalog)
  const schemeList = [
    { bank: createdBanks[0], schemeName: 'SBI Griha Raksha Special Home Loan', product: 'Home Loan', states: 'All India', minAmount: 1500000, maxAmount: 50000000, minROI: 8.4, maxROI: 9.2, cibil: 750, foir: 65, vintage: 2, usps: 'Lowest ROI in industry, concession for women co-applicants, zero prepayment charges.' },
    { bank: createdBanks[1], schemeName: 'HDFC Express Business Loan 48h', product: 'Business Loan', states: 'Delhi NCR, Maharashtra, Karnataka', minAmount: 500000, maxAmount: 10000000, minROI: 11.5, maxROI: 15.0, cibil: 700, foir: 60, vintage: 3, usps: 'No collateral required, minimal documentation, sanction letter in 48 hours.' },
    { bank: createdBanks[2], schemeName: 'ICICI Smart LAP Commercial & Residential', product: 'Loan Against Property', states: 'All India', minAmount: 2000000, maxAmount: 100000000, minROI: 8.8, maxROI: 10.5, cibil: 680, foir: 70, vintage: 2, usps: 'High LTV up to 80% market valuation, flexi overdraft facility available.' },
  ];

  for (const s of schemeList) {
    await prisma.scheme.create({
      data: {
        bankId: s.bank.id,
        schemeName: s.schemeName,
        product: s.product,
        states: s.states,
        minAmount: s.minAmount,
        maxAmount: s.maxAmount,
        minROI: s.minROI,
        maxROI: s.maxROI,
        cibilScore: s.cibil,
        foir: s.foir,
        minVintage: s.vintage,
        usps: s.usps,
        rmContact: s.bank.rmPhone,
      },
    });
  }

  // 12. Seed Notifications
  await prisma.notification.create({
    data: {
      userId: agentUser.id,
      title: '🎉 Application Sanctioned!',
      message: 'Loan Application LP-APP-2026-101 for Rajesh Kumar has been sanctioned by SBI for ₹45,00,000.',
      type: 'SUCCESS',
    },
  });

  console.log('🏁 LoanPilot Seed Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
