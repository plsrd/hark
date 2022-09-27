const RevertModal = ({ revertChanges }) => {
  return (
    <>
      <input type='checkbox' id='revertModal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative flex flex-col'>
          <label
            htmlFor='revertModal'
            className='btn btn-sm btn-circle absolute right-4 top-4'
          >
            ✕
          </label>
          <h3 className='text-lg font-bold'>Undo all unsaved changes?</h3>
          <div className='self-end flex gap-2 my-8'>
            <label
              htmlFor='revertModal'
              className='btn btn-error'
              onClick={revertChanges}
            >
              Confirm
            </label>
            <label htmlFor='revertModal' className='btn btn-primary'>
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevertModal;
