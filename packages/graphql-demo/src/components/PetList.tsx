import { useUserPets } from "@igloo-be-omnipartners/hooks";
import React from "react";
import { Loading } from "../layout/Loading";

export const PetList = ({
  handleCreate,
  handleUpdate,
}: {
  handleCreate: () => void;
  handleUpdate: (pet: any) => void;
}) => {
  const { pets, loading } = useUserPets();

  return (
    <>
      {!loading ? (
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
            {pets.map(pet => (
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
      ) : (
        <Loading />
      )}
    </>
  );
};
