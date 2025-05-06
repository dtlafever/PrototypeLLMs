import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Card, Loader, Alert, Button, Stack, Paper, Group, Badge } from '@mantine/core';
import axios from 'axios';

// Define interfaces for the Slang Hang data structure
interface Dialogue {
  speaker: string;
  gender: string;
  message: string;
  notes: string;
}

interface Conversation {
  context: string;
  dialogue: Dialogue[];
}

const SlangHangPage: React.FC<{ navigateTo: (page: 'hub') => void }> = ({ navigateTo }) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversation = async () => {
    setLoading(true);
    setError(null);
    setConversation(null);
    try {
      // Make sure your FastAPI backend is running on port 8000
      const response = await axios.get<Conversation>('http://localhost:8000/generate-slang-hang');
      setConversation(response.data);
    } catch (err) {
      console.error("Error fetching conversation:", err);
      setError('Failed to generate conversation. Make sure the backend is running and OLLAMA is accessible.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch conversation on initial load
  useEffect(() => {
    fetchConversation();
  }, []);

  return (
    <Container size="md" my="xl">
      <Stack gap="lg">
        <Group justify="space-between">
           <Title order={1}>Slang Hang</Title>
           <Button variant="outline" onClick={() => navigateTo('hub')}>Back to Hub</Button>
        </Group>
        <Text>Generate a short dialogue scene using authentic European French slang.</Text>

        <Button onClick={fetchConversation} loading={loading}>
          Generate New Scene
        </Button>

        {loading && <Loader />}

        {error && <Alert title="Error" color="red" withCloseButton onClose={() => setError(null)}>{error}</Alert>}

        {conversation && (
          <Paper shadow="md" p="lg" radius="md" withBorder mt="lg">
            <Title order={3} mb="sm">Context</Title>
            <Text mb="lg">{conversation.context}</Text>

            <Title order={3} mb="sm">Dialogue</Title>
            <Stack gap="md">
              {conversation.dialogue.map((turn, index) => (
                <Card key={index} shadow="sm" padding="md" radius="sm" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Text fw={700}>{turn.speaker}</Text>
                    <Badge variant="light" color={turn.gender === 'male' ? 'blue' : 'pink'}>
                      {turn.gender}
                    </Badge>
                  </Group>
                  <Text style={{ fontStyle: 'italic' }} mb="xs">"{turn.message}"</Text>
                  <Text size="sm" c="dimmed">Notes: {turn.notes}</Text>
                </Card>
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

export default SlangHangPage;