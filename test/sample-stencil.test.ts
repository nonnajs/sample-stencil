import {describe, it} from "node:test";
import assert from "node:assert/strict";
import {Nonna} from "@nonnajs/di";
import "../src/__generated__/nonna-dependencies.generated";
import {UserService} from "../src/services/user.service";
import {FormalGreeter, FriendlyGreeter, GREETER} from "../src/services/greeter";

describe("sample-stencil dependency wiring", () => {
    it("boots injector and resolves services correctly", async () => {
        const injector = await Nonna.injector()
            .register({provide: GREETER, useClass: FriendlyGreeter, multi: true})
            .register({provide: GREETER, useClass: FormalGreeter, multi: true})
            .scan()
            .build();

        const userService = injector.get(UserService);
        assert.ok(userService instanceof UserService);

        const users = userService.getUsers();
        assert.equal(users.length, 2);

        const added = userService.addUser("Charlie", "charlie@example.com");
        assert.equal(added.name, "Charlie");
        assert.equal(userService.getUsers().length, 3);

        const greeters = injector.getAll(GREETER);
        assert.equal(greeters.length, 2);
    });
});
