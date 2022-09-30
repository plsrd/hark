import React from 'react';
import Link from 'next/link';
import { EditIcon, OptionsIcon, PlusIcon } from './icons';

const MenuHeader = ({ type }) => {
  return (
    <>
      <li></li>
      <li className='menu-title flex flex-row justify-between items-center'>
        <span className='text-sm uppercase'>{type}</span>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-xs'>
            <OptionsIcon size={16} />
          </label>
          <ul
            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48'
            tabIndex={0}
          >
            <li>
              <Link href={`/content/${type}`}>
                <a>
                  <EditIcon size={16} />
                  <span className='font-normal text-neutral-content'>
                    Bulk Edit
                  </span>
                </a>
              </Link>
            </li>
            <li tabIndex={0}>
              <Link href={`/content/${type}/new`}>
                <a>
                  <PlusIcon size={16} />
                  <span className='font-normal text-neutral-content'>
                    Create New
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
};

export default MenuHeader;
