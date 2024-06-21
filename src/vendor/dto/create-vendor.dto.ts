export class CreateVendorDto {
  name: string;
  description: string;
  isActive: boolean;
  classifications?: string[];
}
