import React from 'react';

function SeatTable({ num, gender, onClick }) {
  return (
    <div
      id={num}
      className="table"
      style={{
        backgroundColor: gender ? 'lightblue' : 'beige',
      }}
      onClick={onClick}
    >
      {num}{' '}
      <span
        className="gender"
        style={{
          color: gender === 'MALE' ? 'blue' : 'red',
        }}
      >
        {!(gender === '') ? (gender === 'MALE' ? '♂' : '♀') : null}
      </span>
    </div>
  );
}

export default SeatTable;
