import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import { TfiEye } from "react-icons/tfi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";
import { readQuestions } from "../redux/modules/questions";
import { useEffect } from "react";
import { Flexbox } from "../styles/flex";
import EditSvg from "../styles/svg/EditSvg";

function Question() {
  const dispatch = useDispatch();
  //const location = useLocation();
  //const params = new URLSearchParams(location.search);
  //const keyword = params.get("keyword");
  const { questions } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(readQuestions());
  }, [dispatch]);

  //<QuestionFormLink to={"/questions/form"}>질문 추가</QuestionFormLink>
  return (
    <Layout>
      <FormBox>
        <PageTitle>Question</PageTitle>
        <QuestionFormLink to={"/questions/form"}>
          <EditSvg />
        </QuestionFormLink>
      </FormBox>

      <ThreadGroup>
        <ThreadTitle>Question Thread</ThreadTitle>
        <Threadicon>
          <AiOutlineCheckCircle />
          <div>
            <TfiEye />
          </div>
          <div>
            <BsChat />
          </div>
        </Threadicon>
      </ThreadGroup>
      <Line />
      <ThreadContainer>
        {questions?.map((question) => {
          return (
            <QList key={question.questionId}>
              <QListTitle to={`/questions/${question.questionId}`}>
                <A>{question.title}</A>
              </QListTitle>
              <QListWriter>
                작성자:
                <QListUserId>{question.nickname}</QListUserId>
              </QListWriter>
              <QListicon>
                {question.selectedAnswer ? (
                  <AiFillCheckCircle />
                ) : (
                  <AiOutlineCheckCircle />
                )}
                {/*  */}
              </QListicon>
              <ViewCount>
                <p>{question.view}</p>
              </ViewCount>
              <AnswerCount>
                <p>{question.answerCount}</p>
              </AnswerCount>
            </QList>
          );
        })}
      </ThreadContainer>
      <Line />
    </Layout>
  );
}

export default Question;

// 질문 페이지 타이틀
const PageTitle = styled.div`
  width: 100%;
  //margin: 0 auto;
  margin-top: 4rem;
  font-size: 4rem;
  font-weight: bold;
`;
// 스레드 타이틀
const ThreadTitle = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
`;

// 스레드 그룹
const ThreadGroup = styled.div`
  //width: 1000px;
  width: 100%;
  margin: 0 auto;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
// 스레드 아이콘
const Threadicon = styled.div`
  display: flex;
  margin-right: 4.5rem;
  gap: 3rem;
`;

// 보더 라인
const Line = styled.div`
  width: 100%;
  //width: 1000px;
  margin: 0 auto;
  border-bottom: 1px solid #e9ecef;
`;

// 스레드 컨테이너
const ThreadContainer = styled.div`
  //max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  height: 450px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.125rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
`;

// 리스트
const QList = styled.div`
  width: 725px;
  padding: 2rem;
`;
// 리스트 타이틀
const QListTitle = styled(Link)`
  font-weight: bold;
  font-size: 1rem;
`;
// 리스트 타이틀 호버
const A = styled.span`
  color: #7f7f7f;
  text-decoration-line: none;
  &:hover {
    color: #000;
  }
`;

// 작성자
const QListWriter = styled.div`
  display: flex;
  font-weight: bold;
  margin-top: 0.5rem;
`;

// 작성자 ID
const QListUserId = styled.div`
  font-weight: bold;
  margin-left: 0.3rem;
  color: #0070c9;
`;

// 리스트 아이콘
const QListicon = styled.div`
  width: 1rem;
  margin-left: 722px;
  margin-top: -2rem;
`;

// 뷰 카운트
const ViewCount = styled.div`
  margin: 0 auto;
  width: 3rem;
  text-align: center;
  margin-left: 775px;
  margin-top: -1.2rem;
`;

// 셀렉트 카운트
const AnswerCount = styled.div`
  margin: 0 auto;
  width: 3rem;
  text-align: center;
  margin-left: 845px;
  margin-top: -1.05rem;
`;

// 질문폼 박스
const FormBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  //position: relative;
  //max-width: 1000px;
  width: 100%;
  //height: 42px;
  margin: 0 auto;
`;

// 질문폼 링크
const QuestionFormLink = styled(Link)`
  ${Flexbox}

  //position: absolute;
  cursor: pointer;
  border: 1px solid #e9ecef;
  text-align: center;
  border-radius: 0.2rem;
  width: 50px;
  aspect-ratio: 1/1;
  margin-right: 4.5rem;
  font-size: 0.9rem;
  background-color: rgba(0, 0, 0, 0.7);
  transition: background-color 0.2s linear;
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
  //margin-left: 89.6%;
  svg {
    width: 1.2rem;
    color: white;
  }
`;
