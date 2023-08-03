import "../Styles/Square.css"

export const Square = ({info}) => {
	return(
		<div className="square-div" style={{backgroundColor:`${info.color}`}}>{info.letter}</div>
	)
}
