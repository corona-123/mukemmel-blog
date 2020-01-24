import React from "react";
import router from "next/router";
import { auth } from "../firebase";
import Loading from "../../components/Loading";
const withAuth = Component => {
  return class extends React.Component {
    static getInitialProps = Component.getInitialProps;
    constructor(props) {
      super(props);
      this.state = {
        status: "LOADING"
      };
    }
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        console.log(authUser);
        if (authUser) {
          this.setState({
            status: "SIGNED_IN"
          });
        } else {
          router.push("/Login");
        }
      });
    }
    renderContent() {
      const { status } = this.state;
      if (status == "LOADING") {
        return <Loading></Loading>;
      } else if (status == "SIGNED_IN") {
        return <Component {...this.props} />;
      }
    }
    render() {
      return <React.Fragment>{this.renderContent()}</React.Fragment>;
    }
  };
};
export default withAuth;
