import DeleteModal from './DeleteModal';
import DocumentOptionsMenu from './DocumentOptionsMenu';
import DocumentStatusBadge from './DocumentStatusBadge';
import RevertModal from './RevertModal';

const DocumentEditorActions = ({ draft, type, id, revertChanges }) => {
  return (
    <div className='flex justify-between items-center mt-10'>
      <DocumentStatusBadge draft={draft} />
      <div className='flex gap-4'>
        <button
          className='btn btn-primary w-24'
          type='submit'
          disabled={!draft}
        >
          Save
        </button>
        <DocumentOptionsMenu />
        <RevertModal revertChanges={revertChanges} />
        <DeleteModal {...{ type, id }} />
      </div>
    </div>
  );
};

export default DocumentEditorActions;
