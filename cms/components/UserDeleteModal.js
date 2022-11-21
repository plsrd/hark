const UserDeleteModal = ({ handleClick }) => {
  return (
    <>
      <input type='checkbox' id='deleteModal' class='modal-toggle' />
      <div class='modal'>
        <div class='modal-box relative flex flex-col'>
          <label
            for='deleteModal'
            class='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <h3 class='text-lg font-bold'>Delete user?</h3>
          <div className='self-end flex gap-2 my-8'>
            <button
              name='deleteButton'
              className='btn btn-error'
              onClick={handleClick}
            >
              Confirm
            </button>
            <label for='deleteModal' className='btn btn-primary'>
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDeleteModal;
