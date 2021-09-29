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

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginInputs({
      ...loginInputs,
      [name]: value,
    });
  };

  // 빈문자열만확인?
  const fetchLogin = (e) => {
    e.preventDefault();
    // sessionStorage.setItem('isAuthorized', 'true');
    // history.push('/');

    if (loginId !== '' && password !== '') {
      let body = {
        loginId,
        password,
      };
      axios({
        method: 'POST',
        url: 'http://3.38.17.21:8080/users/login',
        data: body,
        withCredentials: true,
      })
        .then((res) => {
          console.log('login res /', res);
          alert('로그인이 완료됐습니다');
          sessionStorage.setItem('isAuthorized', 'true');
          history.push('/');
        })
        .catch((err) => {
          console.log('login err /', err.response.data);
          const errMsg = err.response.data.message;
          const idErrMsg = '아이디를 잘못 입력하셨습니다.';
          const pwErrMsg = '비밀번호가 틀렸습니다.';
          if (errMsg === idErrMsg) alert(idErrMsg);
          if (errMsg === pwErrMsg) alert(pwErrMsg);
        });
    } else {
      alert('모두 입력해주세요.');
    }
  };

  return (
    <form className="login-container" onSubmit={fetchLogin}>
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
      <button className="login-btn" type="submit" onClick={fetchLogin}>
        로그인
      </button>
      <h5 style={{ textAlign: 'center' }}>
        아직 계정이 없으신가요?
        <Link to="/signup" className="gosignup-btn">
          가입하기
        </Link>
      </h5>
      <hr />
    </form>
  );
}

export default Login;
