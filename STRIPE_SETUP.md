# Stripe Payment Links Setup Guide

## ✅ What's Been Added

Your donation section is now live on your landing page! It includes:
- 3 donation tiers: Coffee ($5), Bagel ($15), Lunch ($30)
- Beautiful glassmorphism design matching your Revibe theme
- Mixpanel tracking for all donation clicks
- Trust indicators to build confidence
- Mobile responsive design
- New "SUPPORT" link in navigation

## 🔗 How to Add Your Stripe Payment Links

### Step 1: Create Payment Links in Stripe

1. Go to https://dashboard.stripe.com/payment-links
2. Sign in to your Stripe account
3. Click **+ New** to create a payment link

### Step 2: Create Each Tier

Create 3 separate payment links:

#### Coffee - $5
- Product name: `Support Revibe - Coffee ☕`
- Amount: `5.00`
- Currency: `USD`
- Click **Create link**
- Copy the link (looks like: `https://buy.stripe.com/test_xxxxx`)

#### Bagel - $15
- Product name: `Support Revibe - Bagel 🥯`
- Amount: `15.00`
- Currency: `USD`
- Click **Create link**
- Copy the link

#### Lunch - $30
- Product name: `Support Revibe - Lunch 🍱`
- Amount: `30.00`
- Currency: `USD`
- Click **Create link**
- Copy the link

### Step 3: Add Links to Your Code

Open `index.html` and find the Support Section (around line 199).

Replace these placeholder links:

**Coffee ($5)** - Find:
```html
<a href="#support" 
   class="tier-card" 
   onclick="trackDonation(5, 'Coffee'); return false;" 
   data-tier="coffee">
```

Change to:
```html
<a href="YOUR_STRIPE_COFFEE_LINK_HERE" 
   class="tier-card" 
   onclick="trackDonation(5, 'Coffee')" 
   target="_blank"
   rel="noopener noreferrer"
   data-tier="coffee">
```

**Bagel ($15)** - Find:
```html
<a href="#support" 
   class="tier-card tier-popular" 
   onclick="trackDonation(15, 'Bagel'); return false;" 
   data-tier="bagel">
```

Change to:
```html
<a href="YOUR_STRIPE_BAGEL_LINK_HERE" 
   class="tier-card tier-popular" 
   onclick="trackDonation(15, 'Bagel')" 
   target="_blank"
   rel="noopener noreferrer"
   data-tier="bagel">
```

**Lunch ($30)** - Find:
```html
<a href="#support" 
   class="tier-card" 
   onclick="trackDonation(30, 'Lunch'); return false;" 
   data-tier="lunch">
```

Change to:
```html
<a href="YOUR_STRIPE_LUNCH_LINK_HERE" 
   class="tier-card" 
   onclick="trackDonation(30, 'Lunch')" 
   target="_blank"
   rel="noopener noreferrer"
   data-tier="lunch">
```

## 📊 What Gets Tracked in Mixpanel

When users click donation tiers, these events are tracked:
- **Event Name**: "Donation Link Clicked"
- **Properties**:
  - `amount`: 5, 15, or 30
  - `tier`: "Coffee", "Bagel", or "Lunch"
  - `currency`: "USD"
  - `timestamp`: ISO timestamp

## ✨ Features Included

✅ **Trust Indicators**: Shows secure payment, 100% to development, all cards accepted
✅ **Popular Badge**: Bagel tier is highlighted as "Most Popular"
✅ **Hover Effects**: Beautiful animations on hover
✅ **Mobile Responsive**: Looks great on all devices
✅ **Mixpanel Tracking**: All clicks are tracked for analytics
✅ **Navigation Link**: Added "SUPPORT" to your header navigation

## 🎨 Design Features

- Uses your existing Revibe purple theme
- Glassmorphism effects matching your brand
- Smooth animations and transitions
- Gradient text for pricing
- Professional trust indicators
- Emoji icons for visual appeal

## 🚀 Next Steps

1. Create your Stripe payment links
2. Replace the placeholder `href="#support"` with your actual Stripe links
3. Test each tier to make sure they open correctly
4. Monitor donations in Stripe dashboard
5. Track engagement in Mixpanel

## 💡 Optional Enhancements

Want to add more features? Consider:
- Supporter count (stored in Supabase)
- Total raised amount display
- Thank you page after donation
- Email thank you messages
- Recurring donation options

Need help? The section is fully integrated and ready to accept your payment links!

