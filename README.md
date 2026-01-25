# Mini Ad Tracking System (Blink Digital Assignment)

## Overview
This project is a mini ad-tracking system inspired by real ad-tech platforms (like RedTrack).
It tracks ad clicks, associates conversions using click attribution, and provides campaign-level reports.

The focus of this assignment is backend correctness, system thinking, security awareness,
and a simple usable dashboard (not a UI design contest).

---

## Deployed Links: 

- Frontend (Vercel): https://blink-digital-ad-tracker.vercel.app
- Backend (Railway): https://blink-digital-ad-tracker-production.up.railway.app

## Features

1. Click Tracking & Redirect
- Generates a unique click_id for every ad click
- Stores click metadata (source, campaign_id, ad_id, IP, user agent)
- Redirects the user to the landing page
- Appends click_id to the landing page URL
- Redirect is non-blocking (works even if DB insert fails)

2. Conversion Tracking
- Tracks conversion events using click_id
- Supports event name, value, and currency
- Uses last-click attribution
- Validates click existence before storing conversion

3. Reporting
- Campaign-wise aggregated report
- Shows total clicks, total conversions, and total revenue
- Optional filtering by traffic source (facebook, google, etc.)

4. Frontend Dashboard
- Generate tracking links
- Copy tracking URL
- Open tracking URL in new tab (redirect demo)
- View campaign reports
- Filter reports by source
- Minimal UI as per assignment instructions

---

## Tech Stack

Backend:
- Node.js
- Express
- PostgreSQL (Neon)
- UUID

Frontend:
- Next.js (App Router)
- TypeScript
- Tailwind CSS

Deployment:
- Backend: Railway
- Frontend: Vercel

---

## Backend API Endpoints

Click Tracking:
GET /click

Query Parameters:
- lp: Landing page URL
- source: Traffic source (facebook, google, etc.)
- campaign_id: Campaign identifier
- ad_id: Ad identifier

Behavior:
- Generates a unique click_id
- Stores click metadata
- Redirects to landing page with click_id appended

---

Conversion Tracking:
POST /conversion

Request Body Example:
{
  "click_id": "uuid",
  "event": "purchase",
  "value": 499.99,
  "currency": "INR"
}

---

Reporting:
GET /report
GET /report?source=facebook

Sample Response:
[
  {
    "campaign_id": "campaign_1",
    "total_clicks": 2,
    "total_conversions": 1,
    "total_revenue": 499.99
  }
]

---

## Environment Variables

Backend (.env):
PORT=5000
DATABASE_URL=postgresql://...

Frontend (.env.local):
NEXT_PUBLIC_API_BASE=http://localhost:5000

---

## Local Setup

Backend:
cd backend
npm install
npm run dev

Frontend:
cd frontend
npm install
npm run dev

---

## How to Test the Complete Flow

1. Open the frontend dashboard
2. Generate a tracking link
3. Open the tracking link → user is redirected with click_id
4. Send a conversion request using the click_id
5. Refresh the report section to see updated clicks, conversions, and revenue

---

## Notes
- Redirect logic is intentionally non-blocking for performance
- URL validation is applied to prevent invalid redirects
- The dashboard is intentionally minimal as per assignment instructions
- Focus is on correctness, clarity, and system design

---

## Author
Vikash Mishra


