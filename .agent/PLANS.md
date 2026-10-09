# Complex Execution Plan — Milestone M07: Commercial Studio Expansion Suite

**Project:** DetailDock — Smart Auto Detailing & Service Booking Platform  
**System:** Google Antigravity MERN Master System v1.1  
**Milestone:** M07 — Commercial Studio Expansion Suite  
**Classification:** `ARCHITECTURAL`  
**Status:** PROPOSED & READY FOR EXECUTION  
**Date:** 2026-10-09  

---

## 1. Goal
Elevate DetailDock into a complete, market-ready, enterprise-grade auto detailing SaaS platform by delivering:
1. **Admin Full Service & Pricing Catalog Studio:** Direct CRUD & pricing management for packages, add-ons, and vehicle multipliers with instant MongoDB persistence and UI synchronization.
2. **Digital Ceramic Coating Warranty & Quality Certificate Engine:** High-resolution vector PDF certificate generation with serial numbering, 9H rating, and aftercare guide.
3. **Digital Vehicle Inspection (DVI) & Paint Health Telemetry:** Pre-treatment paint depth (µm), swirl defect rating, and post-treatment gloss recovery gauge (GU).
4. **Customer Account Portal & Personal Atelier Garage:** Free customer authentication, vehicle garage profile, service history log, and 1-click rebooking.

---

## 2. Current Context
- Milestones M01 through M06 are 100% verified, passing 155+ automated checks and 5/5 Playwright E2E tests.
- Live in production on Vercel (`https://client-mauve-zeta-13.vercel.app`), Render (`https://detaildock-api.onrender.com`), and MongoDB Atlas.
- DetailDock currently supports white-label studio information (name, address, phone, bays), Stripe checkout, and PDF invoicing.
- The `User` model already supports `role: ['customer', 'admin', 'technician']` and `savedVehicles`.

---

## 3. Scope

### Allowed Changes:
- **Server:**
  - `server/src/models/Booking.js`: Add `warrantyCertificate` and `inspectionData` schemas.
  - `server/src/controllers/adminController.js` & `server/src/routes/adminRoutes.js`: Add catalog management endpoints (Packages, Addons, Categories CRUD) and warranty issuance.
  - `server/src/controllers/authController.js` & `server/src/routes/authRoutes.js`: Customer booking history and vehicle garage endpoints.
  - `server/src/services/warrantyService.js`: Vector PDF warranty generator using PDFKit.
  - `server/src/controllers/bookingController.js`: Streaming warranty download endpoint (`GET /api/v1/bookings/:code/warranty`).
- **Client:**
  - `client/src/components/admin/CatalogManagerModal.jsx`: Interactive catalog and pricing management cockpit.
  - `client/src/components/admin/InspectionModal.jsx`: Digital Vehicle Inspection logger.
  - `client/src/components/tracking/WarrantyCertificateSection.jsx`: Certificate badge and download trigger.
  - `client/src/components/tracking/VehicleInspectionCard.jsx`: Paint depth and gloss telemetry.
  - `client/src/pages/GaragePage.jsx`: Customer Atelier Garage portal.
  - `client/src/components/auth/AuthModal.jsx`: Customer login/register modal with 1-click demo accounts.
  - `client/src/components/layout/Navbar.jsx`: User profile / Garage quick navigation.

### Explicitly Out of Scope:
- Modifying core pricing calculations or slot reservation rules (ADR-001).
- Paid third-party SMS/auth services (everything remains 100% zero-cost).

---

## 4. Interfaces & Contracts

### New Backend Endpoints:
- `GET /api/v1/admin/catalog` -> Returns all packages, addons, and vehicle categories.
- `POST /api/v1/admin/catalog/packages` -> Create new package.
- `PUT /api/v1/admin/catalog/packages/:id` -> Update package title, price, duration, features, popular flag.
- `DELETE /api/v1/admin/catalog/packages/:id` -> Soft-delete/toggle package.
- `PUT /api/v1/admin/catalog/addons/:id` -> Update addon price, name, duration, active state.
- `PUT /api/v1/admin/catalog/categories/:id` -> Update vehicle category price & duration multipliers.
- `POST /api/v1/admin/catalog/reset` -> Restore default seed catalog.
- `POST /api/v1/admin/bookings/:id/inspection` -> Update DVI paint readings & defect notes.
- `POST /api/v1/admin/bookings/:id/warranty` -> Generate/issue ceramic coating warranty certificate.
- `GET /api/v1/bookings/:code/warranty` -> Stream official PDF warranty certificate.
- `GET /api/v1/auth/customer/garage` -> Returns logged-in user profile, saved vehicles, and booking history.
- `POST /api/v1/auth/customer/vehicles` -> Add a saved vehicle to customer garage.
- `DELETE /api/v1/auth/customer/vehicles/:id` -> Remove saved vehicle.

---

## 5. Sequential Tasks & Milestones

| Task ID | Component | Objective | Exit Criteria |
| :--- | :--- | :--- | :--- |
| **TASK-033** | Backend | Admin Catalog & Pricing Editor API | 8/8 automated CRUD tests passing |
| **TASK-034** | Frontend | Interactive Catalog & Pricing Manager UI | Admin modal operational with live sync |
| **TASK-035** | Full Stack | Digital Ceramic Warranty Certificate Engine | Vector PDF generated & streamed |
| **TASK-036** | Full Stack | Digital Vehicle Inspection (DVI) & Telemetry | Paint readings saved and visualized |
| **TASK-037** | Full Stack | Customer Account & Personal Atelier Garage | Login, saved vehicles & booking history |
| **TASK-038** | QA & Deploy | Full E2E Playwright Verification & Cloud Deploy | 5/5 Playwright pass, live cloud verified |

---

## 6. Verification Criteria
1. Automated unit & HTTP integration tests: 100% pass across all new endpoints.
2. Playwright E2E tests: Customer garage, catalog price edit, inspection view, and warranty PDF download all asserted.
3. Production Deployment: Render and Vercel updated and smoke-tested live.
