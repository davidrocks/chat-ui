const file2base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      resolve(base64);
    };
    reader.onerror = () => {
      const err = reader.error;
      console.error(`FileReader error: ${err?.name} (code: ${err?.code}) - ${err?.message}`);
      reject(err || new Error('Unknown FileReader error'));
    };
  });
};

export default file2base64;