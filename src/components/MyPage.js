import React, { useEffect, useState } from 'react';
import '../style/MyPage.css';
import { BsPerson } from 'react-icons/bs';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import MyOrders from './MyOrders';
import MyReservations from './MyReservations';

function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const [mypageActive, setMypageActive] = useState({
    fullInfo: true,
    orders: false,
    reservations: false,
  });
  const { fullInfo, orders, reservations } = mypageActive;

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
    window.confirm('퇴실하시겠습니까? 자동 로그아웃됩니다.') &&
      axios
        .delete('http://3.38.17.21:8080/reservations', {
          withCredentials: true,
        })
        .then((res) => {
          console.log('exit res', res);
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
        // console.log('not NaN /', seatNumber, '/', typeof seatNumber);
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
          alert(`${seatNumber}번으로 좌석 이동 완료. 자동 로그아웃됩니다.`);
          sessionStorage.removeItem('isAuthorized');
          history.push('/login');
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

  const timeStr = (time) => {
    return `${time.split('T')[0]} / ${time.split('T')[1].slice(0, 5)}`;
  };

  const infoActive = (name) => {
    if (name === 'fullInfo') {
      setMypageActive({
        ...mypageActive,
        fullInfo: true,
        orders: false,
        reservations: false,
      });
    } else if (name === 'orders') {
      setMypageActive({
        ...mypageActive,
        fullInfo: false,
        orders: true,
        reservations: false,
      });
    } else if (name === 'reservations') {
      setMypageActive({
        ...mypageActive,
        fullInfo: false,
        orders: false,
        reservations: true,
      });
    }
  };

  return (
    <div className="mypage-container">
      <div className="bar">
        <ul>
          <li
            onClick={() => infoActive('fullInfo')}
            style={{ backgroundColor: fullInfo && '#4dafff' }}
          >
            전체
          </li>
          <li
            onClick={() => infoActive('orders')}
            style={{ backgroundColor: orders && '#4dafff' }}
          >
            마이주문내역
          </li>
          <li
            onClick={() => infoActive('reservations')}
            style={{ backgroundColor: reservations && '#4dafff' }}
          >
            마이예약내역
          </li>
        </ul>
      </div>

      {fullInfo && (
        <div style={{ marginTop: 30, padding: '0 50px' }}>
          {userInfo ? (
            <>
              <div className="mypage">
                <div className="user">
                  <div className="img">
                    <BsPerson size="60" />
                  </div>
                  <div className="info">
                    <div style={{ fontWeight: 'bold', marginBottom: 6 }}>
                      <span>{userInfo.name}님</span> ({userInfo.loginId})
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

                <div className="mpbtn-container">
                  {userInfo.currentUsage && (
                    <div>
                      <div>
                        <button onClick={exit}>퇴실</button>
                        <button onClick={changeSeat}>자리이동</button>
                      </div>
                    </div>
                  )}
                  <button onClick={logout} className="logout">
                    로그아웃
                  </button>
                </div>
              </div>

              <div>
                {userInfo.currentUsage && (
                  <table className="tinfo">
                    <tbody>
                      <tr>
                        <th>좌석 번호</th>
                        <td>{userInfo.seatNumber}</td>
                      </tr>
                      <tr>
                        <th>좌석 예약 시간</th>
                        <td>{timeStr(userInfo.enterDate)}</td>
                      </tr>
                      <tr>
                        <th>이용 가능 시간</th>
                        <td>{timeStr(userInfo.expireDate)}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </>
          ) : (
            <div>마이페이지 불러오는 중..</div>
          )}
        </div>
      )}
      {orders && <MyOrders timeStr={timeStr} />}
      {reservations && <MyReservations timeStr={timeStr} />}
    </div>
  );
}

export default MyPage;
