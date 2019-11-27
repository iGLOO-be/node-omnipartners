import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import {
  UserFavourites,
  UserFavouritesVariables,
} from "./__generated__/UserFavourites";
import { useUserToken } from "./tokenContext";

export const UserFavouritesFragment = gql`
  fragment UserFavouritesFragment on User {
    owner {
      guid
    }
    favourites(source: $source, type: $type) {
      id
      date
      type
      content
      source
    }
  }
`;

// ------------
// QUERY
// ------------

export const UserFavouritesQuery = gql`
  query UserFavourites($token: String!, $source: String, $type: String) {
    user(token: $token) {
      result {
        ...UserFavouritesFragment
      }
      error {
        message
        code
      }
    }
  }
  ${UserFavouritesFragment}
`;

export const useUserFavourites = () => {
  const token = useUserToken();
  const { data, ...res } = useQuery<UserFavourites, UserFavouritesVariables>(
    UserFavouritesQuery,
    {
      skip: !token,
      variables: {
        token,
      },
    },
  );

  return {
    ...res,
    favourites:
      (data && data.user && data.user.result && data.user.result.favourites) ||
      [],
  };
};

// ------------
// CREATE
// ------------

// const UserFavouritesCreateMutation = gql`
//   mutation UserFavouritesCreate(
//     $userChildCreateInput: UserChildCreateInput!
//     $token: String!
//   ) {
//     userChildCreate(
//       userChildCreateInput: $userChildCreateInput
//       token: $token
//     ) {
//       result {
//         user {
//           ...UserFavouritesFragment
//         }
//       }
//       error {
//         message
//         code
//         validationErrors {
//           field
//           errors {
//             validator
//             message
//           }
//         }
//       }
//     }
//   }

//   ${UserFavouritesFragment}
// `;

// export const useUserFavouritesCreate = () => {
//   const [createPet, mutationResult] = useMutation<
//     UserFavouritesCreate,
//     UserFavouritesCreateVariables
//   >(UserFavouritesCreateMutation);
//   const token = useUserToken();

//   return {
//     ...mutationResult,
//     error:
//       mutationResult.error ||
//       (mutationResult.data && mutationResult.data.userChildCreate.error),
//     userChildrenCreate: async (
//       userChildCreateInput: Omit<UserChildCreateInput, "firstName"> & {
//         firstName?: string;
//       },
//     ) => {
//       const { data } = await createPet({
//         variables: {
//           userChildCreateInput: {
//             ...userChildCreateInput,
//             firstName: userChildCreateInput.firstName || "--",
//           },
//           token,
//         },
//       });

//       return data && data.userChildCreate;
//     },
//   };
// };
