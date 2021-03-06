import React, { useEffect, useState } from 'react';
// import Modal from './Modal';
import SeatTable from './SeatTable';
import '../style/StudyRoom.css';
import axios from 'axios';
import { useHistory } from 'react-router';

function Room() {
  const history = useHistory();
  const [seats, setSeats] = useState([
    { num: 1, name: '', gender: '' },
    { num: 2, name: '', gender: '' },
    { num: 3, name: '', gender: '' },
    { num: 4, name: '', gender: '' },
    { num: 5, name: '', gender: '' },
    { num: 6, name: '', gender: '' },
    { num: 7, name: '', gender: '' },
    { num: 8, name: '', gender: '' },
    { num: 9, name: '', gender: '' },
    { num: 10, name: '', gender: '' },
    { num: 11, name: '', gender: '' },
    { num: 12, name: '', gender: '' },
    { num: 13, name: '', gender: '' },
    { num: 14, name: '', gender: '' },
    { num: 15, name: '', gender: '' },
    { num: 16, name: '', gender: '' },
    { num: 17, name: '', gender: '' },
    { num: 18, name: '', gender: '' },
    { num: 19, name: '', gender: '' },
    { num: 20, name: '', gender: '' },
    { num: 21, name: '', gender: '' },
    { num: 22, name: '', gender: '' },
    { num: 23, name: '', gender: '' },
    { num: 24, name: '', gender: '' },
    { num: 25, name: '', gender: '' },
    { num: 26, name: '', gender: '' },
    { num: 27, name: '', gender: '' },
    { num: 28, name: '', gender: '' },
    { num: 29, name: '', gender: '' },
    { num: 30, name: '', gender: '' },
    { num: 31, name: '', gender: '' },
    { num: 32, name: '', gender: '' },
    { num: 33, name: '', gender: '' },
    { num: 34, name: '', gender: '' },
    { num: 35, name: '', gender: '' },
    { num: 36, name: '', gender: '' },
    { num: 37, name: '', gender: '' },
    { num: 38, name: '', gender: '' },
    { num: 39, name: '', gender: '' },
    { num: 40, name: '', gender: '' },
    { num: 41, name: '', gender: '' },
    { num: 42, name: '', gender: '' },
    { num: 43, name: '', gender: '' },
    { num: 44, name: '', gender: '' },
    { num: 45, name: '', gender: '' },
    { num: 46, name: '', gender: '' },
    { num: 47, name: '', gender: '' },
  ]);

  useEffect(() => {
    axios
      .get('http://3.38.17.21:8080/seats', { withCredentials: true })
      .then((res) => {
        const newData = res.data;
        const newSeatArr = newData.map((t) => ({
          num: t.seatNumber,
          name: t.name,
          gender: t.gender,
        }));
        const result = newSeatArr.concat(
          seats.filter(({ num }) => !newSeatArr.find((f) => f.num === num))
        );
        const sortResult = result.sort((a, b) => a.num - b.num);
        setSeats(sortResult);
      })
      .catch((err) => {
        // console.log(err.response.data);
        // alert(err.response.data.message);
        history.push('/login');
      });
  }, [history]);

  const seatReservation = (sNum, sGen) => {
    !sGen &&
      window.confirm(`${sNum}??? ????????? ?????????????????????????`) &&
      axios({
        method: 'POST',
        url: 'http://3.38.17.21:8080/reservations',
        data: { seatNumber: sNum },
        withCredentials: true,
      })
        .then((res) => {
          console.log('orders res', res);
          alert('?????? ????????? ??????????????????. ?????? ?????????????????????');
          sessionStorage.removeItem('isAuthorized');
          history.push('/login');
        })
        .catch((err) => {
          console.log('orders err', err.response.data);
          const errMsg1 = '?????? ???????????? ?????? ????????? ????????????.';
          const errMsg2 = '???????????? ????????????.';
          if (err.response.data.message === errMsg1) alert(errMsg1);
          if (err.response.data.message === errMsg2) alert(errMsg2);
        });
  };

  return (
    <>
      <div className="studyroom-container">
        <div className="header-container">
          <h1>?????? ??????</h1>
          <div className="status">
            <div className="status-box">????????????</div>
            <div className="status-box">?????????</div>
          </div>
        </div>
        <div className="container">
          <div className="table-container">
            {seats.map((seat) => (
              <SeatTable
                key={seat.num}
                num={seat.num}
                gender={seat.gender}
                name={seat.name}
                onClick={() => {
                  seatReservation(seat.num, seat.gender);
                }}
              />
            ))}
          </div>
          <div className="door-container">
            <span className="door">??????</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;
