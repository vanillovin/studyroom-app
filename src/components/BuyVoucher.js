import React from 'react';
import '../style/BuyVoucher.css';
import axios from 'axios';

function BuyVoucher() {
  const fetchOrders = (time) => {
    let ticket = {
      ticket: time,
    };
    axios({
      method: 'POST',
      url: 'http://3.38.17.21:8080/orders',
      data: ticket,
      withCredentials: true,
    })
      .then((res) => {
        alert(
          `${time === 'DAY' ? '하루' : '한달'} 이용권 구매가 완료됐습니다.`
        );
      })
      .catch((err) => alert(err.response.data));
  };

  const askPurchase = (e) => {
    const btnCN = e.target.className;
    if (btnCN === 'day') {
      const ok = window.confirm('하루 이용권을 구매하시겠습니까?');
      ok && fetchOrders('DAY');
    } else if (btnCN === 'month') {
      const ok = window.confirm('한달 이용권을 구매하시겠습니까?');
      ok && fetchOrders('MONTH');
    }
  };

  return (
    <div className="buyVoucher">
      <button className="day" onClick={askPurchase}>
        하루 이용권
      </button>
      <button className="month" onClick={askPurchase}>
        한달 이용권
      </button>
    </div>
  );
}

export default BuyVoucher;
