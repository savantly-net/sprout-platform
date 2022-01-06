import React, { useMemo, useState } from 'react';
import { Stack, Table, Tr, Tbody, Td, Tag } from '@chakra-ui/react';
import { sproutApiSvc } from '../../core/services/sproutApiSvc';
import { useDispatch } from 'react-redux';
import { logout } from '../../core/reducers/authentication';
import { OAuthClientConfig } from '../../types';
import { Icon } from '@savantly/sprout-ui';
import { css, cx } from 'emotion';
import { Card, CardBody, CardHeader } from 'reactstrap';

const IndexPage = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [items, setItem] = useState(new Array<OAuthClientConfig>());
    const once = true;

    useMemo(
        () =>
            sproutApiSvc
                .get('/api/account')
                .then((value) => {
                    console.log("account==>", value.data);
                    setItem(value.data);
                })
                .catch((failed: Error) => {
                    console.error(failed);
                    setError(failed.message);
                    dispatch(logout());
                }),
        [once, dispatch, setItem]
    );
    const item = Object.keys(items).length > 0;

    console.log("item====>>", item, Object.assign(items)['name'], "items====>>", items);
    return (
        <>
            <div className="page-scrollbar-content">
                <div className="page-container page-body">
                    <Card bg="light" border="success" style={{ width: '50rem' }}>
                        <CardHeader>
                            <Icon name='user' className={cx(
                                css`height: 3em;
                                        border-radius: 1em;
                                        border: 1px solid;
                                        width: auto;
                                        margin: 15px;
                                    `
                            )} />
                            {item && Object.assign(items)?.name}
                        </CardHeader>
                        <CardBody>
                            <Stack spacing={3}>
                                {item &&
                                    <Table variant="simple">
                                        <Tbody>
                                            <Tr>
                                                <Td>User Name<br />{Object.assign(items)?.name}</Td>
                                                <Td>Display Name<br />{Object.assign(items)?.name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>First Name<br />{Object.assign(items)?.name}</Td>
                                                <Td>Last Name<br />{Object.assign(items)?.name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Email Address<br />{Object.assign(items)?.name}</Td>
                                                <Td>Roles<br /><Tag key={Object.assign(items)?.name}>{Object.assign(items)?.name}</Tag></Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                }
                            </Stack>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default IndexPage;