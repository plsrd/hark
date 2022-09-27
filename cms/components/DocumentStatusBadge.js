const DocumentStatusBadge = ({ draft }) => {
  return (
    <div className='h-full self-end'>
      {draft == undefined ? null : draft ? (
        <div className='badge badge-accent h-fit'>Unsaved</div>
      ) : (
        <div className='badge badge-success h-fit'>Saved!</div>
      )}
    </div>
  );
};

export default DocumentStatusBadge;
