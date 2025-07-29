import React, { useCallback, useState } from 'react'
import Modal from './Modal';

const DataRow = ({entry }) => {
const [modalState, setModalState] = useState(false);
const [modalData, setModalData] = useState("");

const onClose = useCallback(() => setModalState(false), [])

  return (
    <div
      style={{
        padding: "12px 18px",
        border: "1px solid green",
        marginBottom: "12px",
      }}
      key={entry.id}
    >
      {entry.title}{" "}
      <button
        onClick={() => {
          setModalData(entry.title);
          setModalState(true);
        }}
      >
        Edit
      </button>
      <Modal onClose={onClose} isModalOpen={modalState} content={modalData} />
    </div>
  );
}

export default DataRow
