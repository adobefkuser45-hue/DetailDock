# Product Requirements Document (PRD) — DetailDock

**Project:** DetailDock — Premium Auto Detailing & Smart Service Booking Platform  
**Document Version:** 1.0.0  
**Status:** PROPOSED (Pending Owner Review)  
**Date:** 2026-10-09  
**Stack Baseline:** MongoDB + Express.js + React (Vite) + Node.js (MERN)  

---

## 1. Executive Summary & Vision

### 1.1 Problem Statement
Traditional auto detailing websites are predominantly static digital brochures. Customers face opaque pricing, phone-tag booking friction, lack of clarity on what services match their specific vehicle size, and zero visibility into appointment confirmation or service progress. On the business side, detailers struggle with fragmented scheduling, double bookings, unstandardized pricing for larger vehicles, and manual customer management.

### 1.2 Product Vision
**DetailDock** is an end-to-end, full-stack service commerce platform designed specifically for luxury automotive care and detailing studios. It pairs a high-conversion, luxury-grade customer portal with an interactive **Smart Package Builder (Signature Dynamic Pricing Engine)**, a real-time slot-based **Appointment Booking System**, and a comprehensive **Business Management Dashboard** for shop owners.

### 1.3 Portfolio & Commercial Objective
DetailDock serves as a demonstration of high-level MERN engineering and business workflow automation. It proves competency in:
- Complex state-driven client-side configurators with server-authoritative validation.
- Concurrency-safe, slot-constrained booking and scheduling engines.
- Role-based security (JWT, Customer vs. Admin).
- Production-grade UI/UX engineering eliminating AI-slop biases.
- 100% commercially sellable code free from copyright or copyleft liabilities.

---

## 2. Target Users & Personas

| Persona | Role | Primary Needs & Jobs to be Done | Pain Points |
| :--- | :--- | :--- | :--- |
| **Alex Vance (Customer)** | Car Enthusiast / Everyday Vehicle Owner | Wants transparent pricing for his specific vehicle (e.g., SUV), wants to bundle ceramic coating with interior detailing, and book a confirmed Saturday morning slot without calling. | Hates calling for quotes; confused by "starting from" prices that jump unexpectedly; hates waiting days for email replies. |
| **Marcus Reed (Shop Owner / Admin)** | Auto Detailing Studio Owner / Manager | Wants to see all daily appointments in one place, accept/reschedule requests, adjust pricing multipliers for trucks vs. sedans, and update job progress so customers stop calling for updates. | Overbooked bays; no-shows; manual pen-and-paper tracking; pricing disputes when large vehicles take twice as long to detail. |
| **Guest Visitor** | Potential Customer / Researcher | Browses before/after gallery, checks customer reviews, calculates price estimates without forced upfront registration. | Reluctant to register just to see a price quote. |

---

## 3. Scope Definition

### 3.1 Smallest Useful MVP (Core Business Loop)
The MVP strictly enforces the complete end-to-end service commerce workflow:
```text
Browse Services 
  → Customize in Smart Package Builder (Vehicle + Package + Add-ons) 
  → Live Price & Duration Calculation 
  → Select Date & Time Slot 
  → Submit Booking Request (Guest / Authenticated) 
  → Immediate Confirmation & Reference Code 
  → Admin Dashboard Review (Approve / Reject / Reschedule) 
  → Job Status Progression (Pending → Confirmed → In Progress → Completed) 
  → Customer Tracking Portal
```

### 3.2 Feature Matrix: MVP vs. Post-MVP

| Feature Category | MVP (Phase 1) | Post-MVP (Future Release) |
| :--- | :--- | :--- |
| **Public Showcase** | Luxury Hero, Services Showcase, Before/After Gallery, Testimonials, FAQ, Location/Hours. | Multi-location selector, VR shop tour. |
| **Smart Package Builder** | Vehicle size selection (Sedan, Coupe, SUV, Truck/Van), Base Package selection, Dynamic Add-ons, live duration calculation, server-validated pricing. | AI Paint condition scanner via mobile camera. |
| **Booking & Scheduling** | Calendar date picker, bay-capacity constrained time slots, customer vehicle details intake, booking confirmation code. | Google Calendar two-way sync, SMS reminders. |
| **Customer Portal** | JWT Auth (Register/Login), Booking History, Live Job Status Tracker (`/track/:bookingCode`). | Customer loyalty points, recurring subscription wash plans. |
| **Admin Operations** | Dashboard KPI cards, Booking pipeline management (Status updates), Time slot & bay capacity config, Services & Add-on CRUD, Price multiplier editor. | Multi-staff payroll, inventory chemical stock tracking, automated QuickBooks sync. |
| **Payments** | Cash / Pay-at-Shop on completion (Demo/Cash workflow) with clear invoice breakdown. | Stripe / PayPal live credit card processing, deposit requirements. |

### 3.3 Explicit Out of Scope (Initial Release)
To protect focus, budget, and development velocity, the following are strictly excluded:
- Real payment gateway transactions (Stripe/PayPal live processing).
- Multi-tenant multi-vendor marketplace.
- Real-time GPS technician tracking.
- Paid SMS gateways (Twilio).
- Complex employee payroll and commission tracking.
- Native mobile app wrappers (PWA responsive design will be used instead).

---

## 4. Functional Requirements

### 4.1 Public Marketing & Studio Showcase
- **FR-01:** The homepage must present a luxury automotive aesthetic featuring high-resolution detailing photography, bold typography, clear value proposition, and prominent CTAs ("Build Your Package", "Book Appointment").
- **FR-02:** Services showcase must display granular service cards with clear categorization (Exterior, Interior, Full Detail, Ceramic & Paint Correction).
- **FR-03:** Interactive Before/After slider allowing visual comparison of paint correction and deep cleaning results.
- **FR-04:** Verified customer review carousel with car model badges (e.g., "BMW M3 — Ceramic Coating").

### 4.2 Signature Feature: Smart Package Builder & Pricing Engine
- **FR-05:** **Vehicle Categorization:** Users select vehicle classification:
  - Coupe / Compact (Base rate multiplier: `1.0x`)
  - Sedan / Hatchback (Multiplier: `1.1x`)
  - Small SUV / Crossover (Multiplier: `1.25x`)
  - Full-size SUV / Minivan (Multiplier: `1.4x`)
  - Truck / Commercial Van (Multiplier: `1.5x`)
- **FR-06:** **Base Package Selection:** User selects one primary tier (e.g., Express Refresh, Signature Deep Clean, Ultimate Ceramic Guard).
- **FR-07:** **A La Carte Add-ons:** User toggles optional upgrades (e.g., Engine Bay Steam Clean, Pet Hair Removal, Leather Conditioning, Headlight Restoration).
- **FR-08:** **Dynamic Calculation:** The client updates the estimated price and estimated duration (minutes/hours) with smooth transitions as options are toggled.
- **FR-09:** **Server Authority:** The final price submitted to the API MUST be recalculated and verified server-side based on database rules; client-provided total amounts are strictly rejected if mismatched.

### 4.3 Appointment Booking & Scheduling Engine
- **FR-10:** Interactive calendar showing available dates up to 30 days in advance.
- **FR-11:** Time slot generation based on studio operating hours (e.g., 09:00 AM, 11:30 AM, 02:00 PM, 04:30 PM).
- **FR-12:** Real-time capacity check: Each time slot has a maximum bay capacity (default: 2 vehicles at once). Fully booked slots are visually disabled.
- **FR-13:** Contact & Vehicle Intake: Captures Customer Name, Phone, Email, Vehicle Make/Model/Year, License Plate (optional), and Special Notes.
- **FR-14:** Unique Confirmation Reference: Generates a human-readable booking code (e.g., `DD-78429`) upon submission.

### 4.4 Customer Management & Tracking
- **FR-15:** Public Tracking Route (`/track` or `/track/:bookingCode`): Customers can enter their booking code and phone/email to view real-time status without requiring an account.
- **FR-16:** Optional Customer Account: Customers can sign up to view their historical bookings, save vehicle profiles, and re-book with one click.
- **FR-17:** Visual Status Stepper: Displays current vehicle status:
  `Submitted (Pending)` ➔ `Confirmed & Scheduled` ➔ `In Bay (In Progress)` ➔ `Inspection & Ready` ➔ `Completed`.

### 4.5 Business Management Dashboard (Admin)
- **FR-18:** Secure Admin Authentication with role verification (`role: 'admin'`).
- **FR-19:** Studio Overview Metrics: Total Bookings, Today's Scheduled Jobs, Monthly Estimated Revenue, Pending Approvals.
- **FR-20:** Appointment Management: Filter by status, date, or search by booking code. One-click status transitions (Confirm, Start Job, Complete, Cancel).
- **FR-21:** Service Catalog Management: Create, edit, activate/deactivate services, packages, and add-ons.
- **FR-22:** Vehicle Multiplier Configuration: Edit vehicle types and their respective pricing multipliers.
- **FR-23:** Business Availability Rules: Toggle working days, studio open/close hours, and bay capacity limits.

---

## 5. Non-Functional Requirements & Quality Gates

- **Performance:** First Contentful Paint (FCP) < 1.2s; client bundle size < 250KB gzipped; all images served in WebP/AVIF via Cloudinary CDN.
- **Security:** OWASP Top 10 compliance; bcrypt password hashing (12 rounds); HTTP-only JWT cookies; MongoDB injection protection (sanitized queries); helmet headers enabled.
- **Responsiveness:** Fluid breakpoints covering Mobile (375px+), Tablet (768px+), Desktop (1024px+), and Ultrawide (1440px+).
- **Accessibility:** WCAG 2.1 AA compliant color contrast, ARIA labels on custom sliders and interactive configurator tabs, keyboard navigable booking flow.
- **Commercial Licensing:** Zero copyleft code; 100% MIT, Apache-2.0, ISC dependencies.

---

## 6. Success Metrics & Verification Criteria

1. **Flawless Booking Loop:** A user can configure a complex SUV package with 2 add-ons, pick an available Tuesday slot, submit, and have the admin immediately see and confirm the exact package with matching server-calculated pricing.
2. **Double-Booking Prevention:** Attempting to book a slot that has reached maximum bay capacity returns a clean conflict warning and prevents duplicate database entry.
3. **Zero Console & Lint Errors:** Clean ESLint, Prettier, and React console output across the entire application.
