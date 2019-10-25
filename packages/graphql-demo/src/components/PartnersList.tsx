import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Loading } from "../layout/Loading";
import { GetPartners, GetPartnersVariables } from "./__generated__/GetPartners";
import { PartnersListForm } from "./PartnersListForm";

const GetPartnersQuery = gql`
  query GetPartners($page: Float, $limit: Float) {
    partnerList(page: $page, limit: $limit) {
      pageInfo {
        hasNextPage
        count
        page
        limit
      }
      result {
        extId
        pubName
        street1
        streetnum
        postalCode
        city
        country
      }
    }
  }
`;

export const PartnersList = () => {
  const [connectionArgs, setConnectionArgs] = useState({
    page: 1,
    limit: 10
  })
  const { data, loading } = useQuery<
    GetPartners,
    GetPartnersVariables
  >(GetPartnersQuery, {
    fetchPolicy: "cache-and-network",
    variables: {
      ...connectionArgs,
    },
  });

  const isLoading = !data && loading;

  return (
    <>
      <h2>Partner list</h2>
      <PartnersListForm setConnectionArgs={setConnectionArgs} />
      {data && data.partnerList && !isLoading ? (
        <>
          <table>
            <thead>
              <tr>
                <th>page</th>
                <th>total pages</th>
                <th>limit</th>
                <th>total item</th>
                <th>has next page</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.partnerList.pageInfo.page}</td>
                <td>
                  {Math.ceil(
                    data.partnerList.pageInfo.count /
                      data.partnerList.pageInfo.limit,
                  )}
                </td>
                <td>{data.partnerList.pageInfo.limit}</td>
                <td>{data.partnerList.pageInfo.count}</td>
                <td>{data.partnerList.pageInfo.hasNextPage.toString()}</td>
              </tr>
            </tbody>
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
              {data.partnerList.result.map(partner => (
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
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
