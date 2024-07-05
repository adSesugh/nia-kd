import Link from 'next/link';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
    fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState<number | null>(null);

    const onDocumentLoadSuccess = ({ numPages }: {numPages: number}) => {
        setNumPages(numPages);
    };

    return (
        <Link href={fileUrl} target="_blank" rel="noopener noreferrer">
             <div style={{ width: '220px', height: '300px', overflow: 'hidden' }}>
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={1} width={200} />
                </Document>
            </div>
        </Link>
    );
};

export default PdfViewer;