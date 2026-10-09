import PDFDocument from 'pdfkit';
import crypto from 'crypto';

export const warrantyService = {
  /**
   * Generates a unique warranty certificate serial number
   */
  generateCertificateNumber(bookingCode) {
    const year = new Date().getFullYear();
    const cleanCode = (bookingCode || 'DD9999').replace(/[^A-Z0-9]/gi, '').slice(-4).toUpperCase();
    return `CCW-${year}-${cleanCode}`;
  },

  /**
   * Generates a verifiable security hash
   */
  generateSecurityHash(booking) {
    const payload = `${booking.bookingCode}-${booking.customer?.email}-${booking.vehicle?.make}-${booking.scheduledDate}`;
    return crypto.createHash('sha256').update(payload).digest('hex').slice(0, 16).toUpperCase();
  },

  /**
   * Builds the official vector PDF warranty certificate document
   */
  buildWarrantyDocument(booking, studioSettings = {}) {
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape', // Landscape gives a prestigious diploma/certificate appearance
      margin: 36,
      info: {
        Title: `Ceramic Warranty Certificate ${booking.bookingCode}`,
        Author: 'DetailDock Luxury Automotive Atelier',
        Subject: 'Official 9H Ceramic Coating Surface Protection Warranty',
        Keywords: 'DetailDock, Ceramic Coating, Warranty, 9H, Certificate'
      }
    });

    const certData = booking.warrantyCertificate || {};
    const certNumber = certData.certificateNumber || this.generateCertificateNumber(booking.bookingCode);
    const studioName = studioSettings.studioName || 'DetailDock Luxury Atelier';
    const issueDate = certData.issuedAt ? new Date(certData.issuedAt).toLocaleDateString('en-US') : new Date().toLocaleDateString('en-US');
    const expiryDate = certData.expiresAt ? new Date(certData.expiresAt).toLocaleDateString('en-US') : new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US');

    // Color Palette
    const obsidianDark = '#090C12';
    const goldPrimary = '#D97706';
    const goldAccent = '#F59E0B';
    const slateMuted = '#475569';
    const slateLight = '#64748B';

    // 1. Double Gold Certificate Border
    doc.rect(20, 20, 802, 555).lineWidth(2).strokeColor(goldPrimary).stroke();
    doc.rect(26, 26, 790, 543).lineWidth(0.75).strokeColor(goldAccent).stroke();

    // Corner decorative accents
    const corners = [
      [32, 32], [796, 32], [32, 549], [796, 549]
    ];
    corners.forEach(([x, y]) => {
      doc.circle(x, y, 3).fill(goldPrimary);
    });

    // 2. Atelier Header & Seal
    doc.fontSize(11).font('Helvetica-Bold').fillColor(goldPrimary).text(studioName.toUpperCase(), 0, 50, { align: 'center' });
    doc.fontSize(8).font('Helvetica').fillColor(slateLight).text('CENTER OF AUTOMOTIVE PRESERVATION & SURFACE SCIENCE', 0, 65, { align: 'center' });

    // Main Certificate Title
    doc.moveDown(1);
    doc.fontSize(24).font('Helvetica-Bold').fillColor(obsidianDark).text('CERTIFICATE OF CERAMIC COATING WARRANTY', 0, 88, { align: 'center' });
    doc.fontSize(10).font('Helvetica').fillColor(slateMuted).text('OFFICIAL REGISTERED NANO-CERAMIC SURFACE PRESERVATION GUARANTEE', 0, 118, { align: 'center' });

    // 3. Central Recipient & Vehicle Block
    doc.moveDown(1.5);
    doc.fontSize(10).font('Helvetica').fillColor(slateLight).text('This is to certify that the automotive vehicle specified below:', 0, 145, { align: 'center' });

    // Vehicle Spec Line
    const vehicleTitle = `${booking.vehicle?.year || ''} ${booking.vehicle?.make || ''} ${booking.vehicle?.model || ''}`.trim() || 'Exotic / Luxury Vehicle';
    doc.fontSize(20).font('Helvetica-Bold').fillColor(obsidianDark).text(vehicleTitle.toUpperCase(), 0, 165, { align: 'center' });

    const clientInfo = `Registered Owner: ${booking.customer?.name || 'Verified Client'}   |   License Plate: ${booking.vehicle?.licensePlate || 'N/A'}`;
    doc.fontSize(9).font('Helvetica').fillColor(slateMuted).text(clientInfo, 0, 192, { align: 'center' });

    // 4. Coating Specifications Pod (3-Column Layout)
    const cardY = 220;
    const cardW = 230;

    // Spec Card 1: Coating Technology
    doc.rect(48, cardY, cardW, 90).fillAndStroke('#F8FAFC', '#E2E8F0');
    doc.fontSize(8).font('Helvetica-Bold').fillColor(goldPrimary).text('COATING TECHNOLOGY', 62, cardY + 12);
    doc.fontSize(11).font('Helvetica-Bold').fillColor(obsidianDark).text('9H Matrix Nano-Ceramic', 62, cardY + 28);
    doc.fontSize(8).font('Helvetica').fillColor(slateMuted).text('Multi-stage dual-crosslinking liquid quartz formulation with extreme 9H pencil scratch resistance and 110° contact hydrophobic angle.', 62, cardY + 44, { width: 200 });

    // Spec Card 2: Coverage & Term
    doc.rect(306, cardY, cardW, 90).fillAndStroke('#F8FAFC', '#E2E8F0');
    doc.fontSize(8).font('Helvetica-Bold').fillColor(goldPrimary).text('WARRANTY TERM & DURATION', 320, cardY + 12);
    doc.fontSize(11).font('Helvetica-Bold').fillColor(obsidianDark).text('3-Year Transferable Guarantee', 320, cardY + 28);
    doc.fontSize(8).font('Helvetica').fillColor(slateMuted).text(`Effective Date: ${issueDate}\nExpiration Date: ${expiryDate}\nStatus: ACTIVE & VERIFIED`, 320, cardY + 44, { width: 200, lineGap: 3 });

    // Spec Card 3: Quality Telemetry
    doc.rect(564, cardY, cardW, 90).fillAndStroke('#F8FAFC', '#E2E8F0');
    doc.fontSize(8).font('Helvetica-Bold').fillColor(goldPrimary).text('LABORATORY SURFACE TELEMETRY', 578, cardY + 12);
    doc.fontSize(11).font('Helvetica-Bold').fillColor(obsidianDark).text('98+ GU Mirror Refinement', 578, cardY + 28);
    doc.fontSize(8).font('Helvetica').fillColor(slateMuted).text('Pre-inspection paint depth calibrated. Defects eliminated: >95%. Cured in dual climate-controlled cleanroom.', 578, cardY + 44, { width: 200 });

    // 5. Terms & Aftercare Guidelines
    const termsY = 328;
    doc.rect(48, termsY, 746, 75).fillAndStroke('#FAFAFA', '#E5E7EB');
    doc.fontSize(8).font('Helvetica-Bold').fillColor(obsidianDark).text('TERMS OF WARRANTY & ATELIER AFTERCARE INSTRUCTIONS:', 62, termsY + 10);
    const termsText = '• 14-Day Initial Curing: Avoid high-pressure automated touch washes and aggressive degreasers during chemical crosslinking.\n• Washing Protocol: Hand wash using pH-neutral automotive shampoo and two-bucket grit guard method.\n• Studio Inspection: Recommended annual de-ionizing wash and ceramic boost reload treatment to maintain factory warranty coverage.';
    doc.fontSize(7.5).font('Helvetica').fillColor(slateMuted).text(termsText, 62, termsY + 24, { width: 715, lineGap: 3 });

    // 6. Signatures, Seals, & Security Hash Footer
    const footY = 430;

    // Left: Certified Technician Signature
    doc.moveTo(70, footY + 45).lineTo(250, footY + 45).strokeColor('#94A3B8').stroke();
    doc.fontSize(9).font('Helvetica-Bold').fillColor(obsidianDark).text(certData.certifiedTechnicianName || 'Marcus Vance', 70, footY + 52);
    doc.fontSize(7.5).font('Helvetica').fillColor(slateLight).text('Certified Master Detailing Specialist', 70, footY + 64);

    // Center: Official Gold Seal Graphic
    doc.circle(421, footY + 35, 30).lineWidth(2).strokeColor(goldPrimary).stroke();
    doc.circle(421, footY + 35, 27).lineWidth(0.5).strokeColor(goldAccent).stroke();
    doc.fontSize(7).font('Helvetica-Bold').fillColor(goldPrimary).text('OFFICIAL SEAL', 390, footY + 28, { align: 'center', width: 62 });
    doc.fontSize(8).font('Helvetica-Bold').fillColor(obsidianDark).text('9H PRO', 390, footY + 38, { align: 'center', width: 62 });

    // Right: Studio Director & Verification
    doc.moveTo(592, footY + 45).lineTo(772, footY + 45).strokeColor('#94A3B8').stroke();
    doc.fontSize(9).font('Helvetica-Bold').fillColor(obsidianDark).text('Christian Vance', 592, footY + 52);
    doc.fontSize(7.5).font('Helvetica').fillColor(slateLight).text('Director of Operations, DetailDock', 592, footY + 64);

    // 7. Security Hash & Tracking Code Footer
    const securityHash = certData.securityHash || this.generateSecurityHash(booking);
    const bottomY = 530;
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(goldPrimary).text(`CERTIFICATE SERIAL: ${certNumber}`, 48, bottomY);
    doc.font('Helvetica').fillColor(slateLight).text(`SECURITY HASH: ${securityHash}`, 0, bottomY, { align: 'center' });
    doc.text(`BOOKING REF: DD-${booking.bookingCode}`, 590, bottomY, { align: 'right', width: 204 });

    return doc;
  },

  /**
   * Pipes the generated PDF warranty certificate to an output stream
   */
  generateWarrantyPdf(booking, outputStream, studioSettings = {}) {
    const doc = this.buildWarrantyDocument(booking, studioSettings);
    doc.pipe(outputStream);
    doc.end();
  },

  /**
   * Generates a PDF warranty certificate as an in-memory Buffer
   */
  generateWarrantyBuffer(booking, studioSettings = {}) {
    return new Promise((resolve, reject) => {
      const doc = this.buildWarrantyDocument(booking, studioSettings);
      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
      doc.on('error', reject);

      doc.end();
    });
  }
};
