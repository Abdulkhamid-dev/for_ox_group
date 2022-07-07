import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message } from "antd";
import { StyledSignUp } from "./Auth.style";
import authBg from "../../assets/img/auth_bg.jpg";
import { updateAccount } from "../../app/auth/authSlice";

function SignIn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  let form = new FormData();
  form.append("_username", formValues?.username);
  form.append("_password", formValues?.password);
  form.append("_subdomain", "toko");

  const Login = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://toko.ox-sys.com/security/auth_check",
        form
      );
      message.success('You have successfully logged')
      dispatch(updateAccount({ token: res.data.token }));
      setLoading(false);
    } catch (error) {
      message.error('Email or password is invalid')
      setLoading(false);
    }
  };

  const canSign = Boolean(formValues.username) && Boolean(formValues.password);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues((state) => ({ ...state, [name]: value }));
  }, []);
  return (
    <StyledSignUp bg={authBg}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        autoComplete="off"
      >
        <h1>Sign In</h1>
        <Form.Item
          label={"UserName"}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            size="large"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label={"Password"}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            name="password"
            size="large"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            onClick={Login}
            disabled={!canSign || loading}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </StyledSignUp>
  );
}

export default SignIn;
