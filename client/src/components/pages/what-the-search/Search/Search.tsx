import React from "react";

type Props = {};

export const Search: React.FC<Props> = (props) => {
	return (
		<form action="what-the-search" method="get">
			<label>
				<p className="label px-4 justify-normal">
					For Potential People, Posts, Friends,{" "}
					<span className="text-error font-bold">Victi..</span>
				</p>
				<input
					type="text"
					name="q"
					placeholder="Search..."
					className="input input-bordered w-full"
				/>
			</label>
		</form>
	);
};

export default Search;
