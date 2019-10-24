import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  UserEmailExists,
  UserEmailExistsVariables,
} from "./__generated__/UserEmailExists";

const UserEmailExistsQuery = gql`
  query UserEmailExists($email: String!) {
    userEmailExists(email: $email)
  }
`;

export const useUserEmailExist = () => {
  const { refetch } = useQuery<UserEmailExists, UserEmailExistsVariables>(
    UserEmailExistsQuery,
    {
      skip: true,
    },
  );

  return {
    doesUserExist: async ({ email }: { email: string }) => {
      const { data } = await refetch({
        email,
      });

      return data && data.userEmailExists;
    },
  };
};
