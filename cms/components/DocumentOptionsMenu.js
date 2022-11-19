import { DeleteIcon, DuplicateIcon, OptionsIcon, RevertIcon } from './icons';

const DocumentOptionsMenu = ({ changeModal, id, contentHasChanged }) => {
  const handleClick = e => {
    e.preventDefault();
    changeModal(e.target.name);
  };

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
          <button
            onClick={handleClick}
            name='revert'
            className='btn btn-ghost justify-start'
            disabled={!contentHasChanged}
          >
            <RevertIcon />
            Revert
          </button>
        </li>
        <li>
          <button
            onClick={handleClick}
            name='duplicate'
            className='btn btn-ghost justify-start'
            disabled={id == 'new'}
          >
            <DuplicateIcon />
            Duplicate
          </button>
        </li>
        <li>
          <button
            onClick={handleClick}
            name='delete'
            className='btn btn-ghost justify-start text-error'
            disabled={id == 'new'}
          >
            <DeleteIcon />
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DocumentOptionsMenu;
