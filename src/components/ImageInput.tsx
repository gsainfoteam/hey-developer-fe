import { ChangeEvent, useEffect, useRef } from "react";
import styled from "styled-components";

import addImageIcon from "../assets/add_image_icon.png";
import { MultipleText, Text } from "./Text";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const FileInputContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px dashed lightgray;
  &:hover {
    cursor: pointer;
    border: 1px dashed #eb6263;
  }
`;

const FileInputField = styled.input`
  display: none;
`;

const DescriptionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  gap: 5px;
`;

const AddImageIcon = styled.img.attrs({ src: addImageIcon })`
  display: flex;
  width: 4em;
`;

const AddImageButton = styled.div`
  display: flex;
  background-color: #6e6e73;
  color: white;
  border: none;
  font-size: 0.8em;
  padding: 0.5em 1em;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: #eb6263;
  }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  min-height: 280px;
  background-color: #f5f5f7;
  border-radius: 5px;
  padding: 15px;
  gap: 15px;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
`;

const RemoveImageButton = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
  font-size: 15px;
  line-height: 15px;
  transform: translate(50%, -50%);
  background-color: gray;
  color: white;
  border: none;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    background-color: #ff5e5e;
  }
`;

const Image = styled.img`
  max-width: 250px;
  max-height: 250px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid white;
`;

const Counter = styled.div`
  display: flex;
  justify-content: end;
`;

interface ImageInputProps {
  maxFileNum: number;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (event: DragEvent) => void;
  handleDrop: (event: DragEvent) => void;
  handleRemoveImage: (index: number) => void;
  imagePreviews: string[];
}

const ImageInput = ({
  maxFileNum,
  handleFileChange,
  handleDragOver,
  handleDrop,
  handleRemoveImage,
  imagePreviews,
}: ImageInputProps) => {
  const isFull = imagePreviews.length === maxFileNum;
  const dropRef = useRef<HTMLLabelElement | null>(null);

  useEffect(() => {
    const dropRefCurrent = dropRef.current;
    if (!dropRefCurrent) return;

    dropRefCurrent.addEventListener("dragover", handleDragOver);
    dropRefCurrent.addEventListener("drop", handleDrop);

    return () => {
      dropRefCurrent.removeEventListener("dragover", handleDragOver);
      dropRefCurrent.removeEventListener("drop", handleDrop);
    };
  }, [handleDragOver, handleDrop]);

  return (
    <Container>
      <MultipleText>
        <Text color="gray">(선택) </Text>
        <Text>내용 설명에 사진이 필요하시다면 첨부해 주세요.</Text>
      </MultipleText>
      <>
        {imagePreviews.length <= 0 ? (
          <FileInputContainer ref={dropRef}>
            <DescriptionContainer>
              <AddImageIcon />
              <Text fontSize="0.7em" color="gray">
                끌어서 사진 추가
              </Text>
              <AddImageButton>...또는 파일 선택</AddImageButton>
            </DescriptionContainer>
            <FileInputField
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </FileInputContainer>
        ) : (
          <ImagePreviewContainer>
            {imagePreviews.map((image, i) => (
              <ImageContainer key={i}>
                <RemoveImageButton onClick={() => handleRemoveImage(i)}>
                  ×
                </RemoveImageButton>
                <Image src={image} />
              </ImageContainer>
            ))}
          </ImagePreviewContainer>
        )}
      </>
      <Counter>
        <Text fontSize="0.7em" color={isFull ? "#eb6263" : "gray"}>
          {imagePreviews.length}
        </Text>
        <Text fontSize="0.7em" color={isFull ? "#eb6263" : "gray"}>
          /
        </Text>
        <Text fontSize="0.7em" color={isFull ? "#eb6263" : "gray"}>
          {maxFileNum}
        </Text>
      </Counter>
    </Container>
  );
};

export default ImageInput;
