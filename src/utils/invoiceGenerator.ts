import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface TransactionDetails {
    orderId: string;
    date: string;
    amount: string;
    name: string;
    email: string;
    utr: string;
}

export const generateInvoice = async (details: TransactionDetails) => {
    const doc = new jsPDF();

    // Colors
    const primaryColor = '#0F172A'; // Slate 900
    const accentColor = '#635BFF'; // Indigo/Blue
    const grayColor = '#64748B'; // Slate 500

    // Helper to load image
    const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.crossOrigin = 'Anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    };

    try {
        // Load Logo

        const logoImg = await loadImage('/shark-logo-full.png');

        // Add Logo
        // Calculate aspect ratio to keep it looking good
        const logoWidth = 50;
        const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
        doc.addImage(logoImg, 'PNG', 15, 15, logoWidth, logoHeight);

    } catch (e) {
        console.error("Could not load logo", e);
        // Fallback text if logo fails
        doc.setFontSize(20);
        doc.setTextColor(primaryColor);
        doc.text("Shark Funded", 15, 25);
    }

    // Invoice Header
    doc.setFontSize(24);
    doc.setTextColor(primaryColor);
    doc.text("INVOICE", 140, 25);

    doc.setFontSize(10);
    doc.setTextColor(grayColor);
    doc.text(`Invoice #: ${details.orderId}`, 140, 32);
    doc.text(`Date: ${details.date}`, 140, 37);
    doc.text(`Status: Paid`, 140, 42);

    
    doc.setDrawColor(226, 232, 240); 
    doc.line(15, 50, 195, 50);

    // Bill To & From
    const startY = 65;

    // From
    doc.setFontSize(10);
    doc.setTextColor(grayColor);
    doc.text("From:", 15, startY);
    doc.setFontSize(11);
    doc.setTextColor(primaryColor);
    doc.text("Shark Funded", 15, startY + 6);
    doc.setFontSize(10);
    doc.setTextColor(grayColor);
    doc.text("support@sharkfunded.com", 15, startY + 11);
    doc.text("www.sharkfunded.com", 15, startY + 16);

    // To
    doc.setFontSize(10);
    doc.setTextColor(grayColor);
    doc.text("Bill To:", 110, startY);
    doc.setFontSize(11);
    doc.setTextColor(primaryColor);
    doc.text(details.name, 110, startY + 6);
    doc.setFontSize(10);
    doc.setTextColor(grayColor);
    doc.text(details.email, 110, startY + 11);

    // Table
    // @ts-ignore
    autoTable(doc, {
        startY: startY + 30,
        head: [['Description', 'Reference (UTR)', 'Amount']],
        body: [
            ['Funding Account ', details.utr, `INR ${Number(details.amount).toLocaleString()}`],
        ],
        theme: 'grid',
        headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 5 },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 60 },
            2: { cellWidth: 40, halign: 'right' },
        },
        foot: [
            ['', 'Total', `INR ${Number(details.amount).toLocaleString()}`]
        ],
        footStyles: { fillColor: [248, 250, 252], textColor: [15, 23, 42], fontStyle: 'bold', halign: 'right' }
    });

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(9);
    doc.setTextColor(grayColor);
    doc.text("Thank you for your business!", 105, pageHeight - 30, { align: 'center' });
    doc.text("This is a computer generated invoice.", 105, pageHeight - 25, { align: 'center' });

    // Save
    doc.save(`Invoice-${details.orderId}.pdf`);
};
