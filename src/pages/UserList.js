import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  Box,
  TextField,
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

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

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

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${search}+location:${location}`
      );
      console.log(res);
      setUsers(res?.data?.items);
      // setLocation("");
      // setSearch("");
    } catch (err) {
      console.log(err);
    }
  };
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
        <>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              type="text"
              placeholder="user name"
              value={search}
              onChange={(e) => setSearch(e?.target?.value)}
            />
            <TextField
              type="text"
              placeholder="user location"
              name={location}
              onChange={(e) => setLocation(e?.target?.value)}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>

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
        </>
      )}
    </>
  );
};

export default UserList;
