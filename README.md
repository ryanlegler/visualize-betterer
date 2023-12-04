☀️Visualize Betterer

Demo Url:
[https://visualize-betterer.vercel.app/](https://visualize-betterer.vercel.app/)

The aim of this project is to create effective visualization tools specifically designed to extract valuable insights from `betterer` test results.

Refer to the [betterer docs](https://github.com/phenomnomnominal/betterer) for general information on the betterer project. It's really cool!

# Motivation?

1. The standard CLI betterer report is great but it's limited in it's capabilities when it comes to segmenting your results by test -> file.

2. Other Cool stuff we can add here that would be impractical for a CLI tool

# Usage

Try out the visualizer with the `Load Demo Data` button.

To visualize results from your own betterer data you first need to generate a `betterer.results.json` file.

You can achieve this with a betterer custom [reporter](https://phenomnomnominal.github.io/betterer/docs/reporters/)

1. Add the custom reporter to your project

```typescript
// betterer-reporter.ts
import { BettererContext, BettererContextSummary, BettererReporter } from "@betterer/betterer";
import { BettererError } from "@betterer/errors";
import fs from "fs";
export const reporter: BettererReporter = createCustomReporter();

function createCustomReporter(): BettererReporter {
    return {
        contextEnd(contextSummary: BettererContextSummary): void {
            return fs.writeFileSync(
                "betterer.report.json",
                renderJSONTemplate(contextSummary),
                "utf8"
            );
        },
        contextError(_: BettererContext, error: BettererError): void {
            console.log(error);
        },
    };
}

function renderJSONTemplate(contextSummary: BettererContextSummary): string {
    const { runSummaries } = contextSummary.suites?.[0] || {};

    const result = runSummaries.map(({ filePaths, ...rest }) => {
        return {
            timestamp: rest.timestamp,
            testName: rest.name,
            delta: rest.delta,
            files: Object.keys(rest.result.value).map((key) => {
                return {
                    name: key,
                    errors: rest?.result?.value?.[key]?.length || 0,
                };
            }),
        };
    });
    return JSON.stringify(result, null, 2);
}
```

2. Add the command to your `package.json` pointed at the reporter file you just added.

```bash
"scripts": {
    "betterer:rules-report": "betterer --reporter betterer-reporter"
  },
```

3. Execute this script and generate the report

```bash
yarn run betterer:rules-report
```

This should then generate a `betterer.report.json` report when can be used with this app.

Now, simply drag the generated report json file onto the drag-n-drop area of the `visualize-betterer` app or click it to open the browsers native file picker.
