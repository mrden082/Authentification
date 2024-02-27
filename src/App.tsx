import React, { useState, useEffect } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import localStorage from "./api/localStorage";

const App: React.FC = () => {
  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accounts, setAccounts] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const userStore = localStorage.getState();
    if (Object.keys(userStore).length > 0) {
      setAccounts(userStore.userList.reduce((acc: any, user: any) => {
        return { ...acc, [user.name]: user.password };
      }, {}));
    }
  }, []);

  const handleRegister = () => {
    setRegistered(true);
  };

  const handleLogin = (username: string, password: string) => {
    if (accounts[username] === password) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const handleSaveAccount = (username: string, password: string) => {
    localStorage.getState().addUser({ username: username, password: password, url: "", userId: 0 });

    setAccounts({ ...accounts, [username]: password });
    setRegistered(false);
  };

  return (
    <div>
      <button onClick={handleRegister}>Зарегистрироваться</button>
      <button onClick={() => setLoggedIn(true)}>Войти</button>
      {!registered && !loggedIn ? (
        <></>
      ) : !loggedIn ? (
        <>
          <RegisterForm onSave={handleSaveAccount} />
          <LoginForm onLogin={handleLogin} />
        </>
      ) : (
        <h1>Успешно</h1>
      )}
      {!loggedIn && Object.keys(accounts).length === 0 && (
        <h2>Вы не зарегистрированы</h2>
      )}
    </div>
  );
};

export default App;
