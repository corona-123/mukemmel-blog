import Nav from "./nav copy";
import Meta from "./Meta";
import Profile from "../components/Profile copy";
import Header from "./Header";

export default function LayoutTop({ parent }) {
  return (
    <section>
      <Meta></Meta>
      {parent == "about" ? <Header></Header> : <Nav></Nav>}
      <section className="mt-1 mini-profile-container">
        <Profile></Profile>
      </section>
    </section>
  );
}
