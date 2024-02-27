import * as Yup from "yup";

export const loginFormSchemaValidator = Yup.object({
	email: Yup.string()
		.required('Required :">')
		.matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid Email"),
	password: Yup.string().required('Required :">').min(8),
});
