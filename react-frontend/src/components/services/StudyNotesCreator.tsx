import {
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Box,
  Text,
  Textarea,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useStudyNotesMutation } from "../../apis/servicesApi";
import TypingText from "../utils/TypingText";

const StudyNotesCreator = () => {
  const [points, setPoints] = useState<number>(0);
  const [subject, setSubject] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [studyNotes, { isLoading }] = useStudyNotesMutation();
  const toast = useToast();
  const createStudyNotes = () => {
    setOutput("");
    studyNotes({ points, subject })
      .unwrap()
      .then((payload: any) => {
        console.log(payload);
        setOutput(payload.text.replaceAll("\n", "<br />"));
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
  };
  return (
    <Box display="flex" justifyContent="center" height="100vh">
      <Stack width="50%" spacing={6}>
        <Text fontSize="6xl" textAlign="center">
          Study Notes Generator
        </Text>
        <Box>
          <Text>Provide amount of key points (for example 5):</Text>
          <NumberInput min={1} max={50}>
            <NumberInputField
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value))}
              placeholder="Provide amount"
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>
          <Text>
            Indicate the topic on which you want to receive study notes (for
            example 'Ancient Rome'):
          </Text>
          <Input
            placeholder="Provide a topic"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={createStudyNotes} width="50%">
            Get my notes!
          </Button>
        </Box>
        <Box>
          <Text mt={4} textAlign="center">
            Your study notes will be generated here:
          </Text>
          {isLoading ? (
            <Box mt="40px" display="flex" justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: output }} />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default StudyNotesCreator;
