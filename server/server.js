const { ApolloServer } = require("apollo-server");
const dns = require("dns");

const isDomainAvaible = (urlDomain) => {
    return new Promise((resolve, reject) => {
        dns.resolve(urlDomain, (error) => {
            if (error) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

const typeDefs = `
	type Item {
		id: Int
		type: String
		description: String
	}

	type Query {
		items(type: String): [Item]
	}

    input ItemInput {
        type: String
        description: String
    }

    type Domain {
        name: String
        extension: String
        checkout: String
        isAvailable: Boolean
    }
    
    type Mutation {
        saveItem(item: ItemInput): Item
        deleteItem(id: Int): Boolean
        generateDomains: [Domain]
        getDomainByName(name: String): [Domain]
    }
`;

const items = [
    { id: 1, type: "prefix", description: "Air" },
    { id: 2, type: "prefix", description: "Jet" },
    { id: 3, type: "prefix", description: "Flight" },
    { id: 4, type: "suffix", description: "Hub" },
    { id: 5, type: "suffix", description: "Station" },
    { id: 6, type: "suffix", description: "Mart" },
];

const resolvers = {
    Query: {
        items(_, args) {
            return items.filter((item) => item.type === args.type);
        },
    },
    Mutation: {
        saveItem(_, args) {
            const item = args?.item;
            item.id = Math.floor(Math.random() * 1000);
            items.push(item);
            return item;
        },
        deleteItem(_, args) {
            const id = args?.id;
            const item = items.find((item) => item.id === id);
            if (!item) return false;
            items.splice(items.indexOf(item), 1);
            return true;
        },
        async generateDomains() {
            const domains = [];
            const prefixFiltered = items.filter((item) => item.type === "prefix");
            const suffixFiltered = items.filter((item) => item.type === "suffix");
            for (const prefix of prefixFiltered) {
                for (const suffix of suffixFiltered) {
                    const name =
                        String(prefix?.description) + String(suffix?.description);
                    const url = name.toLowerCase();
                    const checkout = `https://cart.hostgator.com.br/?pid=d&sld=${url}&tld=.com.br&domainCycle=2&mode=2r`;
                    const isAvailable = await isDomainAvaible(`${url}.com.br`);
                    domains.push({
                        name,
                        checkout,
                        isAvailable
                    });
                }
            }
            return domains;
        },
        async getDomainByName(_, args) {
            const nameDomain = args?.name;
            const domains = [];
            const extensions = [".com.br", ".com", ".net", ".org"];
            for (const extension of extensions) {
                const url = nameDomain.toLowerCase();
                const checkout = `https://cart.hostgator.com.br/?pid=d&sld=${url}&tld=${extension}&domainCycle=2&mode=2r`;
                const isAvailable = await isDomainAvaible(`${url}${extension}`);
                domains.push({
                    nameDomain,
                    extension,
                    checkout,
                    isAvailable
                });
            }
            return domains;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen();
