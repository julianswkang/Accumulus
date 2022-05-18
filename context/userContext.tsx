import React, { useState, useEffect, FC } from 'react';

interface IUserContext {
  name?: string;
  setName?: () => void;
  storeName: Function;
  email?: string;
  setEmail?: () => void;
  storeEmail: Function;
}

const defaultUser = {
  name: 'Back!',
  storeName: () => {},
  email: 'defaultEmail',
  storeEmail: () => {},
};

export const UserContext = React.createContext<IUserContext>(defaultUser);

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [name, setName] = useState(defaultUser.name);
  const [email, setEmail] = useState(defaultUser.email);

  // const confirmedUser = (arg: any): any => setUser(user);
  const storeName = (val: string) => {
    setName(val);
  };
  const storeEmail = (val: string) => {
    setEmail(val);
  };

  return (
    <>
      <UserContext.Provider value={{ name, storeName, email, storeEmail }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export function useUserContext() {
  return React.useContext(UserContext);
}


