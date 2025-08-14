import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  Divider,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

export default function AuthPage() {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tab === 0 ? "Login data:" : "Signup data:", formData);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://i.pinimg.com/736x/c6/ff/34/c6ff34b0fd97d5c958e09d8cf2b1db89.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay for dark effect */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(3px)",
        }}
      />

      <Paper
        elevation={10}
        sx={{
          position: "relative",
          zIndex: 2,
          padding: 4,
          borderRadius: 4,
          width: 360,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#fff" } }}
          sx={{ mb: 2 }}
        >
          <Tab label="Faculty Login" sx={{ color: "#0A1931" }} />
          <Tab label="New Faculty" sx={{ color: "#06141B" }} />
        </Tabs>

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          {tab === 0 ? "Welcome Back" : "Create an Account"}
        </Typography>

        <form onSubmit={handleSubmit}>
          {tab === 1 && (
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
            />
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1,
              backgroundColor: "#4e8cff",
              ":hover": { backgroundColor: "#3c73cc" },
              fontWeight: "bold",
            }}
          >
            {tab === 0 ? "Login" : "Signup"}
          </Button>
        </form>

        <Divider sx={{ my: 3, backgroundColor: "rgba(255,255,255,0.3)",borderRadius:"50px" }}>
          or sign up with
        </Divider>

        <Box display="flex" justifyContent="center" gap={2}>
          
          <IconButton
            sx={{
              background: "rgba(255,255,255,0.2)",
              color: "#db4437",
              ":hover": { background: "rgba(255,255,255,0.3)" },
            }}
          >
            <GoogleIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
