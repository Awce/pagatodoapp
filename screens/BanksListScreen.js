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
} from "native-base";
import Logo from "../components/Logo";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BanksListScreen() {
  const [banks, setBanks] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [recovered, setRecovered] = useState(false);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/604006e581087a6a8b95b784")
      .then((response) => {
        return response.json();
      })
      .then((banks) => {
        setBanks(banks.record);
        setRecovered(true);
        setDataList([...banks, dataList]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    storeData();
    return () => {
      getData();
    };
  }, []);

  // Guardar en Asyncstorage

  const storeData = async (dataList) => {
    try {
      const jsonValue = JSON.stringify(dataList);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (err) {
      console.log(err);
    }
  };

  if (!recovered) return <Loading />;

  return (
    <Center flex={1} px="3" py="16">
      <Box>
        <Center>
          <Logo />
        </Center>

        <Heading fontSize="xl" p="4" pb="3">
          Lista de Bancos
        </Heading>
        <Text>{dataList}</Text>
        <FlatList
          data={dataList}
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
