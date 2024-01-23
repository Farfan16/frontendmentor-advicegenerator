"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DividerDesktop from "../../public/images/pattern-divider-desktop.svg";
import DividerMobile from "../../public/images/pattern-divider-mobile.svg";
import Dice from "../../public/images/icon-dice.svg";
import { unstable_noStore as noStore } from "next/cache";

const Card = () => {
  const [adviceId, setAdviceId] = useState(null);
  const [adviceWord, setAdviceWord] = useState("");

  const fetchAdvice = async () => {
    try {
      let response = await fetch(`https://api.adviceslip.com/advice`);
      const adviceData = await response.json();
      const adviceObj = adviceData.slip;
      setAdviceId(adviceObj.id);
      setAdviceWord(adviceObj.advice);
    } catch (error) {
      console.error("There's an error =>", error);
    }
  };

  useEffect(() => {
    noStore(), fetchAdvice();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pb-12 px-4 py-6 sm:px-6 rounded-xl max-w-md bg-Dark-Grayish-Blue gap-4 relative shadow-2xl">
      <h5
        className="text-Neon-Green text-sm tracking-widest"
        suppressHydrationWarning={true}
      >
        Advice #{adviceId}
      </h5>
      <p
        className="text-center text-Light-Cyan font-bold text-[26px]"
        suppressHydrationWarning={true}
      >
        &ldquo;{adviceWord}&rdquo;
      </p>
      <Image
        src={DividerDesktop}
        alt="divider image"
        className="sm:max-w-full hidden sm:flex"
        priority
      />
      <Image
        src={DividerDesktop}
        alt="divider image"
        className="max-w-full sm:hidden"
        priority
      />
      <button
        onClick={() => fetchAdvice()}
        className="absolute -bottom-5 bg-Neon-Green sm:hover:drop-shadow-[0px_0px_8px_#80ffbf] active:bg-Dark-Neon-Green active:drop-shadow-[0px_0px_8px_#00994d]  rounded-full w-10 h-10 z-10"
      >
        <div className="flex justify-center items-center w-full">
          <Image src={Dice} alt="Dice icon" className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};

export default Card;
