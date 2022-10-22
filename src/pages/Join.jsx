import { useForm } from "react-hook-form";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TextInput from "../elem/TextInput";
import Button from "../elem/Button";
function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onValid = (inputs) => {
    if (inputs.password !== inputs.password2) {
      setError(
        "password2",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
  };
  return (
    <Layout>
      <JoinContainer as="main">
        <Form onSubmit={handleSubmit(onValid)}>
          <h1>회원가입</h1>
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
          />
          <ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
          <TextInput
            register={{
              ...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 4,
                  message: "비밀번호는 4자 이상으로 작성해야합니다.",
                },
              }),
            }}
            label="Password"
            type="password"
          />
          <ErrorMessage>
            {errors.password && errors.password.message}
          </ErrorMessage>
          <TextInput
            register={{
              ...register("password2", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 4,
                  message: "비밀번호는 4자 이상으로 작성해야합니다.",
                },
              }),
            }}
            label="Check Password"
            type="password"
          />
          <ErrorMessage>
            {errors.password2 && errors.password2.message}
          </ErrorMessage>
          <TextInput
            register={{
              ...register("nickname", {
                required: "닉네임을 입력해주세요.",
                minLength: {
                  value: 2,
                  message: "닉네임은 2자 이상으로 작성해야합니다.",
                },
                pattern: {
                  value: /^[a-z0-9ㄱ-ㅎ가-힣]+$/g,
                  message: "닉네임에는 특수 문자 및 공백이 불가능합니다.",
                },
              }),
            }}
            label="Nickname"
            type="text"
          />
          <ErrorMessage>
            {errors.nickname && errors.nickname.message}
          </ErrorMessage>
          <Button {...btnStyle}>회원가입</Button>
        </Form>
      </JoinContainer>
    </Layout>
  );
}
export default Join;

const btnStyle = {
  _width: "100%",
  _fontSize: "0.9rem",
  _padding: "0.8rem",
  _bgColor: "rgba(0,0,0,0.75)",
  _hoverBgColor: "rgba(0,0,0,0.9)",
};

const JoinContainer = styled.div`
  padding-top: 10vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  width: 30rem;
  padding: 3rem 3rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  margin: 0 auto;
  h1 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;
const ErrorMessage = styled.span`
  padding-top: 0.2rem;
  height: 1.6rem;
  color: red;
  font-size: 0.75rem;
`;
