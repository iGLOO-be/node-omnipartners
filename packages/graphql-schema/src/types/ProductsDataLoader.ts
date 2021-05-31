import DataLoader from "dataloader";
import { Omnipartners, ICollectionDetail } from "omnipartners";
import pMap from "p-map";

type CollectionDetailsKey = {
  collection_reference: string;
  language: string;
};

export class ProductsDataLoader {
  public readonly collectionDetailsLoader: DataLoader<
    CollectionDetailsKey,
    ICollectionDetail
  >;

  constructor({ omnipartners }: { omnipartners: Omnipartners }) {
    this.collectionDetailsLoader = new DataLoader<
      CollectionDetailsKey,
      ICollectionDetail,
      string
    >(
      (ids) => {
        return pMap(
          ids,
          async ({ collection_reference, language }) =>
            (
              await omnipartners.products.getCollectionDetails({
                collection_reference,
                language,
              })
            ).data,
          {
            concurrency: 2,
          },
        );
      },
      {
        cacheKeyFn: (key) => [key.collection_reference, key.language].join(","),
      },
    );
  }

  getCollectionDetails(key: CollectionDetailsKey) {
    return this.collectionDetailsLoader.load(key);
  }
}
