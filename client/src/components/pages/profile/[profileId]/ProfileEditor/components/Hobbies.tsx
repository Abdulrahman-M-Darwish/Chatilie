'use client';
import { DynamicDropdown, EmojiPicker } from '@/components';
import React, { useState } from 'react';
import { Button, Dropdown, Input } from 'react-daisyui';
import { IoMdAddCircleOutline } from 'react-icons/io';

type Props = {
  hobbies: String[];
  setHobbies: React.Dispatch<React.SetStateAction<string[]>>;
};

export const Hobbies: React.FC<Props> = ({ hobbies, setHobbies }) => {
  const [emoji, setEmoji] = useState({ name: '', native: '' });
  const [hobbyName, setHobbyName] = useState('');
  const setHobby = () => {
    if (!hobbyName || !emoji) {
      return;
    }
    setHobbies((p) => [...p, `${emoji.native} ${hobbyName}`]);
    setEmoji({ name: '', native: '' });
    setHobbyName('');
  };
  return (
    <div className="relative pb-2">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl">Hobbies</h3>
        <DynamicDropdown className="!dropdown-end !dropdown-top">
          <Dropdown.Details.Toggle className="bg-base-300">
            <IoMdAddCircleOutline className="text-3xl cursor-pointer" />
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="space-y-2">
            <label htmlFor="hobbyName" className="ml-2">
              Hobby Name
            </label>
            <Input
              id="hobbyName"
              placeholder="Name"
              size="sm"
              color="ghost"
              className="focus:bg-opacity-5"
              value={hobbyName}
              onChange={(e) => setHobbyName(e.target.value)}
            />
            <div className="flex gap-2 items-center">
              <DynamicDropdown vertical="top" horizontal="left">
                <Dropdown.Details.Toggle className="w-12 h-12 text-2xl rounded-full">
                  <span>{emoji.native}</span>
                </Dropdown.Details.Toggle>
                <Dropdown.Menu>
                  <EmojiPicker
                    onEmojiSelect={({ name, native }) => {
                      setEmoji({ name, native });
                    }}
                  />
                </Dropdown.Menu>
              </DynamicDropdown>
              <h4 className="text-warning">{emoji.name || 'Emoji'}</h4>
            </div>
            <Button className="capitalize" type="button" onClick={setHobby}>
              Done
            </Button>
          </Dropdown.Menu>
        </DynamicDropdown>
      </div>
      <ul className="flex flex-wrap gap-2 mt-2">
        {hobbies?.map((hobby, i) => (
          <li
            key={i}
            className="btn btn-sm rounded-full capitalize even:bg-warning-content even:text-warning odd:bg-primary-content odd:text-primary"
          >
            {hobby}
          </li>
        ))}
      </ul>
    </div>
  );
};
