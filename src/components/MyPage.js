import React, { useEffect, useState } from 'react';
import '../style/MyPage.css';
import { BsPerson } from 'react-icons/bs';
import axios from 'axios';
import { useHistory } from 'react-router';

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);

  const history = useHistory();

  useEffect(() => {
    axios
      .get('http://3.38.17.21:8080/my-page', { withCredentials: true })
      .then((res) => {
        console.log('mypage res', res.data);
        setUserInfo(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
        history.push('/login');
      });
  }, []);

  const exit = () => {
    window.confirm('퇴실하시겠습니까?') &&
      axios
        .delete('http://3.38.17.21:8080/reservations', {
          withCredentials: true,
        })
        .then((res) => {
          console.log('exit res', res);
          // axios.delete('http://3.38.17.21:8080/reservations', {
          //   withCredentials: true,
          // })
          sessionStorage.removeItem('isAuthorized');
          history.push('/login');
        })
        .catch((err) => {
          console.log('exit err', err.response.data);
          const eMsg = err.response.data.message;
          const notErrMsg = '현재 이용중이지 않습니다.';
          if (eMsg === notErrMsg) alert(notErrMsg);
        });
  };

  const askSeatNumber = () => {
    let test = true;
    while (test) {
      const seatNumber = window.prompt(
        '몇 번 좌석으로 이동하시겠습니까? (1-47번 중 숫자만 입력해 주세요)'
      );
      if (!isNaN(seatNumber) && seatNumber < 48 && seatNumber !== '') {
        console.log('not NaN /', seatNumber, '/', typeof seatNumber);
        test = false;
        return seatNumber;
      }
    }
  };

  const changeSeat = () => {
    const seatNumber = askSeatNumber();
    seatNumber !== null && // 취소
      axios({
        method: 'PUT',
        url: 'http://3.38.17.21:8080/reservations',
        data: { seatNumber },
        withCredentials: true,
      })
        .then((res) => {
          console.log('exit res', res);
          alert(`${seatNumber}번으로 좌석 이동 완료.`);
          // sessionStorage.removeItem('isAuthorized');
          // history.push('/login');
        })
        .catch((err) => {
          alert('exit err', err.response.data.message);
          const errMsg = '이미 좌석이 사용중입니다.';
          if (err.response.data.message === errMsg) alert(errMsg);
        });
  };

  const logout = () => {
    window.confirm('로그아웃하시겠습니까?') &&
      axios
        .delete('http://3.38.17.21:8080/users/logout')
        .then((res) => {
          console.log('logout', res);
          alert('로그아웃이 완료됐습니다');
          sessionStorage.removeItem('isAuthorized');
          history.push('/login');
        })
        .catch((err) => console.log('logout err', err.response.data));
  };

  return (
    <div className="mypage-container">
      {userInfo ? (
        <>
          <div className="mypage">
            <div className="user">
              <div className="img">
                <BsPerson size="60" />
              </div>
              <div className="info">
                <div>
                  {userInfo.name}님 ({userInfo.loginId})
                </div>
                <div>
                  이용 현황:{' '}
                  <span
                    style={{
                      color: userInfo.currentUsage ? 'green' : 'red',
                    }}
                  >
                    {userInfo.currentUsage ? '이용중' : '이용x'}
                  </span>
                </div>
              </div>
            </div>

            {userInfo.currentUsage && (
              <table className="tinfo">
                <tbody>
                  <tr>
                    <th>좌석 번호</th>
                    <td>{userInfo.seatNumber}</td>
                  </tr>
                  <tr>
                    <th>좌석 예약 시간</th>
                    <td>{userInfo.enterDate.split('.')[0]}</td>
                  </tr>
                  <tr>
                    <th>이용 가능 시간</th>
                    <td>{userInfo.expireDate.split('.')[0]}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div className="mpbtn-container">
            {userInfo.currentUsage && (
              <div>
                <button onClick={exit}>퇴실</button>
                <button onClick={changeSeat}>자리이동</button>
              </div>
            )}
            <button onClick={logout} className="logout">
              로그아웃
            </button>
          </div>
        </>
      ) : (
        <div>마이페이지 불러오는 중..</div>
      )}
    </div>
  );
}

export default MyPage;
