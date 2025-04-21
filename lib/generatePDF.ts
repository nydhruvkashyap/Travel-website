import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export async function generatePDF(text: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 50;
  const usableWidth = pageWidth - margin * 2;
  const fontSize = 11;
  const headerSize = 12;
  const footerSize = 11;
  const lineHeight = 18;

  let regularFont, boldFont, italicFont;

  try {
    let regularBytes, boldBytes, bolditalicBytes;

    if (typeof window === 'undefined') {
      const fs = await import('fs/promises');
      const path = await import('path');
      regularBytes = await fs.readFile(path.join(process.cwd(), 'public/fonts/Poppins-Regular.ttf'));
      boldBytes = await fs.readFile(path.join(process.cwd(), 'public/fonts/Poppins-Bold.ttf'));
      bolditalicBytes = await fs.readFile(path.join(process.cwd(), 'public/fonts/Poppins-BoldItalic.ttf'));
    } else {
      throw new Error('Font loading must run server-side.');
    }

    regularFont = await pdfDoc.embedFont(regularBytes);
    boldFont = await pdfDoc.embedFont(boldBytes);
    italicFont = await pdfDoc.embedFont(bolditalicBytes);
  } catch (e) {
    console.error('🚨 Font embedding failed:', e);
    throw new Error('Font embedding failed');
  }

  let logoImage, logoDims;
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const logoPath = path.join(process.cwd(), 'public', 'mythara-logo.png');
    const logoBytes = await fs.readFile(logoPath);

    logoImage = await pdfDoc.embedPng(logoBytes);
    logoDims = logoImage.scale(150 / logoImage.width);
  } catch (e) {
    console.error('🚨 Logo embed failed:', e);
    throw new Error('Logo embedding failed');
  }

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  page.drawImage(logoImage, {
    x: margin,
    y: y - logoDims.height,
    width: logoDims.width,
    height: logoDims.height,
  });
  page.drawImage(logoImage, {
    x: margin + 0.5,
    y: y - logoDims.height - 0.5,
    width: logoDims.width,
    height: logoDims.height,
  });

  y -= logoDims.height + 30;

  const introParagraph = `
Welcome to your personalized Mythara travel itinerary! We are thrilled to be a part of your journey to India. We’ve designed this journey to match your interests and travel style, helping you experience India in a way that’s meaningful, memorable, and truly yours.
`;

  const introLines = wrapLine(introParagraph.trim(), regularFont, fontSize, usableWidth);

  for (const line of introLines) {
    if (y < margin + lineHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    page.drawText(line, {
      x: margin,
      y,
      size: fontSize,
      font: regularFont,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight;
  }

  y -= 10;

  const sections = text.split(/\n{2,}/);
  for (const section of sections) {
    const lines = section.split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      if (y < margin + lineHeight) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }

      const isDayHeader = /^DAY\s+\d+/i.test(line);
      const isBullet = line.startsWith('-');
      const fontToUse = isDayHeader ? boldFont : regularFont;
      const size = isDayHeader ? headerSize : fontSize;
      const x = isBullet ? margin + 15 : margin;

      const wrapped = wrapLine(line, fontToUse, size, usableWidth - (isBullet ? 15 : 0));
      for (const subLine of wrapped) {
        if (y < margin + lineHeight) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        page.drawText(subLine, {
          x,
          y,
          size,
          font: fontToUse,
          color: rgb(0, 0, 0),
        });
        y -= lineHeight;
      }

      y -= 6;
    }
    y -= 10;
  }

  const footerStart = 'Contact us at ';
  const email = 'support@mythara.org';
  const footerEnd = ' for assistance with end-to-end management of your magical trip to India.';
  const fullFooter = footerStart + email + footerEnd;

  const footerLines = wrapLine(fullFooter, boldFont, footerSize, usableWidth);
  let yOffset = y - lineHeight;

  for (const line of footerLines) {
    if (y < margin + lineHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      yOffset = y - lineHeight;
    }

    const emailIndex = line.indexOf(email);
    if (emailIndex >= 0) {
      const beforeEmail = line.slice(0, emailIndex);
      const afterEmail = line.slice(emailIndex + email.length);
      let xPos = margin;

      if (beforeEmail) {
        page.drawText(beforeEmail, {
          x: xPos,
          y: yOffset,
          size: footerSize,
          font: boldFont,
          color: rgb(0, 0, 0),
        });
        xPos += boldFont.widthOfTextAtSize(beforeEmail, footerSize);
      }

      page.drawText(email, {
        x: xPos,
        y: yOffset,
        size: footerSize,
        font: italicFont,
        color: rgb(0, 0, 0.4),
      });
      xPos += italicFont.widthOfTextAtSize(email, footerSize);

      if (afterEmail) {
        page.drawText(afterEmail, {
          x: xPos,
          y: yOffset,
          size: footerSize,
          font: boldFont,
          color: rgb(0, 0, 0),
        });
      }
    } else {
      page.drawText(line, {
        x: margin,
        y: yOffset,
        size: footerSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
    }

    y -= lineHeight;
    yOffset -= lineHeight;
  }

  return await pdfDoc.save();
}

import type { PDFFont } from 'pdf-lib';

function wrapLine(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}