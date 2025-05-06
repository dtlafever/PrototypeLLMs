import React from 'react';
import { Container, Title, Button, Stack, Card, Text } from '@mantine/core';

interface HubPageProps {
  navigateTo: (page: 'lesson' | 'slang') => void;
}

const HubPage: React.FC<HubPageProps> = ({ navigateTo }) => {
  return (
    <Container size="sm" my="xl">
      <Stack gap="lg">
        <Title order={1} ta="center">Prototype LLMs Hub</Title>
        <Text ta="center">Choose an application to run:</Text>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Tiny French Lesson</Title>
          <Text mb="md">Get vocabulary, phrases, and tips for a specific scenario.</Text>
          <Button onClick={() => navigateTo('lesson')}>Go to Lesson Generator</Button>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Slang Hang</Title>
          <Text mb="md">Generate a short dialogue scene using authentic European French slang.</Text>
          <Button onClick={() => navigateTo('slang')}>Go to Slang Hang</Button>
        </Card>
      </Stack>
    </Container>
  );
};

export default HubPage;
