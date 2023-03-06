import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  Button,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";

type Props = {
  title: string;
  description: string;
  onServiceClick: () => void;
  imageLink: string;
};

const ServiceItem: React.FC<Props> = ({
  title,
  description,
  onServiceClick,
  imageLink,
}) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={imageLink}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          height="200px"
          width="100%"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign="center">
            {title}
          </Heading>
          <Text>{description}</Text>
          {/* <Text color="blue.600" fontSize="2xl">
            $450
          </Text> */}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="outline"
            colorScheme="blue"
            px={10}
            onClick={onServiceClick}
          >
            Use it!
          </Button>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default ServiceItem;
