import Header from "./Header";
import Meta from "./Meta";
import Profile from "../components/Profile";

export default function LayoutTop() {
  return (
    <section className="layout">
      <Meta></Meta>
      <Header></Header>
      <section className="mt-4 mini-profile-container">
        <Profile></Profile>
      </section>
    </section>
  );
}
