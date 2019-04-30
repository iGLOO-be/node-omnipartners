import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GetUserPets, GetUserPetsVariables } from "./__generated__/GetUserPets";

export const GetUserPetsQuery = gql`
  query GetUserPets($token: String!) {
    user(token: $token) {
      result {
        pets {
          guid
          name
          gender
          dob
          neutered
          type
          breed
          pictureUrl
        }
      }
      error {
        message
        code
      }
    }
  }
`;

export const PetList = ({
  handleCreate,
  handleUpdate,
  token,
}: {
  handleCreate: () => void;
  handleUpdate: (pet: any) => void;
  token: string;
}) => {
  const { data } = useQuery<GetUserPets, GetUserPetsVariables>(
    GetUserPetsQuery,
    {
      variables: {
        token,
      },
    },
  );

  return (
    <>
      {data && data.user && data.user.result && data.user.result.pets && (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>type</th>
              <th>breed</th>
              <th>dob</th>
              <th>neutered</th>
              <th>gender</th>
              <th>picture</th>
            </tr>
          </thead>
          <tbody>
            {data.user.result.pets.map(pet => (
              <tr key={pet.guid}>
                <td>{pet.name}</td>
                <td>{pet.type}</td>
                <td>{pet.breed}</td>
                <td>{pet.dob}</td>
                <td>{pet.neutered.toString()}</td>
                <td>{pet.gender}</td>
                <td>{pet.pictureUrl}</td>
                <td>
                  <button onClick={() => handleUpdate(pet)}>edit</button>
                </td>
                <td>
                  <button onClick={() => console.log("DELETE", pet)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td>
                <button onClick={handleCreate}>create</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
