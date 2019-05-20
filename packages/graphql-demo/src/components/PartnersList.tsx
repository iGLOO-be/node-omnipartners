import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Loading } from "../layout/Loading";
import { GetPartners } from "./__generated__/GetPartners";

const GetPartnersQuery = gql`
  query GetPartners {
    partnerList {
      extId
      pubName
      street1
      streetnum
      postalCode
      city
      country
    }
  }
`;

export const PartnersList = () => {
  const { data, loading } = useQuery<GetPartners>(GetPartnersQuery, {
    fetchPolicy: "cache-and-network",
  });

  const isLoading = !data && loading;

  return (
    <>
      <h2>Partner list</h2>
      {data && data.partnerList && !isLoading ? (
        <table>
          <thead>
            <tr>
              <th>extId</th>
              <th>pubName</th>
              <th>street1</th>
              <th>streetnum</th>
              <th>postalCode</th>
              <th>city</th>
              <th>country</th>
            </tr>
          </thead>
          <tbody>
            {data.partnerList.map(partner => (
              <tr key={partner.extId}>
                <td>{partner.extId}</td>
                <td>{partner.pubName}</td>
                <td>{partner.street1}</td>
                <td>{partner.streetnum}</td>
                <td>{partner.postalCode}</td>
                <td>{partner.city}</td>
                <td>{partner.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </>
  );
};
