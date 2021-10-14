import React from 'react';

function SeatTable({ num, gender, name, onClick }) {
  return (
    <div
      id={num}
      className="table"
      style={{
        backgroundColor: gender ? 'lightblue' : 'beige',
      }}
      onClick={onClick}
    >
      <div>
        {num}
        <span
          className="gender"
          style={{
            color: gender === 'MALE' ? 'blue' : 'red',
          }}
        >
          {!(gender === '') ? (gender === 'MALE' ? '♂' : '♀') : null}
        </span>
      </div>
      <div>{name ? `${name.slice(0, 1)}*${name.slice(2, 4)}` : ''}</div>
    </div>
  );
}

export default SeatTable;
