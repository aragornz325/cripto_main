export interface Order {
  paidAmount: string;
  paidWith: string;
  receivedWith: string;
  receivedAmount: string;
  coingateOrderId: string;
  userId: string;
  synced?: boolean;
  coins: number;
}
