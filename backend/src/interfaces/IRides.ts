interface IRides {
  id?: number;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
  date?: Date;
  status?: string;
  customer_id: string;
  driver_id: number;
}

export default IRides;
