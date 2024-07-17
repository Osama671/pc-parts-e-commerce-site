import { Toast, ToastContainer } from 'react-bootstrap'

const ToastMessage = ({ show, message, onClose }) => {
  return (
    <ToastContainer
      className="p-3"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
      }}
    >
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Body className="bg-success rounded text-light">
          <i className="bi bi-bag-check mx-2"></i>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default ToastMessage
