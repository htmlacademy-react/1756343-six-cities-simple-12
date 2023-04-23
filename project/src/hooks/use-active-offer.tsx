import { useState } from 'react';

const useActiveOffer = () => {
  const [activeOffer, setActiveOffer] = useState<number | null>(null);

  const setActive = (id: number) => {
    setActiveOffer(id);
  };

  return {activeOffer, setActive};
};

export default useActiveOffer;
