export default function ActivityItem({ 
    activity, 
    showDelete, 
    onDelete, 
    deleteLoading 
  }) {
    const handleDeleteClick = () => {
      if (window.confirm(`Are you sure you want to delete "${activity.name}"?`)) {
        onDelete(activity.id);
      }
    };
  
    return (
      <div style={{ 
        border: "1px solid #ccc", 
        padding: "1rem", 
        margin: "0.5rem 0",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9"
      }}>
        <h3>{activity.name}</h3>
        <p>{activity.description}</p>
        
        {/* Delete button - Only show if user is logged in */}
        {showDelete && (
          <button
            onClick={handleDeleteClick}
            disabled={deleteLoading}
            style={{ 
              backgroundColor: "#dc3545", 
              color: "white", 
              border: "none", 
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              marginTop: "0.5rem",
              cursor: deleteLoading ? "not-allowed" : "pointer",
              opacity: deleteLoading ? 0.6 : 1
            }}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    );
  }