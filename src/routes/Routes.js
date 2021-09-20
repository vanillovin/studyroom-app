import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import SignUp from './SignUp';

function Routes() {
  let isAuthorized = sessionStorage.getItem('isAuthorized');

  return (
    <>
      {!isAuthorized ? <Redirect to="/login" /> : <Redirect to="/" />}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />

        <Route path="/" component={Main} />
      </Switch>
    </>
  );
}

export default Routes;

// return (
//   <>
//     {/* {isLoggedIn && <NavBar />} */}
//     <NavBar />
//     <Switch>
//       {/* <Route exact path="/">
//           {isLoggedIn ? <StudyRoom /> : <Redirect to="/login" />}
//         </Route>
//         <Route
//           exact
//           path="/login"
//           render={() => <Login onLogIn={onLogIn} />}
//         /> */}
//       <Route exact path="/" component={StudyRoom} />
//       <Route exact path="/login" component={Login} />
//       <Route exact path="/signup" component={SignUp} />
//       <Route exact path="/buy" component={BuyVoucher} />
//       <Route exact path="/mypage" component={MyPage} />
//       <Redirect from="*" to="/" />
//     </Switch>
//   </>
// );
