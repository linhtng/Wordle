import "../Styles/grid.css"
import { useState } from "react";
import { LineComponent } from "./LineComponent"

export const Grid = () => {

	const [stringInput, setStringInput] = useState("");
	
	return (
		<div className="grid-div">
			<LineComponent />
			<LineComponent />
			<LineComponent />
			<LineComponent />
			<LineComponent />
			<LineComponent />
		</div>
	)
}
