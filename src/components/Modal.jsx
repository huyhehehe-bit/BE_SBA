// Popup dialog dung cho Create / Update
export default function Modal({ title, onClose, children }) {
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="block modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <b>{title}</b>
          <button onClick={onClose}>X</button>
        </div>
        {children}
      </div>
    </div>
  )
}
