import {Component, h, Listen, State} from "@stencil/core";
import {Inject} from "@nonnajs/stencil";
import {LoggerService} from "@services/logger.service";

@Component({tag: "debug-panel", shadow: false})
export class DebugPanel {
    @Inject(LoggerService)
    private declare readonly logger: LoggerService;

    @State() logs: string[] = [];

    componentWillLoad() {
        this.logs = [...this.logger.logs];
    }

    @Listen("user-added", {target: "window"})
    handleUserAdded() {
        this.logs = [...this.logger.logs];
    }

    render() {
        return (
            <div style={{borderTop: "1px solid #eee", paddingTop: "12px"}}>
                <h4>LoggerService Activity ({this.logs.length} entries)</h4>
                <pre
                    style={{
                        background: "#222",
                        color: "#eee",
                        padding: "10px",
                        borderRadius: "4px",
                        fontSize: "0.85em",
                        overflowX: "auto",
                    }}
                >
                    {this.logs.length === 0 ? "No logs yet." : this.logs.join("\n")}
                </pre>
            </div>
        );
    }
}
