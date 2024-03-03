import { useRef, useState } from "react";
import { motion } from "framer-motion";

const Example = () => {
  return (
    <motion.div className="grid w-full place-content-center bg-gradient-to-br from-indigo-500 to-violet-500 px-4 py-12 text-slate-900">
      <TiltCard />
    </motion.div>
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = () => {
  const ref = useRef(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current || isFlipped) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rY = mouseX / width - HALF_ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    setRotateX(0);
    setRotateY(0);
    setIsFlipped(false);
  };
  const handleClick = () => {
    if (!ref.current) return;
    setRotateY(-180); // تم تغيير هذا السطر لتعكس الوجه الخلفي بشكل صحيح
    setIsFlipped(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300 cursor-move "
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 grid place-content-center rounded-xl bg-white shadow-lg z-10"
      >
        CLICK ME
      </div>
      <div
        className="absolute inset-0 grid place-content-center rounded-xl bg-transparent shadow-lg z-9"
        style={{
          transformStyle: "preserve-3d",
          transform: "scale(-1, 1)", // تعديل هنا لعكس النص
        }}
      >
        HOVER ME
      </div>
    </motion.div>
  );
};

export default Example;
