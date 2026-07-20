"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { clients as initialClients } from "@/data/clients";


type Client = {
  id: number;
  name: string;
  manager: string;
  phone: string;
};


type ClientContextType = {
  clients: Client[];
  addClient: (client: Client) => void;
  deleteClient: (id: number) => void;
  updateClient: (client: Client) => void;
};


const ClientContext = createContext<ClientContextType | null>(null);


export function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [clients, setClients] = useState<Client[]>(
    initialClients
  );


  useEffect(() => {
    const savedClients = localStorage.getItem("clients");

    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(
      "clients",
      JSON.stringify(clients)
    );
  }, [clients]);


  const addClient = (client: Client) => {
    setClients((prev) => [
      ...prev,
      client,
    ]);
  };
const deleteClient = (id: number) => {
  setClients((prev) =>
    prev.filter(
      (client) => client.id !== id
    )
  );
};
const updateClient = (updatedClient: Client) => {
  setClients((prev) =>
    prev.map((client) =>
      client.id === updatedClient.id
        ? updatedClient
        : client
    )
  );
};

  return (
    <ClientContext.Provider
      value={{
  clients,
  addClient,
  deleteClient,
  updateClient,
}}
    >
      {children}
    </ClientContext.Provider>
  );
}


export function useClients() {

  const context = useContext(ClientContext);

  if (!context) {
    throw new Error(
      "useClients must be used inside ClientProvider"
    );
  }

  return context;

}