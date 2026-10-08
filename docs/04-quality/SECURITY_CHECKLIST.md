# Security Checklist & OWASP Mitigation — DetailDock

**Project:** DetailDock — Smart Auto Detailing & Service Booking Platform  
**Document Version:** 1.0.0  
**Status:** PROPOSED  
**Date:** 2026-10-09  
**Standards:** OWASP Top 10 (2025) & OWASP API Security Top 10 (2023)  

---

## 1. Security Architecture & Threat Model

| Vulnerability Category | Potential Attack Vector | DetailDock Mitigation Strategy | Verification Method |
| :--- | :--- | :--- | :--- |
| **API1: BOLA / IDOR** (Broken Object Level Auth) | An attacker modifies `/api/v1/bookings/:id` to inspect another customer's private vehicle and contact info. | 1. Public tracking requires matching `{ bookingCode }` with masked customer PII (phone/email redacted).<br>2. Admin mutation endpoints require verified JWT with `role === 'admin'`. | Automated Strix Pentest & Jest endpoint auth test |
| **Price Tampering** (Business Logic Flaw) | Client sends `{ packageId: "...", totalPrice: 5.00 }` attempting to pay $5 for a $400 ceramic package. | **Server Authority:** Total price sent by client is strictly ignored. Server recalculates package base price, vehicle multiplier, and add-on costs from MongoDB. | Unit test verifying server overrides client total |
| **API8: Security Misconfiguration** | Leaked stack traces in production, exposed `.env` secrets, missing headers. | 1. Global Express error handler suppresses stack traces when `NODE_ENV === 'production'`.<br>2. `helmet()` enabled for secure headers.<br>3. `.env` strictly gitignored. | Pre-flight security audit & header inspector |
| **API2: Broken Authentication** | Brute-force credential guessing on `/api/v1/auth/login`. | 1. `express-rate-limit` caps login attempts at 5 requests per 15 minutes per IP.<br>2. Passwords hashed with `bcryptjs` (cost factor 12). | Rate limit stress test via automated script |
| **Injection (NoSQL / Parameter)** | Submitting payload `{ email: { "$gt": "" } }` to bypass login query. | 1. Mongoose strict schema casting prevents operator injection.<br>2. Zod validation sanitizes and validates string types before touching queries. | NoSQL injection payloads tested against auth routes |
| **Double Booking Race Condition** | Two customers simultaneously submit the final bay slot for the same time. | Mongoose transaction / atomic conditional update checking bay capacity before committing booking. | Concurrent request test (Promise.all) |

---

## 2. Pre-Release Security Checklist

- [ ] All passwords salted and hashed using bcrypt (12 rounds).
- [ ] JWT tokens have explicit expiration (`expiresIn: '24h'`) and signed with cryptographically secure secret.
- [ ] CORS is restricted to trusted origins (no `origin: '*'` in production).
- [ ] Rate limiting active on `/api/v1/bookings` and `/api/v1/auth/*`.
- [ ] No PII (full credit cards, unmasked phones, plain emails) exposed on public `/track` endpoint.
- [ ] Input validation schemas (Zod) active on all POST/PUT/PATCH endpoints.
- [ ] Strix OWASP API security scan passes with 0 critical or high vulnerabilities.
