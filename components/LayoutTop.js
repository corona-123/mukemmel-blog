import Header from "./Header";
import Meta from "./Meta";

export default function LayoutTop({ props }) {
  return (
    <section className="layout">
      <Meta props={props}></Meta>
      <Header props={props}></Header>
      {/* <div className="content">{props.children}</div> */}
    </section>
  );
}
