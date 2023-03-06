import { Box, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ServiceItem from "./ServiceItem";
import { BsExclamationCircle } from "react-icons/bs";

const ServicesList = () => {
  const navigate = useNavigate();
  const studyNotesPage = () => navigate("/services/studyNotesCreator");
  const grammarCorrectionPage = () => navigate("/services/grammarCorrection");
  const essayGeneratorPage = () => navigate("/services/essayGenerator");
  return (
    <Box
      display="flex"
      flexDirection="column"
      // justifyContent="center"
      alignItems="center"
      height="100vh"
      pt="20px"
    >
      <Stack direction="row" spacing={5}>
        <ServiceItem
          title={"Study notes creator"}
          description={
            "You need to specify the number of key points and the topic, then this service will generate study notes based on the prompt."
          }
          onServiceClick={studyNotesPage}
          imageLink="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        />
        <ServiceItem
          title={"Grammar correction"}
          description={
            "You can provide text/sentence/word and this service will correct grammatical errors in the prompt, if there are any."
          }
          onServiceClick={grammarCorrectionPage}
          imageLink="https://images.unsplash.com/photo-1532153432275-818ef462eb1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <ServiceItem
          title={"Essay generator"}
          description={
            "You can use this service in order to create an essay with certain amount of sentences on the particular subject."
          }
          onServiceClick={essayGeneratorPage}
          imageLink="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
        />
      </Stack>
      <Box mt={6} display="flex" justifyContent="center" alignItems="center">
        <BsExclamationCircle size={42} />
        <Text pl={4} fontSize="3xl">
          You must be logged in to use our services
        </Text>
      </Box>
    </Box>
  );
};

export default ServicesList;
