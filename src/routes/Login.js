import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../style/SignUp.css';
import axios from 'axios';

function Login() {
  const [loginInputs, setLoginInputs] = useState({
    loginId: '',
    password: '',
  });
  const { loginId, password } = loginInputs;

  const history = useHistory();

  const idErrMsg = '아이디를 잘못 입력하셨습니다.';
  const pwErrMsg = '비밀번호가 틀렸습니다.';

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginInputs({
      ...loginInputs,
      [name]: value,
    });
  };

  const fetchLogin = () => {
    let body = {
      loginId,
      password,
    };
    axios({
      method: 'POST',
      // url: 'http://3.38.17.21:8080/users/login',
      url: 'http://52.79.80.209:8080/users/login',
      data: body,
      withCredentials: true,
    })
      .then((res) => {
        console.log('login res /', res);

        if (res.status === 200) {
          alert('로그인 완료!');
          sessionStorage.setItem('isAuthorized', 'true');
          history.push('/');
        }
      })
      .catch((err) => {
        console.log('login err /', err.response.data);
        const errMsg = err.response.data.message;
        if (errMsg === idErrMsg) alert(idErrMsg);
        if (errMsg === pwErrMsg) alert(pwErrMsg);
      });
  };

  const login = () => {
    console.log('loginId:', loginId, '/ password:', password);
    if (loginId !== '' && password !== '') {
      fetchLogin();
    } else {
      alert('모두 입력해주세요.');
    }
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <input
        name="loginId"
        type="text"
        placeholder="아이디 입력"
        value={loginId}
        onChange={onChange}
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={onChange}
      />
      <button className="login-btn" type="submit" onClick={login}>
        로그인
      </button>
      <h5>
        아직 계정이 없으신가요?
        <Link to="/signup" className="signup">
          가입하기
        </Link>
        {/* 아직 계정이 없으신가요? <a href="() => false">가입하기</a> */}
      </h5>
      <hr />
    </div>
  );
}

export default Login;
