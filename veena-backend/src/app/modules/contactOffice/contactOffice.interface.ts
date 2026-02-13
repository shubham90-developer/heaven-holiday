// export interface IOffice {
//   city: string;
//   status?: 'active' | 'inactive';
//   forex?: boolean;
//   address: string;
//   phone: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface IOffice {
  city: string;

  status?: 'active' | 'inactive';

  forex?: boolean;

  address: string;

  phone: string;

  // ✅ NEW
  mapUrl?: string;

  // ✅ NEW
  officeState?: 'open' | 'closed';

  // ✅ NEW
  timings?: {
    day: string;
    open?: string;
    close?: string;
    closed?: boolean;
  }[];

  createdAt?: Date;
  updatedAt?: Date;
}
