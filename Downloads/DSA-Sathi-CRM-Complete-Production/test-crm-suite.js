// test-crm-suite.js
// Automated test suite for the complete 'Create Your Own CRM' SaaS Platform
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

function request(urlPath, { method = 'GET', body = null, cookie = null } = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {}
    };

    let payload = null;
    if (body) {
      payload = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(payload);
    }
    if (cookie) {
      options.headers['Cookie'] = cookie;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = data;
        }

        // Extract cookie if Set-Cookie header exists
        let setCookie = res.headers['set-cookie'];
        let cookieHeader = null;
        if (setCookie) {
          cookieHeader = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
        }

        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: json,
          cookie: cookieHeader
        });
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`  ✓ ${message}`);
  }
}

async function runTests() {
  console.log('========================================================');
  console.log('🚀 RUNNING CRM PLATFORM AUTOMATED TEST SUITE');
  console.log('========================================================\n');

  // Step 1: User Login
  console.log('1. Testing Authentication...');
  const loginRes = await request('/login', {
    method: 'POST',
    body: { email: 'csonker04@gmail.com', password: 'charu123' }
  });
  assert(loginRes.status === 200, 'POST /login returned 200 OK');
  assert(loginRes.cookie && loginRes.cookie.includes('sid='), 'Session cookie returned');
  const sessionCookie = loginRes.cookie.split(';')[0];

  const sessionCheck = await request('/api/session', { cookie: sessionCookie });
  assert(sessionCheck.data.authenticated === true, 'GET /api/session shows authenticated');
  assert(sessionCheck.data.email === 'csonker04@gmail.com', 'Session email verified');

  // Step 2: Create First CRM Workspace
  console.log('\n2. Testing CRM Workspace Creation...');
  const createCrmRes = await request('/api/crms', {
    method: 'POST',
    cookie: sessionCookie,
    body: {
      name: 'Nexus Tech CRM',
      companyName: 'Nexus Tech Pvt Ltd',
      industry: 'Technology',
      currency: '₹ INR',
      timezone: 'Asia/Kolkata (+05:30)',
      description: 'Primary technology sales CRM'
    }
  });
  assert(createCrmRes.status === 201, 'POST /api/crms created workspace (201 Created)');
  const crm1 = createCrmRes.data.crm;
  assert(crm1 && crm1.id, `CRM 1 created with ID: ${crm1.id}`);
  assert(crm1.name === 'Nexus Tech CRM', 'CRM name matches');

  // Step 3: Verify Standard Modules initialized
  console.log('\n3. Verifying Standard CRM Modules...');
  const modsRes = await request(`/api/crms/${crm1.id}/modules`, { cookie: sessionCookie });
  assert(modsRes.status === 200, 'GET /modules returned 200 OK');
  const moduleKeys = modsRes.data.modules.map(m => m.key);
  assert(moduleKeys.includes('leads'), 'Standard module "Leads" present');
  assert(moduleKeys.includes('contacts'), 'Standard module "Contacts" present');
  assert(moduleKeys.includes('accounts'), 'Standard module "Accounts" present');
  assert(moduleKeys.includes('deals'), 'Standard module "Deals" present');
  assert(moduleKeys.includes('tasks'), 'Standard module "Tasks" present');

  // Step 4: Create Custom Module "Students"
  console.log('\n4. Testing Custom Module Builder ("Students")...');
  const createModRes = await request(`/api/crms/${crm1.id}/modules`, {
    method: 'POST',
    cookie: sessionCookie,
    body: {
      name: 'Students',
      singularName: 'Student',
      icon: 'graduation-cap',
      description: 'Active students and batch enrolments'
    }
  });
  assert(createModRes.status === 201, 'POST /modules created "Students" module');
  const customMod = createModRes.data.module;
  assert(customMod.name === 'Students', 'Module name verified');

  // Step 5: Custom Field Builder (Adding multiple field types)
  console.log('\n5. Testing Custom Field Builder (Auto Number, Phone, Email, City, Select, Currency)...');
  
  // Field: Auto Number
  const fAuto = await request(`/api/crms/${crm1.id}/modules/${customMod.id}/fields`, {
    method: 'POST',
    cookie: sessionCookie,
    body: { name: 'Student Code', key: 'code', type: 'autonumber', autoNumberPrefix: 'STU', autoNumberDigits: 4 }
  });
  assert(fAuto.status === 201, 'Added Auto Number field');

  // Field: Phone
  const fPhone = await request(`/api/crms/${crm1.id}/modules/${customMod.id}/fields`, {
    method: 'POST',
    cookie: sessionCookie,
    body: { name: 'Phone', key: 'phone', type: 'phone', required: true, placeholder: '+91 98765 43210' }
  });
  assert(fPhone.status === 201, 'Added Phone field (Required)');

  // Field: Email
  const fEmail = await request(`/api/crms/${crm1.id}/modules/${customMod.id}/fields`, {
    method: 'POST',
    cookie: sessionCookie,
    body: { name: 'Email Address', key: 'email', type: 'email', required: false }
  });
  assert(fEmail.status === 201, 'Added Email field');

  // Field: City
  const fCity = await request(`/api/crms/${crm1.id}/modules/${customMod.id}/fields`, {
    method: 'POST',
    cookie: sessionCookie,
    body: { name: 'City', key: 'city', type: 'text' }
  });
  assert(fCity.status === 201, 'Added City field');

  // Field: Status (Dropdown)
  const fStatus = await request(`/api/crms/${crm1.id}/modules/${customMod.id}/fields`, {
    method: 'POST',
    cookie: sessionCookie,
    body: { name: 'Student Status', key: 'status', type: 'select', options: ['Active', 'Enrolled', 'Graduated', 'Inactive'], defaultValue: 'Active' }
  });
  assert(fStatus.status === 201, 'Added Status dropdown field');

  // Field: Annual Fee (Currency)
  const fSpend = await request(`/api/crms/${crm1.id}/modules/${customMod.id}/fields`, {
    method: 'POST',
    cookie: sessionCookie,
    body: { name: 'Course Fee', key: 'annual_spend', type: 'currency' }
  });
  assert(fSpend.status === 201, 'Added Course Fee currency field');

  // Step 6: Dynamic Record System (CRUD)
  console.log('\n6. Testing Dynamic Record CRUD...');
  
  // Create Record 1
  const rec1Res = await request(`/api/crms/${crm1.id}/modules/${customMod.id}/records`, {
    method: 'POST',
    cookie: sessionCookie,
    body: {
      data: {
        name: 'Aarav Sharma',
        phone: '+91 80285 20261',
        email: 'aarav@iit.edu',
        city: 'Bengaluru',
        status: 'Enrolled',
        annual_spend: 250000
      }
    }
  });
  assert(rec1Res.status === 201, 'Created Student 1 record');
  const rec1 = rec1Res.data.record;
  assert(rec1.data.code === 'STU-0001', `Auto Number generated correctly: ${rec1.data.code}`);

  // Create Record 2
  const rec2Res = await request(`/api/crms/${crm1.id}/modules/${customMod.id}/records`, {
    method: 'POST',
    cookie: sessionCookie,
    body: {
      data: {
        name: 'Diya Patel',
        phone: '+91 22666 58282',
        email: 'diya@mumbai.edu',
        city: 'Mumbai',
        status: 'Active',
        annual_spend: 180000
      }
    }
  });
  assert(rec2Res.status === 201, 'Created Student 2 record');
  const rec2 = rec2Res.data.record;
  assert(rec2.data.code === 'STU-0002', `Auto Number generated correctly: ${rec2.data.code}`);

  // Read & Search Records
  const searchRes = await request(`/api/crms/${crm1.id}/modules/${customMod.id}/records?search=Aarav`, { cookie: sessionCookie });
  assert(searchRes.data.records.length === 1, 'Search by name "Aarav" returned exactly 1 record');
  assert(searchRes.data.records[0].data.name === 'Aarav Sharma', 'Search result matches name');

  // Update Record
  const updateRes = await request(`/api/crms/${crm1.id}/modules/${customMod.id}/records/${rec1.id}`, {
    method: 'PUT',
    cookie: sessionCookie,
    body: {
      data: {
        annual_spend: 300000,
        city: 'Bengaluru Campus'
      }
    }
  });
  assert(updateRes.status === 200, 'PUT /records updated record');
  assert(updateRes.data.record.data.annual_spend === 300000, 'Updated annual spend verified');
  assert(updateRes.data.record.data.city === 'Bengaluru Campus', 'Updated city verified');

  // Notes & Activity Stream
  const noteRes = await request(`/api/crms/${crm1.id}/notes`, {
    method: 'POST',
    cookie: sessionCookie,
    body: {
      moduleId: customMod.id,
      recordId: rec1.id,
      title: 'Semester Registration',
      content: 'Student cleared prerequisites.'
    }
  });
  assert(noteRes.status === 201, 'Added note to student record');

  // Step 7: Dashboard Metrics Verification
  console.log('\n7. Verifying Dashboard Metrics & Analytics...');
  const dashRes = await request(`/api/crms/${crm1.id}/dashboard`, { cookie: sessionCookie });
  assert(dashRes.status === 200, 'GET /dashboard returned 200 OK');
  const dashData = dashRes.data.dashboard || dashRes.data;
  assert(dashData.customModules.some(cm => cm.name === 'Students' && cm.count === 2), 'Dashboard shows 2 Students in custom module metrics');


  // Step 8: Team Management
  console.log('\n8. Testing Team Management & Roles...');
  const addMemberRes = await request(`/api/crms/${crm1.id}/members`, {
    method: 'POST',
    cookie: sessionCookie,
    body: {
      name: 'Vikram Mehta',
      email: 'vikram@nexustech.com',
      role: 'manager'
    }
  });
  assert(addMemberRes.status === 201, 'Invited team member "Vikram Mehta" as Manager');
  const membersRes = await request(`/api/crms/${crm1.id}/members`, { cookie: sessionCookie });
  assert(membersRes.data.members.length >= 2, 'Team members list contains owner and new manager');

  // Step 9: Multi-Tenant Data Isolation Test
  console.log('\n9. Testing Multi-Tenant Workspace Data Isolation...');
  // Create Second CRM
  const crm2Res = await request('/api/crms', {
    method: 'POST',
    cookie: sessionCookie,
    body: {
      name: 'Apex Realty CRM',
      companyName: 'Apex Properties Ltd',
      industry: 'Real Estate',
      currency: '$ USD'
    }
  });
  const crm2 = crm2Res.data.crm;
  assert(crm2 && crm2.id !== crm1.id, `CRM 2 created with ID: ${crm2.id}`);

  // Check CRM 2 modules: should NOT have "Students" module from CRM 1
  const crm2Mods = await request(`/api/crms/${crm2.id}/modules`, { cookie: sessionCookie });
  const crm2ModNames = crm2Mods.data.modules.map(m => m.name);
  assert(!crm2ModNames.includes('Students'), 'CRM 2 DOES NOT have CRM 1 custom module "Students" (Data Isolated)');

  // Create a different custom module in CRM 2: "Properties"
  const propModRes = await request(`/api/crms/${crm2.id}/modules`, {
    method: 'POST',
    cookie: sessionCookie,
    body: { name: 'Properties', singularName: 'Property', icon: 'building' }
  });
  assert(propModRes.status === 201, 'Created "Properties" module in CRM 2');

  // Check CRM 1 modules: should NOT have "Properties" module
  const crm1ModsCheck = await request(`/api/crms/${crm1.id}/modules`, { cookie: sessionCookie });
  const crm1ModNames = crm1ModsCheck.data.modules.map(m => m.name);
  assert(!crm1ModNames.includes('Properties'), 'CRM 1 DOES NOT have CRM 2 custom module "Properties" (Data Isolated)');

  // Step 10: Register New User & Test Access Control
  console.log('\n10. Testing Cross-Tenant Access Control Security...');
  const uniqueEmail = `stranger_${Date.now()}@otherdomain.com`;
  const regUser2 = await request('/api/register', {
    method: 'POST',
    body: { name: 'Stranger User', email: uniqueEmail, password: 'securepassword123' }
  });
  assert(regUser2.status === 200, 'Registered second distinct user');
  const user2Cookie = regUser2.cookie.split(';')[0];

  // User 2 tries to access CRM 1 (where they are not a member)
  const unauthorizedCheck = await request(`/api/crms/${crm1.id}/modules`, { cookie: user2Cookie });
  assert(unauthorizedCheck.status === 403, `User 2 forbidden from accessing CRM 1 (Status: ${unauthorizedCheck.status} Forbidden)`);

  // Step 11: Database File Persistence
  console.log('\n11. Verifying Database Persistence to Disk...');
  const dbFile = path.join(__dirname, 'data', 'crm_db.json');
  assert(fs.existsSync(dbFile), 'data/crm_db.json exists on disk');
  const rawDb = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  assert(rawDb.crms.length >= 2, 'Both CRMs saved in persistent database file');
  assert(rawDb.module_records.length >= 2, 'Module records saved in persistent database file');

  console.log('\n========================================================');
  console.log('🎉 ALL CRM PLATFORM TESTS PASSED SUCCESSFULLY (100%)');
  console.log('========================================================\n');
}

runTests().catch(err => {
  console.error('Test Suite Error:', err);
  process.exit(1);
});
