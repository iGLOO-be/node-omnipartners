import React, { useState } from "react";
import { PartnerForm } from "../components/PartnerForm";
import { PartnerList } from "../components/PartnerList";
import { UserRouteValidator } from "../lib/UserRouteValidator";

const Partner = () => {
  const [state, setState] = useState({
    partner: null,
    action: "",
  });

  return (
    <UserRouteValidator>
      <h1>Partner</h1>
      <PartnerList
        handleCreate={() =>
          setState({
            partner: null,
            action: "create",
          })
        }
        handleDelete={partner =>
          setState({
            partner,
            action: "delete",
          })
        }
      />
      {state.action && (
        <PartnerForm
          resetState={() => setState({ partner: null, action: "" })}
          {...state}
        />
      )}
    </UserRouteValidator>
  );
};

export default Partner;
