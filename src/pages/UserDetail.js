import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";

const UserDetailsContainer = styled("div")({
  marginTop: "50px",
  display: "flex",
  justifyContent: "center",
});

const UserDetailsCard = styled(Card)({
  maxWidth: 600,
  textAlign: "center",
  width: "80%",
});

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return (
    <UserDetailsContainer>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          Error: {error}
        </Typography>
      ) : !user ? (
        <Typography variant="body1">User not found</Typography>
      ) : (
        <UserDetailsCard>
          <CardContent sx={{ textAlign: "center" }}>
            <Avatar
              alt={user.login}
              src={user.avatar_url}
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
            <Typography variant="h5" gutterBottom>
              {user.name || user.login}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Username: {user.login}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Company: {user.company || "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: {user.location || "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Twitter: {user.twitter_username || "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Followers: {user.followers}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Following: {user.following}
            </Typography>
          </CardContent>
        </UserDetailsCard>
      )}
    </UserDetailsContainer>
  );
};

export default UserDetails;
