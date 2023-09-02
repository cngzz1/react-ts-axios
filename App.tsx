import React, { SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

function App() {
  // 1
  console.log('1 - Start here');
  const UserComponent: () => JSX.Element = () => {
    // invoke useState on an empty array using array destructuring
    const [users, setUsers]: [
      User[],
      React.Dispatch<React.SetStateAction<User[]>>
    ] = useState<User[]>([]);
    // 2
    console.log('2 - Get users from useState hook');
    console.log(users);
    // 3
    console.log('3 - Get setUsers from useState hook');
    console.log(useState);

    // use the setUsers React.Dispatch<SetStateAction<User>> callback
    // obtained from the useState React Hook
    // We create a new callback function
    // setResponseCallBack.
    // This react callback is used for setting response.data for the User
    // containing the data rendered in React Component.

    //7
    const setResponseCallBack: (response: {
      data: React.SetStateAction<User[]>;
    }) => void = (response: { data: React.SetStateAction<User[]> }) => {
      console.log('8 - inside setResponseCallBack to call setUsers');
      setUsers(response.data);
      console.log('10 - End of setUsers');
    };

    // Create a callback that invokes the axios API to first get the data
    // then set the responseCallBack on the obtained response.

    // Get with return a Promise<AxiosResponse<User>> instance.
    // use the useEffect React hook to invoke the axios api callback
    // on an empty list.
    //4
    console.log('4 callingUseEffect');
    useEffect(() => {
      try {
        // 7
        console.log('7 calling axios API using setResponseCallback');
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
    }, []);
    //5
    console.log('5 - end of useEffect');

    //useEffect is a React Hook that lets you synchronize a component with an external system.
    // create a callback using the users list obtained from the useState
    // React hook.
    // We map each user instance from the users list
    // and returns the corresponding JSX with user.name field.

    // create the userMapper component which will be rendered
    const userMapper: JSX.Element[] = users?.map<JSX.Element>((user: User) => {
      console.log('9 - creating userMapper');
      return (
        <ul>
          <li key={user?.id}>{user?.name}</li>
        </ul>
      );
    });
    if (userMapper) {
      console.log('6 - return userMapper');
      return <>{userMapper}</>;
    }
  };
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
