import React, { useState } from 'react';
import Modal from './Modal';
import SeatTable from './SeatTable';
import '../style/StudyRoom.css';

function Room() {
  const [showModal, setShowModal] = useState(false);
  const [seats, setSeats] = useState([
    { id: 1, active: true },
    { id: 2, active: true },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
    { id: 6, active: true },
    { id: 7, active: false },
    { id: 8, active: true },
    { id: 9, active: true },
    { id: 10, active: false },
    { id: 11, active: false },
    { id: 12, active: false },
    { id: 13, active: false },
    { id: 14, active: false },
    { id: 15, active: false },
    { id: 16, active: false },
    { id: 17, active: false },
    { id: 18, active: false },
    { id: 19, active: false },
    { id: 20, active: false },
    { id: 21, active: false },
    { id: 22, active: false },
    { id: 23, active: false },
    { id: 24, active: false },
    { id: 25, active: false },
    { id: 26, active: false },
    { id: 27, active: false },
    { id: 28, active: false },
    { id: 29, active: false },
    { id: 30, active: false },
    { id: 31, active: false },
    { id: 32, active: false },
    { id: 33, active: false },
    { id: 34, active: false },
    { id: 35, active: false },
    { id: 36, active: false },
    { id: 37, active: false },
    { id: 38, active: false },
    { id: 39, active: false },
    { id: 40, active: false },
    { id: 41, active: false },
    { id: 42, active: false },
    { id: 43, active: false },
    { id: 44, active: false },
    { id: 45, active: false },
    { id: 46, active: false },
    { id: 47, active: false },
  ]);

  const openModal = () => {
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
                key={seat.id}
                id={seat.id}
                active={seat.active}
                onClick={openModal}
              />
            ))}
          </div>
          <div className="door-container">
            <span className="door">입구</span>
          </div>
        </div>
      </div>

      <Modal open={showModal} closeModal={closeModal} />
    </>
  );
}

export default Room;
