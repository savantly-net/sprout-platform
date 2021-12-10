import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Heading, Divider, Stack, Table, Thead, Tr, Tbody, Td, Th, Tag } from '@chakra-ui/react';
import { UserEntity as EntityClass } from '../entity';

export const UserEntityViewer = ({ item }: { item: EntityClass }) => {
  return (
    <Stack spacing={6}>
      <Heading as="h2" size="md">
        {item.username}
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
              <Td>User Name</Td>
              <Td>{item.username}</Td>
            </Tr>
            <Tr>
              <Td>Display Name</Td>
              <Td>{item.displayName}</Td>
            </Tr> 
            <Tr>
              <Td>First Name</Td>
              <Td>{item.firstName}</Td>
            </Tr>

            <Tr>
              <Td>Last Name</Td>
              <Td>{item.lastName}</Td>
            </Tr>
            
            <Tr>
              <Td>Email Address</Td>
              <Td>{item.emailAddress}</Td>
            </Tr> 

            <Tr>
              <Td>Roles</Td>
              <Td>{item.displayName}</Td>
            </Tr>
            
            {/* <Tr>
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
            </Tr> */}
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  );
};
