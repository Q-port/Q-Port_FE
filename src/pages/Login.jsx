import { useForm } from "react-hook-form";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TextInput from "../elem/TextInput";
import Button from "../elem/Button";

import { setAccessToken } from "../shared/Cookie";
import { api } from "../shared/apis";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = async (inputs) => {
    try {
      const response = await api
        .post("login", {
          ...inputs,
        })
        .then((res) => {
          setAccessToken(res.data.token);
          return res;
        });

      if (response.status !== 200) {
        return alert("회원가입에 실패하였습니다.");
      }
    } catch (e) {
      return alert("로그인에 실패하였습니다.");
    }

    window.location.href = "/";
  };

  return (
    <Layout>
      <LoginContainer as="main">
        <Form onSubmit={handleSubmit(onValid)}>
          <h1>로그인</h1>
          <TextInput
            register={{
              ...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일을 확인해주세요.",
                },
              }),
            }}
            type={"email"}
            label={"Email"}
            errors={errors}
            errorName={"email"}
          />

          <TextInput
            register={{
              ...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 4,
                  message: "비밀번호는 4자 이상입니다.",
                },
              }),
            }}
            label="password"
            type="password"
            errors={errors}
            errorName={"password"}
          />

          <Button {...btnStyle}>로그인</Button>
        </Form>
      </LoginContainer>
    </Layout>
  );
}

export default Login;

const btnStyle = {
  _width: "100%",
  _fontSize: "0.9rem",
  _padding: "0.8rem",
  _bgColor: "rgba(0,0,0,0.75)",
  _hoverBgColor: "rgba(0,0,0,0.9)",
};

const LoginContainer = styled.div`
  padding: 15vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30rem;
  padding: 3rem 3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  h1 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;
