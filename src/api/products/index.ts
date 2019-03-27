import Api, { IApiFetchOptions } from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";

export default class Products extends Api {
  public defaultHost = "https://products.clixray.io/";

  public errorMap = {
    1000: { message: "Action not available." },
    1001: { message: "Invalid action." },
    1002: { message: "Client key not available." },
    1003: { message: "Invalid client key." },
    1004: { message: "Hash not available." },
    1005: { message: "Invalid hash." },
    1006: { message: "Access denied." },
    1021: { message: "Internal error." },
    1023: { message: "Invalid Request." },
    1030: { message: "Missing required fields." },
  };

  public _call(action: string, data: any, options: IApiFetchOptions = {}) {
    return this.post(
      "/",
      {
        action,
        ...data,
      },
      {
        hashKeys: ["action"],
        ...options,
      },
    );
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Product_By_EAN_or_Code")
  @filterInput(["product_ean", "product_code"])
  public getProduct(data: { product_ean: string; product_code: string }) {
    return this._call("get-product", data, {
      errorMap: {
        1020: { message: "Product ean or code required." },
      },
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Find_product_collection")
  @filterInput([
    "use_https_urls",
    "resolve_by",
    "value",
    "language",
    "data_options",
  ])
  public findProductCollection(data: {
    use_https_urls: string;
    resolve_by: string;
    value: string;
    language: string;
    data_options: string;
  }) {
    return this._call(
      "find-product-collection",
      { "resolve-by": data.resolve_by, ...data },
      {
        errorMap: {
          1011: { message: "resolve-by field can not be empty." },
          1012: { message: "resolve-by field can not be empty." },
          1013: { message: "resolve-by field can not be empty." },
          1014: { message: "resolve-by field can not be empty." },
          1029: { message: "resolve-by field can not be empty." },
        },
        retry: true,
      },
    );
  }
}
