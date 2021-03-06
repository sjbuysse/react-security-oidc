import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { match, useRouteMatch, useHistory } from "react-router-dom";
import {
  ActionButtonType,
  ActionButton,
  ActionButtonMenu,
  Table,
} from "components";
import {
  deleteClient,
  getClients,
  ClientRow,
  Client,
  ClientTableData,
} from "clients";
import { selectIsReadOnly } from "../../../state/selectors";

export function ClientsTable() {
  const [clients, setClients] = useState<Client[] | undefined>(undefined);
  const { url }: match = useRouteMatch();
  const { push } = useHistory();
  const isReadOnly = useSelector(selectIsReadOnly);
  const retrieveClients = async () => {
    const result = await getClients();
    setClients(result);
  };

  useEffect(() => {
    retrieveClients();
  }, []);

  const onDeleteClient = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await deleteClient(id);
      await retrieveClients();
    }
  };

  const clientTableData = clients?.map<ClientTableData>((client) => ({
    id: client.id,
    name: `${client.firstName} ${client.lastName}`,
  }));

  return (
    <Table
      headers={["Id", "Name"]}
      data={clientTableData}
      renderRow={(client: ClientTableData) => (
        <ClientRow key={client.id} client={client}>
          <ActionButtonMenu disabled={isReadOnly}>
            <ActionButton
              className="mr-4"
              type={ActionButtonType.EDIT}
              label="Edit"
              onClick={() => {
                push(`${url}/${client.id}/edit`);
              }}
            />
            <ActionButton
              type={ActionButtonType.DELETE}
              label="Delete"
              onClick={() => {
                onDeleteClient(client.id);
              }}
            />
          </ActionButtonMenu>
        </ClientRow>
      )}
    ></Table>
  );
}
