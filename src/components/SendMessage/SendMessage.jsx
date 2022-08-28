import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile, BsMicFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { BiImageAdd } from "react-icons/bi";
import { useParams } from "react-router-dom";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firbase";
import { useAuthContext } from "../../context/AuthContext";
import {
	getDownloadURL,
	ref,
	uploadBytes,
	deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import Picker from "emoji-picker-react";

const SendMessage = ({ scroller }) => {
	const { id: user2 } = useParams();
	const [text, setText] = useState("");
	const [file, setFile] = useState(null);
	const [images, setImages] = useState([]);
	const [showPicker, setShowPicker] = useState(false);
	const { user } = useAuthContext();
	const id = user.uid > user2 ? user.uid + user2 : user2 + user.uid;
	useEffect(() => {
		const uploadImage = async () => {
			if (file) {
				const snapshot = await uploadBytes(
					ref(storage, `images/${v4()}-${file.name}`),
					file
				);
				console.log(snapshot.ref);
				const dlUrl = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
				setImages((p) => [...p, { dlUrl, fullPath: snapshot.ref.fullPath }]);
			}
		};
		uploadImage();
	}, [file]);
	const onEmojiClick = (event, emojiObject) => {
		setText((p) => p + emojiObject.emoji);
	};
	const handelClick = async (path) => {
		const deltedObject = await deleteObject(ref(storage, path));
		console.log(deltedObject);
	};
	const handelSubmit = async (e) => {
		e.preventDefault();
		if (!images.length && text.split(" ").join("").length === 0) {
			return setText("");
		}
		console.log("sendeing");
		await addDoc(collection(db, `messages/${id}/chat`), {
			text,
			photoURL: user.photoURL,
			from: user.uid,
			to: user2,
			createdAt: serverTimestamp(),
			images,
		});
		await setDoc(doc(db, "lastMessage", id), {
			text,
			from: user.uid,
			to: user2,
			createdAt: serverTimestamp(),
			unRead: true,
			containImages: images.length > 0,
		});
		setText("");
		setImages([]);
		setFile(null);
		setShowPicker(false);
		scroller.current.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<div className="flex flex-col bg-main justify-center">
			{images.length > 0 && (
				<div className="flex gap-4 px-8">
					<label
						htmlFor="attach"
						className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-xl cursor-pointer hover:bg-gray-400 group transition-all"
					>
						<BiImageAdd
							size={48}
							className="group-hover:-rotate-45 group-hover:scale-90 transition-all"
						/>
					</label>
					{images.map((image, i) => (
						<img
							onClick={() => handelClick(image.fullPath)}
							key={i}
							src={image.dlUrl}
							className="w-20 h-20 rounded-xl"
						/>
					))}
				</div>
			)}
			{showPicker && (
				<Picker
					onEmojiClick={onEmojiClick}
					disableSearchBar={true}
					pickerStyle={{ width: "100%" }}
				/>
			)}
			<div className="flex justify-center items-center gap-4 p-4">
				<div className="flex gap-4">
					<button
						className="text-slate-500"
						onClick={() => setShowPicker((p) => !p)}
					>
						<BsEmojiSmile size={24} />
					</button>
					<label htmlFor="attach" className="text-slate-500">
						<ImAttachment size={24} />
					</label>
				</div>
				<form
					className="flex-1 flex gap-4 items-center"
					onSubmit={handelSubmit}
				>
					<input
						type="text"
						className="flex-1 bg-white outline-none p-2 rounded-lg relative"
						placeholder="Write a message"
						contentEditable="true"
						onChange={(e) => setText(e.target.value)}
						value={text}
					/>
					<input
						type="file"
						id="attach"
						className="hidden"
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<button className="text-slate-500">
						{text ? <IoMdSend size={24} /> : <BsMicFill size={24} />}
					</button>
				</form>
			</div>
		</div>
	);
};

export default SendMessage;
