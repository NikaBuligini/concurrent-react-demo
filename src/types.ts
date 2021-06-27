export type CharacterDto = {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin?: {
    name: string;
  };
  location: {
    name: string;
  };
};
