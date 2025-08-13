// Centralized styles for tables and buttons

export const tableStyle = {
  borderCollapse: "collapse",
  marginTop: "10px",
  width: "100%",
};

export const thTdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

export const actionButton = {
  padding: "5px 10px",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px",
};

export const addButton = {
  ...actionButton,
  background: "green",
  color: "white",
  marginLeft: "5px",
};

export const deleteButton = {
  ...actionButton,
  background: "red",
  color: "white",
};
