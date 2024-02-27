"use client";
import { useQuery } from "@apollo/client";
import React from "react";
import { Button, Form, Input } from "react-daisyui";
import { RiSearchEyeLine } from "react-icons/ri";
import { GET_REPUTATION } from "./operations";

export const SideNav: React.FC = () => {
	const {} = useQuery(GET_REPUTATION);
	return (
		<div className="sticky h-screen top-0 p-8">
			<Form className="flex-row">
				<Input
					placeholder="Search People"
					className="border-r-0 rounded-r-none max-w-lg w-full"
				/>
				<Button className="btn-outline rounded-l-none">
					<RiSearchEyeLine className="text-xl" />
				</Button>
			</Form>
		</div>
	);
};
