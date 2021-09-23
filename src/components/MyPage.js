import React from 'react';
import '../style/MyPage.css';
import { BsPerson } from 'react-icons/bs';
import axios from 'axios';
import { useHistory } from 'react-router';

function MyPage() {
  const history = useHistory();

  const exit = () => {
    window.confirm('퇴실하시겠습니까?') &&
      axios
        .delete('http://3.38.17.21:8080/reservation')
        // .delete('http://52.79.80.209:8080/reservation')
        .then((res) => console.log('exit res', res))
        .catch((err) => console.log('exit err', err.response.data));
  };

  const changeSeat = () => {
    return alert('자리를 이동하시겠습니까?');
  };

  const logout = () => {
    window.confirm('로그아웃하시겠습니까?') &&
      axios
        .delete('http://3.38.17.21:8080/users/logout')
        // .delete('http://52.79.80.209:8080/users/logout')
        .then((res) => {
          console.log('logout', res);
          sessionStorage.removeItem('isAuthorized');
          alert('로그아웃이 완료됐습니다');
          history.push('/login');
        })
        .catch((err) => console.log('orders err', err.response.data));
  };

  return (
    <div className="mypage-container">
      <div>
        <div className="user">
          <div className="img">
            <BsPerson size="60" />
          </div>
          <div className="info">
            <h3>{'홍길동'}님</h3>
            <h4>{'id'}</h4>
          </div>
        </div>
        <div className="mpbtn-container">
          <button onClick={exit}>퇴실</button>
          <button onClick={changeSeat}>자리이동</button>
          <button onClick={logout}>로그아웃</button>
        </div>
      </div>

      <div className="userVoucher">이용 가능한 시간: {50}시간</div>
    </div>
  );
}

export default MyPage;
