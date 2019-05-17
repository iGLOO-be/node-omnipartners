import React, { useState } from "react";
import { AddressForm } from "../components/AddressForm";
import { PartnerList } from "../components/PartnerList";
import { UserRouteValidator } from "../lib/UserRouteValidator";

const Partner = () => {
  const [state, setState] = useState({
    address: null,
    action: "",
  });

  return (
    <UserRouteValidator>
      <h1>Partner</h1>
      <PartnerList
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
      {/* {state.action && (
        <PartnerForm
          resetState={() => setState({ address: null, action: "" })}
          {...state}
        />
      )} */}
    </UserRouteValidator>
  );
};

export default Partner;
