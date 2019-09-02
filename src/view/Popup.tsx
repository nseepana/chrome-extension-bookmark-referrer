import React, { Component } from "react";
import ReactDOM from "react-dom";

class Popup extends Component {
	render() {
		return (
			<p>popup-tsx</p>
		);
	}
}

ReactDOM.render(<Popup />, document.getElementById("root"));
