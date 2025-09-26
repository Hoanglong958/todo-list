
import React from "react";
import { Form, Input, Button, Typography, message } from "antd";

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { email, password } = values;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && email === user.email && password === user.password) {
      localStorage.setItem("isLoggedIn", "true");
      message.success("Đăng nhập thành công!");
      if (onLogin) onLogin();
    } else {
      message.error("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "60px auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #eee", padding: 32 }}>
      <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>Đăng nhập</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: "Mật khẩu phải từ 6 ký tự, gồm chữ và số!" },
          ]}
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" style={{ borderRadius: 8, fontWeight: 500 }}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <div style={{textAlign:'center', marginTop:12}}>
        Chưa có tài khoản? <span style={{color:'#8d8dd8', cursor:'pointer', fontWeight:500}} onClick={onSwitchToRegister}>Đăng ký</span>
      </div>
    </div>
  );
};

export default Login;
