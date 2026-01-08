// Initialize Mixpanel with project token and Session Replay enabled
mixpanel.init('002bcc81904a83abebbe8e9bf7885875', {
    debug: true, // Set to false in production
    track_pageview: true,
    persistence: 'localStorage',
    
    // Session Replay Configuration
    record_sessions_percent: 100, // Record 100% of sessions (reduce to 25-50 in production)
    record_mask_text_selector: 'input[type="email"], input[type="password"]', // Mask sensitive inputs
    record_block_class: 'no-replay', // Block elements with class="no-replay" from recording
    record_collect_fonts: true, // Capture fonts for accurate replay
    record_idle_timeout_ms: 10 * 60 * 1000, // Stop recording after 10 minutes of inactivity
    record_max_ms: 60 * 60 * 1000 // Maximum session length: 1 hour
});

// Helper function to track events
function trackEvent(eventName, properties = {}) {
    try {
        mixpanel.track(eventName, properties);
        console.log('Mixpanel tracked:', eventName, properties);
    } catch (error) {
        console.error('Error tracking Mixpanel event:', error);
    }
}

console.log('Mixpanel initialized successfully with Session Replay enabled');

