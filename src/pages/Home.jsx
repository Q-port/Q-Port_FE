import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import mainbg from "../static/mainbg.png";
import lens from "../static/lens.png";
import me1 from "../static/memoji1.png";
import me2 from "../static/memoji2.png";
import me3 from "../static/memoji3.png";
import me4 from "../static/memoji4.png";
import me5 from "../static/memoji5.png";
import me6 from "../static/memoji6.png";
import me7 from "../static/memoji7.png";
import me8 from "../static/memoji8.png";
import me9 from "../static/memoji9.png";
import me10 from "../static/memoji10.png";
import gold from "../static/gold.png";
import silver from "../static/silver.png";
import bronze from "../static/bronze.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { rankUser } from "../redux/modules/loginUser";
import { useForm } from "react-hook-form";

function Home() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const backgroundArr = [me1, me2, me3, me4, me5, me6, me7, me8, me9, me10];
  const randomIndex = Math.floor(Math.random() * backgroundArr.length);
  const backgroundImg = backgroundArr[randomIndex];
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  console.log(users);
  const onSubmit = ({ keyword }) => {
    navigate(`/questions?keyword=${keyword}`);
  };

  useEffect(() => {
    dispatch(rankUser());
  }, [dispatch]);

  return (
    <>
      <Box>
        <RandomImg style={{ backgroundImage: `url(${backgroundImg})` }} />
      </Box>
      <Layout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="search" placeholder="Search" {...register("keyword")} />
        </form>

        <Widgets>
          <Label>Qport Top 3</Label>
          <VerticalLine />
          <StyleLink to="/questions">
            <A>questions</A>
          </StyleLink>
          <StyleLink to="/questions/:questionId/write">
            <A>WriteAnswer</A>
          </StyleLink>
          <StyleLink to="/questions/form">
            <A>questionsform</A>
          </StyleLink>
        </Widgets>
        <Ranker>
          {users?.map((user) => (
            <RankList key={user?.userId}>
              <Avatar
                style={{
                  boxSizing: "border-box",
                  width: 50,
                  height: 50,
                  backgroundColor: "#e9ecef",
                  margin: "0 auto",
                  marginTop: "30px",
                }}
                alt=" "
                src=" "
              />
              <NickName>{user?.nickname}</NickName>
            </RankList>
          ))}
          <RankList1>
            <frame1>
              <circle1></circle1>
              <div>
                <p>nickname</p>
              </div>
            </frame1>
          </RankList1>
          <RankList2>
            <frame2>
              <circle2></circle2>
              <p>nickname</p>
            </frame2>
          </RankList2>
          <RankList3>
            <frame3>
              <circle3></circle3>
              <p>nickname</p>
            </frame3>
          </RankList3>
        </Ranker>
      </Layout>
    </>
  );
}

export default Home;

// 배너박스
const Box = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 44px;
  width: 100%;
  height: 201px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("${mainbg}");
`;

// 랜덤 이미지
const RandomImg = styled.div`
  position: absolute;
  margin-top: 42px;
  width: 171px;
  height: 159px;
  background-size: 100%;
  margin-left: 55%;
`;

// 서치 인풋박스
const Input = styled.input`
  display: block;
  overflow: auto;
  border: none;
  margin-top: 5%;
  width: 70%;
  height: 50px;
  margin: 0 auto;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.09);
  background-image: url("${lens}");
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: left;
  background-position: 20px;
  text-align: left;
  padding-left: 3rem;
  img {
    position: absolute;
    left: 1rem;
  }
  &::placeholder {
    font-size: 15px;
    font-weight: bold;
  }
`;

// 위젯
const Widgets = styled.div`
  background-color: #000000;
  border: 1px solid black;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  justify-content: space-evenly;
  margin-top: 5%;
`;

// 위젯 이너 라벨
const Label = styled.label`
  color: #d6d6d6;
`;

// 위젯 이너 버티컬 라인
const VerticalLine = styled.div`
  border-left: 1px solid #e9ecef;
  height: 50px;
`;

//  랭크 위치
const Ranker = styled.div`
  /* align-items: center;
  width: 1900px;
  height: 80%;
  
  margin: 0 auto;
   */
  padding: 3%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const RankList1 = styled.div`
  position: relative;
  border: 1px solid #e9ecef;
  width: 200px;
  height: 200px;
  margin: 10px;
  frame1 {
    margin-top: 10px;
    position: absolute;
    width: 100px;
    height: 115px;
    margin-left: 23%;
    background-image: url("${gold}");
    background-size: 100%;
    circle1 {
      position: absolute;
      margin-top: 20px;
      margin-left: 6.3px;
      width: 88px;
      height: 88px;
      border-radius: 50%;
    }
  }
  p {
    position: absolute;
    margin-top: 130px;
    margin-left: 2px;
    text-align: center;
    width: 100px;
  }
`;

const RankList2 = styled.div`
  position: relative;
  border: 1px solid #e9ecef;
  width: 200px;
  height: 200px;
  margin: 10px;
  frame2 {
    position: absolute;
    margin-top: 10px;
    width: 100px;
    height: 115px;
    margin-left: 23%;
    background-image: url("${silver}");
    background-size: 100%;
    circle2 {
      position: absolute;
      margin-top: 20px;
      margin-left: 6.3px;
      width: 89px;
      height: 89px;
      border-radius: 50%;
    }
  }
  p {
    position: absolute;
    margin-top: 130px;
    margin-left: 2px;
    text-align: center;
    width: 100px;
  }
`;

const RankList3 = styled.div`
  position: relative;
  background-size: 100%;
  border: 1px solid #e9ecef;
  width: 200px;
  height: 200px;
  margin: 10px;
  frame3 {
    position: absolute;
    margin-top: 10px;
    width: 100px;
    height: 115px;
    margin-left: 23%;
    background-image: url("${bronze}");
    background-size: 100%;
    circle3 {
      position: absolute;
      margin-top: 20px;
      margin-left: 6px;
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
  }
  p {
    position: absolute;
    margin-top: 130px;
    margin-left: 2px;
    text-align: center;
    width: 100px;
  }
`;

// 닉네임
const NickName = styled.div`
  flex-wrap: wrap;
  margin-top: 20px;
  text-align: center;
`;

// Link 태그
const StyleLink = styled(Link)`
  text-decoration-line: none;
`;

// a 태그
const A = styled.span`
  color: #7f7f7f;
  text-decoration-line: none;
  &:hover {
    color: #ffffff;
  }
`;
