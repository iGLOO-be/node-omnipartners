import { navigate } from "gatsby";
import React from "react";
import { PetList } from "../components/PetList";
import { Loading } from "../layout/Loading";
import { useUser } from "../lib/user/useUser";

const Dashboard = () => {
  const { isLoading, isLogged } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLogged) {
    navigate('/')
    return null
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <PetList
        handleUpdate={() => console.log("TODO update")}
        handleCreate={() => console.log("TODO create")}
      />
    </div>
  );
};

export default Dashboard;
