# Milestone M05: Commercial Monetization & Automated Invoicing Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Stripe Payment Gateway (Card Payments, Deposits, Studio Pay), Cryptographic Webhook Handler, Automated Transactional Email Receipts with luxury HTML styling, and Server-Side Vector PDF Invoice Generation for DetailDock.

**Architecture:** MERN Architecture with Express REST APIs, Mongoose schema extensions for payment snapshots and states, Stripe SDK integration with raw body webhook verification, PDFKit server-side invoice generation with streaming download, Nodemailer transactional email delivery with development test fallback, and React + Tailwind UI components with interactive payment selection, live tracking receipt download, and admin invoice oversight.

**Tech Stack:** Node.js, Express.js, MongoDB Atlas (Mongoose), Stripe API, PDFKit (MIT), Nodemailer (MIT), React 19, Tailwind CSS v4, Lucide Icons, Vite, Playwright.

**Spec:** [docs/02-technical/ARCHITECTURE.md](file:///docs/02-technical/ARCHITECTURE.md), [docs/02-technical/TRD.md](file:///docs/02-technical/TRD.md), [docs/01-product/PRD.md](file:///docs/01-product/PRD.md).

## Global Constraints
- All dependencies must be strictly permissive open-source (MIT / Apache 2.0 / BSD / ISC) — Zero copyright risk.
- Server is the single source of financial truth: client prices and totals are never trusted for payment intents or invoices.
- Webhook endpoints must support cryptographic signature verification with raw request buffers.
- Graceful offline/test fallback: if Stripe or SMTP credentials are unconfigured in development, the system simulates payment processing and receipt generation seamlessly with zero crashes.
- All code changes must pass linting, unit/integration tests, and Playwright E2E without regressions.

## Review Focus
1. Webhook Signature Mismatch: Gracefully returns 400 with descriptive error when signature fails; does not crash server.
2. Idempotent Payment Webhooks: Multiple delivery attempts for the same Stripe event must not duplicate bookings or duplicate payment transitions.
3. Pricing Tampering Protection: Payment intent amount matches server-calculated authoritative price from `pricingService.js`, ignoring any client-sent prices.
4. Streamed PDF Invoicing: Streaming PDFKit buffer directly to HTTP response headers (`application/pdf`) with correct filename disposition.
5. Email Delivery Resilience: Transactional email failures must not block booking creation or break the HTTP response; failures are logged safely.

---

### Task 1: Server Payment & Stripe Gateway Integration (TASK-022)
**Files:**
- Create: `server/src/services/stripeService.js`
- Create: `server/src/controllers/paymentController.js`
- Create: `server/src/routes/paymentRoutes.js`
- Modify: `server/src/models/Booking.js`
- Modify: `server/src/server.js`
- Test: `server/src/scripts/testPaymentsAndWebhooks.js`

- [ ] Install `stripe` in `server/package.json`.
- [ ] Extend `Booking.js` with payment subdocument (`payment.status`, `payment.method`, `payment.stripePaymentIntentId`, `payment.amountPaid`, `payment.depositAmount`, `payment.receiptUrl`, `payment.paidAt`).
- [ ] Implement `stripeService.js` supporting both live Stripe API and structured test/mock fallback mode when `STRIPE_SECRET_KEY` is not set.
- [ ] Implement `paymentController.js` with:
  - `createPaymentIntent`: validates booking or pricing payload authoritatively, creates Stripe PaymentIntent or Checkout Session.
  - `handleWebhook`: validates Stripe signature with raw request body, updates booking payment and booking status idempotently.
  - `confirmStudioPayment`: allows customer to select pay-at-studio / pay-on-arrival with bay reservation secured.
- [ ] Mount `/api/v1/payments` in `server.js` with raw body capture for webhook signature verification.
- [ ] Write and run automated integration test `server/src/scripts/testPaymentsAndWebhooks.js`.

---

### Task 2: Vector PDF Invoice Generator & Transactional Email Service (TASK-023)
**Files:**
- Create: `server/src/services/invoiceService.js`
- Create: `server/src/services/emailService.js`
- Modify: `server/src/controllers/bookingController.js`
- Modify: `server/src/routes/bookingRoutes.js`
- Test: `server/src/scripts/testInvoiceAndEmail.js`

- [ ] Install `pdfkit` and `nodemailer` in `server/package.json`.
- [ ] Implement `invoiceService.js` generating luxury dark-themed or clean high-contrast automotive PDF invoices with DetailDock branding, booking code, vehicle spec, itemized services, tax/deposit breakdown, and QR/tracking URL.
- [ ] Implement `emailService.js` with bespoke responsive HTML email template for booking confirmation and payment receipt.
- [ ] Add endpoint `GET /api/v1/bookings/:code/invoice` to stream the PDF directly as a download.
- [ ] Add endpoint `POST /api/v1/bookings/:code/resend-receipt` to dispatch an updated email receipt.
- [ ] Integrate automatic receipt dispatch upon successful booking creation or payment confirmation.
- [ ] Write and execute automated verification test `server/src/scripts/testInvoiceAndEmail.js`.

---

### Task 3: Frontend Payment & Checkout Integration (TASK-024)
**Files:**
- Modify: `client/src/pages/BookingPage.jsx`
- Create: `client/src/components/booking/PaymentStep.jsx`
- Modify: `client/src/services/api.js`
- Test: `npm run build --workspace=client`

- [ ] Create `PaymentStep.jsx` allowing the user to select:
  - **Online Card Deposit / Full Pay** (Credit / Debit Card via Stripe).
  - **Pay at Studio / On Arrival** (Reserves bay slot with payment collected at delivery).
- [ ] Integrate payment selection into Step 3 & Step 4 of the Booking Wizard.
- [ ] Update booking submission payload to include payment selection and transaction reference.
- [ ] Add instant "Download PDF Invoice" button on the booking confirmation step.
- [ ] Verify clean Vite build without warnings or type errors.

---

### Task 4: Live Job Tracking & Admin Dashboard Payment Controls (TASK-025)
**Files:**
- Modify: `client/src/pages/TrackingPage.jsx`
- Modify: `client/src/pages/AdminDashboard.jsx`
- Test: `npm run build --workspace=client`

- [ ] In `TrackingPage.jsx`:
  - Add prominent "Download Tax Invoice / Receipt (PDF)" action button.
  - Display Live Payment Status badge (`Paid`, `Deposit Paid`, `Due at Studio`).
- [ ] In `AdminDashboard.jsx`:
  - Display payment badges on booking cards and Kanban lanes.
  - Add admin action to toggle or mark payment as `Paid` / `Deposit Paid` when customer settles in person.
  - Add admin "Download Invoice" action in booking details modal.
- [ ] Verify clean Vite build.

---

### Task 5: End-to-End Verification & Production Deployment (TASK-026)
**Files:**
- Modify: `tests/e2e/detaildock.spec.js`
- Modify: `docs/00-control/VERIFICATION.md`
- Modify: `docs/00-control/PROJECT_STATE.md`
- Modify: `docs/00-control/SESSION_LOG.md`
- Modify: `TASKS.md`

- [ ] Extend Playwright test suite to verify payment selection, invoice download link, and tracking portal receipt buttons.
- [ ] Run full test suites:
  - 115+ backend API integration tests
  - Payments & Webhooks verification
  - Invoicing & Email verification
  - Playwright E2E headless test suite
- [ ] Commit and push changes to GitHub `origin/main`.
- [ ] Trigger Render backend deployment and verify live health & endpoints.
- [ ] Trigger Vercel frontend deployment and verify live web application.
- [ ] Perform live production smoke test on live URLs.
