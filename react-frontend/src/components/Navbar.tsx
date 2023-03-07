import { Box, Button, Text, Stack, useToast, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../apis/authApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setAuthUser } from "../features/auth/authSlice";
import { MdSchool } from "react-icons/md";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleSignUp = () => navigate("/auth/signUp");
  const handleSignIn = () => navigate("/auth/signIn");
  const handleLogout = async () => {
    logoutUser(undefined)
      .unwrap()
      .then()
      .catch((err) => {
        console.log(err);
      });
    dispatch(setAuthUser({ user: null }));
  };
  return (
    <Box
      as="nav"
      w="100%"
      position="sticky"
      bg="#171923"
      height="80px"
      display="flex"
      justifyContent="space-between"
      px={12}
    >
      <Box>
        <Link to="/">
          <Box height="100%" display="flex" alignItems="center">
            <MdSchool size={46} color="#4299E1" />
            <Text fontSize="4xl" ml={4}>
              STUDENT HELPER
            </Text>
          </Box>
        </Link>
        {/* <Link to="/">
            <Image src="https://i.imgur.com/klTp8gn.png" />
          </Link> */}
      </Box>
      {!user ? (
        <Stack direction="row" spacing={6} align="center">
          <Button variant="ghost" onClick={handleSignIn}>
            Sign In
          </Button>
          <Button colorScheme="blue" variant="solid" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Stack>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button colorScheme="blue" variant="solid" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
