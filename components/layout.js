import HeaderWrapper from "../components/HeaderWrapper";
import HeaderMenu from "../components/HeaderMenu";

export default function Layout({ children }) {
  return (
    <div className="bg-white">
      <HeaderWrapper>
        <HeaderMenu />
      </HeaderWrapper>
      {children}
    </div>
  );
}
