import React, { useState } from "react";
import { PetForm } from "../components/PetForm";
import { PetList } from "../components/PetList";
import { useUserToken } from "../lib/useUserToken";

const Pet = () => {
  const [state, setState] = useState({
    pet: null,
    action: "",
  });

  const userToken = useUserToken();

  return (
    <div>
      <h1>pet</h1>
      <div>{userToken.renderInput}</div>
      <PetList
        handleCreate={() =>
          setState({
            pet: null,
            action: "create",
          })
        }
        handleUpdate={pet =>
          setState({
            pet,
            action: "update",
          })
        }
        token={userToken.token}
      />
      {state.action && (
        <PetForm
          token={userToken.token}
          resetState={() => setState({ pet: null, action: "" })}
          {...state}
        />
      )}
    </div>
  );
};

export default Pet;
