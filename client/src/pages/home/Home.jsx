
import React from 'react';
import useAuthStore from "../../store/auth-store/use-auth-store";

const Home = () => {

  const {useLooged } = useAuthStore();
  

  return <>
    <h1>Home {useLooged ? useLooged.displayName : ""}</h1>
  </>;
};

export default Home;
