import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { postApi } from "../shared/apis";

import { getCookieToken } from "../shared/Cookie";
import { useSelector } from "react-redux";

function AnswerEdit() {
  const cookie = getCookieToken();
  const navigate = useNavigate();
  const { id } = useParams();
  const { answers } = useSelector((state) => state.answers);
  const answer = answers.find((item) => item.answerId === +id);
  const [input, setInput] = useState({
    content: "",
    answerImg: "",
  });
  const [file, setFile] = useState("");

  useEffect(() => {
    if (!cookie) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  }, [cookie, navigate]);

  useEffect(() => {
    if (answer) {
      setInput((prev) => ({
        ...prev,
        content: answer.content,
        answerImg: answer.imgUrl,
      }));
      setFile(answer?.imgUrl);
    }
  }, [answer]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onChangePreView = (e) => {
    const fileBlob = URL.createObjectURL(e.target.files[0]);
    setInput((prev) => ({ ...prev, answerImg: e.target.files[0] }));
    setFile(fileBlob);
  };

  const onCreate = async (e) => {
    e.preventDefault();

    if (input.content === "") {
      return window.alert("내용을 입력해주세요!");
    }
    try {
      const response = await postApi.put(`answers/${id}`, {
        ...input,
      });
      if (response.status !== 201) {
        return alert("글 작성에 실패하였습니다.");
      }
    } catch (e) {
      return alert("글작성에 실패하였습니다.");
    }

    setInput({ title: "", content: "" });
    navigate(`/questions/${answer.questionId}`);
  };

  return (
    <Layout>
      <PageTitle>Answer Form</PageTitle>
      <Formlabel>답변 작성</Formlabel>
      <Line />
      <FormContainer onSubmit={onCreate}>
        <div>
          <CreateContent
            name="content"
            onChange={onChange}
            value={input.content}
            placeholder="답변 내용"
            maxLength={200}
          />

          <Title>Upload Flie</Title>
          <FileBox file={file} setFile={setFile}>
            <FileCard>
              <FileInput>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={onChangePreView}
                />
                <button>
                  <i>
                    <AiOutlinePlus />
                  </i>
                  Upload
                </button>
              </FileInput>
              <p>Support files</p>
              <p>JPG,PNG,GIF</p>
            </FileCard>
            <Img src={file} alt={""} />
          </FileBox>
        </div>
        <StyleButton>답변 수정</StyleButton>
      </FormContainer>
    </Layout>
  );
}

export default AnswerEdit;

const PageTitle = styled.div`
  width: 1000px;
  margin: 0 auto;
  margin-top: 4rem;
  font-size: 4rem;
  font-weight: bold;
`;

const Formlabel = styled.div`
  margin-top: 1.5rem;
  width: 1000px;
  margin: 0 auto;
  padding: 1.75rem;
  font-size: 1.5rem;
`;

const Line = styled.div`
  width: 1000px;
  margin: 0 auto;
  border-bottom: 1px solid #e9ecef;
`;

const FormContainer = styled.form`
  position: relative;
  margin: 0 auto;
  width: 1000px;
  height: 800px;
`;

const CreateContent = styled.textarea`
  border: 1px solid #e9ecef;
  width: 60%;
  height: 240px;
  margin-left: 50px;
  margin-top: 3rem;
  padding: 20px 20px 20px 20px;
  border-radius: 0.2rem;
  font-size: 18px;
  font-weight: bold;
  cursor: text;
`;
const FileBox = styled.div`
  /* background-color: red; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 65%;
  gap: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const Title = styled.p`
  font-weight: bold;
  margin-bottom: 1em;
  font-size: 1.2rem;
  margin-top: 20px;
  margin-left: 50px;
`;

const FileCard = styled.div`
  background-color: #edf2f7;
  border: 3px dashed #cbd5e0;
  padding: 1em;
  margin-left: 50px;
  width: 300px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FileInput = styled.div`
  position: relative;
  margin-bottom: 1.5em;
  &:hover {
    button {
      background-color: #1482d0;
    }
  }
  input {
    position: relative;
    max-width: 200px;
    height: 46px;
    z-index: 2;
    cursor: pointer;
    opacity: 0;
  }
  button {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #0066cc;
    font-size: 1.1rem;
    border-radius: 4px;
    border: none;
    outline: none;
    transition: background-color 0.4s;
    box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.5);
  }
  i {
    width: 1.5em;
    height: 1.5em;
    padding: 0.3em;
    background-color: #efff;
    color: #1482d0;
    border-radius: 50%;
    justify-content: center;
    margin-right: 0.8em;
    font-size: 0.8em;
  }
`;
const StyleButton = styled.button`
  border: 1px solid #e9ecef;
  border-radius: 0.2rem;
  width: 100px;
  height: 42px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 55%;
`;
