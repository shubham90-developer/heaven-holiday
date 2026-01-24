export interface IOffice {
  city: string;
  status?: 'active' | 'inactive';
  forex?: boolean;
  address: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
