import React, { useState } from 'react';
import { Container, TextInput, Button, Stack, Title, Text, Card, Loader, Alert, SimpleGrid, Group } from '@mantine/core';
import axios from 'axios';

// Define interfaces for the data structure
interface Vocabulary {
  term: string;
  translation: string;
}

interface Phrase {
  phrase: string;
  translation: string;
}

interface Tip {
  title: string;
  explanation: string;
}

interface TinyLesson {
  vocabulary: Vocabulary[];
  phrases: Phrase[];
  tips: Tip[];
}

const LessonGeneratorPage: React.FC<{ navigateTo: (page: 'hub') => void }> = ({ navigateTo }) => {
  const [scenario, setScenario] = useState('');
  const [lesson, setLesson] = useState<TinyLesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!scenario.trim()) {
      setError('Please enter a scenario.');
      return;
    }
    setLoading(true);
    setError(null);
    setLesson(null);
    try {
      const response = await axios.post<TinyLesson>('http://localhost:8000/generate-lesson', {
        scenario: scenario,
      });
      setLesson(response.data);
    } catch (err) {
      console.error("Error fetching lesson:", err);
      setError('Failed to generate lesson. Make sure the backend is running and OLLAMA is accessible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" my="xl">
      <Stack gap="lg">
         <Group justify="space-between">
           <Title order={1}>Tiny French Lesson Generator</Title>
           <Button variant="outline" onClick={() => navigateTo('hub')}>Back to Hub</Button>
        </Group>
        <Text>Enter a scenario (e.g., "ordering coffee", "asking for directions") and get a mini-lesson!</Text>

        <Stack gap="xs">
          <TextInput
            label="Scenario"
            placeholder="Enter scenario here..."
            value={scenario}
            onChange={(event) => setScenario(event.currentTarget.value)}
            disabled={loading}
          />
          <Button onClick={handleSubmit} loading={loading} disabled={!scenario.trim()}>
            Generate Lesson
          </Button>
        </Stack>

        {loading && <Loader />}

        {error && <Alert title="Error" color="red" withCloseButton onClose={() => setError(null)}>{error}</Alert>}

        {lesson && (
          <Container size="lg" py="xl" ta="left">
            <Title order={2} className="vocab" mt="lg" mb="lg">
              🗒️ Vocabulary
            </Title>
            <SimpleGrid cols={2} spacing="lg">
              {lesson.vocabulary.map((item, index) => (
                <Card shadow="sm" padding="lg" radius="md" withBorder key={index}>
                  <Title order={3}>{item.term}</Title>
                  <Text>{item.translation}</Text>
                </Card>
              ))}
            </SimpleGrid>

            <Title order={2} className="phrases" mt="lg" mb="lg">
              💬 Phrases
            </Title>
            <SimpleGrid cols={2} spacing="lg">
              {lesson.phrases.map((item, index) => (
                <Card shadow="sm" padding="lg" radius="md" withBorder key={index}>
                  <Title order={3}>{item.phrase}</Title>
                  <Text>{item.translation}</Text>
                </Card>
              ))}
            </SimpleGrid>

            <Title order={2} className="tips" mt="lg" mb="lg">
              📖 Tips
            </Title>
            <SimpleGrid cols={2} spacing="lg">
              {lesson.tips.map((item, index) => (
                <Card shadow="sm" padding="lg" radius="md" withBorder key={index}>
                  <Title order={3}>{item.title}</Title>
                  <Text>{item.explanation}</Text>
                </Card>
              ))}
            </SimpleGrid>
          </Container>
        )}
      </Stack>
    </Container>
  );
}

export default LessonGeneratorPage;