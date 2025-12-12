# Quick Testing Guide

## Fastest Way to Test

### Step 1: Start the App

```bash
pnpm dev
```

### Step 2: Open Browser Console

1. Go to `http://localhost:3000`
2. Open DevTools (F12)
3. Go to Console tab

### Step 3: Run Browser Test Script

1. Copy the entire contents of `scripts/browser-test.js`
2. Paste into browser console
3. Press Enter
4. Watch the test results

---

## Manual UI Testing (5 minutes)

### Test Authentication Flow

1. **Sign Out** (if logged in)
2. Go to `/provinces` page
   - ✅ Should see provinces list
   - ✅ Should see "Please log in" message
   - ❌ Should NOT see add/edit buttons

3. **Sign In** at `/dashboard`
4. Go back to `/provinces` page
   - ✅ Should see add form
   - ✅ Should see edit/delete buttons
   - ✅ Try adding a province → Should work
   - ✅ Try editing a province → Should work
   - ✅ Try deleting a province → Should work

5. Repeat for `/weather` page

---

## Quick API Test (Using Browser Console)

```javascript
// 1. Get your auth token
const {
  data: { session },
} = await supabase.auth.getSession();
const token = session?.access_token;

// 2. Test unauthenticated request (should fail)
fetch('/api/provinces', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Test', code: 'TT' }),
})
  .then((r) => r.json())
  .then(console.log);
// Expected: { error: 'Unauthorized' }

// 3. Test authenticated request (should work)
fetch('/api/provinces', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ name: 'Test', code: 'TT' }),
})
  .then((r) => r.json())
  .then(console.log);
// Expected: { id: ..., name: 'Test', code: 'TT' }
```

---

## What to Look For

### ✅ Success Indicators:

- Unauthenticated write requests return `401 Unauthorized`
- Authenticated write requests return `201 Created` or `200 OK`
- Frontend shows login prompts when not authenticated
- Frontend allows CRUD when authenticated
- Error messages are clear and helpful
- No console errors about types or missing variables

### ❌ Failure Indicators:

- Write operations work without authentication (security issue!)
- Authenticated requests return 401 (auth not working)
- Console errors about missing env vars
- Type errors in console
- Unclear error messages

---

## Common Issues

**"Unauthorized" even when logged in:**

- Check Network tab → Request Headers → Should have `Authorization: Bearer ...`
- Verify token is valid (not expired)
- Try signing out and back in

**"Failed to fetch" errors:**

- Check if dev server is running
- Verify `.env` file exists and has correct values
- Check browser console for CORS errors

**Type errors:**

- Verify UserList component uses `number` for IDs
- Check API responses match expected types

---

## Full Testing Guide

For comprehensive testing, see `TESTING_GUIDE.md`

