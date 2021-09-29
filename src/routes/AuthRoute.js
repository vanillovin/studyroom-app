import React, { useState, useEffect } from 'react';
import Routes from './Routes';

function AuthRoute(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    const handleLogin = async () => {
      const isAuthorized = sessionStorage.getItem('isAuthorized');

      if (isAuthorized) {
        setIsLogin(true);
      }
      setIsLoading(false);
    };

    handleLogin();
  }, [history]);

  if (isLoading) return <div>loading</div>;
  if (!isLogin) return <Redirect to="/login" />;
  return <Route {...props} />;
}

export default AuthRoute;
