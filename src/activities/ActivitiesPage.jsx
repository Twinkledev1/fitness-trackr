import {useAuth} from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import AddActivityForm from "./AddActivityForm";
import ActivitiesList from "./ActivitiesList";


export default function ActivitiesPage() {
  const {token} = useAuth();
  const {data: activities, loading, error} = useQuery("/activities", "activities");

  if(loading) return <p> Loading activities...</p>;
  if(error) return <p> Error loading activities: {error}</p>;

  return (
    <>
      <h1>Activities</h1>
    
      {token && <AddActivityForm/>}
      <ActivitiesList activities = {activities}/>
      <p>Imagine all the activities!</p>
    </>
  );
}
