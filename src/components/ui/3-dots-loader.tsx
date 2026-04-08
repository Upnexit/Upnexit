export const ThreeDotsLoader = () => {
  return (
    <>
      <div className="dots-container">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>

      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="absolute w-0 h-0 overflow-hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur result="blur" stdDeviation="10" in="SourceGraphic" />
            <feColorMatrix
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              mode="matrix"
              in="blur"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};
