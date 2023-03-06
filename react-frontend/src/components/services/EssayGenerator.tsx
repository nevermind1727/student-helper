import {
  Stack,
  Input,
  Box,
  Text,
  Button,
  Textarea,
  Container,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEssayGeneratorMutation } from "../../apis/servicesApi";

const GrammarCorrection = () => {
  const [sentences, setSentences] = useState<number>(1);
  const [subject, setSubject] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [essayGenerator, { isLoading }] = useEssayGeneratorMutation();
  const toast = useToast();
  const generateEssay = () => {
    setOutput("");
    essayGenerator({ sentences, subject })
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
          Essay Generator
        </Text>
        <Box>
          <Text>Provide amount of sentences:</Text>
          <NumberInput min={1} max={50}>
            <NumberInputField
              value={sentences}
              onChange={(e) => setSentences(parseInt(e.target.value))}
              placeholder="Provide amount"
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>
          <Text>Provide the topic on which you want to generate an essay:</Text>
          <Input
            placeholder="Provide a topic"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={generateEssay} width="50%">
            Get my essay!
          </Button>
        </Box>
        <Box>
          <Text mt={4} textAlign="center">
            Your essay will be generated here:
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

export default GrammarCorrection;
