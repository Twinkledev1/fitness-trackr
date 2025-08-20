import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useApi } from "../api/ApiContext";
import ActivityItem from "./ActivityItem";

export default function ActivitiesList({ activities }) {
  const { token } = useAuth();
  const { request, invalidateTags } = useApi();
  
  // State for delete operations
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Handle activity deletion
  const handleDelete = async (activityId) => {
    setDeleteLoading(true);
    setDeleteError(null);
    
    try {
      await request(`/activities/${activityId}`, {
        method: "DELETE"
      });
      
      // Refresh the activities list
      invalidateTags(["activities"]);
      
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteError(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section>
      {activities && activities.length > 0 ? (
        <div>
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              showDelete={!!token}
              onDelete={handleDelete}
              deleteLoading={deleteLoading}
            />
          ))}
        </div>
      ) : (
        <p>No activities found.</p>
      )}
    </section>
  );
}