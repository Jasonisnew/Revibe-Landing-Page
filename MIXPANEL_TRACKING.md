# Mixpanel Integration Summary

## Project Token
`002bcc81904a83abebbe8e9bf7885875`

## Events Being Tracked

### 1. **Page Loaded**
- **When**: User lands on the page
- **Properties**:
  - `page`: "Revibe Landing Page"
  - `timestamp`: ISO timestamp
  - `referrer`: Where the user came from

### 2. **Email Input Started**
- **When**: User starts typing in the email field
- **Properties**:
  - `location`: "Hero Section"

### 3. **Get Started Clicked**
- **When**: User clicks the "Get Started" button
- **Properties**:
  - `email`: User's email address
  - `location`: "Hero Section"

### 4. **Email Submitted Successfully**
- **When**: Email is successfully saved to Supabase
- **Properties**:
  - `email`: User's email address
  - `location`: "Hero Section"

### 5. **Navigation Link Clicked**
- **When**: User clicks on navigation links (HOME, FEATURES, TEAM, TRY IT)
- **Properties**:
  - `link_text`: Text of the link clicked
  - `href`: URL or anchor
  - `target`: "internal" or "external"

### 6. **CTA Button Clicked**
- **When**: User clicks "Try Revibe Now" or "View on GitHub"
- **Properties**:
  - `button_text`: "Try Revibe Now" or "View on GitHub"
  - `url`: Destination URL
  - `location`: "CTA Section"

## Testing Instructions

1. **Open your website** in a browser
2. **Open the browser console** (F12 or right-click → Inspect → Console)
3. You should see: `Mixpanel initialized successfully`
4. **Perform these actions** and watch for console logs:
   - Load the page → See "Mixpanel tracked: Page Loaded"
   - Type in email field → See "Mixpanel tracked: Email Input Started"
   - Click "Get Started" → See "Mixpanel tracked: Get Started Clicked"
   - Click navigation links → See "Mixpanel tracked: Navigation Link Clicked"
   - Click "Try Revibe Now" → See "Mixpanel tracked: CTA Button Clicked"
   - Click "View on GitHub" → See "Mixpanel tracked: CTA Button Clicked"

5. **Check Mixpanel Dashboard**:
   - Go to https://mixpanel.com
   - Navigate to your project
   - Click on "Events" to see real-time events
   - All the events listed above should appear

## Files Modified

1. **index.html** - Added Mixpanel library script
2. **mixpanel-config.js** (NEW) - Mixpanel initialization and helper function
3. **script.js** - Added event tracking throughout user interactions

## Session Replay

Session Replay is **ENABLED** and will record user sessions so you can watch how users interact with your landing page.

### Current Settings:
- **record_sessions_percent**: 100% (all sessions recorded)
- **Email inputs are masked** for privacy
- **Idle timeout**: 10 minutes of inactivity
- **Max session length**: 1 hour

### Viewing Session Replays:
1. Go to https://mixpanel.com
2. Navigate to your project
3. Click on "Session Replay" in the left sidebar
4. Wait 1-2 minutes after a session for processing
5. Watch your user sessions!

### Privacy Protection:
- Email addresses are automatically masked (shown as ••••)
- Any element with class `no-replay` will be blocked from recording
- Sessions stop recording after 10 minutes of inactivity

## Production Settings

When ready for production, in `mixpanel-config.js`, update these values:

```javascript
debug: false, // Disable console logging
record_sessions_percent: 25, // Reduce to 25% to save costs
```

This will disable console logging and reduce recording to 25% of sessions in production.

