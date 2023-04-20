// NOTE: this code is disgustingly bad
// but it does work. i had little time <:(

import { useEffect, useState } from "react";

import {
  Box,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";

type Message = {
  text: string;
  person: string;
  avatar: string;
  createdAt: number;
};

const PEOPLE = [
  {
    name: "BOT",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSATcdI4GCFzAyjnPG9nU3SX45TJqPy2K2a2g&usqp=CAU",
  },
  {
    name: "USER",
    avatar:
      "https://i.pinimg.com/originals/47/2d/63/472d637717c3a23875e9b00d4692be3e.jpg",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const getMessage = async () => {
    if (!messages) return;

    const last4 = messages.slice(-4);

    const prompt = last4
      .map((message) => {
        if (message.person === "BOT") {
          return `<|ASSISTANT|>${message?.text.substring(0, 40)}`;
        } else {
          return `<|USER|>${message?.text.substring(0, 40)}`;
        }
      })
      .join("");

    const hit = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });

    setMessage("");

    const res = await hit.json();

    setMessages((messages) => [
      ...messages,
      {
        text: res.data,
        person: PEOPLE[0].name,
        avatar: PEOPLE[0].avatar,
        createdAt: Date.now(),
      },
    ]);
    setTimeout(() => {
      const chat = document.getElementById("chat");
      chat && chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
    }, 500);
  };

  useEffect(() => {
    if (
      messages &&
      messages.length &&
      messages[messages.length - 1].person !== PEOPLE[0].name
    ) {
      getMessage();
      const chat = document.getElementById("chat");
      chat && chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    const input = document.getElementById("chatinput");
    input && input.focus();
  }, []);

  return (
    <VStack
      h="100vh"
      align="center"
      w="full"
      p={8}
      pt={{
        base: 32,
        md: 48,
      }}
    >
      <VStack spacing={0} w="full">
        <Heading size="xl" pb={2}>
          Stable Chat 🌍🦒
        </Heading>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          textAlign={"center"}
          color="gray.500"
        >
          (powered by, but not affiliated with stability.ai)
        </Text>
      </VStack>

      <VStack
        align="left"
        spacing={4}
        w={{ base: "full", md: "70%" }}
        h="32rem"
        p={2}
        overflowY={"scroll"}
        transitionDuration="0.2s"
        id="chat"
      >
        {messages &&
          messages.map((message) => (
            <HStack w="full" justify="left" key={message.text}>
              <Image
                src={message?.avatar}
                w="10"
                h="10"
                rounded="sm"
                alt="pfp"
              />
              <Box bg="gray.200" p={2} rounded="lg">
                {message?.text}
              </Box>
            </HStack>
          ))}
      </VStack>

      <HStack
        w="60%"
        position="absolute"
        bottom="20"
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
        p={{ base: 1, md: 2 }}
        py={2}
        px={3}
        justify="space-between"
      >
        <Input
          id="chatinput"
          fontSize={{
            base: "md",
            md: "lg",
          }}
          focusBorderColor="transparent"
          border="none"
          p={0}
          pl="0.5"
          _focus={{
            outline: "none",
          }}
          h="fit"
          w="full"
          placeholder=""
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              if (messages == undefined) {
                setMessages([
                  {
                    text: message,
                    person: PEOPLE[1].name,
                    avatar: PEOPLE[1].avatar,
                    createdAt: Date.now(),
                  },
                ]);
              } else {
                setMessages((messages) => [
                  ...messages,
                  {
                    text: message,
                    person: PEOPLE[1].name,
                    avatar: PEOPLE[1].avatar,
                    createdAt: Date.now(),
                  },
                ]);
              }
            }
          }}
        />
        <Box
          as={AiOutlineSend}
          size="1.5rem"
          cursor="pointer"
          transitionDuration="0.2s"
          onClick={async () => {
            if (messages == undefined) {
              setMessages([
                {
                  text: message,
                  person: PEOPLE[1].name,
                  avatar: PEOPLE[1].avatar,
                  createdAt: Date.now(),
                },
              ]);
            } else {
              setMessages((messages) => [
                ...messages,
                {
                  text: message,
                  person: "aleem",
                  avatar: PEOPLE[1].avatar,
                  createdAt: Date.now(),
                },
              ]);
            }
          }}
          _hover={{
            color: "gray.500",
          }}
        />
      </HStack>
      <Text
        fontSize={{ base: "sm", md: "md" }}
        textAlign={"center"}
        color="gray.500"
      >
        expect a response in 5-15 seconds, if not, gpus are probably scaling!
      </Text>
    </VStack>
  );
};

export default Chat;
