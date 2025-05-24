# Referral System Implementation Plan

## Overview
This document outlines the plan for implementing a referral system for the PCC1 waitlist, allowing customers to move up in priority by referring friends.

## Current State
- Database table already has referral infrastructure:
  - `referral_code` - Unique 8-character code per waitlist entry
  - `referred_by` - Links to the referrer's waitlist ID
  - `priority_score` - Increases by 10 per successful referral
  - `handle_referral()` function exists to update scores

## Implementation Plan

### Phase 1: Basic Referral Tracking
1. **URL Parameter Handling**
   ```tsx
   // In waitlist-modal.tsx
   const searchParams = useSearchParams();
   const referralCode = searchParams.get('ref');
   
   // On successful submission:
   if (referralCode) {
     await supabase.rpc('handle_referral', { referral_code: referralCode });
   }
   ```

2. **Update Waitlist Submission**
   - Check for `?ref=` parameter
   - Validate referral code exists
   - Link new entry to referrer
   - Increment referrer's priority score

### Phase 2: Enhanced Sharing
1. **Share Button Improvements**
   - Pre-filled social media messages
   - Copy referral link with one click
   - QR code generation for in-person sharing
   - Email template for sharing

2. **Tracking & Analytics**
   - Track share button clicks
   - Monitor referral conversion rates
   - Show referral count in success modal

### Phase 3: Gamification
1. **Leaderboard**
   - Top referrers list
   - Badges for milestones (5, 10, 25 referrals)
   - Special recognition for top 3

2. **Rewards System**
   - First 10 referrals: Move up 10 spots each
   - 11-25 referrals: Move up 5 spots each
   - 25+ referrals: Guaranteed first batch access
   - Potential discount codes for high referrers

### Phase 4: Advanced Features
1. **Referral Dashboard**
   - Personal dashboard to track referrals
   - See position changes over time
   - Export referral list

2. **Email Campaign Integration**
   - Automated emails to encourage sharing
   - Weekly updates on position changes
   - Highlight successful referrers

## Technical Implementation

### Frontend Changes
```tsx
// components/shop/referral-tracker.tsx
export function ReferralTracker({ referralCode, referralCount }) {
  // Show progress bar
  // Display shareable link
  // Social share buttons
}
```

### Database Queries
```sql
-- Get referral stats
SELECT 
  COUNT(*) as referral_count,
  MAX(priority_score) as current_score
FROM waitlist
WHERE referred_by = (
  SELECT id FROM waitlist WHERE referral_code = $1
);

-- Get top referrers
SELECT 
  email,
  referral_code,
  COUNT(referred.id) as referral_count
FROM waitlist
LEFT JOIN waitlist referred ON waitlist.id = referred.referred_by
GROUP BY waitlist.id
ORDER BY referral_count DESC
LIMIT 10;
```

### API Endpoints Needed
- `GET /api/referral/[code]` - Validate and get referral info
- `POST /api/referral/track` - Track share events
- `GET /api/referral/leaderboard` - Public leaderboard data

## Success Metrics
- Referral conversion rate (target: 15-20%)
- Average referrals per user (target: 2-3)
- Viral coefficient (target: >1.0)
- Time to reach waitlist goal

## Security Considerations
- Rate limit referral code checks
- Prevent self-referrals
- Validate email uniqueness
- Protect against gaming the system

## Integration Points
- Newsletter system (capture high-value referrers)
- CRM for customer segmentation
- Analytics for tracking viral growth
- Email marketing for nurture campaigns

## Timeline Estimate
- Phase 1: 2-3 hours (basic implementation)
- Phase 2: 4-6 hours (enhanced sharing)
- Phase 3: 6-8 hours (gamification)
- Phase 4: 8-10 hours (full dashboard)

## Next Steps
When ready to implement:
1. Start with Phase 1 basic tracking
2. A/B test different incentive structures
3. Monitor metrics and adjust rewards
4. Scale up based on what works