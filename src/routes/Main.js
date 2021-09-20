import React from 'react';
import { Route, Switch } from 'react-router';
import BuyVoucher from '../components/BuyVoucher';
import MyPage from '../components/MyPage';
import NavBar from '../components/NavBar';
import StudyRoom from '../components/StudyRoom';

function Main() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={StudyRoom} />
        <Route exact path="/buy" component={BuyVoucher} />
        <Route exact path="/mypage" component={MyPage} />
      </Switch>
    </>
  );
}

export default Main;
