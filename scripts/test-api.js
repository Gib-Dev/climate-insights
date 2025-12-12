/**
 * API Testing Script
 *
 * Usage:
 * 1. Get your auth token from browser console:
 *    const { data: { session } } = await supabase.auth.getSession();
 *    console.log(session?.access_token);
 *
 * 2. Run: node scripts/test-api.js YOUR_TOKEN
 */

const BASE_URL = 'http://localhost:3000';
const token = process.argv[2];

if (!token) {
  console.error('❌ Please provide auth token as argument');
  console.log('Usage: node scripts/test-api.js YOUR_TOKEN');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

async function test(name, url, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: options.headers || headers,
    });
    const data = await response.json();
    const status = response.status;
    const icon = status >= 200 && status < 300 ? '✅' : '❌';
    console.log(`${icon} ${name}: ${status}`);
    if (status >= 400) {
      console.log('   Error:', data.error || data.message);
    }
    return { status, data };
  } catch (error) {
    console.log(`❌ ${name}: Error -`, error.message);
    return { status: 0, error: error.message };
  }
}

async function runTests() {
  console.log('🧪 Starting API Tests...\n');

  // Test 1: Unauthenticated GET (should work)
  console.log('📖 Test 1: Public Read Operations');
  await test('GET /api/provinces', '/api/provinces', {
    method: 'GET',
    headers: {},
  });
  await test('GET /api/weatherdata', '/api/weatherdata', {
    method: 'GET',
    headers: {},
  });
  console.log('');

  // Test 2: Unauthenticated POST (should fail)
  console.log('🔒 Test 2: Unauthenticated Write Operations (Should Fail)');
  await test('POST /api/provinces (no auth)', '/api/provinces', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test', code: 'TT' }),
  });
  console.log('');

  // Test 3: Authenticated POST (should work)
  console.log('✅ Test 3: Authenticated Write Operations');
  const createProvince = await test('POST /api/provinces', '/api/provinces', {
    method: 'POST',
    body: JSON.stringify({ name: 'Test Province', code: 'TP' }),
  });

  if (createProvince.status === 201) {
    const provinceId = createProvince.data.id;
    console.log(`   Created province with ID: ${provinceId}\n`);

    // Test 4: Update
    await test('PATCH /api/provinces/:id', `/api/provinces/${provinceId}`, {
      method: 'PATCH',
      body: JSON.stringify({ name: 'Updated Province', code: 'UP' }),
    });

    // Test 5: Create weather data
    const createWeather = await test('POST /api/weatherdata', '/api/weatherdata', {
      method: 'POST',
      body: JSON.stringify({
        provinceId: provinceId,
        date: new Date().toISOString(),
        temperature: 20,
        precipitation: 10,
      }),
    });

    if (createWeather.status === 201) {
      const weatherId = createWeather.data.id;
      console.log(`   Created weather data with ID: ${weatherId}\n`);

      // Test 6: Update weather
      await test('PATCH /api/weatherdata/:id', `/api/weatherdata/${weatherId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          provinceId: provinceId,
          date: new Date().toISOString(),
          temperature: 25,
          precipitation: 15,
        }),
      });

      // Test 7: Delete weather
      await test('DELETE /api/weatherdata/:id', `/api/weatherdata/${weatherId}`, {
        method: 'DELETE',
      });
    }

    // Test 8: Delete province
    await test('DELETE /api/provinces/:id', `/api/provinces/${provinceId}`, {
      method: 'DELETE',
    });
  }

  // Test 9: Input Validation
  console.log('\n🔍 Test 4: Input Validation');
  await test('POST with invalid code', '/api/provinces', {
    method: 'POST',
    body: JSON.stringify({ name: 'Test', code: 'TOOLONG' }),
  });
  await test('POST with invalid temperature', '/api/weatherdata', {
    method: 'POST',
    body: JSON.stringify({
      provinceId: 1,
      date: new Date().toISOString(),
      temperature: 100, // Too high
      precipitation: 10,
    }),
  });

  // Test 10: Non-existent resource
  console.log('\n🔍 Test 5: Error Handling');
  await test('GET non-existent province', '/api/provinces/99999', {
    method: 'GET',
    headers: {},
  });
  await test('PATCH non-existent province', '/api/provinces/99999', {
    method: 'PATCH',
    body: JSON.stringify({ name: 'Test', code: 'TT' }),
  });

  console.log('\n✨ Tests completed!');
}

runTests().catch(console.error);

