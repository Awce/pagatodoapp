import { Spinner, useColorModeValue, HStack, Center } from "native-base";

const Loading = () => {
  return (
    <Center flex={1}>
      <HStack space={2}>
        <Spinner
          accessibilityLabel="Cargando ..."
          color={useColorModeValue("#333456")}
        />
      </HStack>
    </Center>
  );
};

export default Loading;
