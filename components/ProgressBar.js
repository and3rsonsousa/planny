const ProgressBar = (props) => {
  const width = props.completed
    ? (100 / props.actions) * props.completed + "%"
    : "0%";
  return (
    <div className="w-full overflow-hidden rounded-full">
      <div className="h-4 bg-gray-200 shadow-inner">
        <div
          className="h-4 bg-gradient-to-br from-lime-300 to-success-400 rounded-full"
          style={{
            width: width,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
