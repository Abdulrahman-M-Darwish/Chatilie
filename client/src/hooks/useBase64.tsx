import { useEffect, useId, useRef } from "react";

export const useBase64 = (
	triggerRef: HTMLButtonElement | null,
	fn: (base64Image: string) => void
) => {
	let input = document.createElement("input");
	input.type = "file";
	useEffect(() => {
		console.log(input);
		if (!triggerRef || !input) return;
		const handleClick = () => {
			input.click();
		};
		const handleInput = (e: Event) => {
			const file = ((e.target as HTMLInputElement).files || [])[0];
			if (!file) return;
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				fn(reader.result as string);
			};
		};
		triggerRef.addEventListener("click", handleClick);
		input.addEventListener("change", handleInput);
		return () => {
			triggerRef.removeEventListener("click", handleClick);
			input.removeEventListener("change", handleInput);
			input.remove();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [input, triggerRef]);
};
