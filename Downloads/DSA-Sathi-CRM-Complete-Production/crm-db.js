// crm-db.js
// Multi-tenant relational CRM database engine with atomic persistence
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'crm_db.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DEFAULT_DB = {
  crms: [],
  workspace_members: [],
  modules: [],
  module_fields: [],
  module_records: [],
  activities: [],
  notes: [],
  onboarding_progress: {},
  wallets: [],
  transactions: [],
  api_keys: [],
  invoices: [],
  expenses: [],
  hr_employees: [],
  attendance: [],
  leaves: [],
  campaigns: [],
  marketing_templates: [],
  ai_chats: []
};

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    saveDB(DEFAULT_DB);
    return JSON.parse(JSON.stringify(DEFAULT_DB));
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_DB, ...parsed };
  } catch (e) {
    console.error('Error reading crm_db.json, recreating defaults:', e.message);
    return JSON.parse(JSON.stringify(DEFAULT_DB));
  }
}

function saveDB(data) {
  try {
    const tempFile = DB_FILE + '.tmp';
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (e) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  }
}

function generateId(prefix = 'id') {
  return `${prefix}_${crypto.randomBytes(8).toString('hex')}`;
}

function createStandardModules(crmId) {
  const modules = [
    {
      id: generateId('mod'),
      crmId,
      name: 'Leads',
      singularName: 'Lead',
      key: 'leads',
      icon: 'user-plus',
      description: 'Prospective clients and inbound inquiries',
      isSystem: true,
      order: 1,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId('mod'),
      crmId,
      name: 'Contacts',
      singularName: 'Contact',
      key: 'contacts',
      icon: 'users',
      description: 'Individual persons, decision makers, and clients',
      isSystem: true,
      order: 2,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId('mod'),
      crmId,
      name: 'Customers',
      singularName: 'Customer',
      key: 'customers',
      icon: 'users',
      description: 'Active client accounts and verified customers',
      isSystem: true,
      order: 3,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId('mod'),
      crmId,
      name: 'Accounts',
      singularName: 'Account',
      key: 'accounts',
      icon: 'building',
      description: 'Companies, organizations, and business entities',
      isSystem: true,
      order: 4,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId('mod'),
      crmId,
      name: 'Deals',
      singularName: 'Deal',
      key: 'deals',
      icon: 'briefcase',
      description: 'Sales opportunities and active pipeline deals',
      isSystem: true,
      order: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId('mod'),
      crmId,
      name: 'Tasks',
      singularName: 'Task',
      key: 'tasks',
      icon: 'check-square',
      description: 'Action items, follow-ups, and team deliverables',
      isSystem: true,
      order: 6,
      createdAt: new Date().toISOString()
    }
  ];

  const leadsMod = modules[0];
  const contactsMod = modules[1];
  const customersMod = modules[2];
  const accountsMod = modules[3];
  const dealsMod = modules[4];
  const tasksMod = modules[5];

  const fields = [
    // Leads fields
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'First Name', key: 'first_name', type: 'text', required: true, defaultValue: '', options: [], placeholder: 'John', order: 1, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Last Name', key: 'last_name', type: 'text', required: true, defaultValue: '', options: [], placeholder: 'Doe', order: 2, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Full Name', key: 'name', type: 'text', required: true, defaultValue: '', options: [], placeholder: 'John Doe', order: 3, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Company', key: 'company', type: 'text', required: false, defaultValue: '', options: [], placeholder: 'Acme Corp', order: 4, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Email', key: 'email', type: 'email', required: false, defaultValue: '', options: [], placeholder: 'john@example.com', order: 5, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Phone', key: 'phone', type: 'phone', required: false, defaultValue: '', options: [], placeholder: '+91 98765 43210', order: 6, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Lead Source', key: 'source', type: 'select', required: true, defaultValue: 'Website', options: ['Website', 'Referral', 'Advertisement', 'Social Media', 'Cold Call', 'Email', 'Other'], placeholder: 'Select source', order: 7, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Lead Status', key: 'status', type: 'select', required: true, defaultValue: 'New', options: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Converted', 'Lost'], placeholder: 'Select status', order: 8, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Expected Value', key: 'value', type: 'currency', required: false, defaultValue: '', options: [], placeholder: '0.00', order: 9, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Follow-up Date', key: 'followup_date', type: 'date', required: false, defaultValue: '', options: [], placeholder: '', order: 10, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Assigned Owner', key: 'assigned_to', type: 'user', required: false, defaultValue: '', options: [], placeholder: 'Assign team member', order: 11, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: leadsMod.id, name: 'Notes', key: 'notes', type: 'textarea', required: false, defaultValue: '', options: [], placeholder: 'Additional details...', order: 12, isSystem: false, createdAt: new Date().toISOString() },

    // Contacts fields
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'First Name', key: 'first_name', type: 'text', required: true, defaultValue: '', options: [], placeholder: 'Sarah', order: 1, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'Last Name', key: 'last_name', type: 'text', required: true, defaultValue: '', options: [], placeholder: 'Jenkins', order: 2, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'Full Name', key: 'name', type: 'text', required: true, defaultValue: '', options: [], placeholder: 'Sarah Jenkins', order: 3, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'Email Address', key: 'email', type: 'email', required: true, defaultValue: '', options: [], placeholder: 'sarah@apex.com', order: 4, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'Phone Number', key: 'phone', type: 'phone', required: false, defaultValue: '', options: [], placeholder: '+91 99887 76655', order: 5, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'Job Title', key: 'title', type: 'text', required: false, defaultValue: '', options: [], placeholder: 'VP of Sales', order: 6, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'Company', key: 'company', type: 'text', required: false, defaultValue: '', options: [], placeholder: 'Apex Solutions', order: 7, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'Department', key: 'department', type: 'text', required: false, defaultValue: '', options: [], placeholder: 'Executive', order: 8, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'Contact Status', key: 'status', type: 'select', required: true, defaultValue: 'Active', options: ['Active', 'Inactive', 'Prospect', 'Customer'], order: 9, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'Assigned Owner', key: 'assigned_to', type: 'user', required: false, defaultValue: '', options: [], placeholder: 'Assign team member', order: 10, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: contactsMod.id, name: 'Notes', key: 'notes', type: 'textarea', required: false, defaultValue: '', options: [], placeholder: 'Contact notes...', order: 11, isSystem: false, createdAt: new Date().toISOString() },

    // Customers fields
    { id: generateId('fld'), crmId, moduleId: customersMod.id, name: 'Customer Code', key: 'code', type: 'autonumber', required: false, defaultValue: '', options: [], autoNumberPrefix: 'CUST', autoNumberDigits: 4, order: 1, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: customersMod.id, name: 'Customer Name', key: 'name', type: 'text', required: true, defaultValue: '', options: [], placeholder: 'e.g. Reliance Retail', order: 2, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: customersMod.id, name: 'Email', key: 'email', type: 'email', required: false, defaultValue: '', options: [], placeholder: 'contact@client.com', order: 3, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: customersMod.id, name: 'Phone', key: 'phone', type: 'phone', required: true, defaultValue: '', options: [], placeholder: '+91 98765 00000', order: 4, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: customersMod.id, name: 'Customer Type', key: 'customer_type', type: 'select', required: true, defaultValue: 'Enterprise', options: ['Enterprise', 'SME', 'Individual', 'Partner'], order: 5, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: customersMod.id, name: 'Annual Contract Value', key: 'annual_revenue', type: 'currency', required: false, defaultValue: '', options: [], order: 6, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: customersMod.id, name: 'Status', key: 'status', type: 'select', required: true, defaultValue: 'Active', options: ['Active', 'Onboarding', 'VIP', 'Inactive'], order: 7, isSystem: false, createdAt: new Date().toISOString() },

    // Accounts / Companies fields
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Company Name', key: 'name', type: 'text', required: true, defaultValue: '', options: [], placeholder: 'e.g. Innovatech Inc.', order: 1, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Industry', key: 'industry', type: 'select', required: false, defaultValue: 'Technology', options: ['Technology', 'Financial Services', 'Real Estate', 'Healthcare', 'Manufacturing', 'Retail', 'Education', 'Other'], order: 2, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Website', key: 'website', type: 'text', required: false, defaultValue: '', options: [], placeholder: 'https://example.com', order: 3, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Company Email', key: 'email', type: 'email', required: false, defaultValue: '', options: [], placeholder: 'info@company.com', order: 4, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Company Phone', key: 'phone', type: 'phone', required: false, defaultValue: '', options: [], placeholder: '+91 22 1234 5678', order: 5, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Street Address', key: 'address', type: 'text', required: false, defaultValue: '', options: [], placeholder: '123 Tech Park', order: 6, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'City', key: 'city', type: 'text', required: false, defaultValue: '', options: [], placeholder: 'Bengaluru', order: 7, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'State', key: 'state', type: 'text', required: false, defaultValue: '', options: [], placeholder: 'Karnataka', order: 8, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Country', key: 'country', type: 'text', required: false, defaultValue: '', options: [], placeholder: 'India', order: 9, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Postal Code', key: 'postal_code', type: 'text', required: false, defaultValue: '', options: [], placeholder: '560001', order: 10, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Company Size', key: 'company_size', type: 'select', required: false, defaultValue: '10-50', options: ['1-10', '10-50', '50-200', '200-500', '500+'], order: 11, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Assigned Owner', key: 'assigned_to', type: 'user', required: false, defaultValue: '', options: [], placeholder: 'Assign team member', order: 12, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: accountsMod.id, name: 'Notes', key: 'notes', type: 'textarea', required: false, defaultValue: '', options: [], placeholder: 'Company notes...', order: 13, isSystem: false, createdAt: new Date().toISOString() },

    // Deals fields
    { id: generateId('fld'), crmId, moduleId: dealsMod.id, name: 'Deal Name', key: 'name', type: 'text', required: true, defaultValue: '', options: [], placeholder: 'e.g. Enterprise Cloud Migration', order: 1, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: dealsMod.id, name: 'Deal Amount', key: 'amount', type: 'currency', required: true, defaultValue: '', options: [], placeholder: '500000', order: 2, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: dealsMod.id, name: 'Stage', key: 'stage', type: 'select', required: true, defaultValue: 'Prospecting', options: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'], order: 3, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: dealsMod.id, name: 'Expected Close Date', key: 'close_date', type: 'date', required: false, defaultValue: '', options: [], order: 4, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: dealsMod.id, name: 'Probability (%)', key: 'probability', type: 'number', required: false, defaultValue: '50', options: [], order: 5, isSystem: false, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: dealsMod.id, name: 'Associated Account', key: 'account_name', type: 'text', required: false, defaultValue: '', options: [], order: 6, isSystem: false, createdAt: new Date().toISOString() },

    // Tasks fields
    { id: generateId('fld'), crmId, moduleId: tasksMod.id, name: 'Task Subject', key: 'name', type: 'text', required: true, defaultValue: '', options: [], placeholder: 'e.g. Follow up on proposal', order: 1, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: tasksMod.id, name: 'Due Date', key: 'due_date', type: 'date', required: true, defaultValue: '', options: [], order: 2, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: tasksMod.id, name: 'Priority', key: 'priority', type: 'select', required: true, defaultValue: 'Medium', options: ['High', 'Medium', 'Low'], order: 3, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: tasksMod.id, name: 'Status', key: 'status', type: 'select', required: true, defaultValue: 'Not Started', options: ['Not Started', 'In Progress', 'Completed', 'Deferred'], order: 4, isSystem: true, createdAt: new Date().toISOString() },
    { id: generateId('fld'), crmId, moduleId: tasksMod.id, name: 'Assigned To', key: 'assigned_to', type: 'user', required: false, defaultValue: '', options: [], order: 5, isSystem: false, createdAt: new Date().toISOString() }
  ];

  return { modules, fields };
}

function seedCRMInitialData(crmId, ownerEmail, ownerName) {
  const db = readDB();
  const modules = db.modules.filter(m => m.crmId === crmId);
  const leadsMod = modules.find(m => m.key === 'leads');
  const contactsMod = modules.find(m => m.key === 'contacts');
  const customersMod = modules.find(m => m.key === 'customers');
  const accountsMod = modules.find(m => m.key === 'accounts');
  const dealsMod = modules.find(m => m.key === 'deals');
  const tasksMod = modules.find(m => m.key === 'tasks');

  const now = new Date().toISOString();
  const email = ownerEmail ? ownerEmail.toLowerCase() : 'owner@dsasathi.com';
  const name = ownerName || email.split('@')[0];

  const newRecords = [];

  // 1. Leads
  if (leadsMod) {
    const hasLeads = db.module_records.some(r => r.crmId === crmId && r.moduleId === leadsMod.id);
    if (!hasLeads) {
      const leadData = [
        { name: 'Manoj Tiwari', phone: '9876543216', email: 'manoj.tiwari@example.com', company: 'Tiwari Traders', status: 'Qualified', source: 'Website', loan_type: 'Home Loan', required_amount: 4500000, city: 'Mumbai' },
        { name: 'Amit Patel', phone: '9876543212', email: 'amit@example.com', company: 'Patel Solutions', status: 'Converted', source: 'Website', loan_type: 'Business Loan', required_amount: 1000000, city: 'Ahmedabad' },
        { name: 'Priya Sharma', phone: '9876543211', email: 'priya@example.com', company: 'Sharma Designs', status: 'Converted', source: 'Referral', loan_type: 'Personal Loan', required_amount: 500000, city: 'Delhi' },
        { name: 'Kavita Joshi', phone: '9876543219', email: 'kavita@example.com', company: 'Joshi Jewels', status: 'Converted', source: 'Website', loan_type: 'Gold Loan', required_amount: 300000, city: 'Nagpur' },
        { name: 'Vikram Singh', phone: '9876543214', email: 'vikram@example.com', company: 'Singh Logistics', status: 'Contacted', source: 'Walk-in', loan_type: 'Car Loan', required_amount: 800000, city: 'Pune' }
      ];
      leadData.forEach((ld) => {
        newRecords.push({ id: generateId('rec'), crmId, moduleId: leadsMod.id, data: ld, createdBy: email, createdByName: name, createdAt: now, updatedAt: now });
      });
    }
  }

  // 2. Contacts
  if (contactsMod) {
    const hasContacts = db.module_records.some(r => r.crmId === crmId && r.moduleId === contactsMod.id);
    if (!hasContacts) {
      const contactData = [
        { name: 'Manoj Tiwari', email: 'manoj.tiwari@example.com', phone: '9876543216', title: 'Managing Director', company_name: 'Tiwari Traders' },
        { name: 'Amit Patel', email: 'amit@example.com', phone: '9876543212', title: 'Founder & CEO', company_name: 'Patel Solutions' },
        { name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543211', title: 'Lead Designer', company_name: 'Sharma Designs' },
        { name: 'Kavita Joshi', email: 'kavita@example.com', phone: '9876543219', title: 'Proprietor', company_name: 'Joshi Jewels' },
        { name: 'Vikram Singh', email: 'vikram@example.com', phone: '9876543214', title: 'Operations Partner', company_name: 'Singh Logistics' }
      ];
      contactData.forEach(cd => {
        newRecords.push({ id: generateId('rec'), crmId, moduleId: contactsMod.id, data: cd, createdBy: email, createdByName: name, createdAt: now, updatedAt: now });
      });
    }
  }

  // 3. Customers
  if (customersMod) {
    const hasCustomers = db.module_records.some(r => r.crmId === crmId && r.moduleId === customersMod.id);
    if (!hasCustomers) {
      const customerData = [
        { code: 'CUST-1001', name: 'Manoj Tiwari', email: 'manoj.tiwari@example.com', phone: '9876543216', status: 'VIP', customer_type: 'Enterprise', annual_revenue: 4500000 },
        { code: 'CUST-1002', name: 'Amit Patel', email: 'amit@example.com', phone: '9876543212', status: 'Active', customer_type: 'SME', annual_revenue: 1000000 },
        { code: 'CUST-1003', name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543211', status: 'Active', customer_type: 'Individual', annual_revenue: 500000 },
        { code: 'CUST-1004', name: 'Kavita Joshi', email: 'kavita@example.com', phone: '9876543219', status: 'Active', customer_type: 'SME', annual_revenue: 300000 },
        { code: 'CUST-1005', name: 'Vikram Singh', email: 'vikram@example.com', phone: '9876543214', status: 'Onboarding', customer_type: 'SME', annual_revenue: 800000 }
      ];
      customerData.forEach(cd => {
        newRecords.push({ id: generateId('rec'), crmId, moduleId: customersMod.id, data: cd, createdBy: email, createdByName: name, createdAt: now, updatedAt: now });
      });
    }
  }

  // 4. Accounts / Companies
  if (accountsMod) {
    const hasAccounts = db.module_records.some(r => r.crmId === crmId && r.moduleId === accountsMod.id);
    if (!hasAccounts) {
      const accountData = [
        { name: 'Empire Credit First', industry: 'Financial Services', phone: '+91 77588 00563', email: 'nkamble00143@gmail.com', website: 'https://empirecredit.in', annual_revenue: 15000000, city: 'Mumbai' },
        { name: 'HomeVille Group Creditworld Pvt Ltd', industry: 'NBFC Lender', phone: '+91 22400 11223', email: 'partner@homeville.in', website: 'https://homeville.in', annual_revenue: 50000000, city: 'Mumbai' },
        { name: 'Apex Realty Consultants', industry: 'Real Estate Channel Partner', phone: '+91 99112 23344', email: 'contact@apexrealty.in', website: 'https://apexrealty.in', annual_revenue: 8000000, city: 'Pune' }
      ];
      accountData.forEach(ad => {
        newRecords.push({ id: generateId('rec'), crmId, moduleId: accountsMod.id, data: ad, createdBy: email, createdByName: name, createdAt: now, updatedAt: now });
      });
    }
  }

  // 5. Deals
  if (dealsMod) {
    const hasDeals = db.module_records.some(r => r.crmId === crmId && r.moduleId === dealsMod.id);
    if (!hasDeals) {
      const dealData = [
        { name: 'Manoj Tiwari — Home Loan Sanction', amount: 4500000, stage: 'Proposal', close_date: '2026-09-30', probability: 80, account_name: 'State Bank of India' },
        { name: 'Amit Patel — Business Loan Disbursal', amount: 1000000, stage: 'Closed Won', close_date: '2026-08-15', probability: 100, account_name: 'HDFC Bank' },
        { name: 'Priya Sharma — Personal Loan Disbursal', amount: 500000, stage: 'Closed Won', close_date: '2026-08-20', probability: 100, account_name: 'ICICI Bank' },
        { name: 'Kavita Joshi — Gold Loan Disbursal', amount: 300000, stage: 'Closed Won', close_date: '2026-08-25', probability: 100, account_name: 'Muthoot Finance' },
        { name: 'Vikram Singh — Car Loan Application', amount: 800000, stage: 'Qualification', close_date: '2026-10-15', probability: 60, account_name: 'Axis Bank' }
      ];
      dealData.forEach(dd => {
        newRecords.push({ id: generateId('rec'), crmId, moduleId: dealsMod.id, data: dd, createdBy: email, createdByName: name, createdAt: now, updatedAt: now });
      });
    }
  }

  // 6. Tasks
  if (tasksMod) {
    const hasTasks = db.module_records.some(r => r.crmId === crmId && r.moduleId === tasksMod.id);
    if (!hasTasks) {
      const taskData = [
        { name: 'Collect ITR & 6 Months Bank Statement for Manoj Tiwari', due_date: '2026-09-05', priority: 'High', status: 'In Progress', assigned_to: email },
        { name: 'Property Legal & Valuation Report Verification for Manoj Tiwari', due_date: '2026-09-08', priority: 'High', status: 'In Progress', assigned_to: email },
        { name: 'Submit Disbursal Kit & Agreement to HDFC Bank for Amit Patel', due_date: '2026-08-16', priority: 'Medium', status: 'Completed', assigned_to: email },
        { name: 'Send WhatsApp Loan Quote & EMI Schedule to Vikram Singh', due_date: '2026-09-02', priority: 'Medium', status: 'Not Started', assigned_to: email },
        { name: 'Sub-DSA Payout Ledger Reconciliation for Rahul Verma', due_date: '2026-09-10', priority: 'Low', status: 'Not Started', assigned_to: email }
      ];
      taskData.forEach(td => {
        newRecords.push({ id: generateId('rec'), crmId, moduleId: tasksMod.id, data: td, createdBy: email, createdByName: name, createdAt: now, updatedAt: now });
      });
    }
  }

  if (newRecords.length > 0) {
    db.module_records.push(...newRecords);
    saveDB(db);
  }
}

const CRMDatabase = {
  // CRM Workspaces
  createCRM({ name, companyName, industry, description, logoUrl, timezone, currency, primaryColor, ownerEmail, ownerName }) {
    const db = readDB();
    const crmId = generateId('crm');
    const now = new Date().toISOString();

    const newCRM = {
      id: crmId,
      code: `WS-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || 'My CRM',
      companyName: companyName || name || 'My Company',
      industry: industry || 'Technology',
      description: description || '',
      logoUrl: logoUrl || '',
      timezone: timezone || 'Asia/Kolkata (+05:30)',
      currency: currency || '₹ INR',
      primaryColor: primaryColor || '#1f4fd6',
      ownerEmail: ownerEmail.toLowerCase(),
      createdAt: now,
      updatedAt: now
    };

    db.crms.push(newCRM);

    const member = {
      id: generateId('mem'),
      crmId,
      email: ownerEmail.toLowerCase(),
      name: ownerName || ownerEmail.split('@')[0],
      role: 'owner',
      status: 'active',
      department: 'Management',
      joinedAt: now
    };
    db.workspace_members.push(member);

    const { modules, fields } = createStandardModules(crmId);
    db.modules.push(...modules);
    db.module_fields.push(...fields);

    // Initial wallet
    db.wallets.push({
      crmId,
      balance: 25000,
      currency: newCRM.currency.split(' ')[0] || '₹',
      updatedAt: now
    });

    // Initial Onboarding state
    db.onboarding_progress[crmId] = {
      completedSteps: { 1: true },
      progressPct: 20,
      legalName: newCRM.companyName,
      gstin: '',
      updatedAt: now
    };

    db.activities.push({
      id: generateId('act'),
      crmId,
      moduleId: null,
      recordId: null,
      type: 'status_change',
      title: 'Workspace Initialized',
      description: `CRM "${newCRM.name}" created with DSA Sathi suite modules.`,
      performedBy: ownerEmail.toLowerCase(),
      performedByName: member.name,
      createdAt: now
    });

    saveDB(db);
    seedCRMInitialData(crmId, ownerEmail, ownerName);
    return newCRM;
  },

  getCRM(crmId) {
    const db = readDB();
    return db.crms.find(c => c.id === crmId) || null;
  },

  getUserCRMs(email) {
    const db = readDB();
    const normalized = email.toLowerCase();
    const memberships = db.workspace_members.filter(m => m.email === normalized && m.status === 'active');
    const crmIds = new Set(memberships.map(m => m.crmId));
    
    return db.crms.filter(c => crmIds.has(c.id)).map(c => {
      const mem = memberships.find(m => m.crmId === c.id);
      return {
        ...c,
        userRole: mem ? mem.role : 'viewer'
      };
    });
  },

  updateCRM(crmId, updates) {
    const db = readDB();
    const idx = db.crms.findIndex(c => c.id === crmId);
    if (idx === -1) return null;

    db.crms[idx] = {
      ...db.crms[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveDB(db);
    return db.crms[idx];
  },

  deleteCRM(crmId) {
    const db = readDB();
    db.crms = db.crms.filter(c => c.id !== crmId);
    db.workspace_members = db.workspace_members.filter(m => m.crmId !== crmId);
    db.modules = db.modules.filter(m => m.crmId !== crmId);
    db.module_fields = db.module_fields.filter(f => f.crmId !== crmId);
    db.module_records = db.module_records.filter(r => r.crmId !== crmId);
    db.activities = db.activities.filter(a => a.crmId !== crmId);
    db.notes = db.notes.filter(n => n.crmId !== crmId);
    delete db.onboarding_progress[crmId];
    saveDB(db);
    return true;
  },

  // Modules & Fields
  getModules(crmId) {
    const db = readDB();
    return db.modules
      .filter(m => m.crmId === crmId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  getModule(crmId, moduleIdOrKey) {
    const db = readDB();
    return db.modules.find(m => m.crmId === crmId && (m.id === moduleIdOrKey || m.key === moduleIdOrKey)) || null;
  },

  createModule(crmId, { name, singularName, icon, description, initialFields }) {
    const db = readDB();
    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || `mod_${Date.now()}`;
    const maxOrder = db.modules.filter(m => m.crmId === crmId).reduce((max, m) => Math.max(max, m.order || 0), 0);

    const newModule = {
      id: generateId('mod'),
      crmId,
      name,
      singularName: singularName || name,
      key,
      icon: icon || 'folder',
      description: description || '',
      isSystem: false,
      order: maxOrder + 1,
      createdAt: new Date().toISOString()
    };

    db.modules.push(newModule);

    const primaryField = {
      id: generateId('fld'),
      crmId,
      moduleId: newModule.id,
      name: `${newModule.singularName} Name`,
      key: 'name',
      type: 'text',
      required: true,
      defaultValue: '',
      options: [],
      placeholder: `Enter ${newModule.singularName} name`,
      order: 1,
      isSystem: true,
      createdAt: new Date().toISOString()
    };
    db.module_fields.push(primaryField);

    if (Array.isArray(initialFields)) {
      initialFields.forEach((f, idx) => {
        if (!f.name) return;
        const fKey = f.key || f.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
        db.module_fields.push({
          id: generateId('fld'),
          crmId,
          moduleId: newModule.id,
          name: f.name,
          key: fKey,
          type: f.type || 'text',
          required: !!f.required,
          defaultValue: f.defaultValue || '',
          options: Array.isArray(f.options) ? f.options : (typeof f.options === 'string' ? f.options.split(',').map(s=>s.trim()).filter(Boolean) : []),
          placeholder: f.placeholder || '',
          order: idx + 2,
          isSystem: false,
          relationshipModuleId: f.relationshipModuleId || null,
          autoNumberPrefix: f.autoNumberPrefix || '',
          autoNumberDigits: f.autoNumberDigits || 4,
          createdAt: new Date().toISOString()
        });
      });
    }

    saveDB(db);
    return newModule;
  },

  updateModule(crmId, moduleId, updates) {
    const db = readDB();
    const idx = db.modules.findIndex(m => m.crmId === crmId && m.id === moduleId);
    if (idx === -1) return null;

    db.modules[idx] = {
      ...db.modules[idx],
      name: updates.name || db.modules[idx].name,
      singularName: updates.singularName || db.modules[idx].singularName,
      icon: updates.icon || db.modules[idx].icon,
      description: updates.description !== undefined ? updates.description : db.modules[idx].description
    };
    saveDB(db);
    return db.modules[idx];
  },

  deleteModule(crmId, moduleId) {
    const db = readDB();
    const mod = db.modules.find(m => m.crmId === crmId && m.id === moduleId);
    if (!mod || mod.isSystem) return false;

    db.modules = db.modules.filter(m => m.crmId === crmId && m.id !== moduleId);
    db.module_fields = db.module_fields.filter(f => f.crmId === crmId && f.moduleId !== moduleId);
    db.module_records = db.module_records.filter(r => r.crmId === crmId && r.moduleId !== moduleId);
    db.activities = db.activities.filter(a => a.crmId === crmId && a.moduleId !== moduleId);
    db.notes = db.notes.filter(n => n.crmId === crmId && n.moduleId !== moduleId);
    saveDB(db);
    return true;
  },

  getModuleFields(crmId, moduleId) {
    const db = readDB();
    return db.module_fields
      .filter(f => f.crmId === crmId && f.moduleId === moduleId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  addField(crmId, moduleId, fieldData) {
    const db = readDB();
    const fields = db.module_fields.filter(f => f.crmId === crmId && f.moduleId === moduleId);
    const key = fieldData.key || fieldData.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || `field_${Date.now()}`;
    const maxOrder = fields.reduce((max, f) => Math.max(max, f.order || 0), 0);

    const newField = {
      id: generateId('fld'),
      crmId,
      moduleId,
      name: fieldData.name,
      key,
      type: fieldData.type || 'text',
      required: !!fieldData.required,
      defaultValue: fieldData.defaultValue || '',
      options: Array.isArray(fieldData.options) ? fieldData.options : (typeof fieldData.options === 'string' ? fieldData.options.split(',').map(s=>s.trim()).filter(Boolean) : []),
      placeholder: fieldData.placeholder || '',
      order: maxOrder + 1,
      isSystem: false,
      relationshipModuleId: fieldData.relationshipModuleId || null,
      autoNumberPrefix: fieldData.autoNumberPrefix || '',
      autoNumberDigits: parseInt(fieldData.autoNumberDigits, 10) || 4,
      createdAt: new Date().toISOString()
    };

    db.module_fields.push(newField);
    saveDB(db);
    return newField;
  },

  updateField(crmId, moduleId, fieldId, updates) {
    const db = readDB();
    const idx = db.module_fields.findIndex(f => f.crmId === crmId && f.moduleId === moduleId && f.id === fieldId);
    if (idx === -1) return null;

    db.module_fields[idx] = {
      ...db.module_fields[idx],
      ...updates,
      options: updates.options !== undefined ? (Array.isArray(updates.options) ? updates.options : (typeof updates.options === 'string' ? updates.options.split(',').map(s=>s.trim()).filter(Boolean) : [])) : db.module_fields[idx].options
    };
    saveDB(db);
    return db.module_fields[idx];
  },

  deleteField(crmId, moduleId, fieldId) {
    const db = readDB();
    const fld = db.module_fields.find(f => f.crmId === crmId && f.moduleId === moduleId && f.id === fieldId);
    if (!fld || fld.isSystem) return false;

    db.module_fields = db.module_fields.filter(f => !(f.crmId === crmId && f.moduleId === moduleId && f.id === fieldId));
    saveDB(db);
    return true;
  },

  reorderFields(crmId, moduleId, fieldIds) {
    const db = readDB();
    fieldIds.forEach((id, index) => {
      const f = db.module_fields.find(item => item.crmId === crmId && item.moduleId === moduleId && item.id === id);
      if (f) f.order = index + 1;
    });
    saveDB(db);
    return true;
  },

  // Dynamic Records
  getRecords(crmId, moduleId, { search, sortField, sortOrder = 'desc', filterField, filterValue, limit = 50, offset = 0 } = {}) {
    const db = readDB();
    let records = db.module_records.filter(r => r.crmId === crmId && r.moduleId === moduleId);

    if (search) {
      const q = search.toLowerCase();
      records = records.filter(r => {
        return Object.values(r.data || {}).some(val => {
          if (val === null || val === undefined) return false;
          return String(val).toLowerCase().includes(q);
        });
      });
    }

    if (filterField && filterValue !== undefined && filterValue !== '') {
      records = records.filter(r => {
        const val = r.data ? r.data[filterField] : undefined;
        return String(val).toLowerCase() === String(filterValue).toLowerCase();
      });
    }

    if (sortField) {
      records.sort((a, b) => {
        const valA = a.data ? a.data[sortField] : '';
        const valB = b.data ? b.data[sortField] : '';
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        return sortOrder === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
      });
    } else {
      records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const total = records.length;
    const paginated = records.slice(offset, offset + limit);

    return { total, limit, offset, records: paginated };
  },

  getRecord(crmId, moduleId, recordId) {
    const db = readDB();
    return db.module_records.find(r => r.crmId === crmId && r.moduleId === moduleId && r.id === recordId) || null;
  },

  createRecord(crmId, moduleId, data, userEmail, userName) {
    const db = readDB();
    const fields = db.module_fields.filter(f => f.crmId === crmId && f.moduleId === moduleId);
    const mod = db.modules.find(m => m.crmId === crmId && m.id === moduleId);

    const autoNumFields = fields.filter(f => f.type === 'autonumber');
    const existingCount = db.module_records.filter(r => r.crmId === crmId && r.moduleId === moduleId).length;
    const nextSeq = existingCount + 1;

    const recordData = { ...data };
    autoNumFields.forEach(af => {
      const prefix = af.autoNumberPrefix || (mod ? mod.singularName.substring(0, 3).toUpperCase() : 'REC');
      const digits = af.autoNumberDigits || 4;
      recordData[af.key] = `${prefix}-${String(nextSeq).padStart(digits, '0')}`;
    });

    const now = new Date().toISOString();
    const newRecord = {
      id: generateId('rec'),
      crmId,
      moduleId,
      data: recordData,
      createdBy: userEmail || 'system',
      createdByName: userName || userEmail || 'User',
      updatedBy: userEmail || 'system',
      createdAt: now,
      updatedAt: now
    };

    db.module_records.push(newRecord);

    const primaryTitle = recordData.name || recordData.title || Object.values(recordData)[0] || 'Record';
    db.activities.push({
      id: generateId('act'),
      crmId,
      moduleId,
      recordId: newRecord.id,
      type: 'status_change',
      title: `Added ${mod ? mod.singularName : 'record'}: "${primaryTitle}"`,
      description: `Created in ${mod ? mod.name : 'module'} by ${userName || userEmail}`,
      performedBy: userEmail,
      performedByName: userName || userEmail,
      createdAt: now
    });

    saveDB(db);
    return newRecord;
  },

  updateRecord(crmId, moduleId, recordId, data, userEmail, userName) {
    const db = readDB();
    const idx = db.module_records.findIndex(r => r.crmId === crmId && r.moduleId === moduleId && r.id === recordId);
    if (idx === -1) return null;

    const mod = db.modules.find(m => m.crmId === crmId && m.id === moduleId);
    const now = new Date().toISOString();

    db.module_records[idx] = {
      ...db.module_records[idx],
      data: { ...db.module_records[idx].data, ...data },
      updatedBy: userEmail || 'system',
      updatedAt: now
    };

    const primaryTitle = data.name || db.module_records[idx].data.name || 'Record';
    db.activities.push({
      id: generateId('act'),
      crmId,
      moduleId,
      recordId,
      type: 'status_change',
      title: `Updated ${mod ? mod.singularName : 'record'}: "${primaryTitle}"`,
      description: `Record attributes updated by ${userName || userEmail}`,
      performedBy: userEmail,
      performedByName: userName || userEmail,
      createdAt: now
    });

    saveDB(db);
    return db.module_records[idx];
  },

  deleteRecord(crmId, moduleId, recordId, userEmail, userName) {
    const db = readDB();
    const rec = db.module_records.find(r => r.crmId === crmId && r.moduleId === moduleId && r.id === recordId);
    if (!rec) return false;

    const mod = db.modules.find(m => m.crmId === crmId && m.id === moduleId);
    const primaryTitle = rec.data ? (rec.data.name || rec.data.title || 'Record') : 'Record';

    db.module_records = db.module_records.filter(r => !(r.crmId === crmId && r.moduleId === moduleId && r.id === recordId));
    db.notes = db.notes.filter(n => !(n.crmId === crmId && n.recordId === recordId));

    db.activities.push({
      id: generateId('act'),
      crmId,
      moduleId,
      recordId: null,
      type: 'status_change',
      title: `Deleted ${mod ? mod.singularName : 'record'}: "${primaryTitle}"`,
      description: `Removed by ${userName || userEmail}`,
      performedBy: userEmail,
      performedByName: userName || userEmail,
      createdAt: new Date().toISOString()
    });

    saveDB(db);
    return true;
  },

  // Team & Members
  getMembers(crmId) {
    const db = readDB();
    return db.workspace_members.filter(m => m.crmId === crmId);
  },

  addMember(crmId, { email, name, role = 'employee', department = 'Sales', status = 'active' }) {
    const db = readDB();
    const normalizedEmail = email.toLowerCase().trim();
    const existing = db.workspace_members.find(m => m.crmId === crmId && m.email === normalizedEmail);
    if (existing) {
      existing.role = role;
      existing.status = status;
      existing.department = department || existing.department;
      existing.name = name || existing.name;
      saveDB(db);
      return existing;
    }

    const member = {
      id: generateId('mem'),
      crmId,
      email: normalizedEmail,
      name: name || normalizedEmail.split('@')[0],
      role: role || 'employee',
      department: department || 'Sales',
      status: status || 'active',
      joinedAt: new Date().toISOString()
    };

    db.workspace_members.push(member);
    saveDB(db);
    return member;
  },

  updateMember(crmId, memberId, updates) {
    const db = readDB();
    const idx = db.workspace_members.findIndex(m => m.crmId === crmId && m.id === memberId);
    if (idx === -1) return null;

    db.workspace_members[idx] = { ...db.workspace_members[idx], ...updates };
    saveDB(db);
    return db.workspace_members[idx];
  },

  removeMember(crmId, memberId) {
    const db = readDB();
    const mem = db.workspace_members.find(m => m.crmId === crmId && m.id === memberId);
    if (!mem || mem.role === 'owner') return false;

    db.workspace_members = db.workspace_members.filter(m => !(m.crmId === crmId && m.id === memberId));
    saveDB(db);
    return true;
  },

  // Onboarding progress
  getOnboardingProgress(crmId) {
    const db = readDB();
    return db.onboarding_progress[crmId] || { completedSteps: { 1: true }, progressPct: 20, legalName: '', gstin: '' };
  },

  saveOnboardingProgress(crmId, progress) {
    const db = readDB();
    db.onboarding_progress[crmId] = {
      ...(db.onboarding_progress[crmId] || {}),
      ...progress,
      updatedAt: new Date().toISOString()
    };
    saveDB(db);
    return db.onboarding_progress[crmId];
  },

  // Wallet
  getWallet(crmId) {
    const db = readDB();
    let wallet = db.wallets.find(w => w.crmId === crmId);
    if (!wallet) {
      const crm = db.crms.find(c => c.id === crmId);
      wallet = {
        crmId,
        balance: 50000,
        currency: crm ? crm.currency.split(' ')[0] : '₹',
        updatedAt: new Date().toISOString()
      };
      db.wallets.push(wallet);
      saveDB(db);
    }
    const txs = db.transactions.filter(t => t.crmId === crmId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return { wallet, transactions: txs };
  },

  addTransaction(crmId, { type, amount, description, reference, userEmail }) {
    const db = readDB();
    let wallet = db.wallets.find(w => w.crmId === crmId);
    if (!wallet) {
      wallet = { crmId, balance: 50000, currency: '₹', updatedAt: new Date().toISOString() };
      db.wallets.push(wallet);
    }

    const amt = parseFloat(amount) || 0;
    if (type === 'credit') {
      wallet.balance += amt;
    } else {
      wallet.balance = Math.max(0, wallet.balance - amt);
    }
    wallet.updatedAt = new Date().toISOString();

    const tx = {
      id: generateId('tx'),
      crmId,
      type: type || 'credit',
      amount: amt,
      description: description || 'Wallet Transaction',
      reference: reference || `REF-${Date.now()}`,
      status: 'completed',
      performedBy: userEmail,
      createdAt: new Date().toISOString()
    };

    db.transactions.push(tx);
    saveDB(db);
    return { wallet, transaction: tx };
  },

  // API Keys
  getApiKeys(crmId) {
    const db = readDB();
    return db.api_keys.filter(k => k.crmId === crmId);
  },

  createApiKey(crmId, { name, permissions, userEmail }) {
    const db = readDB();
    const key = `ak_${crypto.randomBytes(16).toString('hex')}`;
    const newApiKey = {
      id: generateId('apk'),
      crmId,
      name: name || 'Default API Key',
      keyPreview: `${key.substring(0, 6)}...${key.substring(key.length - 4)}`,
      fullKey: key,
      permissions: permissions || 'read_write',
      createdBy: userEmail,
      createdAt: new Date().toISOString(),
      lastUsed: null
    };

    db.api_keys.push(newApiKey);
    saveDB(db);
    return newApiKey;
  },

  deleteApiKey(crmId, keyId) {
    const db = readDB();
    db.api_keys = db.api_keys.filter(k => !(k.crmId === crmId && k.id === keyId));
    saveDB(db);
    return true;
  },

  // AI Chat Messages
  getAiHistory(crmId) {
    const db = readDB();
    return db.ai_chats.filter(c => c.crmId === crmId).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  },

  saveAiMessage(crmId, { role, content, userEmail }) {
    const db = readDB();
    const msg = {
      id: generateId('aim'),
      crmId,
      role: role || 'user',
      content,
      userEmail,
      createdAt: new Date().toISOString()
    };
    db.ai_chats.push(msg);
    saveDB(db);
    return msg;
  },

  // Activities & Notes
  getActivities(crmId, { moduleId, recordId, limit = 30 } = {}) {
    const db = readDB();
    let acts = db.activities.filter(a => a.crmId === crmId);
    if (moduleId) acts = acts.filter(a => a.moduleId === moduleId);
    if (recordId) acts = acts.filter(a => a.recordId === recordId);
    acts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return acts.slice(0, limit);
  },

  addActivity(crmId, { moduleId, recordId, type, title, description, userEmail, userName }) {
    const db = readDB();
    const activity = {
      id: generateId('act'),
      crmId,
      moduleId: moduleId || null,
      recordId: recordId || null,
      type: type || 'note',
      title,
      description: description || '',
      performedBy: userEmail,
      performedByName: userName || userEmail,
      createdAt: new Date().toISOString()
    };
    db.activities.push(activity);
    saveDB(db);
    return activity;
  },

  getNotes(crmId, recordId) {
    const db = readDB();
    return db.notes
      .filter(n => n.crmId === crmId && (!recordId || n.recordId === recordId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  addNote(crmId, { moduleId, recordId, title, content, userEmail, userName }) {
    const db = readDB();
    const note = {
      id: generateId('not'),
      crmId,
      moduleId: moduleId || null,
      recordId: recordId || null,
      title: title || 'Note',
      content,
      createdBy: userEmail,
      createdByName: userName || userEmail,
      createdAt: new Date().toISOString()
    };
    db.notes.push(note);
    saveDB(db);
    return note;
  },

  // Dashboard Metrics
  getDashboardMetrics(crmId) {
    const db = readDB();
    const crm = db.crms.find(c => c.id === crmId);
    if (!crm) return null;

    const modules = db.modules.filter(m => m.crmId === crmId);
    const leadsMod = modules.find(m => m.key === 'leads');
    const contactsMod = modules.find(m => m.key === 'contacts');
    const customersMod = modules.find(m => m.key === 'customers');
    const accountsMod = modules.find(m => m.key === 'accounts');
    const dealsMod = modules.find(m => m.key === 'deals');
    const tasksMod = modules.find(m => m.key === 'tasks');

    const leadsRecords = leadsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === leadsMod.id) : [];
    const contactsRecords = contactsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === contactsMod.id) : [];
    const customersRecords = customersMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === customersMod.id) : [];
    const accountsRecords = accountsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === accountsMod.id) : [];
    const dealsRecords = dealsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === dealsMod.id) : [];
    const tasksRecords = tasksMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === tasksMod.id) : [];

    const customModules = modules.filter(m => !m.isSystem);
    const customModuleStats = customModules.map(cm => {
      const count = db.module_records.filter(r => r.crmId === crmId && r.moduleId === cm.id).length;
      return { id: cm.id, name: cm.name, singularName: cm.singularName, icon: cm.icon, count };
    });

    let totalPipelineValue = 0;
    let wonRevenue = 0;
    let openDealsCount = 0;

    const dealsByStage = {
      'Prospecting': 0,
      'Qualification': 0,
      'Proposal': 0,
      'Negotiation': 0,
      'Closed Won': 0,
      'Closed Lost': 0
    };

    dealsRecords.forEach(d => {
      const amt = parseFloat(d.data?.amount) || 0;
      const stage = d.data?.stage || 'Prospecting';
      totalPipelineValue += amt;

      if (dealsByStage[stage] !== undefined) dealsByStage[stage] += 1;
      else dealsByStage[stage] = 1;

      if (stage === 'Closed Won') wonRevenue += amt;
      else if (stage !== 'Closed Lost') openDealsCount += 1;
    });

    const leadsByStatus = {
      'New': 0,
      'Contacted': 0,
      'Qualified': 0,
      'Proposal Sent': 0,
      'Unqualified': 0
    };

    leadsRecords.forEach(l => {
      const st = l.data?.status || 'New';
      if (leadsByStatus[st] !== undefined) leadsByStatus[st] += 1;
      else leadsByStatus[st] = 1;
    });

    const pendingTasks = tasksRecords.filter(t => t.data?.status !== 'Completed').length;
    const completedTasks = tasksRecords.filter(t => t.data?.status === 'Completed').length;
    const teamCount = db.workspace_members.filter(m => m.crmId === crmId && m.status === 'active').length;

    const recentActivities = db.activities
      .filter(a => a.crmId === crmId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    const recentLeads = leadsRecords.slice(0, 5).map(r => ({ id: r.id, name: r.data?.name, company: r.data?.company, email: r.data?.email, status: r.data?.status, date: r.createdAt }));
    const recentCustomers = customersRecords.slice(0, 5).map(r => ({ id: r.id, name: r.data?.name, phone: r.data?.phone, status: r.data?.status, code: r.data?.code, date: r.createdAt }));
    const upcomingTasks = tasksRecords.slice(0, 5).map(r => ({ id: r.id, name: r.data?.name, dueDate: r.data?.due_date, priority: r.data?.priority, status: r.data?.status }));

    const conversionRate = leadsRecords.length > 0 ? Math.round((customersRecords.length / leadsRecords.length) * 100) : 0;

    return {
      crm: {
        id: crm.id,
        code: crm.code || 'WS-1001',
        name: crm.name,
        companyName: crm.companyName,
        industry: crm.industry,
        currency: crm.currency,
        timezone: crm.timezone
      },
      counts: {
        leads: leadsRecords.length,
        contacts: contactsRecords.length,
        customers: customersRecords.length,
        accounts: accountsRecords.length,
        deals: dealsRecords.length,
        openDeals: openDealsCount,
        tasks: tasksRecords.length,
        pendingTasks,
        completedTasks,
        teamMembers: teamCount,
        conversionRate,
        customRecords: db.module_records.filter(r => r.crmId === crmId && customModules.some(cm => cm.id === r.moduleId)).length
      },
      financials: {
        pipelineValue: totalPipelineValue,
        wonRevenue,
        currency: crm.currency
      },
      charts: {
        leadsByStatus,
        dealsByStage
      },
      recentLeads,
      recentCustomers,
      upcomingTasks,
      customModules: customModuleStats,
      recentActivities
    };
  },

  searchGlobal(crmId, query) {
    const db = readDB();
    const q = (query || '').toLowerCase().trim();
    if (!q) return { leads: [], contacts: [], companies: [] };

    const modules = db.modules.filter(m => m.crmId === crmId);
    const leadsMod = modules.find(m => m.key === 'leads');
    const contactsMod = modules.find(m => m.key === 'contacts');
    const accountsMod = modules.find(m => m.key === 'accounts' || m.key === 'companies');

    const matchesQuery = (rec) => {
      if (!rec.data) return false;
      return Object.values(rec.data).some(val => val !== null && val !== undefined && String(val).toLowerCase().includes(q));
    };

    const leads = leadsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === leadsMod.id && matchesQuery(r)) : [];
    const contacts = contactsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === contactsMod.id && matchesQuery(r)) : [];
    const companies = accountsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === accountsMod.id && matchesQuery(r)) : [];

    return { leads, contacts, companies };
  },

  getCompanyRelated(crmId, companyRecordId) {
    const db = readDB();
    const modules = db.modules.filter(m => m.crmId === crmId);
    const accountsMod = modules.find(m => m.key === 'accounts' || m.key === 'companies');
    const companyRec = accountsMod ? db.module_records.find(r => r.crmId === crmId && r.moduleId === accountsMod.id && r.id === companyRecordId) : null;
    if (!companyRec) return null;

    const companyName = (companyRec.data?.name || '').toLowerCase();
    const contactsMod = modules.find(m => m.key === 'contacts');
    const leadsMod = modules.find(m => m.key === 'leads');
    const dealsMod = modules.find(m => m.key === 'deals');

    const contacts = contactsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === contactsMod.id && ((r.data?.company_id === companyRecordId) || (r.data?.company && String(r.data.company).toLowerCase() === companyName))) : [];
    const leads = leadsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === leadsMod.id && ((r.data?.company_id === companyRecordId) || (r.data?.company && String(r.data.company).toLowerCase() === companyName))) : [];
    const deals = dealsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === dealsMod.id && ((r.data?.account_id === companyRecordId) || (r.data?.account_name && String(r.data.account_name).toLowerCase() === companyName))) : [];

    const activities = db.activities.filter(a => a.crmId === crmId && a.recordId === companyRecordId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const notes = db.notes.filter(n => n.crmId === crmId && n.recordId === companyRecordId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return { company: companyRec, contacts, leads, deals, activities, notes };
  },

  getLeadRelated(crmId, leadId) {
    const db = readDB();
    const modules = db.modules.filter(m => m.crmId === crmId);
    const leadsMod = modules.find(m => m.key === 'leads');
    const lead = leadsMod ? db.module_records.find(r => r.crmId === crmId && r.moduleId === leadsMod.id && r.id === leadId) : null;
    if (!lead) return null;

    const activities = db.activities.filter(a => a.crmId === crmId && a.recordId === leadId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const notes = db.notes.filter(n => n.crmId === crmId && n.recordId === leadId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return { lead, activities, notes };
  },

  getContactRelated(crmId, contactId) {
    const db = readDB();
    const modules = db.modules.filter(m => m.crmId === crmId);
    const contactsMod = modules.find(m => m.key === 'contacts');
    const contact = contactsMod ? db.module_records.find(r => r.crmId === crmId && r.moduleId === contactsMod.id && r.id === contactId) : null;
    if (!contact) return null;

    const companyName = (contact.data?.company || '').toLowerCase();
    const dealsMod = modules.find(m => m.key === 'deals');
    const deals = dealsMod ? db.module_records.filter(r => r.crmId === crmId && r.moduleId === dealsMod.id && ((r.data?.contact_id === contactId) || (r.data?.account_name && String(r.data.account_name).toLowerCase() === companyName))) : [];

    const activities = db.activities.filter(a => a.crmId === crmId && a.recordId === contactId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const notes = db.notes.filter(n => n.crmId === crmId && n.recordId === contactId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return { contact, deals, activities, notes };
  }
};

module.exports = CRMDatabase;
module.exports.seedCRMInitialData = seedCRMInitialData;


