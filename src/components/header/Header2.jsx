import { useState } from "react";
import { Container, Stack, Typography, IconButton } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useTheme } from "@mui/material";

export default function Header2() {
  // Search Component //
  const Search = styled("div")(({ theme }) => ({
    flexGrow:0.4,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #777",
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    minWidth: "300px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#777"
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    flex: 1,
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const CategoryButton = styled(ListItem)(({ theme }) => ({
    borderLeft: "1px solid #777",
    borderRadius: 0,
    minWidth: "150px",
    height: "100%",
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
  }));
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  // ListMenu //
  const options = ["All Categories", "CAR", "Clothes", "Electronics"];
  // State //
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);

  // Function //
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //
  const handleClose = () => {
    setAnchorEl(null);
  };
  //
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  // theme //
  const theme = useTheme();

  return (
    <Container sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
      <Stack alignItems={"center"}>
        <ShoppingCartOutlined />
        <Typography variant="body2">Shoppify</Typography>
      </Stack>
      {/* Input search  */}
      <Search sx={{ display: "flex", borderRadius: "22px", justifyContent:"space-between" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />

        {/* List Menu intégré */}
        <div>
          <List
            component="nav"
            aria-label="Device settings"
            sx={{
              bgcolor: theme.palette.myColor.main,
              borderBottomRightRadius: 22,
              borderTopRightRadius: 22,
              p: "0",
            }}
          >
            <ListItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
            >
              <ListItemText
                secondary={options[selectedIndex]}
                sx={{
                  width: "93px",
                  textAlign: "center",
                  "&:hover": { cursor: "pointer" },
                }}
              />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "lock-button",
                role: "listbox",
              },
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                sx={{ fontSize: "11px" }}
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Search>

      <Stack direction={"row"} alignItems={"center"}>
        <IconButton aria-label="">
          <Person2OutlinedIcon />
        </IconButton>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="primary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </Stack>
    </Container>
  );
}
