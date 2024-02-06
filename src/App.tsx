import React, { ChangeEvent, useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";

// const Header = styled.div`
//   background-color: skyblue;
//   /* position: absolute; */
//   display: flex;
//   align-items: stretch;
// `;
const Container = styled.div`
  /* background-color: gray; */
  display: flex;
  flex-direction: column;
  align-items: start;

  padding: 0.8rem;
  position: relative;
`;

const Main = styled.div`
  background-color: pink;
`;

const Row = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: row;
`;

const Box = styled.div`
  background-color: lightgray;
  display: flex;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  margin: 0.5rem;
  font-size: 16px;
`;

const Input = styled.textarea`
  width: 100%;
  height: 8rem;
  outline-color: lightgray;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  ::placeholder {
    font-size: 14px;
  }
`;

const TextLength = styled.div`
  font-size: 12px;
  /* position: absolute; */
  /* display: flex;
  justify-content: end; */
`;

const FileInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  label {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
`;

const FileInputLabel = styled.div`
  background-color: lightgray;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 0.5rem;
  width: 100%;
  text-align: center;
`;

const FileInputField = styled.input`
  display: none; /* 원래 파일 입력 필드를 감춤 */
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  position: relative;

  img {
    width: 100%;
    max-width: 250px;
    max-height: 250px;
    object-fit: contain;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ff5e5e;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
`;

const InputEmail = styled.textarea`
  width: 100%;
  height: 2rem;
  outline-color: lightgray;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  ::placeholder {
    font-size: 14px;
  }
`;

const SubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#4caf50")};
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  transition: background-color 0.3s;
`;

const App = () => {
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const maxLength = 10000;

  const handleFeedbackTextChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newText = event.target.value.slice(0, maxLength);
    setFeedbackText(newText);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files as FileList;
    handleFiles(uploadedFiles);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files || [];
    handleFiles(droppedFiles);
  };

  const handleFiles = (newFiles: FileList) => {
    const filesArray: File[] = [];
    for (let i = 0; i < newFiles.length && files.length + i < 5; i++) {
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

  const isFeedbackEmpty = feedbackText.trim() === "";
  const handleSubmitFeedback = () => {};

  return (
    <Router>
      <>
        <Header />
        <Container>
          <Main>feedback을 남겨주세요</Main>
          <Container>
            <Box>
              서비스를 이용하시다가 예상치 못한 버그가 발생하셔서 이용에 불편을
              겪으셨나요?
            </Box>
            <Box>
              서비스의 특정 부분에 개선이 필요해 보이는데, 이를 개발자에게
              알리고 싶나요?
            </Box>
          </Container>

          <Container>
            <div style={{ fontSize: "16px" }}>
              불편사항을 접수하시면 정보국에서 해당 사항을 검토하고 조치를
              취하겠습니다.
            </div>
            <Row>
              <Input
                rows={4}
                cols={50}
                value={feedbackText}
                onChange={handleFeedbackTextChange}
                placeholder="피드백 내용을 입력해주세요."
              />
            </Row>

            <TextLength>{feedbackText.length}/10000</TextLength>
          </Container>
          <Container>
            <div style={{ fontSize: "16px" }}>
              (선택) 내용 설명에 사진이 필요하시다면 첨부해 주세요.
            </div>
          </Container>

          <Container>
            <FileInput>
              <label>
                <FileInputLabel>
                  {files.length > 0
                    ? `파일: ${files.map((file) => file.name).join(", ")}`
                    : "파일 선택 (최대 5개)"}
                </FileInputLabel>
                <FileInputField
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                />
              </label>
            </FileInput>
            {imagePreviews.map((preview, index) => (
              <ImagePreview key={index}>
                <img src={preview} alt={`업로드된 이미지 ${index + 1}`} />
                <RemoveImageButton onClick={() => handleRemoveImage(index)}>
                  X
                </RemoveImageButton>
              </ImagePreview>
            ))}
          </Container>
          <Container>
            <div style={{ fontSize: "16px" }}>
              (선택) 필요한 경우, 이메일을 입력해 주시면 해당 문제에 관해서
              안내드리겠습니다.
            </div>
            <Row>
              <InputEmail
                rows={4}
                cols={50}
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일 주소(선택사항)"
              />
            </Row>
            <TextLength>{email.length}/10000</TextLength>
          </Container>
          <Container>
            <SubmitButton
              disabled={isFeedbackEmpty}
              onClick={handleSubmitFeedback}
            >
              <Link
                to="/submitted"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                피드백 제출하기
              </Link>
            </SubmitButton>
          </Container>
          {/* React Router Route for the Submitted Page */}
          <Route path="/submitted">
            <SubmittedPage />
          </Route>
        </Container>
      </>
    </Router>
  );
};

const SubmittedPage = () => (
  <div>
    <h2>피드백이 제출되었습니다.</h2>
    {/* You can customize this page with additional content */}
  </div>
);

export default App;
