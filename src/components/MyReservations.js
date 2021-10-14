import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MyReservations = ({ timeStr }) => {
  const [myReservations, setMyReservations] = useState([]);

  useEffect(() => {
    axios
      .get('http://3.38.17.21:8080/my-page/reservations', {
        withCredentials: true,
      })
      .then((res) => {
        // console.log('mypage reservations res', res.data);
        const data = res.data._embedded.reservationResultDtoList;
        setMyReservations(data);
      })
      .catch((err) => {
        console.log('orders err', err.response);
      });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
      }}
    >
      {myReservations ? (
        <div className="orders">
          {myReservations.map((reservation, i) => (
            <div key={reservation.reservationTime} className="order">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRight: '1px solid gray',
                  width: 30,
                }}
              >
                {i}
              </div>
              <div
                style={{
                  padding: '6px 14px',
                }}
              >
                <div>{reservation.name}님</div>
                <div>좌석번호: {reservation.seatNumber}</div>
                <div>{timeStr(reservation.reservationTime)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>불러오는중</div>
      )}
    </div>
  );
};

export default MyReservations;
