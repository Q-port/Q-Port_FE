import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UseUser from "../components/hooks/useUser";
import Layout from "../components/Layout/Layout";
import TextInput from "../elem/TextInput";
import { profileUser } from "../redux/modules/profile";
import instance, { postApi } from "../shared/apis";
import { Flexbox } from "../styles/flex";
function ProfileEdit() {
  const loginUser = UseUser();
  const { user } = useSelector((state) => state.profile);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm();
  useEffect(() => {
    if (user) setValue("nickname", user.nickname);
  }, [user, setValue]);

  useEffect(() => {
    if (user) setFile(user.avatar);
  }, [user]);

  useEffect(() => {
    dispatch(profileUser(loginUser?.userId));
  }, [loginUser, dispatch]);
  // form이 제출되었을 때 발생하는 이벤트
  const onValid = async (inputs) => {
    const { nickname, oldPassword, newPassword, confirm } = inputs;

    if (
      user.nickname === nickname &&
      oldPassword === "" &&
      newPassword === ""
    ) {
      navigate(-1);
    }
    if (newPassword.length > 0 && oldPassword.length === 0) {
      setError(
        "oldPassword",
        { message: "현재 비밀번호를 입력해주세요." },
        { shouldFocus: true }
      );
      return;
    }
    if (newPassword !== confirm) {
      setError(
        "confirm",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
      return;
    }

    const response = await instance.put(`users/${user.userId}`, {
      nickname,
      oldPassword,
      newPassword,
      confirm,
    });

    if (response.data.ok) {
      alert(response.data.message);
      navigate(`/profile/${user.userId}`);
    } else {
      alert(response.message);
    }
  };

  // 프로필을 수정할 때 발생하는 이벤트
  const onChange = async (e) => {
    const fileBlob = URL.createObjectURL(e.target.files[0]);
    setFile(fileBlob);
    try {
      const response = await postApi
        .put("users/image", { avatar: e.target.files[0] })
        .then((res) => {
          return res;
        });

      if (response.status !== 200) {
        return alert("프로필 수정이 실패하였습니다.");
      }
    } catch (e) {
      return alert("프로필 수정이 실패하였습니다.");
    }
  };

  return (
    <Layout>
      <Wrapper>
        <FileForm>
          <div>
            <img src={file} alt={user?.nickname} />
          </div>
          <label>
            프로필 사진 변경
            <input
              type="file"
              accept="image/*"
              name="file"
              id="file"
              onChange={onChange}
            />
          </label>
        </FileForm>
        <Form onSubmit={handleSubmit(onValid)}>
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

          <TextInput
            register={{
              ...register("oldPassword", {
                minLength: {
                  value: 4,
                  message: "비밀번호는 4자 이상으로 작성해야합니다.",
                },
              }),
            }}
            label="Old Password"
            type="password"
            errors={errors}
            errorName={"oldPassword"}
          />

          <TextInput
            register={{
              ...register("newPassword", {
                minLength: {
                  value: 4,
                  message: "비밀번호는 4자 이상으로 작성해야합니다.",
                },
              }),
            }}
            label="New Password"
            type="password"
            errors={errors}
            errorName={"newPassword"}
          />

          <TextInput
            register={{
              ...register("confirm", {
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
          <Btns>
            <button onClick={() => navigate(`/profile/${user.userId}`)}>
              취소하기
            </button>
            <button>수정하기</button>
          </Btns>
        </Form>
      </Wrapper>
    </Layout>
  );
}

export default ProfileEdit;

const Wrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.4);
  width: 30rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
  padding: 2rem 2rem 1rem 2rem;
`;

const FileForm = styled.div`
  display: flex;
  flex-direction: column;
  div {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;

    ${Flexbox}
    img {
      width: 8rem;
      aspect-ratio: 1/1;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  label {
    ${Flexbox}
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 0.7rem 0.9rem;
    font-size: 0.7rem;
    margin-top: 1rem;
    cursor: pointer;
    &:hover {
      border-color: #7298ff;
      color: #7298ff;
    }
  }
  input {
    display: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3rem 3rem 2rem 3rem;
  margin: 0 auto;
  h1 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #242424;
  button {
    width: 100%;
    padding: 0.7rem 2rem;
    border: 1px solid rgba(0, 0, 0, 0.4);
    &:first-child {
      margin-right: 0.3rem;
    }
    &:last-child {
      background-color: #242424;
      color: white;
      margin-left: 0.3rem;
    }
  }
`;
