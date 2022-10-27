import styled from "styled-components";

import { FlexBetweenBox, Flexbox } from "../../styles/flex";
import HeartSvg from "../../styles/svg/HeartSvg";
import CheckSvg from "../../styles/svg/CheckSvg";
import CommentSvg from "../../styles/svg/CommentSvg";
import { Link, useNavigate } from "react-router-dom";
import timeCheck from "../../utils/timeCheck";
import { useDispatch } from "react-redux";
import { removeAnswer } from "../../redux/modules/answers";
import instance from "../../shared/apis";

function AnswerItem({ answer, selectedId, user, ownerId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDelete = () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      dispatch(removeAnswer(answer.answerId));
      navigate("/questions");
    } else {
      return;
    }
  };
  const onSelect = async () => {
    const ok = window.confirm("채택하시겠습니까?");
    if (!ok) return;
    try {
      const response = await instance.put(
        `qnas/${answer?.questionId}/${answer?.answerId}`
      );
      if (response.status !== 200) {
        return alert("채택이 실패하였습니다.");
      }
    } catch (e) {
      return alert("채택이 실패하였습니다.");
    }
    window.location.reload();
  };
  return (
    <ItemBox id={answer.answerId + ""}>
      <Link to={`/profile/${answer?.userId}`}>
        <ItemUser>
          <div>
            {selectedId === answer.answerId ? (
              <span>
                <CheckSvg />
              </span>
            ) : null}
            <strong>{answer?.nickname}</strong>
            님의 답변
          </div>
          <img src={answer?.avatar} alt={answer?.nickname} />
        </ItemUser>
      </Link>
      <ItemContent>
        {answer?.imgUrl ? <img src={answer?.imgUrl} alt={" "} /> : null}
        <p>{answer?.content}</p>
        <span>{timeCheck(+answer?.createdAt)}</span>
      </ItemContent>
      <ItemBtns>
        <div>
          <span>
            <HeartSvg />
          </span>
          <span>
            <CommentSvg />
          </span>
          {user && user.userId === answer.userId ? (
            answer.answerId === selectedId ? null : (
              <>
                {" "}
                <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
                <EditBtn
                  onClick={() =>
                    navigate(`/questions/answers/${answer.answerId}/edit`)
                  }
                >
                  수정
                </EditBtn>
              </>
            )
          ) : null}
        </div>
        <div>
          {user && user.userId === ownerId && !selectedId ? (
            <SelectBtn onClick={onSelect}>채택하기</SelectBtn>
          ) : null}
        </div>
      </ItemBtns>
    </ItemBox>
  );
}
export default AnswerItem;

const ItemBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 1rem;
  background-color: ${(props) => props.theme.bgColor};
  margin-bottom: 2rem;

  & > a {
    &:hover {
      & > div {
        background-color: #c2d2ff;
        box-shadow: 0px 2px 5px rgba(1, 19, 154, 0.1);
      }
    }
  }
`;
const ItemUser = styled.div`
  ${FlexBetweenBox}
  padding: 1rem 2rem;
  margin: 0 1rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  cursor: pointer;
  div {
    color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    span {
      width: 1.8rem;
      height: 1.8rem;
      background-color: #7298ff;
      border-radius: 50%;
      ${Flexbox}
      margin-right: 0.8rem;
      svg {
        width: 1.1rem;
        color: white;
      }
    }
    strong {
      font-size: 1rem;
      color: ${(props) => props.theme.fontColor};
      margin-right: 0.1rem;
    }
    font-size: 0.9rem;
    font-weight: 600;
  }
  img {
    width: 3rem;
    aspect-ratio: 1/1;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 2rem 2rem;
  font-size: 0.9rem;
  line-height: 1.8;
  img {
    max-width: 70%;
    object-fit: cover;
    margin-bottom: 2rem;
  }
  span {
    margin-top: 2rem;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

const ItemBtns = styled.div`
  ${FlexBetweenBox}
  align-items: center;
  padding: 1rem 3rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 4rem;
  div:first-child {
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      font-size: 0.9rem;
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
      svg {
        width: 1rem;
        margin-right: 0.3rem;
      }
    }
  }
`;

const SelectBtn = styled.button`
  background-color: #7298ff;
  color: white;
  width: 6rem;
  height: 2.3rem;
  margin-left: 1.2rem;
  font-size: 0.8rem;
  &:hover {
    background-color: #4f7dfe;
  }
`;
const EditBtn = styled.button`
  &:hover {
    color: #7298ff;
  }
`;
const DeleteBtn = styled.button`
  &:hover {
    color: red;
  }
`;
