import { Link } from "react-router-dom";
import styled from "styled-components";

function UserInfo({ questionsLen = 0, answersLen = 0, owner, user }) {
  return (
    <UserContainer as="section">
      <UserImg>
        <img src={owner?.avatar} alt={owner?.nickname} />
      </UserImg>
      <UserInfos>
        <UserProfile>
          <span>{owner?.nickname}</span>
          {user && owner?.userId === user.userId ? (
            <Link to={`/profile/${user.userId}/edit`}>프로필 편집</Link>
          ) : null}
        </UserProfile>
        <UserLog>
          <span>
            질문 <Strong as="strong">{questionsLen}</Strong>
          </span>
          <span>
            답변 <Strong as="strong">{answersLen}</Strong>
          </span>
          <span>
            내공 <Strong as="strong">{owner?.selectedAnswer}</Strong>
          </span>
        </UserLog>
        <UserDetail>
          <span>{owner?.email}</span>
        </UserDetail>
      </UserInfos>
    </UserContainer>
  );
}

export default UserInfo;

const UserContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 2rem 5rem;
  display: flex;
`;

const UserImg = styled.div`
  img {
    width: 8rem;
    height: 8rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    object-fit: cover;
  }
  margin-right: 6rem;
`;

const UserInfos = styled.div`
  padding: 0.8rem 0;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 1.3rem;
    font-weight: 400;
    margin-right: 1rem;
  }
  a {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 0.4rem;
    font-weight: 500;
    font-size: 0.9rem;
  }
  margin-bottom: 1rem;
`;
const UserLog = styled.div`
  display: flex;
  margin-bottom: 1rem;
  & > span {
    font-size: 0.9rem;
    margin-right: 1rem;
    &:last-child {
      strong:last-child {
        color: #7298ff;
      }
    }
  }
`;
const UserDetail = styled.div`
  font-weight: 500;
`;
const Strong = styled.span`
  font-weight: 600;
  font-size: 1.05rem;
`;
