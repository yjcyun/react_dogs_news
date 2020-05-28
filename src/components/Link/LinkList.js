import React from 'react';
import useAuth from '../Auth/useAuth';

const LinkList = () => {
  const user = useAuth();
  console.log({ user });
  
  return (
    <div>
      Linklist
    </div>
  )
}

export default LinkList
