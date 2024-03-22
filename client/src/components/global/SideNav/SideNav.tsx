"use client";
import { useQuery } from "@apollo/client";
import React from "react";
import { Button, Form, Input } from "react-daisyui";
import { RiSearchEyeLine } from "react-icons/ri";
import { GET_REPUTATION } from "./operations";
import Image from "next/image";

export const SideNav: React.FC = () => {
	const {} = useQuery(GET_REPUTATION);
	return (
		<div className="sticky h-screen top-0 p-8 space-y-4">
			<Form className="flex-row">
				<Input
					placeholder="Search People"
					className="border-r-0 rounded-r-none max-w-lg w-full"
					name="q"
				/>
				<Button className="btn-outline rounded-l-none">
					<RiSearchEyeLine className="text-xl" />
				</Button>
			</Form>
			<div className="bg-base-300 p-4 rounded-box divide-y space-y-4">
				<h2 className="text-2xl">Quick Notifs</h2>
				<ul className="p-4 space-y-2 text-lg">
					<li>New Message</li>
					<li>Friend Request</li>
					<li>Post Liked</li>
				</ul>
			</div>
			<div className="bg-base-300 p-4 rounded-box divide-y space-y-4">
				<h2 className="text-2xl">Rand People</h2>
				<ul className="space-y-4 py-4">
					<li className="flex flex-wrap items-center gap-2 justify-between">
						<Image
							width={50}
							height={50}
							alt="avatar"
							src="https://api.dicebear.com/6.x/pixel-art/png?beardProbability=50&glassesProbability=50&hatProbability=50&seed=Gaster"
							className="rounded-full bg-neutral ring-neutral ring"
						/>
						<h3 className="mr-auto">WD Abdulrahman-M-Darwish</h3>
						<button className="btn">Add F</button>
					</li>
					<li className="flex flex-wrap items-center gap-2 justify-between">
						<Image
							width={50}
							height={50}
							alt="avatar"
							src="https://api.dicebear.com/6.x/pixel-art/png?beardProbability=50&glassesProbability=50&hatProbability=50&seed=Gaster"
							className="rounded-full bg-neutral ring-neutral ring"
						/>
						<h3 className="mr-auto">WD {"Can't"} Sleep</h3>
						<button className="btn">Add F</button>
					</li>
					<li className="flex flex-wrap items-center gap-2 justify-between">
						<Image
							width={50}
							height={50}
							alt="avatar"
							src="https://api.dicebear.com/6.x/pixel-art/png?beardProbability=50&glassesProbability=50&hatProbability=50&seed=Gaster"
							className="rounded-full bg-neutral ring-neutral ring"
						/>
						<h3 className="mr-auto">WD Clown</h3>
						<button className="btn">Add F</button>
					</li>
				</ul>
			</div>
		</div>
	);
};
