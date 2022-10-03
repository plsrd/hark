import { DeleteIcon, DuplicateIcon, OptionsIcon, RevertIcon } from './icons';

const DocumentOptionsMenu = () => {
  return (
    <div className='dropdown dropdown-top'>
      <label tabIndex='0' className='btn btn-outline btn-primary'>
        <div className='indicator'>
          <OptionsIcon />
        </div>
      </label>
      <ul
        tabIndex='0'
        className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li>
          <label htmlFor='revertModal' className='btn btn-ghost justify-start'>
            <RevertIcon />
            Revert
          </label>
        </li>
        <li>
          <label
            htmlFor='duplicateModal'
            className='btn btn-ghost justify-start'
          >
            <DuplicateIcon />
            Duplicate
          </label>
        </li>
        <li>
          <label
            htmlFor='deleteModal'
            className='btn btn-ghost justify-start text-error'
          >
            <DeleteIcon />
            Delete
          </label>
        </li>
      </ul>
    </div>
  );
};

export default DocumentOptionsMenu;
