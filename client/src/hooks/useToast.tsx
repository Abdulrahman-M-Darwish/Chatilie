import React from "react";

enum ToastType {
	ERROR = "error",
	WARNING = "warning",
	INFO = "info",
	SUCCESS = "success",
}

type Props = {
	text: "String";
	time: 3000;
	type: ToastType;
};

const useToast = ({ text, time, type }: Props) => {
	return <div className="">useToast</div>;
};
