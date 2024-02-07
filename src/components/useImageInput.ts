import { ChangeEvent, useState } from "react";

function useImageInput({ max }: { max: number }) {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files as FileList;
    handleFiles(uploadedFiles);
  };

  const handleFiles = (newFiles: FileList) => {
    const filesArray: File[] = [];
    for (let i = 0; i < newFiles.length && files.length + i < max; i++) {
      filesArray.push(newFiles[i]);
    }

    setFiles([...files, ...filesArray]);

    const newImagePreviews: string[] = [];
    for (let i = 0; i < filesArray.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result as string);
        if (newImagePreviews.length === filesArray.length) {
          setImagePreviews([...imagePreviews, ...newImagePreviews]);
        }
      };
      reader.readAsDataURL(filesArray[i]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = [...files];
    const newImagePreviews = [...imagePreviews];

    newFiles.splice(index, 1);
    newImagePreviews.splice(index, 1);

    setFiles(newFiles);
    setImagePreviews(newImagePreviews);
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!event.dataTransfer) return;
    const droppedFiles = event.dataTransfer.files || [];
    handleFiles(droppedFiles);
  };

  return {
    handleFileChange,
    handleDragOver,
    handleDrop,
    handleRemoveImage,
    imagePreviews,
  };
}

export default useImageInput;
