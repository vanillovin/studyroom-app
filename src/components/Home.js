import React from 'react';

function Home() {
  return (
    <div
      style={{
        marginTop: 160,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 18,
      }}
    >
      <h1>※독서실 이용방법※</h1>
      <ol style={{ padding: 0, marginTop: 20 }}>
        <li style={{ marginBottom: 10 }}>
          하루 or 한 달 이용권을 구매합니다. (누적됨)
        </li>
        <li style={{ marginBottom: 10 }}>
          좌석 현황에서 앉고 싶은 좌석을 선택합니다.
        </li>
        <li style={{ marginBottom: 10 }}>
          마이페이지에서 퇴실과 좌석 이동이 가능합니다.
        </li>
        <li>주문내역과 좌석예약내역은 마이페이지에서 확인 가능합니다.</li>
      </ol>
    </div>
  );
}

export default Home;
