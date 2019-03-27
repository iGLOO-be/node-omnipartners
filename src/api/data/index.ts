import Api from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";

interface IInput {
  lang?: string;
}

export default class Data extends Api {
  @doc("http://doc.omnipartners.be/index.php/Language_list")
  @filterInput(["lang"])
  public languages(data: IInput) {
    return this._call("/service/data/get-languages", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Country_list")
  @filterInput(["lang", "indexed"])
  public countries(data: IInput) {
    return this._call("/service/data/get-countries", data, {
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/User_title_list")
  @filterInput(["lang"])
  public titles(data: IInput) {
    return this._call("/service/data/get-user-titles", data, {
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Animal_types_list")
  @filterInput(["lang"])
  public animalTypes(data: IInput) {
    return this._call("/service/data/get-animal-types", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Animal_breeds_list")
  @filterInput(["type", "lang"])
  public animalBreeds(
    data: { type: string; order: "priority_order" | "name" } & IInput,
  ) {
    return this._call("/service/data/get-animal-breeds", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Animal_universes_list")
  @filterInput(["type", "lang"])
  public animalUniverses(data: { type: string } & IInput) {
    return this._call("/service/data/get-animal-universes", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Subscriptions_list")
  @filterInput(["lang"])
  public subscriptions(data: IInput) {
    return this._call("/service/data/get-subscriptions", data);
  }

  private _call(
    url: string,
    data: IInput = {},
    options: { [key: string]: any } = {},
  ) {
    return this.get(url, data, {
      hash: false,
      hashNoKey: true,
      // retry: true,
      ...options,
    });
  }
}
