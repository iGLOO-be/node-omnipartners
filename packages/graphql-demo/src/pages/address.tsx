import React, { useState } from "react";
import { AddressForm } from "../components/AddressForm";
import { AddressList } from "../components/AddressList";
import { useUserToken } from "../lib/useUserToken";

const Address = () => {
  const [state, setState] = useState({
    address: null,
    action: "",
  });

  const userToken = useUserToken();

  return (
    <div>
      <h1>address</h1>
      <div>{userToken.renderInput}</div>
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
        token={userToken.token}
      />
      {state.action && (
        <AddressForm
          token={userToken.token}
          resetState={() => setState({ address: null, action: "" })}
          {...state}
        />
      )}
    </div>
  );
};

export default Address;
