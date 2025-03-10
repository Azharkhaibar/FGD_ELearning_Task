"use client";

import { ChakraProvider } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return <ChakraProvider>{children}</ChakraProvider>;
}
