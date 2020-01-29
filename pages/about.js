import React from "react";
import LayoutTop from "../components/LayoutTop";
import withAuth from "../src/helpers/withAuth";

class About extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <LayoutTop parent="about"></LayoutTop>

        <div className="dorukhan">
          <img src="/d2.png"></img>
        </div>
        <h1 className="container text-center font-weight-bold">İşte Bumblr!</h1>
        <h5 className="container text-center font-weight-bold">
          Neden sosyal medya tarzına çevirdim bilmiyorum
        </h5>
        <h5 className="container text-center font-weight-bold">
          Neyssssssssssse
        </h5>

        <h5 className="container text-center font-weight-bold">
          İzmir Ekonomi Üniversitesi Yazılım Mühendisliği bölümü mezunuyum.
          <br></br>Şu an "Yazılım Mühendisi" olarak Broadangle'da 2 senedir
          çalışmaktayım.
          <br></br>İzmir'de yaşıyorum, 22 yaşındayım, tipimi de görmüş
          olduğunuzu varsayıyorum, söyleyecek bir şey kalmadığını düşünüyorum.
        </h5>
        <h5 className="container text-center font-weight-bold">
          Front-end sevmediğim umarım belli olmuyordur...
        </h5>
        <h4 className="container text-center font-weight-bold">
          Mail Adresim:{" "}
          <a href="mailto:dorukhanerede@hotmail.com">
            dorukhanerede@hotmail.com
          </a>
        </h4>
      </div>
    );
  }
}

export default withAuth(About);
