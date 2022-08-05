import { useState, useEffect } from "react";
import {
  Box,
  FlatList,
  Heading,
  Image,
  Avatar,
  HStack,
  VStack,
  Spacer,
  Text,
  Center,
  NativeBaseProvider,
} from "native-base";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BanksListScreen() {
  const [banks, setBanks] = useState([]);
  const [recovered, setRecovered] = useState(false);

  // useEffect(() => {
  //   fetch("https://api.jsonbin.io/v3/b/604006e581087a6a8b95b784")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((banks) => {
  //       setBanks(banks.record);
  //       setRecovered(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const data = [
    {
      bankName: "Paga Todo",
      description: "Banco Paga Todo es Para Todos",
      age: 10,
      url: "https://public-liarla.s3.us-east-2.amazonaws.com/ico_pagatodo.png",
    },
    {
      bankName: "BBVA Bancomer",
      description: "BBVA Bancomer Creando Oportunidades",
      age: 10,
      url: "https://public-liarla.s3.us-east-2.amazonaws.com/ico_bancomer.png",
    },
    {
      bankName: "Banamex",
      description: "Banamex lo mejor de México",
      age: 10,
      url: "https://public-liarla.s3.us-east-2.amazonaws.com/ico_banamex.png",
    },
    {
      bankName: "Santander",
      description: "Santander sé parte de la banca digital",
      age: 10,
      url: "https://public-liarla.s3.us-east-2.amazonaws.com/ico_santander.png",
    },
    {
      bankName: "Scotiabank",
      description: "Scotiabank el Banco de Nueva Escocia",
      age: 10,
      url: "https://public-liarla.s3.us-east-2.amazonaws.com/ico_scotiabank.png",
    },
  ];

  const storeData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  if (recovered) return <Loading />;

  return (
    <Center flex={1} px="3" py="16">
      <Box>
        <Center>
          <Image
            source={require("../assets/pagatodologo.png")}
            alt="Alternate Text"
            size="xl"
          />
        </Center>

        <Heading fontSize="xl" p="4" pb="3">
          Lista de Bancos
        </Heading>
        <FlatList
          data={data}
          keyExtractor={(item) => item.bankName}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack space={3} justifyContent="space-between">
                <Avatar
                  size="48px"
                  source={{
                    uri: item.url,
                  }}
                />
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.bankName}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.description}
                  </Text>
                </VStack>
                <Spacer />
                <Center>
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    E {item.age}
                  </Text>
                </Center>
              </HStack>
            </Box>
          )}
        />
      </Box>
    </Center>
  );
}
