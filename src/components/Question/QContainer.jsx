import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeQuestion } from "../../redux/modules/questions";
import QuestionSvg from "../../styles/svg/QuestionSvg";
import getDate from "../../utils/getDate";
function QContainer({ question, len, user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDelete = () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      dispatch(removeQuestion(question.questionId));
      navigate("/questions");
    } else {
      return;
    }
  };
  return (
    <Container as="section">
      <QHeader>
        <QuestionSvg />
        <div>
          <span>{question?.title}</span>
        </div>
      </QHeader>
      <QContent>
        <p>{question?.content}</p>
        {question?.imgUrl ? <img src={question.imgUrl} alt="" /> : null}
      </QContent>
      <QFooter>
        <Link to={`/profile/${question.userId}`}>
          <img src={question?.avatar} alt="" />
          <span>{question?.nickname}</span>
        </Link>
        <div>
          <span>{question && getDate(+question?.createdAt || Date.now())}</span>
          <span>답변수 {len}</span>
          <span>조회수 {question?.view}</span>
          {user && user.userId === question.userId ? (
            question.selectedAnswer ? null : (
              <>
                <EditBtn
                  onClick={() =>
                    navigate(`/questions/${question.questionId}/edit`)
                  }
                >
                  수정
                </EditBtn>
                <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
              </>
            )
          ) : null}
        </div>
      </QFooter>
    </Container>
  );
}
export default QContainer;

const Container = styled.div`
  padding: 2rem;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
`;

const QHeader = styled.div`
  display: flex;
  margin-bottom: 1rem;
  svg {
    width: 2.5rem;
    color: #7298ff;
  }
  div:last-child {
    padding: 0.8rem 1rem;
    font-weight: 500;
    font-size: 1.2rem;
  }
`;
const QContent = styled.div`
  p {
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.8;
  }

  img {
    max-width: 70%;
    margin-top: 1.4rem;
  }
`;

const QFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  padding: 1rem 0;

  a {
    display: flex;
    align-items: center;
    img {
      width: 1.5rem;
      height: 1.5rem;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      margin-right: 0.4rem;
    }
    span {
      font-size: 0.8rem;
    }
    margin-right: 1rem;
  }
  div:last-child {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    span:first-child {
      margin-right: 1rem;
    }
    span:nth-child(2) {
      margin-right: 0.9rem;
      display: flex;
      align-items: center;
    }
  }
`;
const DeleteBtn = styled.button`
  &:hover {
    color: red;
  }
`;

const EditBtn = styled.button`
  margin-left: 1.2rem;
  &:hover {
    color: #7298ff;
  }
`;
