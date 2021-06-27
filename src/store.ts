import create from "zustand";

const FIRST_CHARACTER_ID = 1;
const LAST_CHARACTER_ID = 493;

export const getNext = (id: number) => {
  if (id === LAST_CHARACTER_ID) {
    return FIRST_CHARACTER_ID;
  }

  return id + 1;
}

export const getPrev = (id: number) => {
  if (id === FIRST_CHARACTER_ID) {
    return LAST_CHARACTER_ID;
  }

  return id - 1;
}

type State = {
  id: number | null;
  goTo: (id: number) => void;
  next: () => void;
  prev: () => void;
  pickRandom: () => void;
};

export const useStore = create<State>((set, get) => {
  const goTo = (id: number) => {
    set({ id });
  };



  return {
    id: null,
    goTo,
    next: () => {
      const { id } = get();

      if (id != null) {
        goTo(getNext(id));
      }
    },
    prev: () => {
      const { id } = get();

      if (id != null) {
        goTo(getPrev(id));
      }

    },
    pickRandom: () => {
      const max = LAST_CHARACTER_ID;
      const min = FIRST_CHARACTER_ID;

      set({
        id: Math.floor(Math.random() * (max - min + 1) + min)
      });
    },
  }
});

export const useCharacterId = () => useStore(state => state.id);
