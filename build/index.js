"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const Express = require("express");
const typeorm_1 = require("typeorm");
const session = require("express-session");
const path = require("path");
const resolvers_1 = require("./resolvers");
const http_1 = require("http");
let ConnectionResolver = class ConnectionResolver {
    Connection() {
        return __awaiter(this, void 0, void 0, function* () {
            return "Connected!";
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConnectionResolver.prototype, "Connection", null);
ConnectionResolver = __decorate([
    type_graphql_1.Resolver()
], ConnectionResolver);
exports.ConnectionResolver = ConnectionResolver;
const main = () => __awaiter(this, void 0, void 0, function* () {
    const db = process.env.NODE_ENV == "production" ? {
        name: "production",
        type: "postgres",
        host: "localhost",
        port: 5432,
        url: process.env.DATABASE_URL,
        "synchronize": true,
        logging: "all",
        "entities": [
            "build/entity/**/*.js"
        ],
        migrations: [
            "build/migration/**/*.js"
        ]
    }
        : "default";
    yield typeorm_1.createConnection(db);
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [
            resolvers_1.TripStopResolver,
            ConnectionResolver,
            resolvers_1.UserResolver,
            resolvers_1.TripResolver,
            resolvers_1.FeedbackResolver,
            resolvers_1.BusResolver,
            resolvers_1.DriverResolver,
            resolvers_1.ReservationResolver
        ]
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        playground: process.env.NODE_ENV != 'production',
        context: ({ req }) => ({ req })
    });
    const app = Express();
    app.use(session({
        secret: "shh",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 31536000000
        }
    }));
    apolloServer.applyMiddleware({
        app,
        cors: { credentials: true },
        path: process.env.NODE_ENV == "production" ? "/" : ""
    });
    if (process.env.NODE_ENV == "production") {
        const App = Express();
        App.post("/graphql", app);
        App.use(Express.static(path.resolve(__dirname, "public")));
        App.get("*", (_, res) => {
            res.sendFile(path.resolve(__dirname, "public", "index.html"));
        });
        const httpServer = http_1.createServer(App);
        apolloServer.installSubscriptionHandlers(httpServer);
        httpServer.listen(process.env.PORT || 4000, () => {
            console.log(`Server is running, GraphQL Endpoint available at http://localhost:4000${apolloServer.graphqlPath}`);
        });
    }
    else {
        const httpServer = http_1.createServer(app);
        apolloServer.installSubscriptionHandlers(httpServer);
        httpServer.listen(process.env.PORT || 4000, () => {
            console.log(`Server is running, GraphQL Playground available at http://localhost:4000${apolloServer.graphqlPath}`);
        });
    }
});
main();
