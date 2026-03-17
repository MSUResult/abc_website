// "use client";
// import Image from "next/image";
// import { useState } from "react";

// export default function Slider() {
//   const slides = ["/er.webp", "/courosol/phimt.webp", "/courosol/ph.webp"];

//   const [current, setCurrent] = useState(0);

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   return (
//     <div className="w-full overflow-hidden ">
//       <div
//         className="flex transition-transform duration-300"
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {slides.map((cur, index) => (
//           <div
//             key={index}
//             className="min-w-full flex-shrink-0 relative h-[400px]"
//           >
//             <Image
//               src={cur}
//               alt="Slider Image"
//               fill
//               className="object-cover"
//               priority={index === 0}
//             />
//           </div>
//         ))}
//       </div>
//       <button onClick={prevSlide}>Prev</button>
//       <button onClick={nextSlide}>Next</button>
//     </div>
//   );
// }
