import React from "react";
import LayoutTop from "../components/LayoutTop";

class About extends React.Component {
  render() {
    console.log(localStorage);
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
          Giriş yapmış olan kullanıcılar blog/post yaratabilir, birbirleriyle
          iletişim halinde olabilirler.
          <br></br>Yorum yapma, beğeni, görüntülenme sayısı tarzında sosyal
          medya fonksiyonları içerir.
          <br></br>Herkesin kendine özel profili bulunur(Google hesabı üzerinden
          veriler çekilir).<br></br> Özel profilde kendi yarattıkları
          post/blogları görebilirler.
        </h5>
        <h5 className="container text-center font-weight-bold">
          Kendimden bahsediyim... <br></br>İzmir'de yaşıyorum, 22 yaşındayım,
          tipimi de görmüş olduğunuzu varsayıyorum, söyleyecek bir şey
          kalmadığını düşünüyorum.
        </h5>
        <h5 className="container text-center font-weight-bold">
          İletişim için Instagram, LinkedIn veya Mail kullanabilirsiniz...
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

export default About;
