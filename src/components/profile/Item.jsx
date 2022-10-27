import { Link } from "react-router-dom";
import styled from "styled-components";
import CommentSvg from "../../styles/svg/CommentSvg";
import timeCheck from "../../utils/timeCheck";

function Item({ isAnswer, data }) {
  return (
    <DataContainer>
      <Link
        to={`/questions/${data.questionId}`}
        state={{ scrollId: !isAnswer ? data.id : null }}
      >
        <p>{data.title}</p>
      </Link>
      <DataContent isAnswer={isAnswer}>
        {!isAnswer ? (
          <span>{!data.selectedAnswer ? "진행중" : "채택 완료"}</span>
        ) : null}
        {isAnswer ? <span>{data.status}</span> : null}
        {isAnswer ? null : (
          <span>
            <CommentSvg />3
          </span>
        )}
      </DataContent>
      <DataDate>
        <span>{timeCheck(+data.createdAt)}</span>
      </DataDate>
    </DataContainer>
  );
}
export default Item;

const DataContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.5fr;
  padding: 1rem 2rem;
  & > a {
    font-size: 0.9rem;
    font-weight: 500;
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;

const DataContent = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.isAnswer ? "1fr" : "1fr 1fr")};
  align-items: center;
  justify-items: center;
  font-size: 0.8rem;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  span:last-child {
    display: flex;
    align-items: center;

    svg {
      width: 0.9rem;
      margin-right: 0.2rem;
    }
  }
`;
const DataDate = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  color: #7298ff;
`;
