import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import UseUser from "../hooks/useUser";
import Layout from "../components/Layout/Layout";
import AnswerList from "../components/Question/AnswerList";
import QContainer from "../components/Question/QContainer";
import Button from "../elem/Button";
import { readAnswers } from "../redux/modules/answers";
import { readQuestion } from "../redux/modules/questions";
import { FlexBetweenBox } from "../styles/flex";
import AnswerSvg from "../styles/svg/AnswerSvg";

function QuestionDetail() {
  const { question } = useSelector((state) => state.questions);
  const { answers, isLoading } = useSelector((state) => state.answers);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = UseUser();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAnswers(+id));
    dispatch(readQuestion(+id));
  }, [id, dispatch]);

  const onClickEdit = () => {
    if (user) navigate(`/questions/${question?.questionId}/write`);
    else {
      alert("로그인이 필요한 서비스 입니다.");
      navigate("/login");
    }
  };

  if (isLoading) return;

  return (
    <Layout>
      <Wrapper as="main">
        <QContainer question={question} len={answers.length} user={user} />
        <AnswerContainer>
          <AnswerBtn>
            <span>
              여러분의 답변이 <strong>{question?.nickname}</strong>님에게 큰
              도움이 됩니다.
            </span>
            <Button {...btnStyle} _onClick={onClickEdit}>
              답변하기
            </Button>
          </AnswerBtn>
          <AnswerOptions>
            <ul>
              <li>
                <AnswerSvg />
                <span>
                  <strong>{answers?.length}</strong>개
                </span>
              </li>
            </ul>
          </AnswerOptions>
          <AnswerList
            answers={answers}
            selectedId={question?.selectedAnswer}
            ownerId={question?.userId}
          />
        </AnswerContainer>
      </Wrapper>
    </Layout>
  );
}
export default QuestionDetail;

const btnStyle = {
  _bgColor: "#7298FF",
  _hoverBgColor: "#4f7dfe",
  borderRadius: "0",
};

const Wrapper = styled.div`
  background-color: #f4f5f6;
  width: 90%;
  margin: 0 auto;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 2rem 2rem 2rem;
`;
const AnswerBtn = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  margin-top: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${FlexBetweenBox};
  padding: 1rem 2.5rem;
  span {
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
    strong {
      color: rgba(0, 0, 0, 0.9);
    }
  }
`;
const AnswerOptions = styled.div`
  padding: 2rem 2rem 1rem 2rem;

  ul {
    ${FlexBetweenBox}
    li {
      display: flex;
      align-items: center;

      svg {
        width: 1rem;
        color: #7298ff;
        margin-right: 0.8rem;
      }
      span {
        font-weight: 500;
        font-size: 0.95rem;
        color: rgba(0, 0, 0, 0.8);
        strong {
          font-weight: 600;
          margin-right: 0.1rem;
        }
      }
    }
  }
`;
