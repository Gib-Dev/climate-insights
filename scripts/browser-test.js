/**
 * Browser Console Testing Script
 *
 * Copy and paste this entire script into your browser console
 * while on http://localhost:3000 (or your app URL)
 *
 * Make sure you're signed in first!
 */

(async function testSecurityFixes() {
  console.log('🧪 Starting Security Fix Tests...\n');

  // Get auth token
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    console.error('❌ Please sign in first!');
    return;
  }

  const token = session.access_token;
  console.log('✅ Authenticated as:', session.user.email);
  console.log('');

  const baseUrl = window.location.origin;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  async function test(name, url, options = {}) {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
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

  // Test 1: Unauthenticated POST (should fail)
  console.log('📋 Test 1: Unauthenticated Write (Should Fail)');
  await test('POST /api/provinces (no auth)', '/api/provinces', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test', code: 'TT' }),
  });
  console.log('');

  // Test 2: Authenticated POST (should work)
  console.log('📋 Test 2: Authenticated Write (Should Work)');
  const createProvince = await test('POST /api/provinces', '/api/provinces', {
    method: 'POST',
    body: JSON.stringify({ name: 'Test Province', code: 'TP' }),
  });

  if (createProvince.status === 201) {
    const provinceId = createProvince.data.id;
    console.log(`   ✅ Created province ID: ${provinceId}\n`);

    // Test 3: Update
    console.log('📋 Test 3: Update Operation');
    await test('PATCH /api/provinces/:id', `/api/provinces/${provinceId}`, {
      method: 'PATCH',
      body: JSON.stringify({ name: 'Updated Province', code: 'UP' }),
    });
    console.log('');

    // Test 4: Create weather data
    console.log('📋 Test 4: Create Weather Data');
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
      console.log(`   ✅ Created weather data ID: ${weatherId}\n`);

      // Test 5: Update weather
      console.log('📋 Test 5: Update Weather Data');
      await test('PATCH /api/weatherdata/:id', `/api/weatherdata/${weatherId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          provinceId: provinceId,
          date: new Date().toISOString(),
          temperature: 25,
          precipitation: 15,
        }),
      });
      console.log('');

      // Test 6: Delete weather
      console.log('📋 Test 6: Delete Weather Data');
      await test('DELETE /api/weatherdata/:id', `/api/weatherdata/${weatherId}`, {
        method: 'DELETE',
      });
      console.log('');
    }

    // Test 7: Delete province
    console.log('📋 Test 7: Delete Province');
    await test('DELETE /api/provinces/:id', `/api/provinces/${provinceId}`, {
      method: 'DELETE',
    });
    console.log('');
  }

  // Test 8: Input Validation
  console.log('📋 Test 8: Input Validation');
  await test('POST with invalid code (too long)', '/api/provinces', {
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
  console.log('');

  // Test 9: Error Handling
  console.log('📋 Test 9: Error Handling');
  await test('GET non-existent province', '/api/provinces/99999', {
    method: 'GET',
    headers: {},
  });
  await test('PATCH non-existent province', '/api/provinces/99999', {
    method: 'PATCH',
    body: JSON.stringify({ name: 'Test', code: 'TT' }),
  });

  console.log('\n✨ All tests completed!');
  console.log('\n📝 Summary:');
  console.log('   - Unauthenticated writes should return 401');
  console.log('   - Authenticated writes should return 201/200');
  console.log('   - Invalid input should return 400');
  console.log('   - Non-existent resources should return 404');
})();

