import React, { useState } from "react";
import { AddressForm } from "../components/AddressForm";
import { AddressList } from "../components/AddressList";
import { UserRouteValidator } from "../lib/UserRouteValidator";

const Address = () => {
  const [state, setState] = useState({
    address: null,
    action: "",
  });

  return (
    <UserRouteValidator>
      <h1>Address</h1>
      <AddressList
        handleCreate={() =>
          setState({
            address: null,
            action: "create",
          })
        }
        handleUpdate={address =>
          setState({
            address,
            action: "update",
          })
        }
      />
      {state.action && (
        <AddressForm
          resetState={() => setState({ address: null, action: "" })}
          {...state}
        />
      )}
    </UserRouteValidator>
  );
};

export default Address;
