import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { BiLogInCircle } from "react-icons/bi";
import { GoSignIn } from "react-icons/go";

const Registration = () => {
	const navigate = useNavigate();
	const [isSignup, setIsSignup] = useState(true);
	const [form, setForm] = useState({
		userName: "",
		uniqeName: "",
		email: "",
		photoURL: "",
		password: "",
		confirmPassword: "",
	});
	const style = {
		input:
			"bg-transparent mb-4 outline-none border-b border-current -mt-6 focus:mt-2 transition-all w-full",
		form: "flex flex-col max-w-sm flex-1",
		parent: "flex justify-center items-center bg-gray-100 py-8 px-4",
	};
	const { signup, signin, user } = useAuthContext();
	const handelChange = (e) => {
		setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
	};
	const handelSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = form;
		if (isSignup) {
			return signup(form);
		}
		signin(email, password);
	};
	const switchMode = (e) => {
		e.preventDefault();
		setIsSignup((p) => !p);
	};
	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);
	return (
		<div className={style.parent}>
			<form className={style.form} onSubmit={handelSubmit}>
				<h1 className="mb-4 text-4xl">{isSignup ? "Sign up" : "Login"}</h1>
				{isSignup && (
					<>
						<label
							htmlFor="userName"
							className={form.userName ? `text-green-500` : ""}
						>
							Username
						</label>
						<input
							onChange={handelChange}
							className={
								form.userName
									? `${style.input} mt-2 border-green-400`
									: style.input
							}
							type="text"
							name="userName"
							id="userName"
						/>
						<label
							htmlFor="uniqeName"
							className={form.uniqeName ? `text-green-500` : ""}
						>
							Uniqe name
						</label>
						<input
							onChange={handelChange}
							className={
								form.uniqeName
									? `${style.input} mt-2 border-green-400`
									: style.input
							}
							type="text"
							name="uniqeName"
							id="uniqeName"
						/>
					</>
				)}
				<label htmlFor="email" className={form.email ? `text-green-500` : ""}>
					Email
				</label>
				<input
					onChange={handelChange}
					className={
						form.email ? `${style.input} mt-2 border-green-400` : style.input
					}
					type="email"
					name="email"
					id="email"
				/>
				{isSignup && (
					<>
						<label
							htmlFor="photoURL"
							className={form.photoURL ? `text-green-500` : ""}
						>
							Photo Url
						</label>
						<input
							onChange={handelChange}
							className={
								form.photoURL
									? `${style.input} mt-2 border-green-400`
									: style.input
							}
							type="text"
							name="photoURL"
							id="photoURL"
						/>
					</>
				)}
				<label
					htmlFor="password"
					className={form.password ? `text-green-500` : ""}
				>
					Password
				</label>
				<input
					onChange={handelChange}
					className={
						form.password ? `${style.input} mt-2 border-green-400` : style.input
					}
					type="password"
					name="password"
					id="password"
				/>
				{isSignup && (
					<>
						<label
							htmlFor="confirmPassword"
							className={form.confirmPassword ? `text-green-500` : ""}
						>
							Confirm Password
						</label>
						<input
							onChange={handelChange}
							className={
								form.confirmPassword
									? `${style.input} mt-2 border-green-400`
									: style.input
							}
							type="password"
							name="confirmPassword"
							id="confirmPassword"
						/>
					</>
				)}
				{isSignup ? (
					<button className="bg-green-600 rounded-full text-white uppercase p-3 font-bold hover:bg-green-500 mt-4 shadow-lg shadow-green-300 hover:shadow-green-200 flex items-center justify-center gap-1 hover:gap-2 transition-all">
						signup <BiLogInCircle size={22} />
					</button>
				) : (
					<button className="bg-blue-600 rounded-full text-white uppercase p-3 font-bold hover:bg-blue-500 mt-4 shadow-lg shadow-blue-300 hover:shadow-blue-200 flex items-center justify-center gap-1 hover:gap-2 transition-all">
						login <GoSignIn size={22} />
					</button>
				)}
				{isSignup ? (
					<button
						onClick={switchMode}
						className="text-center mt-4 bg-yellow-500 hover:bg-yellow-400 p-2 rounded-lg shadow-lg shadow-yellow-300 hover:shadow-yellow-200 text-white font-bold"
					>
						Already have an account? Login now
					</button>
				) : (
					<button
						onClick={switchMode}
						className="text-center mt-4 bg-slate-500 hover:bg-slate-400 p-2 rounded-lg shadow-lg shadow-slate-300 hover:shadow-slate-200 text-white font-bold"
					>
						no account yet? signup now
					</button>
				)}
			</form>
		</div>
	);
};

export default Registration;
