import Link from "next/link";
import Nav from "./nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedinIn,
  faGit
} from "@fortawesome/free-brands-svg-icons";

export default function Header() {
  return (
    <section className="header">
      <Nav></Nav>
      <div className="hero">
        <h1 className="hero-profile">
          <img
            className="hero-profile-picture"
            src="/pp.jpg"
            alt="Profile Picture"
            height="120"
            width="120"
          />
        </h1>
        <div className="hero-social-information">
          <h1 className="hero-title">Dorukhan Nerede</h1>
          <div className="hero-social-links">
            <Link key="Instagram" href="www.instagram.com/dorukhannerede/">
              <a className="social-link" title="@dorukhannerede">
                <FontAwesomeIcon
                  width="21px"
                  icon={faInstagram}
                ></FontAwesomeIcon>
                <p>@dorukhannerede</p>
              </a>
            </Link>
            <Link
              key="LinkedIn"
              href="www.linkedin.com/in/dorukhan-nerede-441ba9161/"
            >
              <a className="social-link" title="Dorukhan Nerede">
                <FontAwesomeIcon
                  width="21px"
                  icon={faLinkedinIn}
                ></FontAwesomeIcon>
                <p>Dorukhan Nerede</p>
              </a>
            </Link>
            <Link key="GitHub" href="github.com/dorukhanerede">
              <a className="social-link" title="@dorukhanerede">
                <FontAwesomeIcon width="21px" icon={faGit}></FontAwesomeIcon>
                <p>@dorukhanerede</p>
              </a>
            </Link>
          </div>
        </div>
        <style jsx>{`
          .hero {
            text-align: center;
            padding: 130px 0 32px 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
          .hero-profile-picture {
            border-radius: 50%;
          }
          .hero-social-links {
            text-align: center;
            display: flex;
          }
          .hero-social-information {
            text-align: left;
            margin-left: 6px;
          }
          .social-link {
            margin-right: 30px;
            font-size: 18px;
            display: flex;
            flex-direction: row;
            text-decoration: none;
            align-items: center;
          }
          .social-link > p {
            margin-left: 6px;
            margin-bottom: 0;
          }

          .hero-title {
            font-size: 48px;
            margin-bottom: 1px;
          }
        `}</style>
      </div>
    </section>
  );
}
