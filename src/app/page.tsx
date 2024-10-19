"use client"
import { Box, Heading, Text } from "@chakra-ui/react";
import Header from "./ui/layout/header/header";
import Body from "./ui/layout/body/body";
export default function Home() {
  return (
    <Box>
      <Header />
      <Body />
    </Box>
  );
}
