import { Navigation } from "../Components/NavigationTemplate/Navigation";
import UserCard from "../Components/UserCard";
import "../Styles/Clients.scss";

export const Clients = () => {
  return (
    <div>
      <div className="container">
        <Navigation />
        <UserCard />
        <div className="name">
          <p>Clients Page</p>
        </div>
      </div>
    </div>
  );
};
