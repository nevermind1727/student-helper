import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  IconButton,
  Button,
  Box,
  Text,
  Link,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useSignInUserMutation } from "../../../apis/authApi";
import { useAppDispatch } from "../../../app/hooks";
import { setAuthUser } from "../../../features/auth/authSlice";
import { User } from "../../../utils/types";
import { useToast } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";

const SignInForm = () => {
  const [username, setUsername] = useState<string>("");
  const [isUsernameErrored, setIsUsernameErrored] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [isPasswordErrored, setIsPasswordErrored] = useState<boolean>(false);

  const [signInUser] = useSignInUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLocalSignIn = async (e: FormEvent) => {
    e.preventDefault();

    if (!username) {
      setIsUsernameErrored(true);
      return;
    } else {
      setIsUsernameErrored(false);
    }

    if (!password) {
      setIsPasswordErrored(true);
      return;
    } else {
      setIsPasswordErrored(false);
    }
    try {
      signInUser({ username, password })
        .unwrap()
        .then((payload: User) => {
          console.log(payload);
          dispatch(
            setAuthUser({
              user: payload,
            })
          );
          navigate("/");
        })
        .catch((err: any) => {
          toast({
            title: "Error Occured",
            description: `${err.data.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.log(err.data.message);
        });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      h="100vh"
      gap={8}
    >
      <Text fontSize="4xl">Student Helper</Text>
      <Stack gap={2}>
        <FormControl isRequired isInvalid={isUsernameErrored}>
          <FormLabel>Username</FormLabel>
          <Input
            variant="outline"
            type="text"
            placeholder="Enter your username"
            w={240}
            isRequired
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormErrorMessage>Username is required.</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={isPasswordErrored}>
          <FormLabel>Password</FormLabel>
          <Input
            variant="outline"
            type="password"
            placeholder="Enter your password"
            w={240}
            isRequired
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormErrorMessage>Password is required.</FormErrorMessage>
        </FormControl>
        <Text textAlign="center">or use</Text>
        <Box>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Box>
        <Text>
          Don't have an account?{" "}
          <Link
            as={ReactRouterLink}
            to="/auth/signUp"
            color="blue.300"
            textDecoration="underlined"
          >
            Sign Up.
          </Link>
        </Text>
        <Button
          type="submit"
          colorScheme="blue"
          variant="solid"
          onClick={handleLocalSignIn}
        >
          Sign In
        </Button>
      </Stack>
    </Box>
  );
};

export default SignInForm;
