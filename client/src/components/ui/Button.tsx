import type { FC } from "react";
import style from "./Button.module.css";
export const OutlineButton: FC<React.ComponentProps<"button">> = (props) => {
	const { children, className, ...rest } = props;
	return (
		<button className={style.outline} {...rest}>
			{children}
		</button>
	);
};

export const ContainedButton: FC<React.ComponentProps<"button">> = (props) => {
	const { children, className, ...rest } = props;
	return (
		<button className={style.contained} {...rest}>
			{children}
		</button>
	);
};
