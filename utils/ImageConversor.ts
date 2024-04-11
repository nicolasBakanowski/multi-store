export const convertToWebP = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
  
        ctx?.canvas.toBlob((blob) => {
          if (blob) {
            const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
              type: 'image/webp',
              lastModified: Date.now()
            });
            resolve(newFile);
          } else {
            reject(new Error('Error al crear el Blob de la imagen WEBP'));
          }
        }, 'image/webp', 0.8);
      };
      image.onerror = error => reject(error);
    });
  };
  