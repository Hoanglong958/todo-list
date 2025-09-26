import React, { useState } from "react";

export default function Register({ onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ!");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Mật khẩu phải từ 6 ký tự, gồm chữ và số!");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    
    localStorage.setItem("user", JSON.stringify({ email, password }));
    setError("");
    onRegister();
  };

  return (
    <div style={{ maxWidth: 340, margin: "60px auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #eee", padding: 32 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Đăng ký</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1.5px solid #ececf6", fontSize: 16 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1.5px solid #ececf6", fontSize: 16 }}
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1.5px solid #ececf6", fontSize: 16 }}
        />
        <button type="submit" style={{ background: "#b3b3e6", color: "#fff", border: "none", borderRadius: 18, padding: "10px 0", fontSize: 17, fontWeight: 500, cursor: "pointer" }}>
          Đăng ký
        </button>
        {error && <div style={{ color: "#d00", textAlign: "center" }}>{error}</div>}
      </form>
      <div style={{textAlign:'center', marginTop:12}}>
        Đã có tài khoản? <span style={{color:'#8d8dd8', cursor:'pointer'}} onClick={onSwitchToLogin}>Đăng nhập</span>
      </div>
    </div>
  );
}
