import React, {Component} from "react";
import axios from "axios";
import { AuthConsumer } from "../providers/AuthProvider";

export class FetchUser extends Component {
  state = {
    loaded: false
  };


  componentDidMount() {
    const { auth: { authenticated, setUser } } = this.props;

    if (authenticated) {
      this.loaded();
    } else {
      if (this.checkLocalToken()) {
        axios
          .get("/api/auth/validate_token")
          // will check to see if the token passed in is valid or not. 
          .then((res) => {
            setUser(res.data.data);
            this.loaded();
          })
          .catch((res) => {
            this.loaded();
          });
      } else {
        this.loaded();
      }
    }
  }

  // will check local storage to see if a token exists, if it does it will grab that token. Devise token auth saves our token as access-token which is available for us to get. If there isn't a token in our local storage, it will return null. 
  checkLocalToken = () => {
    const token = localStorage.getItem("access-token");
    return token;
  };

  loaded = () => this.setState({ loaded: true });

  render() {
    return this.state.loaded ? this.props.children : null;
  }
}

const ConnectedFetchUser = (props) => <AuthConsumer>{(auth) => <FetchUser {...props} auth={auth} />}</AuthConsumer>;

export default ConnectedFetchUser;
