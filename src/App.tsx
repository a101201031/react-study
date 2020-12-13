import CreateUser from 'createUser';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import UserList, { UserTypes } from 'userList';

function CountActiveUsers(users: UserTypes[]) {
  console.log('활성 사용자 수 계산중');
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const [users, setUsers] = useState([
    { id: 1, username: 'soo', email: 'soo@example.com', active: true },
    {
      id: 2,
      username: 'lee',
      email: 'lee@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'park',
      email: 'park@example.com',
      active: false,
    },
  ]);

  const { username, email } = inputs;
  const nextId = useRef(4);
  // const count = CountActiveUsers(users);
  const count = useMemo(() => CountActiveUsers(users), [users]);

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setInputs({
  //     ...inputs,
  //     [name]: value,
  //   });
  // };

  // const onCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email,
  //     active: false,
  //   };
  //   setUsers(users.concat(user));
  //   setInputs({ username: '', email: '' });
  //   nextId.current += 1;
  // };

  // const onRemove = (id: number) => {
  //   setUsers(users.filter((user) => user.id !== id));
  // };

  // const onToggle = (id: number) => {
  //   setUsers(
  //     users.map((user) =>
  //       user.id === id ? { ...user, active: !user.active } : user,
  //     ),
  //   );
  // };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  }, []);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
      active: false,
    };
    setUsers((users) => users.concat(user));

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  }, []);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
