export default function ClientAvatar({ client, size }) {
  return client ? (
    <div>
      <div
        className={` ${
          size
            ? size === "small"
              ? "w-5 h-5 text-xs"
              : "w-10 h-10 text-base"
            : "h-14 w-14 text-2xl"
        } rounded-full bg-gray-300 flex justify-center items-center`}
        style={{ backgroundColor: client.bgColor }}
      >
        <span style={{ color: client.fgColor }}>
          {client.name ? client.name.substr(0, 1) : "P"}
        </span>
      </div>
    </div>
  ) : (
    ""
  );
}
