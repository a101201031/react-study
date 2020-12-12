import React from 'react';

export interface UserTypes {
  id: number;
  username: string;
  email: string;
  active: boolean;
}

interface UserProps {
  user: UserTypes;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

interface UserListProps {
  users: UserTypes[];
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

function User({ user, onRemove, onToggle }: UserProps) {
  return (
    <div>
      <b
        style={{ cursor: 'pointer', color: user.active ? 'green' : 'black' }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}{' '}
      </b>
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }: UserListProps) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;
