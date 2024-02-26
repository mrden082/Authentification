export const getAccounts = (): { [key: string]: string } => {
  const storedAccounts = localStorage.getItem('accounts');
  if (storedAccounts) {
    return JSON.parse(storedAccounts);
  }
  return {};
};

export const saveAccount = (username: string, password: string): void => {
  const accounts = getAccounts();
  accounts[username] = password;
  localStorage.setItem('accounts', JSON.stringify(accounts));
};
