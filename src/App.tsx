import CreateUser from 'createUser';
import React, { useCallback, useMemo, useReducer, useRef } from 'react';
import UserList from 'userList';
import useInput from 'hooks/useInputs';

function CountActiveUsers(users: UserTypes[]) {
  console.log('활성 사용자 수 계산중');
  return users.filter((user) => user.active).length;
}

interface UserTypes {
  id: number;
  username: string;
  email: string;
  active?: boolean;
}

interface State {
  inputs: {
    username: string;
    email: string;
  };
  users: UserTypes[];
}

// interface Action {
//   type: string;
//   name: string;
//   value: string;
//   user: UserTypes;
// }

const initialState: State = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
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
  ],
};

function reducer(state: State, action: any) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user!),
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user,
        ),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const nextId = useRef(4);
  const { users } = state;
  const [{ username, email }, onChange, reset] = useInput({
    username: '',
    email: '',
  });

  const count = useMemo(() => CountActiveUsers(users), [users]);

  // const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value,
  //   });
  // }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: 'TOGGLE_USER',
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: 'REMOVE_USER',
      id,
    });
  }, []);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
