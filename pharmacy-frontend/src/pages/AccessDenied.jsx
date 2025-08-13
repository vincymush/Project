import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        textAlign: "center",
        mt: 10
      }}
    >
      <Typography variant="h3" color="error" gutterBottom>
        🚫 Access Denied
      </Typography>
      <Typography variant="body1" gutterBottom>
        You do not have permission to view this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        Go Back Home
      </Button>
    </Container>
  );
}
