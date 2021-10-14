import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MyOrders = ({ timeStr }) => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://3.38.17.21:8080/my-page/orders', { withCredentials: true })
      .then((res) => {
        // console.log('mypage orders res', res.data);
        const data = res.data._embedded.orderResultDtoList;
        setMyOrders(data);
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
      {myOrders ? (
        <div className="orders">
          {myOrders.map((order, i) => (
            <div key={order.orderDate} className="order">
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
                <div>{order.name}님</div>
                <div>{timeStr(order.orderDate)}</div>
                <div>
                  {order.ticket === 'DAY' ? '하루이용권' : '한달이용권'} (
                  {order.price}원)
                </div>
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

export default MyOrders;
