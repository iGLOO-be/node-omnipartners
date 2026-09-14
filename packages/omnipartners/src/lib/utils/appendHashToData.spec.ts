import appendHashToData from "./appendHashToData";

describe("appendHashToData", () => {
  it("hashes all request fields sorted alphabetically for secure code list actions", () => {
    const result = appendHashToData(
      {
        action: "list-secure-codes-by-referral-partner",
        partner_ext_id: "530800",
        status: "ALL",
        search_filter: "RECO-",
        date_start: "2025-03-14",
        date_end: "2025-09-14",
        p_page: "0",
        p_length: "50",
      },
      "db760db350b406993d02ad6bd92f78a82d485196",
      "ad512cdbb293f1c52f89eb87646b5ba4674654c0",
      { hashKeys: undefined },
    );

    expect(result.hash).toBe("0a63f366e479f4b1979b529f4860b65183a3775a");
    expect(Object.keys(result).sort()).toEqual([
      "action",
      "date_end",
      "date_start",
      "hash",
      "key",
      "p_length",
      "p_page",
      "partner_ext_id",
      "search_filter",
      "status",
    ]);
  });

  it("hashes all request fields sorted alphabetically for secure code count actions", () => {
    const result = appendHashToData(
      {
        action: "get-access-codes-count",
        deal_ref: "testdealref",
        status: "ALL",
        referral_partner_ext_id: "EXT1",
        date_start: "2025-01-01",
        date_end: "2025-12-31",
        date_filter_on: "CREATION",
      },
      "80800aedf6a542f0d619b863f0c36f0c6403fb0a",
      "test-secret",
      { hashKeys: undefined },
    );

    expect(Object.keys(result).sort()).toEqual([
      "action",
      "date_end",
      "date_filter_on",
      "date_start",
      "deal_ref",
      "hash",
      "key",
      "referral_partner_ext_id",
      "status",
    ]);
  });
});
