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

    // Brand Colors
    const colors = {
        primary: '#0F172A',   // Slate 900
        secondary: '#64748B', // Slate 500
        accent: '#635BFF',    // Brand Indigo
        success: '#10B981',   // Emerald 500
        light: '#F8FAFC',     // Slate 50
        border: '#E2E8F0',    // Slate 200
        white: '#FFFFFF'
    };

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
        // --- 1. Header Section ---

        // Brand Accent Bar at the top
        doc.setFillColor(colors.accent);
        doc.rect(0, 0, 210, 6, 'F'); // 210mm is A4 width

        // Logo
        try {
            const logoImg = await loadImage('/shark-logo-email.png');
            const logoWidth = 45;
            const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
            doc.addImage(logoImg, 'PNG', 15, 20, logoWidth, logoHeight);
        } catch (e) {
            // Fallback Text Logo
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(colors.primary);
            doc.text("Shark Funded", 15, 30);
        }

        // Invoice Label & Details
        doc.setFontSize(32);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(colors.primary);
        doc.text("INVOICE", 195, 30, { align: 'right' }); // Right aligned

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(colors.secondary);

        // Status Badge
        doc.setFillColor(colors.success); // Green bg
        doc.roundedRect(175, 40, 20, 7, 1, 1, 'F');
        doc.setTextColor(colors.white);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("PAID", 185, 44.5, { align: 'center' });

        // Invoice Meta
        doc.setTextColor(colors.secondary);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Invoice #:`, 155, 55, { align: 'right' });
        doc.text(`Date:`, 155, 60, { align: 'right' });

        doc.setTextColor(colors.primary);
        doc.setFont("helvetica", "bold");
        doc.text(details.orderId, 195, 55, { align: 'right' });
        doc.text(details.date, 195, 60, { align: 'right' });

        // Divider
        doc.setDrawColor(colors.border);
        doc.line(15, 70, 195, 70);

        // --- 2. Billing Details ---
        const startY = 85;

        // FROM
        doc.setFontSize(9);
        doc.setTextColor(colors.secondary);
        doc.setFont("helvetica", "bold");
        doc.text("FROM", 15, startY);

        doc.setFontSize(11);
        doc.setTextColor(colors.primary);
        doc.setFont("helvetica", "bold");
        doc.text("Shark Funded", 15, startY + 6);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(colors.secondary);
        doc.text("payment@sharkfunded.com", 15, startY + 11);
        doc.text("www.sharkfunded.com", 15, startY + 16);

        // BILL TO
        doc.setFontSize(9);
        doc.setTextColor(colors.secondary);
        doc.setFont("helvetica", "bold");
        doc.text("BILL TO", 110, startY);

        doc.setFontSize(11);
        doc.setTextColor(colors.primary);
        doc.setFont("helvetica", "bold");
        doc.text(details.name || 'Valued Customer', 110, startY + 6);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(colors.secondary);
        doc.text(details.email, 110, startY + 11);

        // --- 3. Items Table ---
        // @ts-ignore
        autoTable(doc, {
            startY: startY + 30,
            head: [['DESCRIPTION', 'REFERENCE (UTR)', 'AMOUNT']],
            body: [
                ['Funding Evaluation Account', details.utr || 'N/A', `INR ${Number(details.amount).toLocaleString()}`],
            ],
            theme: 'plain', // Custom styling
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 8,
                textColor: colors.primary,
                lineWidth: 0, // No default borders
            },
            headStyles: {
                fillColor: colors.accent,
                textColor: colors.white,
                fontStyle: 'bold',
                halign: 'left'
            },
            columnStyles: {
                0: { cellWidth: 'auto', halign: 'left' },
                1: { cellWidth: 60, halign: 'left' },
                2: { cellWidth: 40, halign: 'right', fontStyle: 'bold' },
            },
            didParseCell: function (data) {
                // Add bottom border to body rows only
                if (data.section === 'body') {
                    data.cell.styles.lineWidth = 0; // Reset
                    // We manually draw lines if needed or use 'grid' theme with custom colors
                }
            },
            willDrawCell: function (data) {
                // Custom borders
            }
        });

        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY + 10;

        // --- 4. Totals ---
        doc.setDrawColor(colors.border);
        doc.line(110, finalY, 195, finalY); // Top line

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(colors.secondary);
        doc.text("Subtotal", 160, finalY + 8, { align: 'right' });
        doc.text(`INR ${Number(details.amount).toLocaleString()}`, 195, finalY + 8, { align: 'right' });

        doc.text("Processing Fee (0%)", 160, finalY + 14, { align: 'right' });
        doc.text("INR 0.00", 195, finalY + 14, { align: 'right' });

        // Grand Total Background
        doc.setFillColor(colors.light);
        doc.roundedRect(120, finalY + 20, 80, 12, 1, 1, 'F');

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(colors.primary);
        doc.text("Total", 130, finalY + 28);
        doc.setTextColor(colors.accent);
        doc.text(`INR ${Number(details.amount).toLocaleString()}`, 195, finalY + 28, { align: 'right' });

        // --- 5. Footer ---
        const pageHeight = doc.internal.pageSize.height;

        // Thank you note
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(colors.primary);
        doc.text("Thank you for choosing Shark Funded!", 105, pageHeight - 35, { align: 'center' });

        // Contact
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(colors.secondary);
        doc.text("Questions? Email us at payments@sharkfunded.com", 105, pageHeight - 30, { align: 'center' });

        // Legal/Computer Gen
        doc.setFontSize(8);
        doc.setTextColor(colors.secondary);
        doc.text("This is a computer-generated invoice and requires no signature.", 105, pageHeight - 15, { align: 'center' });

        // Save
        doc.save(`SharkFunded-Invoice-${details.orderId}.pdf`);

    } catch (error) {
        console.error("Error generating invoice:", error);
        alert("Failed to generate invoice. Please try again.");
    }
};
