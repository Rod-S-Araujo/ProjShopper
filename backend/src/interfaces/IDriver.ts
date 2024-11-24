interface IDriver {
  id?: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  rate_per_km: number;
  min_distance: string;
}

export default IDriver;
