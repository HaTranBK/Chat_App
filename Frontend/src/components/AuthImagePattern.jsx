const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex justify-center items-center bg-base-200 p-12">
      <div className=" max-w-md text-center">
        <div className="content grid grid-cols-3 gap-3 mb-">
          {[...Array(9)].map((_, idx) => (
            <div
              key={idx}
              className={` aspect-square rounded-2xl bg-primary/10 ${
                idx % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};
export default AuthImagePattern;
