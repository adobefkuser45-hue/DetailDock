import PDFDocument from 'pdfkit';

/**
 * Format currency
 */
const fmt = (num) => `$${Number(num || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const invoiceService = {
  /**
   * Constructs the PDFDocument and writes all visual invoice elements
   */
  buildInvoiceDocument(booking) {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      info: {
        Title: `DetailDock Invoice ${booking.bookingCode}`,
        Author: 'DetailDock Technologies',
        Subject: 'Automotive Preservation & Detailing Receipt',
        Keywords: 'DetailDock, Detailing, Auto, Invoice, Receipt'
      }
    });

    // Color Palette
    const primaryDark = '#0f172a';
    const accentBlue = '#0284c7';
    const slateGray = '#475569';
    const lightBorder = '#cbd5e1';

    // 1. Top Accent Header Bar
    doc.rect(40, 40, 515, 6).fill(accentBlue);

    // 2. Atelier Brand & Invoice Title
    doc.fontSize(22).font('Helvetica-Bold').fillColor(primaryDark).text('DETAILDOCK', 40, 58, { continued: true });
    doc.font('Helvetica').fillColor(accentBlue).text(' ATELIER');

    doc.fontSize(9).font('Helvetica').fillColor(slateGray).text('Ultra-Luxury Automotive Preservation & Detailing', 40, 84);
    doc.text('100 Waterfront Suite 400, Seattle, WA 98101 | support@detaildock.com', 40, 97);

    // Invoice Header Details (Right Aligned)
    doc.fontSize(16).font('Helvetica-Bold').fillColor(primaryDark).text('OFFICIAL RECEIPT', 360, 58, { align: 'right', width: 195 });
    doc.fontSize(10).font('Helvetica-Bold').fillColor(accentBlue).text(`DD-${booking.bookingCode}`, 360, 78, { align: 'right', width: 195 });
    doc.fontSize(9).font('Helvetica').fillColor(slateGray).text(`Issued: ${new Date().toLocaleDateString('en-US')}`, 360, 93, { align: 'right', width: 195 });
    doc.text(`Status: ${(booking.payment?.status || 'unpaid').toUpperCase()}`, 360, 106, { align: 'right', width: 195 });

    // Divider Line
    doc.moveTo(40, 125).lineTo(555, 125).strokeColor(lightBorder).stroke();

    // 3. Client & Vehicle Spec Pods
    const podY = 138;

    // Customer Box
    doc.rect(40, podY, 250, 85).fillAndStroke('#f8fafc', '#e2e8f0');
    doc.fontSize(9).font('Helvetica-Bold').fillColor(accentBlue).text('CLIENT & APPOINTMENT INTAKE', 52, podY + 10);
    doc.fontSize(10).font('Helvetica-Bold').fillColor(primaryDark).text(booking.customer.name, 52, podY + 25);
    doc.fontSize(9).font('Helvetica').fillColor(slateGray).text(`Email: ${booking.customer.email}`, 52, podY + 40);
    doc.text(`Phone: ${booking.customer.phone}`, 52, podY + 53);
    const dateFormatted = new Date(booking.scheduledDate).toISOString().split('T')[0];
    doc.text(`Scheduled: ${dateFormatted} (${booking.scheduledTimeSlot})`, 52, podY + 66);

    // Vehicle Box
    doc.rect(305, podY, 250, 85).fillAndStroke('#f8fafc', '#e2e8f0');
    doc.fontSize(9).font('Helvetica-Bold').fillColor(accentBlue).text('VEHICLE REGISTRATION SPEC', 317, podY + 10);
    doc.fontSize(10).font('Helvetica-Bold').fillColor(primaryDark).text(`${booking.vehicle.year} ${booking.vehicle.make} ${booking.vehicle.model}`, 317, podY + 25);
    doc.fontSize(9).font('Helvetica').fillColor(slateGray).text(`Category: ${booking.vehicle.categoryName} (${booking.vehicle.multiplierApplied}x Tier)`, 317, podY + 40);
    doc.text(`Color: ${booking.vehicle.paintColor || 'Factory Finish'}`, 317, podY + 53);
    doc.text(`Studio Bay: Bay #${booking.bayNumber || 1}`, 317, podY + 66);

    // 4. Line Item Table Header
    const tableHeaderY = 240;
    doc.rect(40, tableHeaderY, 515, 24).fill(primaryDark);
    doc.fontSize(9).font('Helvetica-Bold').fillColor('#ffffff');
    doc.text('ITEMIZED SERVICE / PRESERVATION PROTOCOL', 50, tableHeaderY + 7);
    doc.text('DURATION', 340, tableHeaderY + 7);
    doc.text('AMOUNT', 485, tableHeaderY + 7, { align: 'right', width: 60 });

    // Table Rows
    let rowY = tableHeaderY + 24;

    // Package Row
    doc.rect(40, rowY, 515, 26).fillAndStroke('#ffffff', '#f1f5f9');
    doc.fontSize(9).font('Helvetica-Bold').fillColor(primaryDark).text(booking.packageSnapshot.title, 50, rowY + 8);
    doc.font('Helvetica').fillColor(slateGray).text(`${booking.packageSnapshot.durationMinutes} min`, 340, rowY + 8);
    doc.font('Helvetica-Bold').fillColor(primaryDark).text(fmt(booking.packageSnapshot.calculatedPrice), 485, rowY + 8, { align: 'right', width: 60 });
    rowY += 26;

    // Addons Rows
    (booking.addonsSnapshot || []).forEach((addon, index) => {
      const bgColor = index % 2 === 0 ? '#f8fafc' : '#ffffff';
      doc.rect(40, rowY, 515, 24).fillAndStroke(bgColor, '#f1f5f9');
      doc.fontSize(9).font('Helvetica').fillColor(primaryDark).text(`+ Add-on: ${addon.title}`, 50, rowY + 7);
      doc.font('Helvetica').fillColor(slateGray).text(`${addon.durationMinutes} min`, 340, rowY + 7);
      doc.font('Helvetica').fillColor(primaryDark).text(fmt(addon.price), 485, rowY + 7, { align: 'right', width: 60 });
      rowY += 24;
    });

    // 5. Financial Summary Pod (Bottom Right)
    const summaryY = Math.max(rowY + 15, 380);
    const summaryBoxX = 330;
    const summaryBoxW = 225;

    doc.rect(summaryBoxX, summaryY, summaryBoxW, 110).fillAndStroke('#f8fafc', '#cbd5e1');

    doc.fontSize(9).font('Helvetica').fillColor(slateGray).text('Subtotal:', summaryBoxX + 15, summaryY + 12);
    doc.font('Helvetica').fillColor(primaryDark).text(fmt(booking.totalPrice), summaryBoxX + 110, summaryY + 12, { align: 'right', width: 95 });

    doc.font('Helvetica').fillColor(slateGray).text('Studio Bay Reservation:', summaryBoxX + 15, summaryY + 28);
    doc.font('Helvetica').fillColor(primaryDark).text('$0.00 (Complimentary)', summaryBoxX + 110, summaryY + 28, { align: 'right', width: 95 });

    doc.moveTo(summaryBoxX + 15, summaryY + 44).lineTo(summaryBoxX + summaryBoxW - 15, summaryY + 44).strokeColor(lightBorder).stroke();

    doc.fontSize(11).font('Helvetica-Bold').fillColor(primaryDark).text('Total Balance:', summaryBoxX + 15, summaryY + 52);
    doc.font('Helvetica-Bold').fillColor(accentBlue).text(fmt(booking.totalPrice), summaryBoxX + 110, summaryY + 52, { align: 'right', width: 95 });

    const amountPaid = booking.payment?.amountPaid || 0;
    const balanceDue = Math.max(0, booking.totalPrice - amountPaid);

    doc.fontSize(9).font('Helvetica').fillColor('#059669').text('Amount Received:', summaryBoxX + 15, summaryY + 72);
    doc.font('Helvetica-Bold').fillColor('#059669').text(fmt(amountPaid), summaryBoxX + 110, summaryY + 72, { align: 'right', width: 95 });

    doc.font('Helvetica-Bold').fillColor(balanceDue > 0 ? '#b45309' : '#059669').text(
      balanceDue > 0 ? 'Remaining on Arrival:' : 'Settled in Full:', 
      summaryBoxX + 15, 
      summaryY + 88
    );
    doc.font('Helvetica-Bold').text(fmt(balanceDue), summaryBoxX + 110, summaryY + 88, { align: 'right', width: 95 });

    // 6. Security & Policy Guarantee (Bottom Left)
    doc.rect(40, summaryY, 275, 110).fillAndStroke('#f8fafc', '#e2e8f0');
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor(primaryDark).text('ATELIER WARRANTY & QUALITY PROTOCOL', 52, summaryY + 12);
    doc.fontSize(8).font('Helvetica').fillColor(slateGray);
    doc.text('1. All detailing formulations applied meet certified laboratory preservation standards.', 52, summaryY + 28, { width: 250, lineGap: 2 });
    doc.text('2. Ceramic coating packages include a 5-year nationwide gloss retention warranty.', 52, summaryY + 48, { width: 250, lineGap: 2 });
    doc.text('3. Live vehicular telemetry tracking is accessible 24/7 with reservation reference code.', 52, summaryY + 68, { width: 250, lineGap: 2 });
    doc.text(`Reference: DD-${booking.bookingCode} | Method: ${(booking.payment?.method || 'Studio Pay').toUpperCase()}`, 52, summaryY + 92);

    // 7. Footer
    doc.fontSize(8).font('Helvetica').fillColor('#94a3b8').text(
      'DetailDock Technologies Inc. — Fully Permissive Open Source Architecture — Generated Automatically',
      40,
      760,
      { align: 'center', width: 515 }
    );

    return doc;
  },

  /**
   * Generates a high-resolution vector PDF invoice and pipes it to an output stream (e.g. Express res)
   */
  generateInvoicePdf(booking, outputStream) {
    const doc = this.buildInvoiceDocument(booking);
    doc.pipe(outputStream);
    doc.end();
  },

  /**
   * Generates a PDF invoice as an in-memory Buffer
   */
  generateInvoiceBuffer(booking) {
    return new Promise((resolve, reject) => {
      const doc = this.buildInvoiceDocument(booking);
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
