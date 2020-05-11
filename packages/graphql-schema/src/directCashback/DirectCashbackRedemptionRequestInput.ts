import { IDirectCashbackRedemptionRequestInput } from "omnipartners";
import { SetOptional } from "type-fest";
import { Field, InputType } from "type-graphql";

@InputType()
class DirectCashbackRedemptionRequestInputPayementDetail {
  @Field({ nullable: true })
  public iban?: string;
  @Field({ nullable: true })
  public sortCode?: string;
  @Field({ nullable: true })
  public accountNumber?: string;
}

@InputType()
export class DirectCashbackRedemptionRequestInput {
  @Field()
  public barcode!: string;

  @Field({ nullable: true })
  public benefitId?: string;

  @Field()
  public receiptDate!: string;

  @Field()
  public receiptImageMimeType!: string;

  @Field()
  public targetCurrency!: "EUR" | "GBP";

  @Field()
  public paymentDetails!: DirectCashbackRedemptionRequestInputPayementDetail;

  @Field({ nullable: true })
  public eanBarcode?: string;

  @Field({ nullable: true })
  public partnerExtId?: string;

  @Field({ nullable: true })
  public benefitProductPurchaseValue?: string;

  public toOmnipartners(): SetOptional<
    IDirectCashbackRedemptionRequestInput,
    "benefit_id"
  > {
    return {
      barcode: this.barcode,
      benefit_id: this.benefitId,
      receipt_date: this.receiptDate,
      target_currency: this.targetCurrency,
      payment_details: this.paymentDetails.iban
        ? this.paymentDetails
        : {
            sort_code: this.paymentDetails.sortCode,
            account_number: this.paymentDetails.accountNumber,
          },
      receipt_image_mime_type: this.receiptImageMimeType,
      partner_ext_id: this.partnerExtId,
      benefit_product_ean: this.eanBarcode,
      benefit_product_purchase_value: this.benefitProductPurchaseValue,
    };
  }
}
