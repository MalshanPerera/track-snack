import { Center, Heading, Text, VStack } from "@chakra-ui/react";

export default function NotFound() {
	return (
		<Center minH="100vh">
			<VStack textAlign="center">
				<Heading size="4xl" fontWeight="bold">
					404
				</Heading>
				<Text fontSize="xl" mt={4}>
					Page not found
				</Text>
			</VStack>
		</Center>
	);
}
