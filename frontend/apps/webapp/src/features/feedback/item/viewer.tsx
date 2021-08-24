import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Text, Heading, Divider, Stack, FormLabel, Table, Thead, Tr, Tbody, Td, Th, Tag } from '@chakra-ui/react';
import { IssueEntity as EntityClass } from '../entity';

export const IssueEntityViewer = ({ item }: { item: EntityClass }) => {
  return (
    <Stack spacing={6}>
      <Heading as="h2" size="md">
        {item.title}
      </Heading>
      <Divider />
      <Stack spacing={3}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Title</Td>
              <Td>{item.title}</Td>
            </Tr>
            <Tr>
              <Td>Description</Td>
              <Td>{item.description}</Td>
            </Tr>
            <Tr>
              <Td>Status</Td>
              <Td>{item.status}</Td>
            </Tr>
            <Tr>
              <Td>Tags</Td>
              <Td>
                {item.tags?.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Td>
            </Tr>
            <Tr>
              <Td>Comments</Td>
              <Td>
                {item.comments &&
                  item.comments.map((c) => (
                    <Card>
                      <CardBody>{c.text}</CardBody>
                    </Card>
                  ))}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  );
};
