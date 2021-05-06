export type Environment = {
  key: string;
  title: string;
};

export interface Plant {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: WateringFrequency;
}
interface WateringFrequency {
  times: number;
  repeat_every: string;
}