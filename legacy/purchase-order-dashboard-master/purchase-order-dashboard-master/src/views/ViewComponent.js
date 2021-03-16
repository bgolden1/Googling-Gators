import { Component } from "react";
let axios = require('axios');
const UserProfile = require("../auth/User");

class ViewComponent extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    if (!UserProfile.isAuthed()) {
      this.props.history.push('/login');
    }

    //todo check role
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default ViewComponent;
