import {Component, h, State} from "@stencil/core";
import {Inject} from "@nonnajs/stencil";
import {UserService} from "@services/user.service";

@Component({tag: "add-user-form", shadow: false})
export class AddUserForm {
    @Inject(UserService)
    private declare readonly userService: UserService;

    @State() name = "";
    @State() email = "";

    private readonly handleSubmit = (event: Event): void => {
        event.preventDefault();
        if (!this.name || !this.email) return;
        this.userService.addUser(this.name, this.email);
        this.name = "";
        this.email = "";
        window.dispatchEvent(new CustomEvent("user-added"));
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{display: "flex", gap: "8px", marginBottom: "16px"}}>
                <input
                    type="text"
                    placeholder="Name"
                    required
                    style={{padding: "6px"}}
                    value={this.name}
                    onInput={e => (this.name = (e.target as HTMLInputElement).value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    style={{padding: "6px"}}
                    value={this.email}
                    onInput={e => (this.email = (e.target as HTMLInputElement).value)}
                />
                <button type="submit" style={{padding: "6px 12px", cursor: "pointer"}}>
                    Add User
                </button>
            </form>
        );
    }
}
