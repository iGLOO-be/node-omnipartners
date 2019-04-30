import { Omnipartners } from "omnipartners";

export class Context {
  public readonly omnipartners: Omnipartners;

  constructor({ omnipartners }: { omnipartners: Omnipartners }) {
    this.omnipartners = omnipartners;
  }
}
