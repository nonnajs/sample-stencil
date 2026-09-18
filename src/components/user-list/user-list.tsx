import {Component, h, Listen, State} from "@stencil/core";
import {Inject} from "@nonnajs/stencil";
import {UserService} from "@services/user.service";
import type {User} from "@services/user.repository";

@Component({tag: "user-list", shadow: false})
export class UserList {
    @Inject(UserService)
    private declare readonly userService: UserService;

    @State() users: User[] = [];

    componentWillLoad() {
        this.users = this.userService.getUsers();
    }

    @Listen("user-added", {target: "window"})
    handleUserAdded() {
        this.users = this.userService.getUsers();
    }

    render() {
        return (
            <div style={{marginBottom: "16px"}}>
                <h3>Users ({this.users.length})</h3>
                <ul>
                    {this.users.map(u => (
                        <li key={u.id}>
                            <strong>{u.name}</strong> &lt;{u.email}&gt;
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
