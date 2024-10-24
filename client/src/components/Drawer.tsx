import type { FC } from "react";
import style from "./Drawer.module.css";
type SideDrawerProps = {
	open: boolean;
};
export const SideDrawer: FC<SideDrawerProps> = (props) => {
	const { open } = props;
	console.log(open);
	return <div className={style.drawer}>hellohellohellohello</div>;
};
