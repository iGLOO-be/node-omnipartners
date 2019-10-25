import React, { useState } from "react";
import { PetForm } from "../components/PetForm";
import { PetList } from "../components/PetList";
import { UserRouteValidator } from "../lib/UserRouteValidator";

const Pet = () => {
  const [state, setState] = useState({
    pet: null,
    action: "",
  });

  return (
    <UserRouteValidator>
      <h1>Pet</h1>
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
      />
      {state.action && (
        <PetForm
          resetState={() => setState({ pet: null, action: "" })}
          {...state}
        />
      )}
    </UserRouteValidator>
  );
};

export default Pet;
