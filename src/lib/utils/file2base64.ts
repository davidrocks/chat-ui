const file2base64 = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer(); // Read as ArrayBuffer via Blob API
    const uint8Array = new Uint8Array(arrayBuffer);
    const base64 = btoa(String.fromCharCode(...uint8Array)); // Convert to base64
    return base64;
  } catch (error) {
    console.error(`Blob read error: ${error.name} - ${error.message}`);
    throw new Error('File access failed—please re-select the file'); // For UI handling
  }
};

export default file2base64;