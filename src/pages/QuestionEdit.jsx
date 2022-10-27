import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import { postApi } from "../shared/apis";
import { getCookieToken } from "../shared/Cookie";

function QuestionEdit() {
  const { id } = useParams();
  const { question } = useSelector((state) => state.questions);
  const navigate = useNavigate();
  const cookie = getCookieToken();
  const [input, setInput] = useState({
    title: "",
    content: "",
    qnaImage: "",
  });

  const [file, setFile] = useState("");

  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      title: question.title,
      content: question.content,
      qnaImage: question.imgUrl,
    }));
    setFile(question.imgUrl);
  }, [question]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onCreate = async (e) => {
    e.preventDefault();

    if (input.title === "") {
      return window.alert("질문의 제목을 입력해주세요!");
    } else if (input.title === "" || input.content === "") {
      return window.alert("모든 항목을 기입해주세요!");
    }
    try {
      const response = await postApi.put(`qnas/${+id}`, {
        ...input,
      });
      if (response.status !== 200) {
        return alert("질문 작성에 실패하였습니다.");
      }
    } catch (e) {
      return alert("질문 작성에 실패하였습니다.");
    }
    setInput({ title: "", content: "" });
    navigate("/questions");
  };

  const onChangePreView = (e) => {
    const fileBlob = URL.createObjectURL(e.target.files[0]);
    setInput((prev) => ({ ...prev, qnaImage: e.target.files[0] }));
    setFile(fileBlob);
  };

  useEffect(() => {
    if (!cookie) {
      navigate("/login");
      alert("로그인이 필요한 기능입니다.");
    }
  }, [cookie, navigate]);
  return (
    <Layout>
      <PageTitle>Edit Question</PageTitle>
      <Formlabel>새 질문 작성</Formlabel>
      <Line />
      <FormContainer onSubmit={onCreate}>
        <CreateTitle
          autoFocus
          type="text"
          name="title"
          onChange={onChange}
          value={input.title}
          placeholder="질문 제목"
          maxLength={40}
        />
        <div>
          <CreateContent
            type="text"
            name="content"
            onChange={onChange}
            value={input.content}
            placeholder="질문 내용"
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
            <></>
            <Img src={file} alt={""} />
          </FileBox>
        </div>
        <StyleButton>질문 수정</StyleButton>
      </FormContainer>
    </Layout>
  );
}

export default QuestionEdit;

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

const CreateTitle = styled.input`
  border: 1px solid #e9ecef;
  width: 60%;
  height: 42px;
  margin: 50px;
  margin-bottom: 30px;
  padding: 8px 20px 8px 20px;
  border-radius: 0.2rem;
  font-size: 20px;
  font-weight: bold;
  cursor: text;
`;

const CreateContent = styled.textarea`
  border: 1px solid #e9ecef;
  width: 60%;
  height: 240px;
  margin-left: 50px;
  padding: 20px 20px 20px 20px;
  border-radius: 0.2rem;
  font-size: 18px;
  font-weight: bold;
  cursor: text;
`;
const FileBox = styled.div`
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
