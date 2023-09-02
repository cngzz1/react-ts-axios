import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const UserComponent = () => {
  // invoke useState on an empty array using array destructuring
  const [users, setUsers]: [
    User[],
    React.Dispatch<React.SetStateAction<User[]>>
  ] = useState<User[]>([]);

  // use the setUsers React.Dispatch<SetStateAction<User>> callback
  // obtained from the useState React Hook
  // We create a new callback function
  // setResponseCallBack.
  // This react callback is used for setting response.data for the User
  // containing the data rendered in React Component.
  const setResponseCallBack: (response: {
    data: React.SetStateAction<User[]>;
  }) => void = (response: { data: React.SetStateAction<User[]> }) => {
    setUsers(response.data);
  };
  // Create a callback that invokes the axios API to first get the data
  // then set the responseCallBack on the obtained response.
  // Get with return a Promise<AxiosResponse<User>> instance.
  const axiosGetCallback: () => void = async () => {
    try {
      axios
        .get<User, AxiosResponse<SetStateAction<User[]>>>(
          'https://jsonplaceholder.typicode.com/users'
        )
        .then<void, never>(setResponseCallBack);
    } catch (error) {
      // check if the error was thrown from axios
      if (axios.isAxiosError(error)) {
        // do something
        // or just re-throw the error
        throw error;
      } else {
        // do something else
        // or creating a new error
        throw new Error('different error than axios');
      }
    }
  };
  // use the useEffect React hook to invoke the axios api callback
  // on an empty list.
  useEffect(axiosGetCallback, []);

  //useEffect is a React Hook that lets you synchronize a component with an external system.
  // create a callback using the users list obtained from the useState
  // React hook.
  // We map each user instance from the users list
  // and returns the corresponding JSX with user.name field.
  const userCallBack: (user: User) => JSX.Element = (user: User) => (
    <ul>
      <li>{user.name}</li>
    </ul>
  );

  // create the userMapper component which will be rendered
  const userMapper: JSX.Element[] = users.map<JSX.Element>(userCallBack);
  return <>{userMapper}</>;
};
function App() {
  return <UserComponent />;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export default App;
