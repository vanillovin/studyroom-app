import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import SeatTable from './SeatTable';
import '../style/StudyRoom.css';
import axios from 'axios';

function Room() {
  const [showModal, setShowModal] = useState(false);
  const [seats, setSeats] = useState([
    { num: 1, gender: '' },
    { num: 2, gender: '' },
    { num: 3, gender: '' },
    { num: 4, gender: '' },
    { num: 5, gender: '' },
    { num: 6, gender: '' },
    { num: 7, gender: '' },
    { num: 8, gender: '' },
    { num: 9, gender: '' },
    { num: 10, gender: '' },
    { num: 11, gender: '' },
    { num: 12, gender: '' },
    { num: 13, gender: '' },
    { num: 14, gender: '' },
    { num: 15, gender: '' },
    { num: 16, gender: '' },
    { num: 17, gender: '' },
    { num: 18, gender: '' },
    { num: 19, gender: '' },
    { num: 20, gender: '' },
    { num: 21, gender: '' },
    { num: 22, gender: '' },
    { num: 23, gender: '' },
    { num: 24, gender: '' },
    { num: 25, gender: '' },
    { num: 26, gender: '' },
    { num: 27, gender: '' },
    { num: 28, gender: '' },
    { num: 29, gender: '' },
    { num: 30, gender: '' },
    { num: 31, gender: '' },
    { num: 32, gender: '' },
    { num: 33, gender: '' },
    { num: 34, gender: '' },
    { num: 35, gender: '' },
    { num: 36, gender: '' },
    { num: 37, gender: '' },
    { num: 38, gender: '' },
    { num: 39, gender: '' },
    { num: 40, gender: '' },
    { num: 41, gender: '' },
    { num: 42, gender: '' },
    { num: 43, gender: '' },
    { num: 44, gender: '' },
    { num: 45, gender: '' },
    { num: 46, gender: '' },
    { num: 47, gender: '' },
  ]);
  const [seatNumber, setSeatNumber] = useState();

  // ❗️📚 에러노트 - Can't perform a React state update on an unmounted component
  // const getSeats = () => {
  //   axios
  //     .get('http://3.38.17.21:8080/seats')
  //     .then((res) => {
  //       console.log('getSeats res', res);
  //       const newSeatArr = res.data.map((t) => ({
  //         num: t.seatNumber,
  //         gender: t.gender,
  //       }));
  //       const result = newSeatArr.concat(
  //         seats.filter(({ num }) => !newSeatArr.find((f) => f.num === num))
  //       );
  //       const numResult = result.sort((a, b) => a.num - b.num);
  //       console.log('sort result', numResult);
  //       setSeats(numResult); //
  //     })
  //     .catch((err) => console.log('getSeats err', err.response.data));
  // };

  useEffect(() => {
    axios
      .get('http://3.38.17.21:8080/seats')
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response.data));
    // let abortController = new AbortController();
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('http://3.38.17.21:8080/seats', {
    //       signal: abortController.signal,
    //     });
    //     const newData = await response.json();
    //     const newSeatArr = newData.map((t) => ({
    //       num: t.seatNumber,
    //       gender: t.gender,
    //     }));
    //     const result = newSeatArr.concat(
    //       seats.filter(({ num }) => !newSeatArr.find((f) => f.num === num))
    //     );
    //     const sortResult = result.sort((a, b) => a.num - b.num);
    //     console.log('sort result', sortResult);
    //     setSeats(sortResult);
    //   } catch (error) {
    //     if (error.name === 'AbortError') {
    //       // requset를 abort하는 과정에서 에러 발생
    //       console.log('abort error?', error);
    //     }
    //   }
    // };
    // fetchData();
    // return () => {
    //   abortController.abort();
    // };
  }, []);
  console.log('rendering');

  const openModal = (num) => {
    setSeatNumber(num);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="studyroom-container">
        <div className="header-container">
          <h1>좌석 현황</h1>
          <div className="status">
            <div className="status-box">예약가능</div>
            <div className="status-box">이용중</div>
          </div>
        </div>
        <div className="container">
          <div className="table-container">
            {seats.map((seat) => (
              <SeatTable
                key={seat.num}
                num={seat.num}
                gender={seat.gender}
                onClick={() => openModal(seat.num)}
              />
            ))}
          </div>
          <div className="door-container">
            <span className="door">입구</span>
          </div>
        </div>
      </div>

      <Modal open={showModal} closeModal={closeModal} seatNumber={seatNumber} />
    </>
  );
}

export default Room;
