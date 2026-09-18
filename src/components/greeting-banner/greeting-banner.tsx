import {Component, h} from "@stencil/core";
import {AllInject, OptionalInject} from "@nonnajs/stencil";
import {FEATURE_FLAGS, type FeatureFlags} from "@services/feature-flags";
import {GREETER, type Greeter} from "@services/greeter";

@Component({tag: "greeting-banner", shadow: false})
export class GreetingBanner {
    @AllInject(GREETER)
    private declare readonly greeters: readonly Greeter[];

    @OptionalInject(FEATURE_FLAGS)
    private declare readonly flags?: FeatureFlags;

    render() {
        const greetings = this.greeters.map(g => g.greet("Visitor"));
        return (
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "12px",
                    marginBottom: "16px",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <h3 style={{marginTop: "0"}}>Greetings (multi: true tokens via @AllInject)</h3>
                <ul>
                    {greetings.map(msg => (
                        <li>{msg}</li>
                    ))}
                </ul>
                <p style={{color: "#666", fontSize: "0.9em"}}>
                    Feature flag (@OptionalInject):{" "}
                    {this.flags ? JSON.stringify(this.flags) : "undefined (not registered)"}
                </p>
            </div>
        );
    }
}
