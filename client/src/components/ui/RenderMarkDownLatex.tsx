import React, { useEffect, createRef } from "react";
function Latex(props) {
	const node = createRef<HTMLDivElement>();
	useEffect(() => {
		renderMath();
	});
	const renderMath = () => {
		window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, node.current]);
	};
	return <div ref={node}>{props.children}</div>;
}
export default Latex;
