import { useUserAddress } from "@igloo-be-omnipartners/hooks";
import React from "react";
import { Loading } from "../layout/Loading";

export const AddressList = ({
  handleCreate,
  handleUpdate,
}: {
  handleCreate: () => void;
  handleUpdate: (pet: any) => void;
}) => {
  const { loading, addresses } = useUserAddress();

  return (
    <>
      {loading ? (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>streetnum</th>
              <th>street1</th>
              <th>postalCode</th>
              <th>city</th>
              <th>country</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map(address => (
              <tr key={address.id}>
                <td>{address.name}</td>
                <td>{address.streetnum}</td>
                <td>{address.street1}</td>
                <td>{address.postalCode}</td>
                <td>{address.city}</td>
                <td>{address.country}</td>
                <td>
                  <button onClick={() => handleUpdate(address)}>edit</button>
                </td>
                <td>
                  <button onClick={() => console.log("DELETE", address)}>
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
