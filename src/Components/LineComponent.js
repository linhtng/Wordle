import { useState } from "react"
import "../Styles/LineComponent.css"
import { Square } from "./Square"

export const LineComponent = () => {

	const [lineConfig, setlineConfig] = useState({
		0:{ id: 0, content: ""},
		1:{ id: 1, content: ""},
		2:{ id: 2, content: ""},
		3:{ id: 3, content: ""},
		4:{ id: 4, content: ""},
		5:{ id: 5, content: ""},
	})

	return (
		<>
			<div className="line">
				<Square number={1}/>
				<Square number={2}/>
				<Square number={3}/>
				<Square number={4}/>
				<Square number={5}/>
			</div>
		</>
	)
}
