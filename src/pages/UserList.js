import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

const UserListContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "20px",
  paddingBottom: "10px",
});

const UserCard = styled(Card)({
  maxWidth: 300,
});

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.github.com/users");
        setUsers(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        User List
      </Typography>
      {loading ? (
        <UserListContainer>
          <CircularProgress />
        </UserListContainer>
      ) : error ? (
        <UserListContainer>
          <Typography variant="body1" color="error">
            Error fetching users: {error.message}
          </Typography>
        </UserListContainer>
      ) : (
        <UserListContainer>
          {users.map((user) => (
            <UserCard key={user.id}>
              <CardMedia
                component="img"
                height="200"
                image={user.avatar_url}
                alt={user.login}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/user/${user.login}`}
                  align="center"
                >
                  {`Name: ${user.name || user.login}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  align="center"
                >
                  {`Username: @${user.login}`}
                </Typography>
              </CardContent>
            </UserCard>
          ))}
        </UserListContainer>
      )}
    </>
  );
};

export default UserList;
