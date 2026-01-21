'use client'
import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react'

type CardProps = {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  i: number;
  range: [number, number];
  targetScale: any;
  progress: any;

};

const Card = (
  {
    title, i, description, src, link, color,
    range, targetScale, progress
  }: CardProps) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"]
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", v =>
      console.log("Page scroll: ", v)
    )
    return () => unsubscribe()
  }, [scrollYProgress])

  const scaleCard = useTransform(
    progress,
    range,
    [1, targetScale],
    { clamp: false }
  )
  return (
    <div ref={container} className=' cardContainer h-screen flex items-center justify-center sticky top-0'>
      <motion.div
        style={{ scale: scaleCard, backgroundColor: color, top: `calc(-10% + ${i * 25}px)` }}
        className={` 
          card text-[#131e40] w-5xl h-96
          relative -top-1/12 rounded-3xl
          flex items-center align-middle justify-around
          px-8 py-4
          `}
      >
        <span className="material-symbols-outlined text-black text-muted-gold text-3xl">description</span>
        <div className="flex flex-col text-center">
          <h2 className="font-bold leading-tight text-3xl">{title}</h2>
          <p className="text-lg font-normal leading-normal">{description}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Card