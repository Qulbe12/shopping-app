import React, {useState} from 'react';
import {AspectRatio, Avatar, Box, Button, Flex, Image, Text, View} from "native-base";

const MyComponent = () => {

    const [vale, setVale] = useState("");
    return (
        <View>
            <Box mt={5} alignItems="center">
                <Box
                    maxW="80"
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
                    _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700",
                    }}
                    _web={{
                        shadow: 2,
                        borderWidth: 0,
                    }}
                    _light={{
                        backgroundColor: "gray.50",
                    }}
                >
                    <Box>
                        <AspectRatio w="100%" ratio={14 / 9}>
                            <Image source={IMAGE3} alt="image" />
                        </AspectRatio>
                        <View position={"absolute"} top={40} mt={4}>
                            <Flex ml={5} mt={-8} direction="row">
                                <Flex>
                                    <Avatar
                                        size={"md"}
                                        bg="green.500"
                                        source={{
                                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                                        }}
                                    ></Avatar>
                                </Flex>
                                <Flex ml={4}>
                                    <Text bold fontSize={18}>
                                        Uk Vines
                                    </Text>
                                    <Text color="grey">Digital Creator</Text>
                                    <Box ml={32} alignItems="center">
                                        <Button
                                            borderRadius={"xl"}
                                            ml={3}
                                            mt={-9}
                                            onPress={() => console.log("hello world")}
                                        >
                                            Follow
                                        </Button>
                                    </Box>
                                </Flex>
                            </Flex>
                        </View>
                    </Box>
                </Box>
            </Box>
        </View>
    );
};

export default MyComponent;
