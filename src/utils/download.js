/**
 * Handles the download of CV file
 * @param {Event} e - The event object
 * @returns {Promise<void>}
 */
export const handleDownloadCV = (e) => {
  e.preventDefault();
  const cvPath = '/uploads/documents/cv.pdf';

  return fetch(cvPath)
    .then((response) => {
      if (response.ok) {
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'cv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('CV file not found');
        alert('CV file is currently unavailable. Please try again later.');
      }
    })
    .catch((error) => {
      console.error('Error downloading CV:', error);
      alert('Error downloading CV. Please try again later.');
    });
};
