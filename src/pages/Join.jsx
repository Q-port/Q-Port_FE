import { useForm } from "react-hook-form";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TextInput from "../elem/TextInput";
import Button from "../elem/Button";
import { api } from "../shared/apis";
function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onValid = async (inputs) => {
    if (inputs.password !== inputs.confirm) {
      setError(
        "confirm",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
      return;
    }

    const info = {
      email: inputs.email,
      nickname: inputs.nickname,
      password: inputs.password,
      confirm: inputs.confirm,
    };
    try {
      const response = await api.post("signup", info);
      if (response.status !== 200) {
        alert(response.data.message);
        return;
      } else {
        alert("회원가입에 성공하였습니다.");
      }
    } catch (e) {
      return alert("회원가입에 실패하였습니다.");
    }
    window.location.href = "/login";
  };
  return (
    <Layout>
      <JoinContainer>
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
            errors={errors}
            errorName={"email"}
          />

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
            errors={errors}
            errorName={"password"}
          />

          <TextInput
            register={{
              ...register("confirm", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 4,
                  message: "비밀번호는 4자 이상으로 작성해야합니다.",
                },
              }),
            }}
            label="Check Password"
            type="password"
            errors={errors}
            errorName={"confirm"}
          />

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
            errors={errors}
            errorName={"nickname"}
          />

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
