const file2base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1];
      resolve(base64);
    };
    reader.onerror = () => {
      const err = reader.error; // DOMException
      console.error(`FileReader error: ${err?.name} (code: ${err?.code}) - ${err?.message}`);
      reject(err || new Error('Unknown FileReader error'));
    };
  });
};

export default file2base64;