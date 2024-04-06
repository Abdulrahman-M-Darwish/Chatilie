'use client';
import { BsDoorOpen, BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineColorSwatch } from 'react-icons/hi';
import { GiCrossedSwords } from 'react-icons/gi';
import { TbArrowsExchange } from 'react-icons/tb';
import { useEffect, useRef } from 'react';
import { themes, links } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import Link from 'next/link';
import Image from 'next/image';
import { User } from '@/types';
import { themeChange } from 'theme-change';
import {
  setIsDark,
  setIsMinimal,
  setUser,
  setUserProfile,
} from '@/store/features';
import { gql, useMutation, useQuery } from '@apollo/client';
import { usePathname, useRouter } from 'next/navigation';
import { DynamicDropdown } from '..';
import { Dropdown } from 'react-daisyui';
import { LOGOUT } from './operations';

export const Navbar: React.FC = () => {
  const user = useAppSelector((state) => state.user.user) as User;
  const isMinimal = useAppSelector((state) => state.navbar.isMinimal);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { replace } = useRouter();
  const [logout] = useMutation(LOGOUT);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { data } = useQuery(gql`
    query GetNotificationsCount {
      notificationsCount
    }
  `);
  useEffect(() => {
    const link = links(user.name, data?.notificationsCount).find((link) =>
      link.path.startsWith('/' + pathname.split('/')[1]),
    );
    if (link?.isMinimal) {
      if (isMinimal) return;
      dispatch(setIsMinimal(true));
    } else {
      if (!isMinimal) return;
      dispatch(setIsMinimal(false));
    }
  }, [data, dispatch, isMinimal, pathname, user.name]);
  useEffect(() => {
    themeChange(false);
    dispatch(
      setIsDark(
        getComputedStyle(document.documentElement).getPropertyValue(
          'color-scheme',
        ),
      ),
    );
  }, [dispatch]);
  return (
    <nav
      className={
        'sticky top-0 h-screen px-4 z-50 gap-4 flex flex-col py-8 ' +
        (isMinimal ? 'minimal-nav' : null)
      }
    >
      <div className="Logo max-lg:mx-auto w-fit">
        <Link href="/">
          <h1 className="text-4xl font-bold">
            C<span className="max-lg:hidden">hati</span>
            <i className="text-primary font-black not-italic">
              L<span className="max-lg:hidden">ie</span>
            </i>
          </h1>
        </Link>
      </div>
      <div className="Links flex flex-col gap-4 py-4">
        {links(user.name, data?.notificationsCount).map((link) =>
          link?.skip ? null : (
            <Link key={link.name} href={link.path} className="ring-button">
              <div className="relative">
                {link.flag ? (
                  <div className="bg-error right-0 top-0 translate-x-1/4 -translate-y-1/4 text-error-content w-5 flex items-center justify-center h-5 absolute badge-sm rounded-full">
                    {link.flag}
                  </div>
                ) : null}
                {link.icon!({ className: 'text-3xl' })}
              </div>
              <h2 className="max-lg:hidden ring-btn-text">{link.name}</h2>
            </Link>
          ),
        )}
      </div>
      <div className="mt-auto">
        <button
          className="ring-button w-full"
          onClick={() => dialogRef.current!.showModal()}
        >
          <HiOutlineColorSwatch className="text-2xl" />
          <h2 className="max-lg:hidden ring-btn-text">Themes</h2>
        </button>
        <dialog id="my_modal_1" className="modal" ref={dialogRef}>
          <div className="modal-action bg-base-100 h-[60vh] relative flex flex-col">
            <form
              method="dialog"
              className="bg-base-100 shadow-lg flex justify-between"
            >
              <button className="ring-button">
                <GiCrossedSwords />
              </button>
              <button type="button" className="ring-button">
                <BsThreeDotsVertical />
              </button>
            </form>
            <div className="flex flex-col gap-2 overflow-auto px-2 py-4">
              {themes.map((theme) => (
                <button
                  key={theme}
                  data-theme={theme}
                  className="btn hover:bg-base-100 w-80 justify-between bg-base-100 rounded-lg outline-primary transition-all"
                  data-act-class="outline"
                  data-set-theme={theme}
                  onClick={() =>
                    dispatch(
                      setIsDark(
                        getComputedStyle(
                          document.documentElement,
                        ).getPropertyValue('color-scheme'),
                      ),
                    )
                  }
                >
                  <div className="pointer-events-none uppercase tracking-widest">
                    {theme}
                  </div>
                  <div className="flex rounded-full gap-[2px] overflow-hidden pointer-events-none">
                    <div className="bg-primary text-primary-content w-4 h-4 flex justify-center items-center">
                      l
                    </div>
                    <div className="bg-secondary text-secondary-content w-4 h-4 flex justify-center items-center">
                      i
                    </div>
                    <div className="bg-accent text-accent-content w-4 h-4 flex justify-center items-center">
                      a
                    </div>
                    <div className="bg-neutral text-neutral-content w-4 h-4 flex justify-center items-center">
                      r
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </dialog>
        <DynamicDropdown className="w-full mt-8">
          <Dropdown.Details.Toggle className="ring-button w-full">
            <Image
              width={40}
              height={40}
              src={user.avatar}
              alt="Avatar"
              className="bg-neutral rounded-full p-0.5"
            />
            <h2 className="max-lg:hidden ring-btn-text">{user?.username}</h2>
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="bg-base-300 w-52 mb-5">
            <li>
              <a>
                <TbArrowsExchange className="text-2xl" />
                Switch Account
              </a>
            </li>
            <li
              onClick={async () => {
                dispatch(setUser(null));
                dispatch(setUserProfile(null));
                await logout();
                replace('/login');
              }}
            >
              <a>
                <BsDoorOpen className="text-2xl" />
                Logout
              </a>
            </li>
          </Dropdown.Menu>
        </DynamicDropdown>
      </div>
    </nav>
  );
};
