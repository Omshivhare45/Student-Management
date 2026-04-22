export const Modal = ({ title, onClose, children }) => (
  <div
    className="modal-overlay"
    style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}
    onClick={onClose}
  >
    <div
      className="modal-box"
      style={{
        background: "#1e2130", border: "1px solid #2a2d3e",
        borderRadius: "14px", width: "100%", maxWidth: "640px",
        maxHeight: "90vh", overflowY: "auto"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 24px", borderBottom: "1px solid #2a2d3e"
      }}>
        <h3 style={{ margin: 0, color: "#e8eaf0", fontSize: "1.1rem" }}>{title}</h3>
        <button
          onClick={onClose}
          style={{
            background: "#252840", border: "1px solid #2a2d3e", color: "#9ba3b8",
            width: "32px", height: "32px", borderRadius: "8px",
            fontSize: "1rem", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center"
          }}
        >✕</button>
      </div>
      <div style={{ padding: "24px" }}>{children}</div>
    </div>
  </div>
);



// Loader.jsx
export const Loader = () => (
  <div className="loader-wrap">
    <div className="loader-ring"></div>
  </div>
);

// // Modal.jsx
// export const Modal = ({ title, onClose, children }) => (
//   <div className="modal-overlay" onClick={onClose}>
//     <div className="modal-box" onClick={(e) => e.stopPropagation()}>
//       <div className="modal-header">
//         <h3>{title}</h3>
//         <button className="modal-close" onClick={onClose}>✕</button>
//       </div>
//       <div className="modal-body">{children}</div>
//     </div>
//   </div>
// );