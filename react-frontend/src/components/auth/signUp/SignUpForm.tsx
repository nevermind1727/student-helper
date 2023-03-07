import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { useSignInUserMutation } from "../../../apis/authApi";
import { useAppDispatch } from "../../../app/hooks";
import { User } from "../../../utils/types";
import { setAuthUser } from "../../../features/auth/authSlice";
import { useCreateUserMutation } from "../../../apis/usersApi";

const SignUpForm = () => {
  const [username, setUsername] = useState<string>("");
  const [isUsernameErrored, setIsUsernameErrored] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [isPasswordErrored, setIsPasswordErrored] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isConfirmPasswordErrored, setIsConfirmPasswordErrored] =
    useState<boolean>(false);

  const [createUser] = useCreateUserMutation();
  const [signInUser] = useSignInUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLocalSignUp = async (e: FormEvent) => {
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

    if (!confirmPassword || password !== confirmPassword) {
      setIsConfirmPasswordErrored(true);
      return;
    } else {
      setIsConfirmPasswordErrored(false);
    }

    try {
      await createUser({ username, password })
        .unwrap()
        .then((payload) => {
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
        })
        .catch((err: any) => {
          toast({
            title: "Error Occured",
            description: `${err.data.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleGoogleSignUp = () => {
    window.open(
      "https://student-helper-backend.onrender.com/auth/google",
      "_self"
    );
  };

  const handleFacebookSignUp = () => {
    window.open(
      "https://student-helper-backend.onrender.com/auth/facebook",
      "_self"
    );
  };

  const handleLinkedinSignUp = () => {
    window.open(
      "https://student-helper-backend.onrender.com/auth/linkedin",
      "_self"
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      h="100vh"
      gap={8}
      pt="100px"
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
        <FormControl isRequired isInvalid={isConfirmPasswordErrored}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            variant="outline"
            type="password"
            placeholder="Confirm your password"
            w={240}
            isRequired
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormErrorMessage>Passwords don't match</FormErrorMessage>
        </FormControl>
        <Text textAlign="center">or use</Text>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton
            aria-label="Sign Up with Google"
            size="lg"
            icon={<FcGoogle size={32} />}
            onClick={handleGoogleSignUp}
          />
          <IconButton
            aria-label="Sign Up with Facebook"
            size="lg"
            icon={<BsFacebook size={32} />}
            onClick={handleFacebookSignUp}
          />
          <IconButton
            aria-label="Sign Up with LinkedIN"
            size="lg"
            icon={<BsLinkedin size={32} />}
            onClick={handleLinkedinSignUp}
          />
        </Box>
        <Text>
          Already have an account?{" "}
          <Link
            as={ReactRouterLink}
            to="/auth/signIn"
            color="blue.300"
            textDecoration="underlined"
          >
            Sign In.
          </Link>
        </Text>
        <Button
          type="submit"
          colorScheme="blue"
          variant="solid"
          onClick={handleLocalSignUp}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignUpForm;
