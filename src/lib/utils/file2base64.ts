const file2base64 = async (file: File): Promise<string> => {
  const maxRetries = 3;
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const base64 = dataUrl.split(",")[1];
          resolve(base64);
        };
        reader.onerror = () => {
          const err = reader.error;
          console.error(`FileReader error (attempt ${attempt + 1}): ${err?.name} (code: ${err?.code}) - ${err?.message}`);
          reject(err || new Error('Unknown FileReader error'));
        };
      });
    } catch (error) {
      attempt++;
      if (attempt === maxRetries) {
        throw new Error('File access failed after retries—please re-select the file'); // Propagate for UI alert
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  throw new Error('Max retries reached for FileReader'); // Fallback, though loop handles it
};

export default file2base64;