import "../Styles/LineComponent.css"
import { Square } from "./Square"

export const LineComponent = ({line}) => {

	return (
		<>
			<div className="line">
				{
					line.map((item, i) => (
						<Square key={i} info={item}/>
					))
				}
			</div>
		</>
	)
}
