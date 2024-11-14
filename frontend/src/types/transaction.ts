export type Transaction = {
  id: number;
  user_id: number;
  to_user_id: number;
  nominal: number;
  status: string;
  user: TransactionUser;
  to_user: TransactionUser;
};
export type TransactionUser = {
  id: number;
  nama: string;
};
