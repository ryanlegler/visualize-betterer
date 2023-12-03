Visualize Betterer

[DEMO](https://visualize-betterer.vercel.app/)

![Screenshot1](/public/screenshot1.png)
![Screenshot2](/public/screenshot2.png)
![Screenshot3](/public/screenshot2.png)

The aim of this project is to create effective visualization tools specifically designed to extract valuable insights from `betterer` test results.

Refer to betterer docs to get started
https://github.com/phenomnomnominal/betterer

In order to use this tooling you need to first generate a betterer.results.json file using the below better custom reporter as part of your projects betterer setup

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

you can then have a specific command in you `package.json` setup to run this report.

```bash
"scripts": {
    "betterer:rules-report": "betterer --reporter betterer-reporter"
  },
```

This should then generate a `betterer.report.json` report when can be used with this app.
