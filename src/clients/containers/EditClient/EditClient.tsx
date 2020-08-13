import { useState } from 'react';
import { ClientForm, Client, getClient } from "clients";
import { match, useRouteMatch, useHistory } from 'react-router-dom';

export function EditClient() {
    const {
        params: { clientId },
    }: match<{ clientId: string }> = useRouteMatch();
    const { push } = useHistory();
    const [client, setClient] = useState<Client | undefined>(undefined);
    const goBackToClients = () => push("/clients");
    const retrieveClient = async () => {
        const client = await getClient(clientId);
        setClient(client);
    };
    const onEditClient = async (clientFields: Partial<Client>) => {
        await editClient({ ...client, ...clientFields });
        goBackToClients();
    };

    useEffect(() => {
        retrieveClient();
        // eslint-disable-next-line
    }, []);

    return client ? (
        <ClientForm
            client={client}
            onSubmit={onEditClient}
            onCancel={goBackToClients}
        ></ClientForm>
    ) : null;
}
