import {
  Stack,
  Box,
  Text,
  Button,
  Textarea,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGrammarCorrectionMutation } from "../../apis/servicesApi";

const GrammarCorrection = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [grammarCorrection, { isLoading }] = useGrammarCorrectionMutation();
  const toast = useToast();
  const correctGrammar = () => {
    setOutput("");
    grammarCorrection({ prompt })
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
          Grammar Correction
        </Text>
        <Box>
          <Text>Enter text/sentence/word which you want to correct:</Text>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Provide your data"
            size="lg"
          />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={correctGrammar} width="50%">
            Get my corrected data!
          </Button>
        </Box>
        <Box>
          <Text mt={4} textAlign="center">
            You corrected data will be shown here:
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
