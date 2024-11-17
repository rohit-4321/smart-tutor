import { useEffect, createRef } from "react";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function Latex(props: any) {
	const node = createRef<HTMLDivElement>();
	useEffect(() => {
		renderMath();
	});
	const renderMath = () => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(window as any).MathJax.Hub.Queue([
			"Typeset",
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(window as any).MathJax.Hub,
			node.current,
		]);
	};
	return <div ref={node}>{props.children}</div>;
}
export default Latex;
