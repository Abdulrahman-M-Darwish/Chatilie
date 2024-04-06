import { client } from '@/components';
import { DocumentNode } from '@apollo/client';

export const updateCache = ({
  query,
  variables,
  data,
}: {
  query: DocumentNode;
  variables: any;
  // eslint-disable-next-line no-unused-vars
  data: (queryData: any) => any;
}) => {
  const queryData = client.readQuery({
    query,
    variables,
  });
  client.writeQuery({
    query,
    data: data(queryData),
    variables,
  });
};
