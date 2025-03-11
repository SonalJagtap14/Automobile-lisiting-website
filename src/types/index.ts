export interface CarDTO {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    color: string;
    fuelType: string;
    transmission: string;
    image: string;
    start_production?: number;
    class: string;
  }
  
  export interface UserDTO {
    id: number;
    name: string;
    email: string;
    phoneNumber?: string;
    address?: string;
  }
  
  export interface FilterState {
    priceRange: [number, number];
    mileageRange: [number, number];
    fuelTypes: string[];
    transmissionTypes: string[];
    years: [number, number];
  }