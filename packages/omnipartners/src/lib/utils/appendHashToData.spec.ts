import appendHashToData from "./appendHashToData";

describe("appendHashToData", () => {
  it("hashes all request fields sorted alphabetically for secure code list actions", () => {
    const result = appendHashToData(
      {
        action: "list-secure-codes-by-referral-partner",
        partner_ext_id: "530800",
        p_page: "0",
        p_length: "50",
      },
      "db760db350b406993d02ad6bd92f78a82d485196",
      "ad512cdbb293f1c52f89eb87646b5ba4674654c0",
      { hashKeys: undefined },
    );

    expect(result.hash).toBe("016df4bc99831889c1cc3c09fd105825aea45856");
  });

  it("hashes all request fields sorted alphabetically for secure code count actions", () => {
    const result = appendHashToData(
      {
        action: "get-access-codes-count",
        deal_ref: "testdealref",
        status: "AVAILABLE",
        referral_partner_ext_id: "EXT1",
      },
      "80800aedf6a542f0d619b863f0c36f0c6403fb0a",
      "test-secret",
      { hashKeys: undefined },
    );

    expect(Object.keys(result).sort()).toEqual([
      "action",
      "deal_ref",
      "hash",
      "key",
      "referral_partner_ext_id",
      "status",
    ]);
  });
});
