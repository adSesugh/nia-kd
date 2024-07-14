'use client'

import { Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
//   ).toString();

interface PdfViewerProps {
    fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {

    const onDocumentLoadSuccess = ({ numPages }: {numPages: number}) => {
        //console.log(numPages)
    };

    return (
        <Link href={fileUrl} target="_blank" rel="noopener noreferrer">
            <div style={{ width: '220px', height: '300px', overflow: 'hidden' }}>
            <Document
                file={fileUrl}
                onLoadSuccess={(h) => console.log(h)}
                renderMode="canvas"
                loading={() => (
                    <div 
                        className='flex h-full w-full justify-center items-center'
                        style={{ width: '220px', height: '300px', overflow: 'hidden' }}
                    >
                        <Spinner color='default' />
                    </div>
                )}
            >
                <Page pageNumber={1} width={200} />
            </Document>
            </div>
        </Link>
    );
};

export default PdfViewer;