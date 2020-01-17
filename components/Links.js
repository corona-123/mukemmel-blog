// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library, icon } from "@fortawesome/fontawesome-svg-core";
// import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
// // import "@fortawesome/free-brands-svg-icons";
// const Links = props => {
//   // props.links.map(link => {
//   //   const getIcon = icon({ prefix: "fab", iconName: link.name });
//   //   library.add(getIcon);
//   // });
//   library.add(faInstagram, faTwitter);

//   return (
//     <ul className="hero-social-links">
//       <li key="profile-picture">
//         <img
//           className="hero-profile-picture"
//           src="/pp.jpg"
//           alt="Profile Picture"
//           height="68"
//           width="68"
//         />
//       </li>
//       {props.links.map(({ href, name }) => (
//         <li key="social-link-container">
//           <Link href={href}>
//             <a className="social-link" title={name}>
//               <FontAwesomeIcon
//                 icon={name == "Instagram" ? faInstagram : faTwitter}
//               ></FontAwesomeIcon>
//             </a>
//           </Link>
//         </li>
//       ))}

//       <style jsx>{`
//         .hero-social-links {
//           border: 1px solid #ebebeb;
//           border-radius 10% 10% 30% 30%;
//           padding: 4px;
//           position: fixed;
//           right:0;
//           top:0
//         }
//         .hero-profile-picture{
//           border-radius: 50%
//         }
//         ul {
//           display: flex;
//           flex-direction: row;
//           justify-content: center;
//           padding: 0;
//           margin:0;
//           text-align: center;
//         }
//         li {
//           display: flex;
//           padding: 6px 8px;
//         }
//         a {
//           color: #067df7;
//           width: 28px;
//           transition: all 0.3s;
//         }
//         a:hover {
//           cursor: pointer;
//           color: #022222;
//         }
//       `}</style>
//     </ul>
//   );
// };

// export default Links;
