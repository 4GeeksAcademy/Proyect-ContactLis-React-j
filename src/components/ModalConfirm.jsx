// //boton para  confirmar antes de eliminar algun  dato

import PropTypes from "prop-types";

export const ModalConfirm = ({ id, message, onConfirm }) => {
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}-label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}-label`}>Confirmar acción</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={onConfirm}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalConfirm.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};