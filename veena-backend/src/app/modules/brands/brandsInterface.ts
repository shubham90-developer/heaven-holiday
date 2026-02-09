// types/brand.interface.ts

export interface IBrand {
  _id?: string;
  name: string;
  industry: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IIndustry {
  _id?: string;
  image: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBrandsSection {
  _id?: string;
  heading: string;
  brands: IBrand[];
  industries: IIndustry[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
