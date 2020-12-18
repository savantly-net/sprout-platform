import React, { Fragment } from 'react';
import { Card, CardBody } from 'reactstrap';
import { IssueEntity as EntityClass } from '../entity';

export const IssueEntityViewer = ({ item }: { item: EntityClass }) => {
  return (
    <Fragment>
      <h2>{item.title}</h2>
      <hr />
      <div className="mb-2">
        <h5>Details</h5>
        <div>
          <label className="mr-2">Title: </label>
          <span>{item.description}</span>
        </div>
        <div>
          <label className="mr-2">Description: </label>
          <span>{item.description}</span>
        </div>
        <div>
          <label className="mr-2">Comments: </label>
          {item.comments && (item.comments.map(c => (
            <Card>
              <CardBody>
                {c.text}
              </CardBody>
            </Card>
          )))}

        </div>
      </div>
    </Fragment>
  );
};
