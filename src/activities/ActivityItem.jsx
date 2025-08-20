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
      }}>
        <h3>{activity.name}</h3>
        <p>{activity.description}</p>
        
        {/* Delete button - Only show if user is logged in */}
        {showDelete && (
          <button
            onClick={handleDeleteClick}
            disabled={deleteLoading} >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    );
  }