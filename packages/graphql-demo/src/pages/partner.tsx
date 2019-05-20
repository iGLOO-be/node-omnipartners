import React, { useState } from "react";
import { PartnerRelationForm } from "../components/PartnerRelationForm";
import { PartnerRelationList } from "../components/PartnerRelationList";
import { PartnersList } from "../components/PartnersList";
import { UserRouteValidator } from "../lib/UserRouteValidator";

const Partner = () => {
  const [state, setState] = useState({
    partner: null,
    action: "",
  });

  return (
    <UserRouteValidator>
      <h1>Partner</h1>
      <PartnerRelationList
        handleCreate={() =>
          setState({
            partner: null,
            action: "create",
          })
        }
        resetState={() => setState({ partner: null, action: "" })}
      />
      {state.action && (
        <PartnerRelationForm
          resetState={() => setState({ partner: null, action: "" })}
          {...state}
        />
      )}
      <PartnersList />
    </UserRouteValidator>
  );
};

export default Partner;
