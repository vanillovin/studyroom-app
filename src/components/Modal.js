import React from 'react';
import '../style/Modal.css';

function Modal({ open, closeModal }) {
  return (
    <div className={open ? 'open modal' : 'modal'}>
      {open && (
        <section>
          <header>
            header
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </header>

          <main>main</main>

          <footer>
            <button className="ok">확인</button>
            <button className="close" onClick={closeModal}>
              취소
            </button>
          </footer>
        </section>
      )}
    </div>
  );
}

export default Modal;
