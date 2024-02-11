document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const pdfList = document.getElementById('pdfList');
    const preview = document.getElementById('preview'); 
    let data = null;
    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const formData = new FormData(uploadForm);
        try {
            const response = await fetch('http://localhost:3000/pdf/upload', {
                method: 'POST',
                body: formData
            });
            data = await response.json();
            console.log('Data from server:', data); // Log the entire data object to inspect its structure
    
            // Clear the form
            uploadForm.reset();
    
            // Display the uploaded PDF
            const pdfItem = document.createElement('div');
            pdfItem.textContent = data.message;
            pdfList.appendChild(pdfItem);
    
            // // Render the uploaded PDF
            // if (data.pdf && data.pdf.path) {
            //     renderPDF(data.pdf.path); // If data.pdf.path is defined, render the PDF
            // } else {
            //     console.error('PDF path is undefined');
            // }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    preview.addEventListener('click', async (event) => {
        event.preventDefault();
    
       
    
            console.log('Data from server:', data); // Log the entire data object to inspect its structure

    
            // Display the uploaded PDF
            const pdfItem = document.createElement('div');
            pdfItem.textContent = "PDF preview successfully";
            pdfList.appendChild(pdfItem);
    
            // Render the uploaded PDF
            if (data.pdf && data.pdf.path) {
                renderPDF(data.pdf.path); // If data.pdf.path is defined, render the PDF
            } else {
                console.error('PDF path is undefined');
            }
        
    });

    
    async function renderPDF(pdfPath) {
        try {
            // Fetch PDF file
            const pdfData = await fetch(pdfPath);
            if (!pdfData.ok) {
                throw new Error('Failed to fetch PDF file');
            }
            const pdfBlob = await pdfData.blob();
    console.log("this is pdf",pdfData);
            // Read PDF using PDF.js
            // Read PDF using PDF.js
const pdfArrayBuffer = await new Response(pdfBlob).arrayBuffer(); // Convert Blob to ArrayBuffer
const pdf = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
const numPages = pdf.numPages;
    
            // Render each page
            for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                const page = await pdf.getPage(pageNumber);
                const scale = 1.5;
                const viewport = page.getViewport({ scale });
    
                // Create canvas element
                const canvas = document.createElement('canvas');
                canvas.style.border = '1px solid black';
    
                // Set canvas dimensions
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
    
                // Render PDF page to canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                await page.render(renderContext).promise;
    
                // Append canvas to the document body
                document.body.appendChild(canvas);
            }
        } catch (error) {
            console.error('Error rendering PDF:', error);
        }
    }
});
