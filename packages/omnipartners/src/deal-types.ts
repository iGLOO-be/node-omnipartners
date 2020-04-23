
export interface IDealProductCollection {
  generic_name: string;
  reference: string;
  name?: { [key: string]: string };
  has_image: 0 | 1;
}

export interface IDealProduct {
  ean: string;
  id: string;
  label: string;
  friendly_name?: string;
  min_qty: number;
  collection: IDealProductCollection;
  qty: number;
  label_with_qty: string;
  coll_with_qty: string;
}
