import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";

function Question() {
  const Q = useSelector((state) => state.questions.users);

  return (
    <Layout>
      <PageTitle>Question</PageTitle>
      <ThreadGroup>
        <ThreadTitle>Question Thread</ThreadTitle>
        <Threadicon>
          <AiOutlineCheckCircle />
          <div>
            <BsChat />
          </div>
        </Threadicon>
      </ThreadGroup>
      <ThreadContainer>
        {Q.map((Q) => {
          return (
            <QList>
              <QListTitle to={`/questions/${Q.questionId}`}>
                <A>{Q.title}</A>
              </QListTitle>
              <QListWriter>
                작성자:
                <QListUserId>{Q.userId}</QListUserId>
              </QListWriter>
              <QListicon>
                {/* <AiOutlineCheckCircle/> */}
                <AiFillCheckCircle />
              </QListicon>
              <AnswerCount>
                <p>count</p>
              </AnswerCount>
            </QList>
          );
        })}
      </ThreadContainer>
    </Layout>
  );
}

export default Question;

  // 질문 페이지 타이틀
const PageTitle = styled.div`
  
  margin-top: 1rem;
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
  /* background-color: green; */
  width: 900px;
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

  // 스레드 컨테이너
const ThreadContainer = styled.div`
  /* background-color: #20c997; */
  width: 900px;
  margin: 0 auto;
  height: 600px;
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
  
  /* background-color: green; */
  width: 725px;
  padding: 2rem;
`;
  // 리스트 타이틀
const QListTitle = styled(Link)`
  font-weight: bold;
  font-size: 1rem;
`;
  // 리스트 타이틀 호버
const A = styled.a`
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
  /* background-color: red; */
  width: 1rem;
  margin-left: 692px;
  margin-top: -2rem;
`;

// 채택 카운트
const AnswerCount = styled.div`
  /* background-color: blue; */
  margin: 0 auto;
  width: 3rem;
  text-align: center;
  margin-left: 748px;
  margin-top: -1.2rem;
`;