import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserAddress, UserAddressVariables } from "./__generated__/UserAddress";
import { UserAddressFragment } from "./Fragments";
import { useUserToken } from "./useUser";

export const UserAddressQuery = gql`
  query UserAddress($token: String!) {
    user(token: $token) {
      result {
        token
        owner {
          guid
        }
        ...UserAddressFragment
      }
      error {
        message
        code
      }
    }
  }
  ${UserAddressFragment}
`;


export const useUserAddress = () => {
  const token = useUserToken();
  const res = useQuery<UserAddress, UserAddressVariables>(UserAddressQuery, {
    skip: !token,
    variables: {
      token,
    },
  });

  return {
    ...res,
    data:
      res.data &&
      res.data.user &&
      res.data.user.result &&
      res.data.user.result.addresses &&
      res.data.user.result.addresses.find(address => address.isDefault),
  };
};
